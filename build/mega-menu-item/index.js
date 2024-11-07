/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mega-menu-item/edit.js":
/*!************************************!*\
  !*** ./src/mega-menu-item/edit.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/mega-menu-item/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */




/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


const ALLOWED_BLOCKS = true;
const TEMPLATE = [['core/columns', {
  className: 'has-background',
  style: {
    color: {
      background: '#ffffff00'
    },
    spacing: {
      margin: {
        top: '0',
        bottom: '0'
      },
      padding: {
        top: '20px',
        right: '0',
        bottom: '20px',
        left: '0'
      }
    }
  }
}, [['core/column', {
  layout: {
    type: 'default'
  }
}, [['core/heading', {
  level: 2,
  content: 'Titre h2'
}], ['core/columns', {
  style: {
    color: {
      background: '#ffffff00'
    }
  }
}, [['core/column', {}, [['core/image', {
  sizeSlug: 'large',
  url: 'https://placehold.co/600x400/f3f6f7/black/?text=mega%20menu%20image',
  alt: ''
}]]], ['core/column', {}, [['core/list', {
  className: 'wp-block-list'
}, [['core/list-item', {
  content: '<a href="#">Sous menu 01</a>'
}], ['core/list-item', {
  content: '<a href="#">Sous-menu 02</a>'
}], ['core/list-item', {
  content: '<a href="#">Sous-menu 03</a>'
}], ['core/list-item', {
  content: '<a href="#">Sous-menu 04</a>'
}]]]]], ['core/column', {}, [['core/list', {
  className: 'wp-block-list'
}, [['core/list-item', {
  content: '<a href="#">Sous menu 01</a>'
}], ['core/list-item', {
  content: '<a href="#">Sous-menu 02</a>'
}], ['core/list-item', {
  content: '<a href="#">Sous-menu 03</a>'
}], ['core/list-item', {
  content: '<a href="#">Sous-menu 04</a>'
}]]]]]]]]]]]];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
function Edit({
  attributes,
  setAttributes
}) {
  const {
    menuName,
    megaMenuWidth,
    megaMenuLeft,
    titlePadding,
    fontSize
  } = attributes;

  //* useRef is a React Hook that creates a mutable reference that persists across re-renders
  //* It's like a "box" that can hold a mutable value in its .current property

  //* This ref will store a reference to the editor content element
  const editorWidthRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);

  //* This ref will store a reference to our block's DOM element
  //* We need this to set CSS variables directly on the block
  const blockRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);

  //* useEffect is a React Hook that handles side effects
  //* It runs after render and when dependencies change (empty array means run once after first render)
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    //* Find the editor content area
    const editorContent = document.querySelector('.interface-interface-skeleton__content');
    if (!editorContent) return;
    editorWidthRef.current = editorContent;

    //* Create ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (blockRef.current) {
          const parentNavContainer = blockRef.current.closest('.wp-block-simple-mega-menu-mega-menu-nav');
          // console.log("🚀 ~ resizeObserver ~ parentNavContainer.getBoundingClientRect().left:", parentNavContainer.getBoundingClientRect().left)

          //* Set the editor CSS variables
          blockRef.current.style.setProperty('--editor-content-left', `-${parentNavContainer.getBoundingClientRect().left}px`);
          blockRef.current.style.setProperty('--editor-content-width', `${entry.target.offsetWidth}px`);
        }
      }
    });

    //* Start observing
    resizeObserver.observe(editorContent);

    //* Cleanup function that runs when component unmounts
    //* This prevents memory leaks by removing the observer
    return () => {
      resizeObserver.disconnect();
    };
  }, []); //* Empty dependency array means this effect runs once on mount

  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
    className: `smm-item ${megaMenuWidth === '100vw' ? 'has-viewport-width' : megaMenuWidth?.includes('px') ? 'has-custom-width' : ''}`,
    style: {
      '--mega-menu-width': megaMenuWidth || '100vw',
      '--mega-menu-left': megaMenuLeft || '0px'
    },
    ref: blockRef //* Attach our ref to the block element
  });
  //* Create a style object for the title padding
  const titleStyle = {
    padding: titlePadding ? `${titlePadding.top || '0'} ${titlePadding.right || '0'} ${titlePadding.bottom || '0'} ${titlePadding.left || '0'}` : undefined,
    fontSize: fontSize?.size
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Settings', 'mega-menu-item'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Largeur du Mega Menu', 'mega-menu-item'),
          value: megaMenuWidth?.includes('px') ? 'custom' : '100vw',
          onChange: value => {
            // If switching to 100vw, set that directly
            if (value === '100vw') {
              setAttributes({
                megaMenuWidth: '100vw'
              });
            } else {
              // If switching to custom, set a default pixel value
              setAttributes({
                megaMenuWidth: '800px'
              });
            }
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
            value: "custom",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom', 'mega-menu-item')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalToggleGroupControlOption, {
            value: "100vw",
            label: "100vw"
          })]
        }), megaMenuWidth?.includes('px') && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            type: "number",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Largeur en pixels', 'mega-menu-item'),
            value: parseInt(megaMenuWidth),
            onChange: value => {
              const pixels = Math.max(0, parseInt(value) || 0);
              setAttributes({
                megaMenuWidth: `${pixels}px`
              });
            },
            min: 0
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            type: "number",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Position sur l\'axe X en pixels', 'mega-menu-item'),
            value: parseInt(megaMenuLeft),
            onChange: value => {
              const pixels = parseInt(value) || 0;
              setAttributes({
                megaMenuLeft: `${pixels}px`
              });
            }
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
      group: "styles",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Typography', 'mega-menu-item'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FontSizePicker, {
          value: fontSize?.size,
          onChange: newFontSize => {
            setAttributes({
              fontSize: {
                size: newFontSize
              }
            });
          },
          fontSizes: [{
            name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Small', 'mega-menu-item'),
            slug: 'small',
            size: '0.9rem'
          }, {
            name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Medium', 'mega-menu-item'),
            slug: 'medium',
            size: '1.05rem'
          }, {
            name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Large', 'mega-menu-item'),
            slug: 'large',
            size: '1.85rem'
          }, {
            name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Extra Large', 'mega-menu-item'),
            slug: 'xl',
            size: '2.5rem'
          }, {
            name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Extra Extra Large', 'mega-menu-item'),
            slug: 'xxl',
            size: '3.27rem'
          }]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Dimensions', 'mega-menu-item'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalBoxControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Marges internes', 'mega-menu-item'),
          values: titlePadding,
          onChange: value => setAttributes({
            titlePadding: value
          }),
          units: [{
            value: 'px',
            label: 'px',
            step: 1
          },
          // Whole numbers for pixels
          {
            value: 'rem',
            label: 'rem',
            step: 0.025
          },
          // Decimals for rem
          {
            value: 'em',
            label: 'em',
            step: 0.025
          } // Decimals for em
          ],
          allowReset: true,
          resetValues: {
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
          }
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      ...blockProps,
      children: [" ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
        tagName: "div",
        className: "mega-menu-item__title",
        value: menuName || '',
        onChange: value => setAttributes({
          menuName: value
        }),
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Titre...', 'mega-menu-item'),
        allowedFormats: [],
        multiline: false,
        keepPlaceholderOnFocus: true,
        style: titleStyle
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks, {
        allowedBlocks: ALLOWED_BLOCKS,
        template: TEMPLATE
        // templateLock="insert"
      })]
    })]
  });
}

