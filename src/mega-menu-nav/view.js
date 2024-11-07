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
	const getScrollbarWidth= () => {
		// *Check if the document has a vertical scrollbar
		const hasVerticalScrollbar = document.documentElement.scrollHeight > window.innerHeight

		if (!hasVerticalScrollbar) return 0

		//* Create a temporary div container and append it into the body
		const container = document.createElement('div')
		//* Force scrollbar
		container.style.overflow = 'scroll'
		container.style.width = '50px'
		container.style.height = '50px'
		container.style.visibility = 'hidden'
		document.body.appendChild(container)

		//* Calculate the width of the scrollbar
		const scrollbarWidth = container.offsetWidth - container.clientWidth

		//* Remove the temporary div container from the body
		document.body.removeChild(container)

		//* Return the scrollbar width
		return scrollbarWidth
	}

	const setScrollbarWidth= () => {
		document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`)
	}
	setScrollbarWidth()


    const smmNavs = document.querySelectorAll('nav.simple-mega-menu')
    if(smmNavs.length > 0) {
        smmNavs.forEach(smmNav => {

            //* Get the header element
            const header = smmNav.closest('header') || smmNav.querySelector('.site-header') || smmNav.querySelector('#masthead')

            //* Get the breakpoint value
            const smmNavStyle = getComputedStyle(smmNav)
            const smmBreakpoint = smmNavStyle.getPropertyValue('--mega-menu-breakpoint').trim()
            let isMobileView = false

            console.log("🚀 ~ breakpointValue:", parseInt(smmBreakpoint), smmBreakpoint)


            //* Add a resize observer to the header element
            const navResizeObserver = new ResizeObserver(entries => {

                document.documentElement.style.setProperty('--smm-nav-height', Math.round(entries[0].contentRect.height) + 'px')

                console.log("🚀 ~ header:", document.documentElement, entries[0].contentRect, entries[0].contentRect.height)

                isMobileView = entries[0].contentRect.width <= parseInt(smmBreakpoint)
                console.log("🚀 ~ isMobileView:", isMobileView)
            })

            navResizeObserver.observe(header)
        })
    }


//     const megaMenus = document.querySelectorAll('.simple-mega-menu');

//     megaMenus.forEach(menu => {
//         const submenus = menu.querySelectorAll('.wp-block-navigation-submenu');

//         submenus.forEach(submenu => {
//             const toggle = submenu.querySelector('.wp-block-navigation-submenu__toggle');
//             const content = submenu.querySelector('.wp-block-navigation-submenu__content');

//             if (toggle && content) {
//                 toggle.addEventListener('click', function(e) {
//                     e.preventDefault();
//                     content.style.display = content.style.display === 'block' ? 'none' : 'block';
//                 });
//             }
//         });
//     });
})
