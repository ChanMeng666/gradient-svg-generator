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
 * Filter Library - Centralized SVG filter definitions
 *
 * All SVG filter effects are defined here and can be referenced by ID.
 * Extracted from gradientGenerator.js for better maintainability.
 */

/**
 * Get all standard filter definitions
 *
 * @param {number} height - SVG height for positioning light sources
 * @returns {string} SVG filter definitions for <defs>
 */
function getAllFilters(height = 120) {
  return `
    <!-- Soft Light Filter -->
    <filter id="softLight">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
      <feColorMatrix in="blur" type="saturate" values="1.2" result="saturated"/>
      <feMerge>
        <feMergeNode in="saturated"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Smooth Transition Filter -->
    <filter id="smoothTransition">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      <feColorMatrix type="saturate" values="1.5"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Radial Blur Filter -->
    <filter id="radialBlur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
      <feColorMatrix type="saturate" values="1.3"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Energy Effect Filter -->
    <filter id="energyEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"/>
      <feColorMatrix type="saturate" values="1.8"/>
      <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Spiral Effect Filter -->
    <filter id="spiralEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      <feColorMatrix type="saturate" values="1.6"/>
      <feTurbulence baseFrequency="0.01" numOctaves="2" result="spiral"/>
      <feDisplacementMap in="SourceGraphic" in2="spiral" scale="3"/>
    </filter>

    <!-- Wave Effect Filter -->
    <filter id="waveEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
      <feColorMatrix type="saturate" values="1.4"/>
      <feTurbulence baseFrequency="0.03 0.01" numOctaves="2" result="wave"/>
      <feDisplacementMap in="SourceGraphic" in2="wave" scale="1.5"/>
    </filter>

    <!-- Crystal Effect Filter -->
    <filter id="crystalEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
      <feColorMatrix type="saturate" values="1.7"/>
      <feSpecularLighting in="SourceGraphic" specularConstant="1.5" specularExponent="20" lighting-color="white">
        <fePointLight x="427" y="${height/4}" z="100"/>
      </feSpecularLighting>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Reflection Effect Filter -->
    <filter id="reflectionEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      <feColorMatrix type="saturate" values="1.3"/>
      <feOffset in="SourceGraphic" dx="0" dy="2" result="offset"/>
      <feFlood flood-color="rgba(255,255,255,0.3)" result="white"/>
      <feComposite in="white" in2="offset" operator="in" result="reflection"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="reflection"/>
      </feMerge>
    </filter>

    <!-- Star Effect Filter -->
    <filter id="starEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      <feColorMatrix type="saturate" values="2"/>
      <feSpecularLighting in="SourceGraphic" specularConstant="2" specularExponent="30" lighting-color="#ffff00">
        <fePointLight x="427" y="${height/2}" z="150"/>
      </feSpecularLighting>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Heart Effect Filter -->
    <filter id="heartEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
      <feColorMatrix type="saturate" values="1.8"/>
      <feColorMatrix type="hueRotate" values="15"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Zigzag Effect Filter -->
    <filter id="zigzagEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
      <feColorMatrix type="saturate" values="1.6"/>
      <feTurbulence baseFrequency="0.05" numOctaves="1" result="zigzag"/>
      <feDisplacementMap in="SourceGraphic" in2="zigzag" scale="2"/>
    </filter>

    <!-- Ripple Effect Filter -->
    <filter id="rippleEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      <feColorMatrix type="saturate" values="1.4"/>
      <feConvolveMatrix kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Galaxy Effect Filter -->
    <filter id="galaxyEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
      <feColorMatrix type="saturate" values="2"/>
      <feTurbulence baseFrequency="0.02" numOctaves="4" result="galaxy"/>
      <feDisplacementMap in="SourceGraphic" in2="galaxy" scale="1"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Lightning Effect Filter -->
    <filter id="lightningEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
      <feColorMatrix type="saturate" values="2.5"/>
      <feColorMatrix type="brightness" values="1.3"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Luminance Effect Filter -->
    <filter id="luminanceEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
      <feColorMatrix type="saturate" values="1.5"/>
      <feSpecularLighting in="SourceGraphic" specularConstant="3" specularExponent="25" lighting-color="white">
        <fePointLight x="427" y="${height/2}" z="200"/>
      </feSpecularLighting>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Rainbow Effect Filter -->
    <filter id="rainbowEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      <feColorMatrix type="saturate" values="2"/>
      <feConvolveMatrix kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Text Box Effect Filter -->
    <filter id="textBoxEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      <feColorMatrix type="saturate" values="1.8"/>
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#19f6e8" flood-opacity="0.6"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Glitch Effect Filter -->
    <filter id="glitchEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
      <feColorMatrix type="saturate" values="2.2"/>
      <feOffset in="SourceGraphic" dx="1" dy="1" result="offsetRed"/>
      <feOffset in="SourceGraphic" dx="-1" dy="-1" result="offsetCyan"/>
      <feFlood flood-color="#ff0000" result="floodRed"/>
      <feFlood flood-color="#00ffff" result="floodCyan"/>
      <feComposite in="floodRed" in2="offsetRed" operator="in" result="redGlow"/>
      <feComposite in="floodCyan" in2="offsetCyan" operator="in" result="cyanGlow"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="redGlow"/>
        <feMergeNode in="cyanGlow"/>
      </feMerge>
    </filter>

    <!-- Typewriter Effect Filter -->
    <filter id="typewriterEffect">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.3"/>
      <feColorMatrix type="saturate" values="1.3"/>
      <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#00ff00" flood-opacity="0.4"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>

    <!-- Text Shadow Effect -->
    <filter id="textShadow">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.5"/>
      <feColorMatrix type="saturate" values="1.2"/>
    </filter>
  `;
}

