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
	const CACHE_KEY = 'simple_mega_menu_latest_release';

	/** @var string Plugin basename, e.g. "simple-mega-menu/simple-mega-menu.php". */
	private $plugin_file;

	public function __construct( $plugin_file ) {
		$this->plugin_file = plugin_basename( $plugin_file );
		add_filter( 'update_plugins_github.com', array( $this, 'check_update' ), 10, 3 );
		add_filter( 'plugins_api', array( $this, 'plugin_info' ), 10, 3 );
	}

	//* Latest GitHub release with a plugin zip, cached 12 h (1 h after a failure).
	//* "Check again" on Dashboard → Updates (force-check) bypasses the cache.
	private function get_release() {
		$cached = get_site_transient( self::CACHE_KEY );
		if ( false !== $cached && empty( $_GET['force-check'] ) ) {
			return $cached ? $cached : null;
		}

		$response = wp_remote_get(
			'https://api.github.com/repos/' . self::REPO . '/releases/latest',
			array(
				'timeout' => 10,
				'headers' => array( 'Accept' => 'application/vnd.github.html+json' ),
			)
		);
		$data    = json_decode( wp_remote_retrieve_body( $response ), true );
		$release = null;

		if ( 200 === wp_remote_retrieve_response_code( $response ) && ! empty( $data['assets'] ) ) {
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

		set_site_transient( self::CACHE_KEY, $release ? $release : 0, $release ? 12 * HOUR_IN_SECONDS : HOUR_IN_SECONDS );
		return $release;
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
		$plugin = get_plugin_data( WP_PLUGIN_DIR . '/' . $this->plugin_file, false, false );
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
				'description' => esc_html( $plugin['Description'] ),
				'changelog'   => $release['changelog']
					. '<p><a href="' . esc_url( 'https://github.com/' . self::REPO . '/blob/main/CHANGELOG.md' ) . '">Full changelog</a></p>',
			),
		);
	}
}
