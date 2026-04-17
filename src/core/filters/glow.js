/**
 * Glow effect filter.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {string} [options.color='#ffffff'] - Glow color
 * @param {number} [options.intensity=3] - Blur intensity
 * @param {number} [options.opacity=0.6] - Glow opacity
 * @returns {string} SVG filter definition
 */
function createGlowFilter(id, options = {}) {
  const { color = '#ffffff', intensity = 3, opacity = 0.6 } = options;

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

module.exports = { createGlowFilter };
