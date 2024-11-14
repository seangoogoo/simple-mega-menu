=== Simple Mega Menu ===
Contributors:      Jensen SIU
Tags:              block
Tested up to:      6.6
Stable tag:        0.1.1
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Custom navigation block with mega menu functionality.


== Description ==

This plugin provides a custom navigation block with mega menu functionality.
It is in an experimental state and has been tested with twenty-twenty-four and twenty-twenty-five themes.


== Features ==

Provides a custom breakpoint to display mobile or desktop view.
Custom desktop and mobile CSS files can be attached to this breakpoint to be loaded as inline styles.

Any blocks can be added to mega menu items: groups, columns, images, buttons, etc.

First level navigation supports the custom Mega Menu block, plus:
- 'simple-mega-menu/mega-menu-item',
- 'core/navigation-link',
- 'core/buttons',
- 'core/search',
- 'core/social-links',
- 'core/home-link',
- 'core/site-title',
- 'core/site-logo',
- 'core/shortcode'

Doesn't use jQuery and provides a minimal usage of Javascript to custom CSS variables such as mega menu items height, scrollbar width, header height, etc.

Provides minimalistic styles and scripts. Styles and scripts should be added by the user.

Simple Mega Menu Nav block cannot be added outside the header area.


== Changelog ==

= 0.1.1 =
* Release
  - Right arrow icon for Mega Menu buttons arrow
  - Added support for 'core/shortcode'
  - Provide option to auto-close other mega menu items when one is open on mobile menu
  - Auto-close opened burger menu and mega menu items when changing from mobile to desktop

= To Do =

- Add a list view in the mega menu nav block,
- Check compatibility with several Full Site Editing themes,
- Manage internationalization (actually, hard-coded in French),
- Add ARIA attributes on important elements,
- create a custom icon for the nav block.