/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./src/mega-menu-nav/view.js ***!
  \***********************************/
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

document.addEventListener('DOMContentLoaded', () => {
  //* Get the width of the scrollbar
  const getScrollbarWidth = () => {
    // *Check if the document has a vertical scrollbar
    const hasVerticalScrollbar = document.documentElement.scrollHeight > window.innerHeight;
    if (!hasVerticalScrollbar) return 0;

    //* Create a temporary div container and append it into the body
    const container = document.createElement('div');
    //* Force scrollbar
    container.style.overflow = 'scroll';
    container.style.width = '50px';
    container.style.height = '50px';
    container.style.visibility = 'hidden';
    document.body.appendChild(container);

    //* Calculate the width of the scrollbar
    const scrollbarWidth = container.offsetWidth - container.clientWidth;

    //* Remove the temporary div container from the body
    document.body.removeChild(container);

    //* Return the scrollbar width
    return scrollbarWidth;
  };
  const setScrollbarWidth = () => {
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  };
  setScrollbarWidth();
  const smmNavs = document.querySelectorAll('nav.simple-mega-menu');
  if (smmNavs.length > 0) {
    smmNavs.forEach(smmNav => {
      //* Get the header element
      const header = smmNav.closest('header') || smmNav.querySelector('.site-header') || smmNav.querySelector('#masthead');

      //* Get the breakpoint value
      const smmNavStyle = getComputedStyle(smmNav);
      const smmBreakpoint = smmNavStyle.getPropertyValue('--mega-menu-breakpoint').trim();
      const megaMenuInputs = smmNav.querySelectorAll('input[id^="mega-menu-"]');
      const burgerInput = smmNav.querySelector('input[id^="burger-input-smm-"]');
      let isMobileView = undefined;

      //* Add a resize observer to the header element
      const navResizeObserver = new ResizeObserver(entries => {
        document.documentElement.style.setProperty('--smm-nav-height', Math.round(entries[0].contentRect.height) + 'px');
        isCurrentlyMobileView = entries[0].contentRect.width <= parseInt(smmBreakpoint);

        //* Auto-close opened burger menu and mega menu items when changing from mobile to desktop
        if (isMobileView !== isCurrentlyMobileView) {
          megaMenuInputs.forEach(input => input.checked = false);
          burgerInput.checked = false;
          isMobileView = isCurrentlyMobileView;
        }
      });
      navResizeObserver.observe(header);
      const setMMheight = mmItem => {
        const height = mmItem.firstElementChild.scrollHeight;
        if (height > 0) mmItem.style.setProperty('--mega-menu-height', `${height}px`);
      };
      const smmLiItems = smmNav.querySelectorAll('.smm-item');
      smmLiItems.forEach(liItem => {
        const megaMenuItem = liItem.querySelector('div.wp-block-simple-mega-menu-mega-menu-item');
        if (megaMenuItem) {
          const menuItemResizeObserver = new ResizeObserver(entries => setMMheight(entries[0].target));
          menuItemResizeObserver.observe(megaMenuItem);
          setMMheight(megaMenuItem);
        }
      });

      //* Autoclose mega menu items
      if (smmNav.dataset.autoclose === 'true') {
        megaMenuInputs.forEach(input => {
          input.addEventListener('change', () => {
            if (input.checked && isMobileView) {
              megaMenuInputs.forEach(otherInput => {
                if (otherInput !== input) {
                  otherInput.checked = false;
                }
              });
            }
          });
        });
      }
    });
  }
});
/******/ })()
;
//# sourceMappingURL=view.js.map