/**
 * Get specific filter by ID
 *
 * @param {string} filterId - Filter ID
 * @param {number} height - SVG height for positioning
 * @returns {string|null} Filter definition or null if not found
 */
function getFilter(filterId, height = 120) {
  const allFilters = getAllFilters(height);
  const filterRegex = new RegExp(`<filter id="${filterId}"[\\s\\S]*?<\/filter>`, 'i');
  const match = allFilters.match(filterRegex);
  return match ? match[0] : null;
}

/**
 * Get multiple filters by IDs
 *
 * @param {string[]} filterIds - Array of filter IDs
 * @param {number} height - SVG height for positioning
 * @returns {string} Combined filter definitions
 */
function getFilters(filterIds, height = 120) {
  return filterIds
    .map(id => getFilter(id, height))
    .filter(f => f !== null)
    .join('\n    ');
}

/**
 * Get filter URL reference for use in SVG elements
 *
 * @param {string} filterId - Filter ID
 * @returns {string} URL reference like "url(#filterId)"
 */
function getFilterUrl(filterId) {
  return `url(#${filterId})`;
}

/**
 * Get filter ID for a gradient type
 * Maps gradient types to their default filter
 *
 * @param {string} gradientType - Gradient type name
 * @returns {string} Filter ID
 */
function getFilterForGradientType(gradientType) {
  const filterMap = {
    radial: 'radialBlur',
    circular: 'energyEffect',
    burst: 'energyEffect',
    pulse: 'energyEffect',
    spiral: 'spiralEffect',
    conic: 'crystalEffect',
    wave: 'waveEffect',
    diamond: 'crystalEffect',
    reflection: 'reflectionEffect',
    star: 'starEffect',
    heart: 'heartEffect',
    zigzag: 'zigzagEffect',
    ripple: 'rippleEffect',
    galaxy: 'galaxyEffect',
    lightning: 'lightningEffect',
    luminance: 'luminanceEffect',
    rainbow: 'rainbowEffect',
    textBox: 'textBoxEffect',
    glitch: 'glitchEffect',
    typewriter: 'typewriterEffect'
  };

  return filterMap[gradientType] || 'smoothTransition';
}

// ============================================================================
// PARAMETERIZED FILTER GENERATORS
// These functions create customized filter definitions to replace
// the 50+ duplicate filter patterns scattered across gradient generators
// ============================================================================

/**
 * Create a Gaussian blur filter
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {number} options.stdDeviation - Blur amount (default: 2)
 * @param {boolean} options.saturate - Whether to add saturation (default: false)
 * @param {number} options.saturation - Saturation value (default: 1.2)
 * @returns {string} SVG filter definition
 */
