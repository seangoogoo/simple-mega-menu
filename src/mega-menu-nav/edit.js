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
import { useState, useEffect } from '@wordpress/element'
import {
    __experimentalToolsPanel as ToolsPanel,
    __experimentalToolsPanelItem as ToolsPanelItem,
    __experimentalBoxControl as BoxControl,
    RangeControl,
    Button,
    TextControl,
    Flex,
    FlexItem,
    SelectControl,
    PanelBody
} from '@wordpress/components'
import {
    InnerBlocks,
    useBlockProps,
    InspectorControls
} from '@wordpress/block-editor'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'

const ALLOWED_BLOCKS = ['simple-mega-menu/mega-menu-item', 'core/navigation-link', 'core/buttons', ['core/search'], ['core/social-links'], ['core/spacer'], ['core/home-link'], ['core/site-title'], ['core/site-logo']]
const TEMPLATE = [
    ['simple-mega-menu/mega-menu-item'],
    ['simple-mega-menu/mega-menu-item'],
	['core/buttons', {
		className: 'simple-mega-menu-buttons'
	}, [
		['core/button', {
			text: 'Button 1'
		}],
		['core/button', {
			text: 'Button 2'
		}]
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
	const { uniqueId, blockSpacing, megaMenuBreakpoint, burgerPadding } = attributes
    const [isCustom, setIsCustom] = useState(false)
    const [customUnit, setCustomUnit] = useState('rem')

	const blockProps = useBlockProps({
		className: 'simple-mega-menu',
        style: {
            '--mega-menu-gap': blockSpacing || '0',
            '--mega-menu-breakpoint': megaMenuBreakpoint || '780px',
            '--burger-padding': burgerPadding ?
                `${burgerPadding.top} ${burgerPadding.right} ${burgerPadding.bottom} ${burgerPadding.left}` :
                '0'
        }
	})

    const units = [
        { value: 'rem', label: 'rem' },
        { value: 'px', label: 'px' },
        { value: 'em', label: 'em' },
        { value: '%', label: '%' },
    ]

    const handleCustomValueChange = (value) => {
        if (value === '') {
            setAttributes({ blockSpacing: undefined })
            return
        }
        setAttributes({ blockSpacing: `${value}${customUnit}` })
    }
    const setUniqueId = () => Math.random().toString(36).substring(2, 11)

    // Generate unique ID on mount if not already set
    useEffect(() => {
        if (!uniqueId) {
            const newId = `smm-${setUniqueId()}-${setUniqueId()}`
            setAttributes({ uniqueId: newId })
        }
    }, []) // Empty dependency array means this runs once on mount

	return (
        <>
            <InspectorControls group="settings">
                <PanelBody
                    title={__('Mega Menu Settings', 'mega-menu-nav')}
                    initialOpen={true}
                >
                    <TextControl
                        label={__('Seuil Menu mobile', 'mega-menu-nav')}
                        help={__('La largeur de la fenêtre d\'affichage à laquelle le Mega Menu passe en vue mobile (par exemple 780 px)', 'mega-menu-nav')}
                        value={megaMenuBreakpoint}
                        onChange={(value) => setAttributes({ megaMenuBreakpoint: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <PanelBody
                    title={__('Burger Menu', 'mega-menu-nav')}
                    initialOpen={true}
                >
                    <BoxControl
                        label={__('Marges intérieures du Burger Menu', 'mega-menu-nav')}
                        values={burgerPadding}
                        onChange={value => setAttributes({ burgerPadding: value })}
                        units={[
                            { value: 'px', label: 'px', step: 1 },
                            { value: 'rem', label: 'rem', step: 0.1 },
                            { value: 'em', label: 'em', step: 0.1 }
                        ]}
                        allowReset={true}
                        resetValues={{
                            top: '0',
                            right: '0',
                            bottom: '0',
                            left: '0'
                        }}
                    />
                </PanelBody>
                <ToolsPanel label={__('Dimensions', 'mega-menu-nav')}>
                    <ToolsPanelItem
                        hasValue={() => !!blockSpacing}
                        label={__('Espacement des blocs', 'mega-menu-nav')}
                        onDeselect={() => setAttributes({ blockSpacing: undefined })}
                        isShownByDefault={true}
                    >
                        <Flex align="flex-start" justify="space-between">
                            {!isCustom ? (
                                <FlexItem>
                                    <RangeControl
                                        label={__('Espacement des blocs en rem', 'mega-menu-nav')}
                                        value={parseFloat(blockSpacing) || 0}
                                        onChange={(value) => setAttributes({
                                            blockSpacing: value ? `${value}rem` : undefined
                                        })}
                                        min={0}
                                        max={4}
                                        step={0.25}
                                        marks={[
                                            { value: 0 },
                                            { value: 0.25 },
                                            { value: 0.5 },
                                            { value: 0.75 },
                                            { value: 1 },
                                            { value: 1.25 },
                                            { value: 1.5 },
                                            { value: 1.75 },
                                            { value: 2 },
                                            { value: 2.25 },
                                            { value: 2.5 },
                                            { value: 2.75 },
                                            { value: 3 },
                                            { value: 3.25 },
                                            { value: 3.5 },
                                            { value: 3.75 },
                                            { value: 4 }
                                        ]}
                                        allowReset={false}
                                        resetFallbackValue={undefined}
                                        withInputField={false}
                                    />
                                </FlexItem>
                            ) : (
                                <FlexItem>
                                    <Flex gap={2}>
                                        <TextControl
                                            type="number"
                                            value={parseFloat(blockSpacing) || ''}
                                            onChange={handleCustomValueChange}
                                        />
                                        <SelectControl
                                            value={customUnit}
                                            options={units}
                                            onChange={(value) => {
                                                setCustomUnit(value)
                                                const currentValue = parseFloat(blockSpacing) || 0
                                                setAttributes({ blockSpacing: `${currentValue}${value}` })
                                            }}
                                        />
                                    </Flex>
                                </FlexItem>
                            )}
                            <FlexItem>
                                <Button
                                    icon={isCustom ? "editor-table" : "edit"}
                                    label={__('Définir une taille personnalisée', 'mega-menu-nav')}
                                    isSmall
                                    onClick={() => setIsCustom(!isCustom)}
                                    aria-pressed={isCustom}
                                />
                            </FlexItem>
                        </Flex>
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
 			<nav {...blockProps}>
				{/* wrapper ul start in the front*/}
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
				/>
				{/* wrapper ul end in the front*/}
                <div className="smm-burger__wrapper">
                    <label id="burger-icon" htmlFor="burger-input">
                        <input type="checkbox" id="burger-input" />
                    </label>
                </div>
			</nav>
        </>
	)
}
