# Simple Mega Menu

A custom navigation block with mega menu functionality.


## Description

This plugin provides a custom navigation block with mega menu functionality.
It is in an experimental state and has been tested with Twenty Twenty-Four and Twenty Twenty-Five themes.


## Requirements

- WordPress 6.6 or later.
- PHP 7.2 or later.
- Modern browsers only: the front end relies on `:has()`, `@property`, `100dvh` and `@container style()`. No IE or legacy browser support.


## Features

Provides a custom mobile breakpoint (pixels only, default `780px`) to switch between mobile and desktop view. Any other unit (em, rem…) is ignored and falls back to `780px`.

Custom desktop and mobile CSS files can be attached to this breakpoint and are inlined as styles inside the corresponding media query. Paths are relative to the active theme directory (child theme first, then parent theme), e.g. `assets/css/mega-menu-desktop.css`.

Any blocks can be added inside a Mega Menu Item: groups, columns, images, buttons, etc.

First-level items in the Mega Menu nav block can be:

- `simple-mega-menu/mega-menu-item` — a dropdown/mega panel holding any inner blocks,
- `simple-mega-menu/mega-menu-link` — a simple link (URL, label, open in new tab, `rel`, `title`), with color, typography and spacing supports,
- `core/navigation-link`,
- `core/buttons`,
- `core/search`,
- `core/social-links`,
- `core/home-link`,
- `core/site-title`,
- `core/site-logo`,
- `core/paragraph`,
- `core/html`,
- `core/shortcode`

Doesn't use jQuery and uses minimal JavaScript to set custom CSS variables such as `--mega-menu-height`, `--scrollbar-width` and `--smm-nav-height` (see [CSS variables](#css-variables) below).

Provides minimalistic styles and scripts. Styles and scripts should be added by the user.

Simple Mega Menu Nav block is best placed inside a `<header>` element (e.g. the Header template part): the mobile menu positioning relies on it. Outside a `<header>`, the block still works, but falls back to the nav itself for the height measurement and to the viewport width for the breakpoint check.

### Block settings

**Mega Menu nav**

