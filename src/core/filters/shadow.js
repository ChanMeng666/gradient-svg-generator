/**
 * Drop shadow filter.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {number} [options.dx=2] - X offset
 * @param {number} [options.dy=2] - Y offset
 * @param {number} [options.stdDeviation=3] - Blur amount
 * @param {string} [options.color='rgba(0,0,0,0.5)'] - Shadow color
 * @param {number} [options.opacity=0.5] - Shadow opacity
 * @returns {string} SVG filter definition
 */
function createDropShadowFilter(id, options = {}) {
  const { dx = 2, dy = 2, stdDeviation = 3, color = 'rgba(0,0,0,0.5)', opacity = 0.5 } = options;

  return `
    <filter id="${id}">
      <feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${stdDeviation}" flood-color="${color}" flood-opacity="${opacity}"/>
    </filter>`;
}

module.exports = { createDropShadowFilter };
