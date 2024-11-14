import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

export default function save({ attributes }) {
    const { uniqueId, blockSpacing, megaMenuBreakpoint, burgerPadding, autoclose } = attributes
    const blockProps = useBlockProps.save({
        id: uniqueId,
        className: 'simple-mega-menu',
        'data-autoclose': autoclose,
        style: {
            '--mega-menu-gap': blockSpacing || '0',
            '--mega-menu-breakpoint': megaMenuBreakpoint || '780px',
            '--burger-padding': burgerPadding ?
                `${burgerPadding.top} ${burgerPadding.right} ${burgerPadding.bottom} ${burgerPadding.left}` :
                '0',
            '--arrow-size': attributes.arrowSize || '4px',
            '--arrow-thickness': attributes.arrowThickness || '1.5px'
        }
    })

    return (
        <nav {...blockProps}>
            <ul className="simple-mega-menu__list" style={{ gap: blockSpacing || '0' }}>
                <InnerBlocks.Content />
            </ul>
            <div className="smm-burger__wrapper">
                <label className="burger-icon" htmlFor={`burger-input-${uniqueId}`}>
                    <input type="checkbox" id={`burger-input-${uniqueId}`} />
                </label>
            </div>
        </nav>
    )
}
