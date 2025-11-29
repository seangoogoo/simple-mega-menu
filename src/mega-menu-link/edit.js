/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * React hook that is used to mark the block wrapper element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InspectorControls,
	useBlockProps,
	RichText,
	__experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'

import {
	PanelBody,
	TextControl,
	ToggleControl,
	Popover,
	Button
} from '@wordpress/components'

import { useState } from '@wordpress/element'
import { link as linkIcon } from '@wordpress/icons'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes, isSelected }) {
	const { url, label, opensInNewTab, rel, title } = attributes
	const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)

	const blockProps = useBlockProps({
		className: 'mega-menu-link-block'
	})

	const handleLinkChange = (newLink) => {
		setAttributes({
			url: newLink.url || '',
			opensInNewTab: newLink.opensInNewTab || false,
			title: newLink.title || ''
		})
	}

	const handleLabelChange = (newLabel) => {
		setAttributes({ label: newLabel })
	}

	const linkValue = {
		url: url,
		opensInNewTab: opensInNewTab,
		title: title
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Link Settings', 'simple-mega-menu')}>
					<TextControl
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
						label={__('URL', 'simple-mega-menu')}
						value={url}
						onChange={(value) => setAttributes({ url: value })}
						placeholder={__('https://example.com', 'simple-mega-menu')}
					/>
					<TextControl
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
						label={__('Link Text', 'simple-mega-menu')}
						value={label}
						onChange={handleLabelChange}
						placeholder={__('Enter link text', 'simple-mega-menu')}
					/>
					<ToggleControl
						__nextHasNoMarginBottom={true}
						label={__('Open in new tab', 'simple-mega-menu')}
						checked={opensInNewTab}
						onChange={(value) => setAttributes({ opensInNewTab: value })}
					/>
					<TextControl
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
						label={__('Link Title (tooltip)', 'simple-mega-menu')}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						placeholder={__('Optional title attribute', 'simple-mega-menu')}
					/>
					<TextControl
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
						label={__('Link Rel', 'simple-mega-menu')}
						value={rel}
						onChange={(value) => setAttributes({ rel: value })}
						placeholder={__('nofollow, noopener, etc.', 'simple-mega-menu')}
						help={__('Space-separated rel attributes', 'simple-mega-menu')}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mega-menu-link-wrapper">
					<RichText
						tagName="span"
						value={label}
						onChange={handleLabelChange}
						placeholder={__('Link text...', 'simple-mega-menu')}
						className="mega-menu-link-label"
						allowedFormats={[]}
					/>
					<Button
						icon={linkIcon}
						label={__('Edit link', 'simple-mega-menu')}
						onClick={() => setIsLinkPopoverOpen(!isLinkPopoverOpen)}
						className="mega-menu-link-button"
						isPressed={isLinkPopoverOpen}
						size="small"
						variant="tertiary"
					/>
				</div>

				{isLinkPopoverOpen && (
					<Popover
						position="bottom center"
						onClose={() => setIsLinkPopoverOpen(false)}
						anchor={blockProps.ref?.current}
					>
						<LinkControl
							value={linkValue}
							onChange={handleLinkChange}
							settings={[
								{
									id: 'opensInNewTab',
									title: __('Open in new tab', 'simple-mega-menu')
								}
							]}
						/>
					</Popover>
				)}
			</div>
		</>
	)
}

