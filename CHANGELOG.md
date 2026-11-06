# Changelog

All notable changes to this plugin are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 2026-11-06

### Changed
- "View details" shows the full changelog of the offered version, not only the latest release notes
- "View details" description highlights the main features

## [0.2.0] - 2026-11-06

### Added
- Updates from GitHub releases in the WordPress dashboard (Plugins page, "View details" with the changelog)
- Automated release process: `npm version` syncs the version in the plugin header and `block.json` files, a GitHub workflow publishes the plugin zip
- This changelog (moved from the readme)

### Changed
- Block versions (`block.json`) now follow the plugin version

## [0.1.7] - 2026-11-05

### Added
- `--smm-below` CSS variable on the nav: `0px` above the mobile breakpoint, `1px` at or below it. Your own CSS (HTML block, Additional CSS, theme stylesheets) can follow the plugin breakpoint with `@container style(--smm-below: 1px) { … }`, without duplicating the media query

### Changed
- Mobile breakpoint is pixels only (unit control); legacy values are normalized when read (`1046` → `1046px`, other units → `780px`)
- Default background of the mega menu item columns is opaque white

### Fixed
- Mega Menu Nav block can be inserted when editing a template part in focus mode (removed the `core/template-part` ancestor restriction); without a `<header>` ancestor, scripts fall back to the nav / viewport instead of failing

## [0.1.6] - 2025-11-29

### Added
- Conditional custom padding for `mega-menu-item` (`enableCustomPadding` attribute)

### Changed
- `mega-menu-link` styles use flexbox for better alignment; default padding and hover effects removed
- Removed `!important` from the `position: static` rule in `mega-menu-nav` styles

### Fixed
- Deprecated `useSetting` hook replaced by `useSettings`
- Deprecation warnings: opt-in for future default props on `TextControl`, `ToggleControl`, `RangeControl`, `BaseControl`, `BoxControl`, `SelectControl`, `FontSizePicker` and `ToggleGroupControl`

## [0.1.5] - 2025-10-12

### Changed
- Arrow icon color picker displays the theme preset color palette

## [0.1.4] - 2025-10-12

### Added
- `mega-menu-link` block for custom navigation links within mega menu items: compact inline editor UI, WordPress `LinkControl` for page/post selection, Inspector Controls for URL, text, target, rel and title
- Support for `core/paragraph` and `core/html` blocks within `mega-menu-nav`

## [0.1.3] - 2024-12-03

### Fixed
- Block not loading in the editor when the plugin is used with a theme that is not a child theme
- Deprecated use of `mb_convert_encoding()`

## [0.1.2] - 2024-11-25

### Added
- 100% width mega menu items relative to a parent element using the `relative` property

## [0.1.1] - 2024-11-14

### Added
- Right arrow icon for Mega Menu buttons
- Support for `core/shortcode`
- Option to auto-close other mega menu items when one is opened in the mobile menu
- Auto-close of the burger menu and mega menu items when switching from mobile to desktop
