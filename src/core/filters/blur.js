/**
 * Gaussian blur filter.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {number} [options.stdDeviation=2] - Blur amount
 * @param {boolean} [options.saturate=false] - Whether to add saturation
 * @param {number} [options.saturation=1.2] - Saturation value (when saturate is true)
 * @returns {string} SVG filter definition
 */
function createBlurFilter(id, options = {}) {
  const { stdDeviation = 2, saturate = false, saturation = 1.2 } = options;

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

module.exports = { createBlurFilter };
