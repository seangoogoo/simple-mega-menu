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

I you want to modify or improve functionnalities or design, run:

`npm start`

And modify the source code in your favorite editor.


### 6. Activate the plugin

Go to your WordPress admin panel (https://www.your-site.com/wp-admin or your local site’s URL). Navigate to Plugins, locate the **Simple Mega Menu** plugin, and click Activate.


## Changelog

### Release 0.1.2
  - Added support for 100% width mega menu items relative to a parent element using the 'relative' property

### Release 0.1.1
  - Right arrow icon for Mega Menu buttons arrow
  - Added support for 'core/shortcode'
  - Provide option to auto-close other mega menu items when one is open on mobile menu
  - Auto-close opened burger menu and mega menu items when changing from mobile to desktop

## To Do

- Add a list view in the mega menu nav block,
- Check compatibility with several Full Site Editing themes,
- Manage internationalization (actually, hard-coded in French),
- Add ARIA attributes on important elements,
- Create a custom icon for the nav block.