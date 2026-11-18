<?php
/**
 * Updates from GitHub releases through the native "Update URI" mechanism (WordPress 5.8+).
 *
 * @package SimpleMegaMenu
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Simple_Mega_Menu_Updater {

	const REPO      = 'seangoogoo/simple-mega-menu';
	const SLUG      = 'simple-mega-menu';
	const ASSET     = 'simple-mega-menu.zip';
	const CACHE_KEY = 'simple_mega_menu_release';

	/** @var string Plugin basename, e.g. "simple-mega-menu/simple-mega-menu.php". */
	private $plugin_file;

	public function __construct( $plugin_file ) {
		$this->plugin_file = plugin_basename( $plugin_file );
		add_filter( 'update_plugins_github.com', array( $this, 'check_update' ), 10, 3 );
		add_filter( 'plugins_api', array( $this, 'plugin_info' ), 10, 3 );
	}

	//* Latest GitHub release with a plugin zip. Revalidated on every update check and
	//* every "View details" with the cached ETag: an unchanged release answers 304, which
	//* costs no API quota and reuses the cache, so a new release (and its changelog) shows
	//* up at once. After a failure, the last known release is kept and GitHub is left
	//* alone for 1 h.
	private function get_release() {
		$cache = get_site_transient( self::CACHE_KEY );
		if ( ! is_array( $cache ) ) {
			$cache = array(
				'etag'    => '',
				'release' => null,
				'retry'   => 0,
			);
		}
		if ( $cache['retry'] > time() ) {
			return $cache['release'];
		}

		$headers = array( 'Accept' => 'application/vnd.github.html+json' );
		if ( $cache['etag'] ) {
			$headers['If-None-Match'] = $cache['etag'];
		}
		$response = wp_remote_get(
			'https://api.github.com/repos/' . self::REPO . '/releases/latest',
			array(
				'timeout' => 10,
				'headers' => $headers,
			)
		);
		$code = wp_remote_retrieve_response_code( $response );

		if ( 304 === $code ) {
			return $cache['release'];
		}
		if ( 200 !== $code ) {
			$cache['retry'] = time() + HOUR_IN_SECONDS;
			set_site_transient( self::CACHE_KEY, $cache );
			return $cache['release'];
		}

		$data    = json_decode( wp_remote_retrieve_body( $response ), true );
		$release = null;

		if ( ! empty( $data['assets'] ) ) {
			foreach ( $data['assets'] as $asset ) {
				if ( self::ASSET === $asset['name'] ) {
					$version = ltrim( (string) $data['tag_name'], 'v' );
					$prefix  = 'https://github.com/' . self::REPO . '/releases/download/';
					if ( ! preg_match( '/^\d+\.\d+\.\d+$/', $version ) || 0 !== strpos( $asset['browser_download_url'], $prefix ) ) {
						break;
					}
					$release = array(
						'version'   => $version,
						'package'   => $asset['browser_download_url'],
						'url'       => $data['html_url'],
						'changelog' => isset( $data['body_html'] ) ? $data['body_html'] : '',
						'date'      => $data['published_at'],
					);
					break;
				}
			}
		}

		if ( $release ) {
			$release['changelog'] = $this->get_changelog_html( $data['tag_name'], $release['changelog'] );
		}

		set_site_transient(
			self::CACHE_KEY,
			array(
				'etag'    => (string) wp_remote_retrieve_header( $response, 'etag' ),
				'release' => $release,
				'retry'   => 0,
			)
		);
		return $release;
	}

	//* Full CHANGELOG.md of the release, rendered to HTML by GitHub; falls back to the release notes on failure.
	private function get_changelog_html( $tag_name, $fallback ) {
		$response = wp_remote_get(
			'https://api.github.com/repos/' . self::REPO . '/contents/CHANGELOG.md?ref=' . rawurlencode( $tag_name ),
			array(
				'timeout' => 10,
				'headers' => array( 'Accept' => 'application/vnd.github.html' ),
			)
		);
		if ( 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return $fallback;
		}
		$html = wp_remote_retrieve_body( $response );

		//* Drop the leading "Changelog" heading and its intro paragraph.
		$html = preg_replace(
			'#^.*?<div class="markdown-heading"[^>]*>\s*<h1[^>]*>.*?</h1>.*?</div>\s*<p[^>]*>.*?</p>\s*#s',
			'',
			$html,
			1
		);
		if ( null === $html ) {
			return $fallback;
		}

		//* Drop the "[Unreleased]" section only if it is empty (nothing but whitespace before the next heading).
		$html = preg_replace(
			'#<div class="markdown-heading"[^>]*>\s*<h2[^>]*>\[Unreleased\]</h2>.*?</div>\s*(?=<div class="markdown-heading"[^>]*>\s*<h2|</article>)#s',
			'',
			$html,
			1
		);
		if ( null === $html ) {
			return $fallback;
		}

		return $html;
	}

	public function check_update( $update, $plugin_data, $plugin_file ) {
		if ( $plugin_file !== $this->plugin_file ) {
			return $update;
		}
		$release = $this->get_release();
		if ( ! $release ) {
			return $update;
		}
		return array(
			'slug'    => self::SLUG,
			'version' => $release['version'],
			'url'     => $release['url'],
			'package' => $release['package'],
		);
	}

	//* "View details" modal on the Plugins page.
	public function plugin_info( $result, $action, $args ) {
		if ( 'plugin_information' !== $action || empty( $args->slug ) || self::SLUG !== $args->slug ) {
			return $result;
		}
		$release = $this->get_release();
		if ( ! $release ) {
			return $result;
		}
		$plugin   = get_plugin_data( WP_PLUGIN_DIR . '/' . $this->plugin_file, false, false );
		$features = '<p><strong>Key features</strong></p><ul>'
			. '<li>Mega menu items with a configurable mobile breakpoint</li>'
			. '<li><code>mega-menu-link</code> block for custom navigation links inside mega menu items</li>'
			. '<li><code>--smm-below</code> CSS variable on the nav: <code>0px</code> above the mobile breakpoint, <code>1px</code> at or below it. '
			. 'Your own CSS (HTML block, Additional CSS, theme stylesheets) can follow the plugin breakpoint with '
			. '<code>@container style(--smm-below: 1px) { &#8230; }</code>, without duplicating the media query</li>'
			. '</ul>';
		return (object) array(
			'name'          => $plugin['Name'],
			'slug'          => self::SLUG,
			'external'      => true,
			'version'       => $release['version'],
			'author'        => $plugin['Author'],
			'homepage'      => 'https://github.com/' . self::REPO,
			'requires'      => $plugin['RequiresWP'],
			'requires_php'  => $plugin['RequiresPHP'],
			'last_updated'  => $release['date'],
			'download_link' => $release['package'],
			'sections'      => array(
				'description' => '<p>' . esc_html( $plugin['Description'] ) . '</p>' . $features,
				'changelog'   => $release['changelog']
					. '<p><a href="' . esc_url( 'https://github.com/' . self::REPO . '/blob/main/CHANGELOG.md' ) . '">Full changelog</a></p>',
			),
		);
	}
}
