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

See [CHANGELOG.md](CHANGELOG.md).

## Releasing

1. While working, add entries under `## [Unreleased]` in `CHANGELOG.md` (Added / Changed / Fixed / Removed) and commit them with the code.
2. On a clean `main`, run `npm version patch` (fixes) or `npm version minor` (features):
   - `preversion` refuses to release when `[Unreleased]` has no entry;
   - `version` copies the version to the plugin header and every `block.json`, dates the changelog section, rebuilds, and adds the files to the release commit;
   - `postversion` pushes the commit and the `vX.Y.Z` tag.
3. The GitHub workflow `.github/workflows/release.yml` builds `simple-mega-menu.zip` and publishes the GitHub release, with the changelog section as release notes.

Sites running the plugin see the update in the Plugins page (Dashboard → Updates → Check again shows it immediately). Update checks are disabled in git working copies (a `.git` folder in the plugin directory), so a dashboard update never overwrites a development clone.


## To Do


- Add a list view in the mega menu nav block,
- Add color customization for the mega menu item arrow,
- Check compatibility with several Full Site Editing themes,
- Manage internationalization (actually, hard-coded in French),
- Add ARIA attributes on important elements,
- Create a custom icon for the nav block.