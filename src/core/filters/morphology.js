/**
 * Morphology filter — dilate or erode the source graphic.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {'dilate'|'erode'} [options.operator='dilate']
 * @param {number} [options.radius=1]
 * @returns {string} SVG filter definition
 */
function createMorphologyFilter(id, options = {}) {
  const { operator = 'dilate', radius = 1 } = options;

  return `
    <filter id="${id}">
      <feMorphology operator="${operator}" radius="${radius}"/>
    </filter>`;
}

module.exports = { createMorphologyFilter };
