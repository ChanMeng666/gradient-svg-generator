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

module.exports = {
  getAllFilters,
  getFilter,
  getFilters,
  getFilterUrl,
  getFilterForGradientType
};
