/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	PanelBody,
	__experimentalBoxControl as BoxControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
    FontSizePicker,
    TextControl
} from '@wordpress/components'
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	RichText
} from '@wordpress/block-editor'
import { useEffect, useRef } from '@wordpress/element'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'

const ALLOWED_BLOCKS = true
const TEMPLATE = [
	['core/columns', {
		className: 'has-background',
		style: {
		color: { background: '#ffffff00' },
			spacing: {
				margin: { top: '0', bottom: '0' },
				padding: { top: '20px', right: '0', bottom: '20px', left: '0' }
			}
		}
	}, [
		['core/column', { layout: { type: 'default' } }, [
			['core/heading', { level: 2, content: 'Titre h2' }],
			['core/columns', { style: { color: { background: '#ffffff00' } } }, [
				['core/column', {}, [
					['core/image', {
						sizeSlug: 'large',
						url: 'https://placehold.co/600x400/f3f6f7/black/?text=mega%20menu%20image',
						alt: ''
					}]
				]],
				['core/column', {}, [
					['core/list', { className: 'wp-block-list' }, [
						['core/list-item', { content: '<a href="#">Sous menu 01</a>' }],
						['core/list-item', { content: '<a href="#">Sous-menu 02</a>' }],
						['core/list-item', { content: '<a href="#">Sous-menu 03</a>' }],
						['core/list-item', { content: '<a href="#">Sous-menu 04</a>' }]
					]]
				]],
				['core/column', {}, [
					['core/list', { className: 'wp-block-list' }, [
						['core/list-item', { content: '<a href="#">Sous menu 01</a>' }],
						['core/list-item', { content: '<a href="#">Sous-menu 02</a>' }],
						['core/list-item', { content: '<a href="#">Sous-menu 03</a>' }],
						['core/list-item', { content: '<a href="#">Sous-menu 04</a>' }]
					]]
				]]
			]]
		]]
	]]
]

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const { menuName, megaMenuWidth, megaMenuLeft, titlePadding, fontSize } = attributes

    //* useRef is a React Hook that creates a mutable reference that persists across re-renders
    //* It's like a "box" that can hold a mutable value in its .current property

    //* This ref will store a reference to the editor content element
    const editorWidthRef = useRef(null)

    //* This ref will store a reference to our block's DOM element
    //* We need this to set CSS variables directly on the block
    const blockRef = useRef(null)

    //* useEffect is a React Hook that handles side effects
    //* It runs after render and when dependencies change (empty array means run once after first render)
    useEffect(() => {
        //* Find the editor content area
        const editorContent = document.querySelector('.interface-interface-skeleton__content')

		if (!editorContent) return

        editorWidthRef.current = editorContent

        //* Create ResizeObserver
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                 if (blockRef.current) {
					const parentNavContainer = blockRef.current.closest('.wp-block-simple-mega-menu-mega-menu-nav')
                    // console.log("🚀 ~ resizeObserver ~ parentNavContainer.getBoundingClientRect().left:", parentNavContainer.getBoundingClientRect().left)

					//* Set the editor CSS variables
                    blockRef.current.style.setProperty('--editor-content-left', `-${parentNavContainer.getBoundingClientRect().left}px`)
                    blockRef.current.style.setProperty('--editor-content-width', `${entry.target.offsetWidth}px`)
                }
            }
        })

        //* Start observing
        resizeObserver.observe(editorContent)

        //* Cleanup function that runs when component unmounts
        //* This prevents memory leaks by removing the observer
        return () => {
            resizeObserver.disconnect()
        }
    }, []) //* Empty dependency array means this effect runs once on mount

	const blockProps = useBlockProps({
    className: `smm-item ${
        megaMenuWidth === '100vw'
            ? 'has-viewport-width'
            : megaMenuWidth?.includes('px')
                ? 'has-custom-width'
                : ''
    }`,
		style: {
			'--mega-menu-width': megaMenuWidth || '100vw',
			'--mega-menu-left': megaMenuLeft || '0px'
		},
        ref: blockRef //* Attach our ref to the block element
	})
	//* Create a style object for the title padding
	const titleStyle = {
		padding: titlePadding ?
			`${titlePadding.top || '0'} ${titlePadding.right || '0'} ${titlePadding.bottom || '0'} ${titlePadding.left || '0'}` :
			undefined,
		fontSize: fontSize?.size
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'mega-menu-item')}>
					<ToggleGroupControl
						label={__('Largeur du Mega Menu', 'mega-menu-item')}
						value={megaMenuWidth?.includes('px') ? 'custom' : '100vw'}
						onChange={(value) => {
							// If switching to 100vw, set that directly
							if (value === '100vw') {
								setAttributes({ megaMenuWidth: '100vw' })
							} else {
								// If switching to custom, set a default pixel value
								setAttributes({ megaMenuWidth: '800px' })
							}
						}}
					>
						<ToggleGroupControlOption
							value="custom"
							label={__('Custom', 'mega-menu-item')}
						/>
						<ToggleGroupControlOption
							value="100vw"
							label="100vw"
						/>
					</ToggleGroupControl>
					{megaMenuWidth?.includes('px') && (
						<>
							<TextControl
								type="number"
								label={__('Largeur en pixels', 'mega-menu-item')}
								value={parseInt(megaMenuWidth)}
								onChange={(value) => {
									const pixels = Math.max(0, parseInt(value) || 0)
									setAttributes({ megaMenuWidth: `${pixels}px` })
								}}
								min={0}
							/>
							<TextControl
								type="number"
								label={__('Position sur l\'axe X en pixels', 'mega-menu-item')}
								value={parseInt(megaMenuLeft)}
								onChange={(value) => {
									const pixels = parseInt(value) || 0;
									setAttributes({ megaMenuLeft: `${pixels}px` });
								}}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title={__('Typography', 'mega-menu-item')}>
                    <FontSizePicker
                        value={fontSize?.size}
                        onChange={(newFontSize) => {
                            setAttributes({
                                fontSize: {
                                    size: newFontSize
                                }
                            })
                        }}
                        fontSizes={[
                            {
                                name: __('Small', 'mega-menu-item'),
                                slug: 'small',
                                size: '0.9rem',
                            },
                            {
                                name: __('Medium', 'mega-menu-item'),
                                slug: 'medium',
                                size: '1.05rem',
                            },
                            {
                                name: __('Large', 'mega-menu-item'),
                                slug: 'large',
                                size: '1.85rem',
                            },
                            {
                                name: __('Extra Large', 'mega-menu-item'),
                                slug: 'xl',
                                size: '2.5rem',
                            },
                            {
                                name: __('Extra Extra Large', 'mega-menu-item'),
                                slug: 'xxl',
                                size: '3.27rem',
                            },
                        ]}
                    />
                </PanelBody>
				<PanelBody title={__('Dimensions', 'mega-menu-item')}>
					<BoxControl
						label={__('Marges internes', 'mega-menu-item')}
						values={titlePadding}
						onChange={value => setAttributes({ titlePadding: value })}
						units={[
							{ value: 'px', label: 'px', step: 1 },     // Whole numbers for pixels
							{ value: 'rem', label: 'rem', step: 0.025 }, // Decimals for rem
							{ value: 'em', label: 'em', step: 0.025 }    // Decimals for em
						]}
						allowReset={true}
						resetValues={{
							top: '0px',
							right: '0px',
							bottom: '0px',
							left: '0px'
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}> {/* visible as a li element in the front */}
				<RichText
						tagName="div"
						className="mega-menu-item__title"
						value={menuName || ''}
						onChange={(value) => setAttributes({ menuName: value })}
						placeholder={__('Titre...', 'mega-menu-item')}
						allowedFormats={[]}
						multiline={false}
						keepPlaceholderOnFocus={true}
						style={titleStyle}
				/>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
					// templateLock="insert"
				/>
			</div>
		</>
	)
}
