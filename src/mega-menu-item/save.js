import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor'

export default function save({ attributes }) {
  const { menuName, megaMenuWidth, megaMenuLeft, titlePadding } = attributes
  const blockProps = useBlockProps.save({
    className: `simple-mega-menu-item ${
        megaMenuWidth === '100vw'
            ? 'has-viewport-width'
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
    <li {...blockProps}>
      <RichText.Content
        tagName="div"
        className="mega-menu-item__title"
        value={menuName || ''}
        multiline={false}
        style={titleStyle}
      />
      <InnerBlocks.Content />
    </li>
  )
}