- Mobile breakpoint (px).
- Custom desktop/mobile CSS file paths.
- Arrow icon size, thickness and color (defaults to the theme's text color when left empty).
- Auto-close other open items when opening one in mobile view.
- Burger menu padding.
- Spacing between first-level items.
- `wide`/`full` alignment.

**Mega Menu Item**

- Width mode: `100vw` (full viewport width, default), `100%` (relative to the item's positioned ancestor — add the `smm-item-wrapper-relative` CSS class to that ancestor), or a custom pixel width with an X-axis offset.
- Optional custom title padding.
- Title font size (preset sizes).
- Background/text color (core color support).

**Mega Menu Link**

- URL, label, "open in new tab", `rel` and `title`, set through the native Link Control.
- Color (background/text), typography (font size, line height) and spacing (padding, margin) supports.


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

### CSS variables

For users who want to style the menu themselves, the nav and its items set the following CSS custom properties:

| Variable | Set by | Description |
|---|---|---|
| `--mega-menu-breakpoint` | Mega Menu nav block | Normalized mobile breakpoint, in pixels. |
| `--mega-menu-gap` | Mega Menu nav block | Spacing between first-level items. |
| `--burger-padding` | Mega Menu nav block | Padding of the mobile burger button. |
| `--arrow-size` | Mega Menu nav block | Size of the item dropdown arrow. |
| `--arrow-thickness` | Mega Menu nav block | Thickness of the item dropdown arrow. |
| `--smm-arrow-color` | Mega Menu nav block | Color of the item dropdown arrow. |
| `--smm-below` | front end / editor | `0px` desktop, `1px` mobile — see above. |
| `--mega-menu-width`, `--mega-menu-left` | Mega Menu Item block | Width and X offset of the dropdown panel. |
| `--mega-menu-height` | `view.js` | Measured height of the open panel's content. |
| `--scrollbar-width` | `view.js` | Width of the page's vertical scrollbar. |
| `--smm-nav-height` | `view.js` | Measured height of the `<header>` (or the nav itself). |


## Usage

1. Add the **Mega Menu nav** block, ideally inside a `<header>` element such as the Header template part.
2. Add **Mega Menu Item** blocks (dropdown panels) and/or **Mega Menu Link** blocks (simple links) as its first-level children — see [allowed first-level items](#features) above.
3. Inside a Mega Menu Item, add any blocks for the dropdown content (groups, columns, images, buttons, lists…).
4. Choose a width mode for each Mega Menu Item in its block settings: `100vw`, `100%` (add the `smm-item-wrapper-relative` class to the item's positioned ancestor), or a custom pixel width.
5. Optionally attach desktop/mobile CSS files from the Mega Menu nav block settings.


## Installation

### For site users

1. Download `simple-mega-menu.zip` from the [GitHub Releases page](https://github.com/seangoogoo/simple-mega-menu/releases).
2. In your WordPress admin, go to Plugins → Add New Plugin → Upload Plugin, select the zip file, then click Install Now.
3. Activate **Simple Mega Menu**.

Once installed this way, updates appear on the Plugins page like any other plugin (Dashboard → Updates → Check again to check immediately). "View details" on the Plugins page shows the full changelog; release information is cached for 12 hours server-side unless "Check again" is used.

### For development

Installing the plugin from a `git clone` disables the update checker (a `.git` folder in the plugin directory means dashboard updates never overwrite a development clone), so use this method only to work on the code, not on a production site.

1. Navigate to your WordPress plugins directory:

   `cd /path/to/wordpress/wp-content/plugins`

2. Clone the GitHub repository:

   `git clone https://github.com/seangoogoo/simple-mega-menu.git`

3. Change into the newly created plugin directory:

   `cd simple-mega-menu`

4. Install dependencies using npm (the project is locked to npm via `package-lock.json`). Make sure Node.js and npm are installed on your machine (`node -v`, `npm -v`), then run:

   `npm install`

5. If you want to modify functionalities or design, run:

   `npm start`

   This starts a development build in watch mode. Before committing, always run a production build, since the `build/` directory is committed to the repository:

   `npm run build`

   Other available scripts: `npm run lint:js`, `npm run lint:css`, `npm run format`, `npm run plugin-zip`.

6. Activate the plugin from your WordPress admin panel (Plugins → Simple Mega Menu → Activate).


## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Releasing

1. While working, add entries under `## [Unreleased]` in `CHANGELOG.md` (Added / Changed / Fixed / Removed) and commit them with the code.
2. On a clean `main`, run `npm version patch` (fixes) or `npm version minor` (features):
   - `preversion` refuses to release when `[Unreleased]` has no entry;
   - `version` copies the version to the plugin header and every `block.json`, dates the changelog section, rebuilds, and adds the files to the release commit;
   - `postversion` pushes the commit and the `vX.Y.Z` tag.
3. The GitHub workflow `.github/workflows/release.yml` builds `simple-mega-menu.zip` and publishes the GitHub release, with the changelog section as release notes.

If the push fails, run `git push --follow-tags` manually. If the version step fails, run `git checkout -- .` before retrying.

Sites running the plugin see the update in the Plugins page (Dashboard → Updates → Check again shows it immediately). Update checks are disabled in git working copies (a `.git` folder in the plugin directory), so a dashboard update never overwrites a development clone.


## Known limitations

- Some editor UI strings are hard-coded in French, and several blocks use inconsistent text domains (`mega-menu-nav`, `mega-menu-item`) instead of the declared `simple-mega-menu`.
- No ARIA attributes on the burger button or the mega menu item toggles.
- Relies on modern CSS (`:has()`, `@container style()`): no fallback for older browsers.


## To Do

- Add a list view in the mega menu nav block,
- Check compatibility with several Full Site Editing themes,
- Manage internationalization (currently hard-coded in French; unify the text domain to `simple-mega-menu`),
- Add ARIA attributes on important elements,
- Create a custom icon for the nav block.


## License

[GPL-2.0-or-later](https://www.gnu.org/licenses/gpl-2.0.html).

Author: Jensen SIU.
