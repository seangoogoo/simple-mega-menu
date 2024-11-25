import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor'

export default function save({ attributes }) {
  const { menuName, megaMenuWidth, megaMenuLeft, titlePadding } = attributes
  const blockProps = useBlockProps.save({
    /**
     * className: Generated classnames for the save function.
     * 'has-viewport-width' if megaMenuWidth is set to '100vw'.
     * 'has-100percent-width' if megaMenuWidth is set to '100%'.
     * 'has-custom-width' if megaMenuWidth is set to a custom value
     * with a 'px' unit (e.g. '300px').
     * Otherwise, an empty string.
     */
    className: `smm-item ${
        megaMenuWidth === '100vw'
            ? 'has-viewport-width'
            : megaMenuWidth === '100%'
                ? 'has-100percent-width'
                : megaMenuWidth?.includes('px')
                    ? 'has-custom-width'
                    : ''
    }`,
    style: {
        '--mega-menu-width': megaMenuWidth || '100vw',
        '--mega-menu-left': megaMenuLeft || '0px'
    }
  })
  const titleStyle = {
    padding: titlePadding ?
      `${titlePadding.top || '0'} ${titlePadding.right || '0'} ${titlePadding.bottom || '0'} ${titlePadding.left || '0'}` :
      undefined
  }

  return (
    <div {...useBlockProps.save()}>
        <InnerBlocks.Content />
    </div>
  )
}