/***/ }),

/***/ "./src/mega-menu-item/index.js":
/*!*************************************!*\
  !*** ./src/mega-menu-item/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/mega-menu-item/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/mega-menu-item/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/mega-menu-item/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/mega-menu-item/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */




/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  ..._block_json__WEBPACK_IMPORTED_MODULE_5__,
  icon: 'menu',
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/mega-menu-item/save.js":
/*!************************************!*\
  !*** ./src/mega-menu-item/save.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save({
  attributes
}) {
  const {
    menuName,
    megaMenuWidth,
    megaMenuLeft,
    titlePadding
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: `smm-item ${megaMenuWidth === '100vw' ? 'has-viewport-width' : megaMenuWidth?.includes('px') ? 'has-custom-width' : ''}`,
    style: {
      '--mega-menu-width': megaMenuWidth || '100vw',
      '--mega-menu-left': megaMenuLeft || '0px'
    }
  });
  const titleStyle = {
    padding: titlePadding ? `${titlePadding.top || '0'} ${titlePadding.right || '0'} ${titlePadding.bottom || '0'} ${titlePadding.left || '0'}` : undefined
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {})
  });
}

/***/ }),

/***/ "./src/mega-menu-item/editor.scss":
/*!****************************************!*\
  !*** ./src/mega-menu-item/editor.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/mega-menu-item/style.scss":
/*!***************************************!*\
  !*** ./src/mega-menu-item/style.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/mega-menu-item/block.json":
/*!***************************************!*\
  !*** ./src/mega-menu-item/block.json ***!
  \***************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"simple-mega-menu/mega-menu-item","version":"0.1.0","title":"Mega Menu Item","category":"design","icon":"menu","description":"mega menu item for mega menu navigation element.","parent":["simple-mega-menu/mega-menu-nav"],"attributes":{"menuName":{"type":"string","default":""},"megaMenuWidth":{"type":"string","default":"100vw"},"megaMenuLeft":{"type":"string","default":"0px"},"titlePadding":{"type":"object","default":{"top":"0px","right":"8px","bottom":"0px","left":"8px"}},"fontSize":{"type":"object"}},"supports":{"html":false,"color":{"background":true,"text":true}},"textdomain":"simple-mega-menu","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"mega-menu-item/index": 0,
/******/ 			"mega-menu-item/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksimple_mega_menu"] = self["webpackChunksimple_mega_menu"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["mega-menu-item/style-index"], () => (__webpack_require__("./src/mega-menu-item/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map