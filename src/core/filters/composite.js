/**
 * Composite filter — combines blur, saturation, and optional turbulence into
 * a single filter chain. Useful shorthand when a generator needs more than
 * one effect but doesn't warrant hand-writing the full <filter> block.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {boolean} [options.blur=true] - Include Gaussian blur
 * @param {number} [options.blurAmount=1]
 * @param {boolean} [options.saturate=true] - Include saturation
 * @param {number} [options.saturation=1.5]
 * @param {boolean} [options.turbulence=false] - Include turbulence displacement
 * @param {number} [options.turbulenceScale=2]
 * @returns {string} SVG filter definition
 */
function createCompositeFilter(id, options = {}) {
  const {
    blur = true,
    blurAmount = 1,
    saturate = true,
    saturation = 1.5,
    turbulence = false,
    turbulenceScale = 2,
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

module.exports = { createCompositeFilter };
