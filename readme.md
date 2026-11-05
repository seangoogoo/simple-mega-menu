# Simple Mega Menu

A custom navigation block with mega menu functionality.


## Description

This plugin provides a custom navigation block with mega menu functionality.
It is in an experimental state and has been tested with twenty-twenty-four and twenty-twenty-five themes.


## Features

Provides a custom breakpoint to display mobile or desktop view.
Custom desktop and mobile CSS files can be attached to this breakpoint to be loaded as inline styles.

Any blocks can be added to mega menu items: groups, columns, images, buttons, etc.

First level navigation supports the custom Mega Menu block, plus:

- 'simple-mega-menu/mega-menu-item',
- 'simple-mega-menu/mega-menu-link',
- 'core/navigation-link',
- 'core/buttons',
- 'core/search',
- 'core/social-links',
- 'core/home-link',
- 'core/site-title',
- 'core/site-logo',
- 'core/paragraph',
- 'core/html',
- 'core/shortcode'

Doesn't use jQuery and provides a minimal usage of Javascript to custom CSS variables such as mega menu items height, scrollbar width, header height, etc.

Provides minimalistic styles and scripts. Styles and scripts should be added by the user.

Simple Mega Menu Nav block is best placed inside a `<header>` element (e.g. the Header template part): the mobile menu positioning relies on it. Outside a `<header>`, the block still works and measures the nav itself instead.

### `--smm-below` CSS variable

Media queries cannot use `var()`, so blocks placed inside the menu cannot reuse the `--mega-menu-breakpoint` value in their own CSS. The nav exposes `--smm-below` instead, inherited by all its descendants:

- `0px` above the breakpoint (desktop view), `1px` at or below it (mobile view);
- set by the same `@media (max-width: <breakpoint>)` as the mobile menu on the front end, and by the `.is-mobile` class in the editor;
- registered with `@property` (`<length>`), so it can be tested with a container style query.

Usage in a block placed in the menu (e.g. in a per-block custom CSS field that wraps rules in the block selector):

```css
@container style(--smm-below: 0px) {
  &:hover {
    background-color: white;
  }
}
```

Caveats:

- `style()` reads the value on the parent, never on the element itself: do not set `--smm-below` on the element you style.
- Inside a nested rule, use `&` (or `&:hover`); a nested `.class` selector would target a descendant.
- Outside the nav, the variable is always `0px`.
- Browsers without `@container style()` support for custom properties ignore the whole `@container` block. To keep a sensible default there, write the normal rule and cancel it in `@container style(--smm-below: 1px) { … }`.


## Installation

### 1. Navigate to your WordPress plugins directory

Open your terminal and navigate to the plugins folder of your local WordPress installation. Replace `/path/to/wordpress` with the actual path to your WordPress installation.

`cd /path/to/wordpress/wp-content/plugins`


### 2. Clone the GitHub repository

Use the `git clone` command to clone the **simple-mega-menu** repository into the plugins folder.

`git clone https://github.com/seangoogoo/simple-mega-menu.git`

This will create a new folder named **simple-mega-menu** in the plugins directory.


### 3. Navigate to the plugin folder

Change into the newly created plugin directory:

`cd simple-mega-menu`


### 4. Install dependencies

Install dependencies using npm or yarn.
Make sure Node.js and npm are installed on your machine.

You can check by running:
`node -v`
`npm -v`

If they are installed, install the dependencies:

`npm install`


### 5. Modify the plugin (optional)

I you want to modify or improve functionalities or design, run:

`npm start`

And modify the source code in your favorite editor.


### 6. Activate the plugin

Go to your WordPress admin panel (https://www.your-site.com/wp-admin or your local site’s URL). Navigate to Plugins, locate the **Simple Mega Menu** plugin, and click Activate.


## Changelog

### Release 0.1.7
  - Removed the `core/template-part` ancestor restriction on the Mega Menu Nav block (it can now be inserted when editing a template part in focus mode); without a `<header>` ancestor, the scripts fall back to the nav / viewport instead of failing
  - Default background of the mega menu item columns is now opaque white
  - Added the `--smm-below` CSS variable (see Features)

### Release 0.1.6
  - Fix deprecated `useSetting` hook in favor of `useSettings`
  - Opt-in for future default props on `TextControl`, `ToggleControl`, `RangeControl`, `BaseControl`, `BoxControl`, `SelectControl`, `FontSizePicker`, and `ToggleGroupControl` to resolve deprecation warnings
  - Implemented conditional custom padding for `mega-menu-item` with new `enableCustomPadding` attribute
  - Updated `mega-menu-link` styles to use flexbox for better alignment and removed default padding/hover effects
  - Removed `!important` from `position: static` rule in `mega-menu-nav` styles for better compatibility

### Release 0.1.5
  - Enhanced arrow icon color picker to display theme preset color palette for consistent theme integration

### Release 0.1.4
  - Added new mega-menu-link block for creating custom navigation links within mega menu items
  - Implemented compact, inline editor UI for mega-menu-link with minimal visual footprint
  - Integrated WordPress LinkControl component for easy page/post selection and URL management
  - Added comprehensive Inspector Controls for link settings (URL, text, target, rel, title attributes)
  - Optimized editor experience with streamlined interface (removed redundant URL preview, compact icon button)
  - Support for 'core/paragraph' and 'core/html' blocks within mega-menu-nav

### Release 0.1.3
  - Fix block not loading in the editor while plugin loaded in a theme that is not a child theme
  - Fix deprecated use of mb_convert_encoding() function

### Release 0.1.2
  - Added support for 100% width mega menu items relative to a parent element using the 'relative' property

### Release 0.1.1
  - Right arrow icon for Mega Menu buttons arrow
  - Added support for 'core/shortcode'
  - Provide option to auto-close other mega menu items when one is open on mobile menu
  - Auto-close opened burger menu and mega menu items when changing from mobile to desktop

## To Do


- Add a list view in the mega menu nav block,
- Add color customization for the mega menu item arrow,
- Check compatibility with several Full Site Editing themes,
- Manage internationalization (actually, hard-coded in French),
- Add ARIA attributes on important elements,
- Create a custom icon for the nav block.