function createBlurFilter(id, options = {}) {
  const {
    stdDeviation = 2,
    saturate = false,
    saturation = 1.2
  } = options;

  if (saturate) {
    return `
      <filter id="${id}">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${stdDeviation}" result="blur"/>
        <feColorMatrix in="blur" type="saturate" values="${saturation}"/>
        <feComposite operator="over" in2="SourceGraphic"/>
      </filter>`;
  }

  return `
    <filter id="${id}">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${stdDeviation}"/>
    </filter>`;
}

/**
 * Create a turbulence displacement filter
 * This pattern is repeated 40+ times across generators
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {string|number} options.baseFrequency - Turbulence frequency (default: '0.02')
 * @param {number} options.numOctaves - Turbulence octaves (default: 3)
 * @param {number} options.scale - Displacement scale (default: 20)
 * @param {boolean} options.animated - Whether to animate the scale (default: false)
 * @param {string} options.animationValues - Scale animation values (default: '20;40;20')
 * @param {string} options.duration - Animation duration (default: '6s')
 * @returns {string} SVG filter definition
 */
function createTurbulenceFilter(id, options = {}) {
  const {
    baseFrequency = '0.02',
    numOctaves = 3,
    scale = 20,
    animated = false,
    animationValues = '20;40;20',
    duration = '6s'
  } = options;

  const animation = animated
    ? `<animate attributeName="scale" values="${animationValues}" dur="${duration}" repeatCount="indefinite"/>`
    : '';

  return `
    <filter id="${id}">
      <feTurbulence baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="${scale}">
        ${animation}
      </feDisplacementMap>
    </filter>`;
}

/**
 * Create a glow effect filter
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {string} options.color - Glow color (default: '#ffffff')
 * @param {number} options.intensity - Blur intensity (default: 3)
 * @param {number} options.opacity - Glow opacity (default: 0.6)
 * @returns {string} SVG filter definition
 */
function createGlowFilter(id, options = {}) {
  const {
    color = '#ffffff',
    intensity = 3,
    opacity = 0.6
  } = options;

  return `
    <filter id="${id}">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${intensity}" result="blur"/>
      <feFlood flood-color="${color}" flood-opacity="${opacity}" result="glow"/>
      <feComposite in="glow" in2="blur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>`;
}

/**
 * Create a drop shadow filter
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {number} options.dx - X offset (default: 2)
 * @param {number} options.dy - Y offset (default: 2)
 * @param {number} options.stdDeviation - Blur amount (default: 3)
 * @param {string} options.color - Shadow color (default: 'rgba(0,0,0,0.5)')
 * @param {number} options.opacity - Shadow opacity (default: 0.5)
 * @returns {string} SVG filter definition
 */
function createDropShadowFilter(id, options = {}) {
  const {
    dx = 2,
    dy = 2,
    stdDeviation = 3,
    color = 'rgba(0,0,0,0.5)',
    opacity = 0.5
  } = options;

  return `
    <filter id="${id}">
      <feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${stdDeviation}" flood-color="${color}" flood-opacity="${opacity}"/>
    </filter>`;
}

/**
 * Create a color matrix filter for saturation/hue adjustments
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {number} options.saturation - Saturation value (default: 1.5)
 * @param {number} options.hueRotate - Hue rotation in degrees (default: 0)
 * @param {boolean} options.includeBlur - Whether to include blur (default: false)
 * @param {number} options.blurAmount - Blur amount if included (default: 1)
 * @returns {string} SVG filter definition
 */
function createColorMatrixFilter(id, options = {}) {
  const {
    saturation = 1.5,
    hueRotate = 0,
    includeBlur = false,
    blurAmount = 1
  } = options;

  let filter = `<filter id="${id}">`;

  if (includeBlur) {
    filter += `<feGaussianBlur in="SourceGraphic" stdDeviation="${blurAmount}" result="blur"/>`;
    filter += `<feColorMatrix in="blur" type="saturate" values="${saturation}"/>`;
  } else {
    filter += `<feColorMatrix type="saturate" values="${saturation}"/>`;
  }

  if (hueRotate !== 0) {
    filter += `<feColorMatrix type="hueRotate" values="${hueRotate}"/>`;
  }

  filter += `<feComposite operator="over" in2="SourceGraphic"/>`;
  filter += `</filter>`;

  return filter;
}

