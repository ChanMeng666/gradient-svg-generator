/**
 * Convolve matrix filter — sharpen, emboss, and edge-detection kernels.
 *
 * @param {string} id - Unique filter ID
 * @param {Object} options
 * @param {'sharpen'|'emboss'|'edge'} [options.preset='sharpen']
 * @param {number[]} [options.matrix] - Custom 3x3 kernel matrix (overrides preset)
 * @returns {string} SVG filter definition
 */
function createConvolveFilter(id, options = {}) {
  const { preset = 'sharpen', matrix = null } = options;

  const presets = {
    sharpen: '0 -1 0 -1 5 -1 0 -1 0',
    emboss: '-2 -1 0 -1 1 1 0 1 2',
    edge: '-1 -1 -1 -1 8 -1 -1 -1 -1',
  };

  const kernelMatrix = matrix ? matrix.join(' ') : presets[preset] || presets.sharpen;

  return `
    <filter id="${id}">
      <feConvolveMatrix kernelMatrix="${kernelMatrix}"/>
    </filter>`;
}

module.exports = { createConvolveFilter };
