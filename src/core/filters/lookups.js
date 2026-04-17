/**
 * Filter lookup helpers — retrieve filters from the preset catalog by ID,
 * build URL references, and map a gradient type to its default filter.
 */

const { getAllFilters } = require('./presets');

/**
 * Extract a specific filter from the preset catalog by ID.
 *
 * @param {string} filterId
 * @param {number} [height=120]
 * @returns {string|null} Filter definition, or null if not found
 */
function getFilter(filterId, height = 120) {
  const allFilters = getAllFilters(height);
  const filterRegex = new RegExp(`<filter id="${filterId}"[\\s\\S]*?<\/filter>`, 'i');
  const match = allFilters.match(filterRegex);
  return match ? match[0] : null;
}

/**
 * Extract multiple filters by ID and join them into a single <defs> fragment.
 *
 * @param {string[]} filterIds
 * @param {number} [height=120]
 * @returns {string}
 */
function getFilters(filterIds, height = 120) {
  return filterIds
    .map((id) => getFilter(id, height))
    .filter((f) => f !== null)
    .join('\n    ');
}

/**
 * Build a `url(#filterId)` reference for use in SVG element `filter=` attrs.
 *
 * @param {string} filterId
 * @returns {string}
 */
function getFilterUrl(filterId) {
  return `url(#${filterId})`;
}

/**
 * Map a gradient type to its default preset filter ID.
 * Unknown types fall back to `smoothTransition`.
 *
 * @param {string} gradientType
 * @returns {string}
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
    typewriter: 'typewriterEffect',
  };

  return filterMap[gradientType] || 'smoothTransition';
}

module.exports = {
  getFilter,
  getFilters,
  getFilterUrl,
  getFilterForGradientType,
};