/**
 * Create a specular lighting filter
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {number} options.specularConstant - Light constant (default: 1.5)
 * @param {number} options.specularExponent - Light exponent (default: 20)
 * @param {string} options.lightColor - Light color (default: 'white')
 * @param {Object} options.lightPosition - Light position {x, y, z}
 * @returns {string} SVG filter definition
 */
function createSpecularLightingFilter(id, options = {}) {
  const {
    specularConstant = 1.5,
    specularExponent = 20,
    lightColor = 'white',
    lightPosition = { x: 427, y: 60, z: 100 }
  } = options;

  return `
    <filter id="${id}">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
      <feSpecularLighting in="blur" specularConstant="${specularConstant}" specularExponent="${specularExponent}" lighting-color="${lightColor}">
        <fePointLight x="${lightPosition.x}" y="${lightPosition.y}" z="${lightPosition.z}"/>
      </feSpecularLighting>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>`;
}

/**
 * Create a morphology filter (dilate/erode)
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {string} options.operator - 'dilate' or 'erode' (default: 'dilate')
 * @param {number} options.radius - Morphology radius (default: 1)
 * @returns {string} SVG filter definition
 */
function createMorphologyFilter(id, options = {}) {
  const {
    operator = 'dilate',
    radius = 1
  } = options;

  return `
    <filter id="${id}">
      <feMorphology operator="${operator}" radius="${radius}"/>
    </filter>`;
}

/**
 * Create a convolve matrix filter (sharpen, emboss, etc.)
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {string} options.preset - 'sharpen', 'emboss', 'edge' (default: 'sharpen')
 * @param {number[]} options.matrix - Custom 3x3 kernel matrix
 * @returns {string} SVG filter definition
 */
function createConvolveFilter(id, options = {}) {
  const {
    preset = 'sharpen',
    matrix = null
  } = options;

  const presets = {
    sharpen: '0 -1 0 -1 5 -1 0 -1 0',
    emboss: '-2 -1 0 -1 1 1 0 1 2',
    edge: '-1 -1 -1 -1 8 -1 -1 -1 -1'
  };

  const kernelMatrix = matrix ? matrix.join(' ') : (presets[preset] || presets.sharpen);

  return `
    <filter id="${id}">
      <feConvolveMatrix kernelMatrix="${kernelMatrix}"/>
    </filter>`;
}

/**
 * Create a composite filter combining multiple effects
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options - Filter options
 * @param {boolean} options.blur - Include blur (default: true)
 * @param {number} options.blurAmount - Blur amount (default: 1)
 * @param {boolean} options.saturate - Include saturation (default: true)
 * @param {number} options.saturation - Saturation value (default: 1.5)
 * @param {boolean} options.turbulence - Include turbulence (default: false)
 * @param {number} options.turbulenceScale - Turbulence scale (default: 2)
 * @returns {string} SVG filter definition
 */
function createCompositeFilter(id, options = {}) {
  const {
    blur = true,
    blurAmount = 1,
    saturate = true,
    saturation = 1.5,
    turbulence = false,
    turbulenceScale = 2
  } = options;

  let filter = `<filter id="${id}">`;

  if (blur) {
    filter += `<feGaussianBlur in="SourceGraphic" stdDeviation="${blurAmount}" result="blur"/>`;
  }

  if (saturate) {
    filter += `<feColorMatrix type="saturate" values="${saturation}"/>`;
  }

  if (turbulence) {
    filter += `<feTurbulence baseFrequency="0.02" numOctaves="3" result="noise"/>`;
    filter += `<feDisplacementMap in="SourceGraphic" in2="noise" scale="${turbulenceScale}"/>`;
  }

  filter += `<feComposite operator="over" in2="SourceGraphic"/>`;
  filter += `</filter>`;

  return filter;
}

module.exports = {
  // Static filter accessors
  getAllFilters,
  getFilter,
  getFilters,
  getFilterUrl,
  getFilterForGradientType,

  // Parameterized filter generators
  createBlurFilter,
  createTurbulenceFilter,
  createGlowFilter,
  createDropShadowFilter,
  createColorMatrixFilter,
  createSpecularLightingFilter,
  createMorphologyFilter,
  createConvolveFilter,
  createCompositeFilter
};
