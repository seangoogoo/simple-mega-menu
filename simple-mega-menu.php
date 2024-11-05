<?php
/**
 * Plugin Name:       Simple Mega Menu
 * Description:       A custom navigation block with mega menu functionality.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Jensen SIU
 * Author URI:        https://www.jensen.siu.net
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       simple-mega-menu
 *
 * @package           SimpleMegaMenu
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Render the mega menu navigation and its associated dynamic styles
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 */
function render_mega_menu_nav($attributes, $content) {

	// Get the breakpoint value or fallback to default
	$breakpoint = isset($attributes['megaMenuBreakpoint']) ? $attributes['megaMenuBreakpoint'] : '780px';
	// Generate a unique ID
	$unique_id = $attributes['uniqueId'];

	// Generate the dynamic CSS
	$safe_breakpoint = esc_attr($breakpoint);
	$safe_id = esc_attr($unique_id);

	$dynamic_css = sprintf(
		'<style>

			/* Desktop */
			@media (min-width: calc(%1$s + 1px)) {
				#%2$s .smm-burger__wrapper {
					display: none;
				}
				/* UL > LI */
				#%2$s .simple-mega-menu__list .simple-mega-menu-item {
					--mm-transition-duration: 250ms;
				}
				#%2$s .simple-mega-menu__list .simple-mega-menu-item .mega-menu-item__title {
					height: 100%%;
				}
				#%2$s .simple-mega-menu__list .simple-mega-menu-item .mega-menu-item__title + * {
					position: absolute;
					z-index: 10;
					display: none;
					opacity: 0;
					transition: display var(--mm-transition-duration) allow-discrete, opacity var(--mm-transition-duration) ease-in-out;
				}
				#%2$s .simple-mega-menu__list .simple-mega-menu-item:hover .mega-menu-item__title + * {
					display: block;
					opacity: 1;
				}
				#%2$s .simple-mega-menu__list .simple-mega-menu-item.has-viewport-width .mega-menu-item__title + * {
					width: 100vw;
					left: 0;
				}
				#%2$s .simple-mega-menu__list .simple-mega-menu-item.has-custom-width {
					position: relative;
					.mega-menu-item__title + * {
						width: var(--mega-menu-width);
						left: var(--mega-menu-left);
					}
				}
			}
			@starting-style {
				@media (min-width: calc(%1$s + 1px)) {
					#%2$s .simple-mega-menu__list .simple-mega-menu-item:hover .mega-menu-item__title + * {
						opacity: 0;
					}
				}
			}

			/* Mobile */
			@media (max-width: %1$s) {
				#%2$s .smm-burger__wrapper {
					display: flex;
				}
				#%2$s .simple-mega-menu__list {
					position: absolute;
					inset: 0;
					background-color: white;
				}
				#%2$s .simple-mega-menu__list li {
					width: 100%%;
				}
				#%2$s .simple-mega-menu__list li .mega-menu-item__title {
					height: auto;
				}
			}
		</style>'."\n",
		$safe_breakpoint,
		$safe_id
	);
	return $dynamic_css . $content;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function simple_mega_menu_block_init() {
	register_block_type( __DIR__ . '/build/mega-menu-nav' );
	register_block_type( __DIR__ . '/build/mega-menu-item' );
}
add_action( 'init', 'simple_mega_menu_block_init' );
