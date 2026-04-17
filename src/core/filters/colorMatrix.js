/**
 * Color matrix filter — saturation/hue adjustments with optional blur prelude.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {number} [options.saturation=1.5] - Saturation value
 * @param {number} [options.hueRotate=0] - Hue rotation in degrees
 * @param {boolean} [options.includeBlur=false] - Whether to include blur
 * @param {number} [options.blurAmount=1] - Blur amount (when includeBlur is true)
 * @returns {string} SVG filter definition
 */
function createColorMatrixFilter(id, options = {}) {
  const { saturation = 1.5, hueRotate = 0, includeBlur = false, blurAmount = 1 } = options;

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

module.exports = { createColorMatrixFilter };
