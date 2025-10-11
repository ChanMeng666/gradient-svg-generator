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

/**
 * Base Effect Generator - Standard interface for all effect generators
 *
 * All effect generators should either extend this class or implement
 * a compatible interface with the same method signatures.
 *
 * @class BaseEffectGenerator
 */
class BaseEffectGenerator {
  /**
   * Create a new effect generator
   *
   * @param {Object} config - Generator configuration
   * @param {string} config.name - Effect name
   * @param {string} config.category - Effect category
   * @param {string} config.outputType - Output type: 'complete' | 'fragment' | 'gradient'
   * @param {string} [config.description=''] - Effect description
   */
  constructor(config = {}) {
    this.name = config.name || 'unnamed';
    this.category = config.category || 'uncategorized';
    this.outputType = config.outputType || 'complete';
    this.description = config.description || '';
  }

  /**
   * Generate SVG content for this effect
   *
   * This is the main method that subclasses must implement.
   *
   * @param {Object} params - Generation parameters
   * @param {string} params.text - Text to display in the SVG
   * @param {string[]} params.colors - Array of hex color codes (without #)
   * @param {number} [params.width=854] - SVG width in pixels
   * @param {number} [params.height=120] - SVG height in pixels
   * @param {string} [params.duration='6s'] - Animation duration
   * @param {Object} [params.options={}] - Additional effect-specific options
   * @returns {GeneratorResult} Result object containing SVG and metadata
   * @throws {Error} If required parameters are missing or invalid
   */
  generate(params) {
    throw new Error(`generate() method must be implemented by ${this.constructor.name}`);
  }

  /**
   * Get SVG filter definitions required by this effect
   *
   * @returns {string} SVG filter definitions (content for <defs>)
   */
  getFilters() {
    return '';
  }

  /**
   * Get effect metadata
   *
   * @returns {Object} Effect metadata
   */
  getMetadata() {
    return {
      name: this.name,
      category: this.category,
      outputType: this.outputType,
      description: this.description,
      filters: this.getRequiredFilters()
    };
  }

  /**
   * Get list of required filter IDs
   *
   * @returns {string[]} Array of filter IDs
   */
  getRequiredFilters() {
    return [];
  }

  /**
   * Validate generation parameters
   *
   * @param {Object} params - Parameters to validate
   * @throws {Error} If parameters are invalid
   */
  validateParams(params) {
    if (!params) {
      throw new Error('Parameters object is required');
    }

    if (!params.text || typeof params.text !== 'string') {
      throw new Error('text parameter is required and must be a string');
    }

    if (!Array.isArray(params.colors) || params.colors.length === 0) {
      throw new Error('colors parameter is required and must be a non-empty array');
    }

    if (params.width !== undefined && (typeof params.width !== 'number' || params.width <= 0)) {
      throw new Error('width must be a positive number');
    }

    if (params.height !== undefined && (typeof params.height !== 'number' || params.height <= 0)) {
      throw new Error('height must be a positive number');
    }

    if (params.duration !== undefined && typeof params.duration !== 'string') {
      throw new Error('duration must be a string (e.g., "6s")');
    }
  }

  /**
   * Normalize color array (ensure minimum colors, remove # prefix)
   *
   * @param {string[]} colors - Input color array
   * @param {number} [minColors=3] - Minimum number of colors required
   * @returns {string[]} Normalized color array
   */
  normalizeColors(colors, minColors = 3) {
    // Remove # prefix if present
    let normalized = colors.map(color => color.replace(/^#/, ''));

    // Ensure minimum number of colors
    while (normalized.length < minColors) {
      normalized = [...normalized, ...normalized];
    }

    return normalized.slice(0, Math.max(normalized.length, minColors));
  }

  /**
   * Create gradient stops string for SVG
   *
   * @param {string[]} colors - Array of hex colors (without #)
   * @param {boolean} [loop=true] - Whether to loop colors for animation
   * @returns {string} SVG gradient stops
   */
  createGradientStops(colors, loop = true) {
    const colorArray = loop ? [...colors, ...colors] : colors;
    return colorArray
      .map((color, index) => {
        const offset = (index / (colorArray.length - 1)) * 100;
        return `<stop offset="${offset}%" stop-color="#${color}" />`;
      })
      .join('\n      ');
  }

  /**
   * Wrap content in foreignObject for HTML/CSS effects
   *
   * @param {string} htmlContent - HTML content
   * @param {number} width - Width in pixels
   * @param {number} height - Height in pixels
   * @returns {string} foreignObject SVG element
   */
  wrapInForeignObject(htmlContent, width, height) {
    return `
    <foreignObject width="100%" height="100%">
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${htmlContent}
      </div>
    </foreignObject>`;
  }

  /**
   * Create a complete SVG document
   *
   * @param {string} content - SVG content (defs, elements, etc.)
   * @param {number} width - Width in pixels
   * @param {number} height - Height in pixels
   * @returns {string} Complete SVG document
   */
  createSVGDocument(content, width, height) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${content}
</svg>`;
  }
}

/**
 * Generator Result type
 *
 * @typedef {Object} GeneratorResult
 * @property {string} svg - Generated SVG content (complete document or fragment)
 * @property {Object} metadata - Additional metadata about the generation
 * @property {string} metadata.effectName - Name of the effect used
 * @property {string} metadata.outputType - Type of output: 'complete' | 'fragment' | 'gradient'
 * @property {string[]} metadata.filters - Filter IDs used
 * @property {boolean} metadata.animated - Whether the SVG is animated
 */

module.exports = BaseEffectGenerator;
