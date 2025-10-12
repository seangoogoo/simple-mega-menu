/**
 * React hook that is used to mark the block wrapper element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { url, label, opensInNewTab, rel, title } = attributes

	// Don't render if there's no URL or label
	if (!url || !label) {
		return null
	}

	const blockProps = useBlockProps.save({
		className: 'mega-menu-link'
	})

	// Build rel attribute
	let relAttribute = rel || ''

	// Add noopener noreferrer for security when opening in new tab
	if (opensInNewTab) {
		const relParts = relAttribute ? relAttribute.split(' ').filter(part => part.trim()) : []
		if (!relParts.includes('noopener')) {
			relParts.push('noopener')
		}
		if (!relParts.includes('noreferrer')) {
			relParts.push('noreferrer')
		}
		relAttribute = relParts.join(' ').trim()
	} else {
		// When not opening in new tab, just use the user's rel value as-is
		relAttribute = relAttribute.trim()
	}

	return (
		<div {...blockProps}>
			<a
				href={url}
				target={opensInNewTab ? '_blank' : undefined}
				rel={relAttribute || undefined}
				title={title || undefined}
				className="mega-menu-link-anchor"
			>
				{label}
			</a>
		</div>
	)
}

