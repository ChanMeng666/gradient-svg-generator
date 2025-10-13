/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const { getAllFilters, getFilterUrl, getFilterForGradientType } = require('./FilterLibrary');

/**
 * SVG Composer - Responsible for composing complete SVG documents
 *
 * This class handles the assembly of SVG documents from gradient definitions,
 * filters, and text elements. It separates composition logic from generation logic.
 *
 * @class SVGComposer
 */
class SVGComposer {
  /**
   * Compose a complete SVG document from gradient-based effect
   *
   * @param {Object} params - Composition parameters
   * @param {string} params.text - Text to display
   * @param {string} params.gradientDef - SVG gradient definition
   * @param {string} [params.additionalElements=''] - Additional SVG elements
   * @param {string} [params.clipPath=''] - Clip path attribute
   * @param {string} [params.filterId] - Filter ID to apply (auto-determined if not provided)
   * @param {string} [params.gradientType='horizontal'] - Gradient type for filter selection
   * @param {number} [params.width=854] - SVG width
   * @param {number} [params.height=120] - SVG height
   * @returns {string} Complete SVG document
   */
  composeGradientSVG(params) {
    const {
      text,
      gradientDef,
      additionalElements = '',
      clipPath = '',
      filterId,
      gradientType = 'horizontal',
      width = 854,
      height = 120,
      replaceMainRect = false
    } = params;

    // Determine filter to use
    const filterToUse = filterId || getFilterForGradientType(gradientType);
    const filterEffect = getFilterUrl(filterToUse);

    // Conditionally render main rect based on replaceMainRect flag
    const mainRect = replaceMainRect ? '' : `
  <rect
    width="${width}"
    height="${height}"
    fill="url(#gradient)"
    filter="${filterEffect}"
    ${clipPath}
  >
    <animate
      attributeName="opacity"
      values="0.95;1;0.95"
      dur="3s"
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.5;1"
      keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"
    />
  </rect>`;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    ${gradientDef}
    ${getAllFilters(height)}
  </defs>

  <!-- Additional elements for complex effects -->
  ${additionalElements}
${mainRect}

  <text
    x="${width/2}"
    y="${height/2}"
    font-size="40"
    font-family="'Arial Black', Arial, sans-serif"
    font-weight="bold"
    text-anchor="middle"
    alignment-baseline="middle"
    fill="#ffffff"
    filter="url(#textShadow)"
  >
    ${this.escapeXml(text)}
    <animate
      attributeName="opacity"
      values="0.9;1;0.9"
      dur="4s"
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.5;1"
      keySplines="0.3 0.0 0.2 1; 0.3 0.0 0.2 1"
    />
  </text>
</svg>`;
  }

  /**
   * Compose a complete SVG document from any content
   *
   * @param {Object} params - Composition parameters
   * @param {string} params.content - SVG content (already complete or fragment)
   * @param {string} [params.contentType='complete'] - 'complete' or 'fragment'
   * @param {number} [params.width=854] - SVG width
   * @param {number} [params.height=120] - SVG height
   * @param {boolean} [params.includeFilters=false] - Whether to include filter library
   * @returns {string} Complete SVG document
   */
  compose(params) {
    const {
      content,
      contentType = 'complete',
      width = 854,
      height = 120,
      includeFilters = false
    } = params;

    // If content is already a complete SVG document, return as-is
    if (contentType === 'complete' || content.trim().startsWith('<?xml')) {
      return content;
    }

    // Otherwise, wrap fragment in SVG document
    const filters = includeFilters ? `<defs>${getAllFilters(height)}</defs>` : '';

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${filters}
  ${content}
</svg>`;
  }

  /**
   * Create text element with standard styling
   *
   * @param {Object} params - Text parameters
   * @param {string} params.text - Text content
   * @param {number} [params.x] - X position (defaults to center)
   * @param {number} [params.y] - Y position (defaults to center)
   * @param {number} [params.width=854] - SVG width for centering
   * @param {number} [params.height=120] - SVG height for centering
   * @param {number} [params.fontSize=40] - Font size
   * @param {string} [params.fill='#ffffff'] - Text fill color
   * @param {string} [params.filter='url(#textShadow)'] - Filter to apply
   * @param {boolean} [params.animated=true] - Whether to animate opacity
   * @returns {string} SVG text element
   */
  createTextElement(params) {
    const {
      text,
      x,
      y,
      width = 854,
      height = 120,
      fontSize = 40,
      fill = '#ffffff',
      filter = 'url(#textShadow)',
      animated = true
    } = params;

    const xPos = x !== undefined ? x : width / 2;
    const yPos = y !== undefined ? y : height / 2;

    const animation = animated ? `
    <animate
      attributeName="opacity"
      values="0.9;1;0.9"
      dur="4s"
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.5;1"
      keySplines="0.3 0.0 0.2 1; 0.3 0.0 0.2 1"
    />` : '';

    return `
  <text
    x="${xPos}"
    y="${yPos}"
    font-size="${fontSize}"
    font-family="'Arial Black', Arial, sans-serif"
    font-weight="bold"
    text-anchor="middle"
    alignment-baseline="middle"
    fill="${fill}"
    filter="${filter}"
  >
    ${this.escapeXml(text)}${animation}
  </text>`;
  }

  /**
   * Create animated rectangle with gradient
   *
   * @param {Object} params - Rectangle parameters
   * @param {number} [params.width=854] - Width
   * @param {number} [params.height=120] - Height
   * @param {string} [params.fill='url(#gradient)'] - Fill (usually gradient)
   * @param {string} [params.filter] - Filter to apply
   * @param {string} [params.clipPath=''] - Clip path attribute
   * @param {boolean} [params.animated=true] - Whether to animate
   * @returns {string} SVG rect element
   */
  createRectElement(params) {
    const {
      width = 854,
      height = 120,
      fill = 'url(#gradient)',
      filter,
      clipPath = '',
      animated = true
    } = params;

    const animation = animated ? `
    <animate
      attributeName="opacity"
      values="0.95;1;0.95"
      dur="3s"
      repeatCount="indefinite"
      calcMode="spline"
      keyTimes="0;0.5;1"
      keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"
    />` : '';

    const filterAttr = filter ? `filter="${filter}"` : '';

    return `
  <rect
    width="${width}"
    height="${height}"
    fill="${fill}"
    ${filterAttr}
    ${clipPath}
  >${animation}
  </rect>`;
  }

  /**
   * Escape XML special characters in text
   *
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeXml(text) {
    if (!text) return '';

    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Validate SVG output (basic check)
   *
   * @param {string} svg - SVG string to validate
   * @returns {boolean} True if valid
   */
  validate(svg) {
    if (!svg || typeof svg !== 'string') {
      return false;
    }

    // Check for basic SVG structure
    return (
      svg.includes('<svg') &&
      svg.includes('</svg>') &&
      svg.includes('xmlns')
    );
  }

  /**
   * Minify SVG by removing unnecessary whitespace
   * (Simple implementation, can be enhanced)
   *
   * @param {string} svg - SVG to minify
   * @returns {string} Minified SVG
   */
  minify(svg) {
    return svg
      .replace(/>\s+</g, '><')  // Remove whitespace between tags
      .replace(/\s+/g, ' ')      // Collapse multiple spaces
      .trim();
  }
}

// Create singleton instance
const svgComposer = new SVGComposer();

module.exports = {
  SVGComposer,
  svgComposer
};
