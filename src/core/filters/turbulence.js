/**
 * Turbulence displacement filter. The most heavily-reused filter primitive —
 * the pattern appears 40+ times across the gradient generators.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {string|number} [options.baseFrequency='0.02'] - Turbulence frequency
 * @param {number} [options.numOctaves=3] - Turbulence octaves
 * @param {number} [options.scale=20] - Displacement scale
 * @param {boolean} [options.animated=false] - Whether to animate the scale
 * @param {string} [options.animationValues='20;40;20'] - Scale animation values
 * @param {string} [options.duration='6s'] - Animation duration
 * @returns {string} SVG filter definition
 */
function createTurbulenceFilter(id, options = {}) {
  const {
    baseFrequency = '0.02',
    numOctaves = 3,
    scale = 20,
    animated = false,
    animationValues = '20;40;20',
    duration = '6s',
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

module.exports = { createTurbulenceFilter };
