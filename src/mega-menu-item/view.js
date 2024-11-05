/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from simple-mega-menu-item block)' );
/* eslint-enable no-console */

document.addEventListener('DOMContentLoaded', function() {
    const megaMenus = document.querySelectorAll('.simple-mega-menu');

    megaMenus.forEach(menu => {
        const submenus = menu.querySelectorAll('.wp-block-navigation-submenu');

        submenus.forEach(submenu => {
            const toggle = submenu.querySelector('.wp-block-navigation-submenu__toggle');
            const content = submenu.querySelector('.wp-block-navigation-submenu__content');

            if (toggle && content) {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                });
            }
        });
    });
});
