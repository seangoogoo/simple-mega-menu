<?php
/**
 * Plugin Name:       Simple Mega Menu
 * Description:       A custom navigation block with mega menu functionality.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.2
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
function render_mega_menu_style($attributes) {

	//* Get the breakpoint value or fallback to default
	$breakpoint = isset($attributes['megaMenuBreakpoint']) ? $attributes['megaMenuBreakpoint'] : '780px';

	//* Generate the dynamic CSS
	$safe_breakpoint = esc_attr($breakpoint);
	$safe_id = esc_attr($attributes['uniqueId']);

    // Get custom CSS content if paths are provided
    $desktop_css = '';
    $mobile_css = '';
    if (!empty($attributes['desktopCssPath'])) {
		$desktop_file = get_stylesheet_directory() . '/' . $attributes['desktopCssPath'];
        if (file_exists($desktop_file)) {
            $desktop_css = file_get_contents($desktop_file);
        }
    }

    if (!empty($attributes['mobileCssPath'])) {
        $mobile_file = get_stylesheet_directory() . '/' . $attributes['mobileCssPath'];
        if (file_exists($mobile_file)) {
            $mobile_css = file_get_contents($mobile_file);
        }
    }

	$dynamic_css = sprintf(
		'<style>

			/* Desktop */
			@media (min-width: calc(%1$s + 1px)) {
				/* SMM Item wrapper in case of has-100percent-width */
				.smm-item-wrapper-relative {
					position: relative;
				}
				#%2$s .smm-burger__wrapper {
					display: none;
				}
				/* UL > LI */
				#%2$s .simple-mega-menu__list > li[class^="smm-"]:not(.smm-item) {
					display: flex;
					align-items: center;
				}
				#%2$s .simple-mega-menu__list .smm-item .mega-menu-item__title {
					height: 100%%;
					justify-content: center;
				}
				#%2$s .simple-mega-menu__list .smm-item:hover .mega-menu-item__title:after {
				transform: rotate(-135deg) translate(calc(var(--arrow-size) / -4), calc(var(--arrow-size) / -4));
				}
				#%2$s .simple-mega-menu__list .smm-item .mega-menu-item__title + * {
					position: absolute;
					z-index: 10;
					display: none;
				}
				#%2$s .simple-mega-menu__list .smm-item:hover .mega-menu-item__title + * {
					display: block;
				}
				#%2$s .simple-mega-menu__list .smm-item.has-viewport-width .mega-menu-item__title + * {
					width: calc(100vw - var(--scrollbar-width, 0px));
					left: 0;
				}
				#%2$s .simple-mega-menu__list .smm-item.has-100percent-width .mega-menu-item__title + * {
					width: var(--mega-menu-width, 100%%);
					left: 0;
				}
				#%2$s .simple-mega-menu__list .smm-item.has-custom-width {
					position: relative;
					.mega-menu-item__title + * {
						width: var(--mega-menu-width);
						left: var(--mega-menu-left);
					}
				}

				/* Custom desktop styles */
                %3$s
			}

			/* Mobile */
			@media (max-width: %1$s) {
				#%2$s .smm-burger__wrapper {
					display: flex;
				}
				#%2$s .simple-mega-menu__list {
					position: absolute;
					inset: 0;
					background-color: #ffffffe0;
					height: 100dvh;
					margin: 0;
					padding-block: var(--smm-nav-height, 4rem) 1rem;
					padding-inline: var(--wp--style--root--padding-right, 1rem) var(--wp--style--root--padding-left, 1rem);
					flex-direction: column;
					align-items: center;
					overflow-y: auto;
				}
				#%2$s .simple-mega-menu__list li .mega-menu-item__title {
					height: auto;
				}
				#%2$s .simple-mega-menu__list .smm-item .mega-menu-item__title:has(input[type="checkbox"]:not(:checked)) + * {
					display: none;
				}
				#%2$s .simple-mega-menu__list .smm-item .mega-menu-item__title:has(input[type="checkbox"]:checked):after {
					transform: rotate(-135deg) translate(calc(var(--arrow-size) / -4), calc(var(--arrow-size) / -4));
				}
				#%2$s .simple-mega-menu__list .smm-item .mega-menu-item__title:has(input[type="checkbox"]:checked) + * {
					display: block;
				}
				body:has(#%2$s .smm-burger__wrapper input[type="checkbox"]:checked) {
					overflow: hidden;
				}
				#%2$s:has(.smm-burger__wrapper input[type="checkbox"]:not(:checked)) .simple-mega-menu__list {
					display: none;
				}
				#%2$s:has(.smm-burger__wrapper input[type="checkbox"]:checked) .simple-mega-menu__list {
					display: block;
				}

				/* Custom mobile styles */
                %4$s
			}
		</style>'."\n",
		$safe_breakpoint,
		$safe_id,
        wp_strip_all_tags($desktop_css),
        wp_strip_all_tags($mobile_css)
	);
	return $dynamic_css;
}

