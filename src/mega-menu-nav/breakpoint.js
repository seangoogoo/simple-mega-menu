//* Mobile breakpoint: pixels only, so the CSS media query and the JS width checks agree.
//* Mirrors simple_mega_menu_sanitize_breakpoint() in simple-mega-menu.php.
export const DEFAULT_BREAKPOINT = '780px'

//* "1046" or "1046px" → "1046px"; anything else (em, rem, empty…) → default
export const normalizeBreakpoint = (value) => {
    const match = String(value ?? '').trim().match(/^(\d+(?:\.\d+)?)(px)?$/i)
    return match ? `${match[1]}px` : DEFAULT_BREAKPOINT
}