function render_mega_menu_nav($attributes, $content) {
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);

    $wrapped_content = '<div>' . $content . '</div>';
    $dom->loadHTML(mb_convert_encoding($wrapped_content, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();

    $xpath = new DOMXPath($dom);

    // First, find the main UL element
    $mainUl = $xpath->query("//ul[@class='simple-mega-menu__list']")->item(0);

    // Special handling for navigation links first
    $navLinks = $xpath->query("//li[contains(@class, 'wp-block-navigation-link')]");
    if ($navLinks) {
        foreach ($navLinks as $navLink) {
            if ($navLink instanceof DOMElement) {
                $existingClasses = $navLink->getAttribute('class');
                $navLink->setAttribute('class', 'smm-navigation-link-wrapper ' . $existingClasses);
            }
        }
    }

    // Find all direct children of the main UL that aren't li.smm-item elements
    $nonPluginItems = $xpath->query("//ul[@class='simple-mega-menu__list']/node()[not(self::li[contains(@class, 'smm-item')]) and not(self::text()[normalize-space()=''])]");

    if ($nonPluginItems->length > 0) {
        foreach ($nonPluginItems as $node) {
            // Skip if it's just whitespace
            if ($node->nodeType === XML_TEXT_NODE && trim($node->nodeValue) === '') {
                continue;
            }

            // Skip if it's already a properly wrapped navigation link
            if ($node instanceof DOMElement && $node->tagName === 'li' && strpos($node->getAttribute('class'), 'smm-navigation-link-wrapper') !== false) {
                continue;
            }

            // Create new wrapper li
            $wrapper = $dom->createElement('li');
            $wrapper->setAttribute('class', 'smm-core-item-wrapper');

            // Replace the original node with our wrapper
            $node->parentNode->replaceChild($wrapper, $node);

            // Add the original node to our wrapper
            $wrapper->appendChild($node);
        }
    }

    // Get the modified content
    $inner_content = '';
    $nav = $xpath->query("//nav")->item(0);
    if ($nav) {
        $inner_content = $dom->saveHTML($nav);
    }

    return $inner_content;
}
// function render_mega_menu_nav($attributes, $content) {
//     $dom = new DOMDocument();
//     libxml_use_internal_errors(true);

//     $wrapped_content = '<div>' . $content . '</div>';
//     $dom->loadHTML(mb_convert_encoding($wrapped_content, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
//     libxml_clear_errors();

//     $xpath = new DOMXPath($dom);

//     //* First, find the main UL element
//     $mainUl = $xpath->query("//ul[@class='simple-mega-menu__list']")->item(0);

//     //* Special handling for navigation links first
//     $navLinks = $xpath->query("//li[contains(@class, 'wp-block-navigation-link')]");
//     if ($navLinks) {
//         foreach ($navLinks as $navLink) {
//             if ($navLink instanceof DOMElement) {
//                 $navLink->setAttribute('class', 'smm-navigation-link-wrapper');
//             }
//         }
//     }

//     //* Map of block types to their possible HTML elements (excluding navigation links)
//     $block_mappings = [
//         'wp-block-buttons' => ['div'],
//         'wp-block-search' => ['form'],
//         'wp-block-social-links' => ['ul'],
//         'wp-block-home-link' => ['a'],
//         'wp-block-site-title' => ['h1'],
//         'wp-block-site-logo' => ['div']
//     ];

//     //* Process each block type
//     foreach ($block_mappings as $block_class => $elements) {
//         foreach ($elements as $element) {
//             //* Build XPath query for this specific block type
//             $query = "//{$element}[contains(@class, '{$block_class}') and not(ancestor::li[contains(@class, 'smm-')])]";
//             $blocks = $xpath->query($query);

//             if ($blocks) {
//                 foreach ($blocks as $block) {
//                     //* Create new li element
//                     $li = $dom->createElement('li');
//                     $li->setAttribute('class', 'smm-' . str_replace('wp-block-', '', $block_class) . '-wrapper');

//                     //* Wrap block in li and append to main UL
//                     $block->parentNode->replaceChild($li, $block);
//                     $li->appendChild($block);

//                     //* If the block is not already in the main UL, move it there
//                     if ($li->parentNode !== $mainUl) {
//                         $mainUl->appendChild($li);
//                     }
//                 }
//             }
//         }
//     }

//     //* Get the modified content
//     $inner_content = '';
//     $nav = $xpath->query("//nav")->item(0);
//     if ($nav) {
//         $inner_content = $dom->saveHTML($nav);
//     }

//     return $inner_content;
// }


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
