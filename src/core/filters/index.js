/**
 * Filter barrel — unified entry point for the per-filter modules split out
 * from the former monolithic FilterLibrary.js. Consumers can import the
 * whole set via `require('src/core/filters')` or cherry-pick individual
 * factories from their own modules.
 */

module.exports = {
  ...require('./blur'),
  ...require('./turbulence'),
  ...require('./glow'),
  ...require('./shadow'),
  ...require('./colorMatrix'),
  ...require('./lighting'),
  ...require('./morphology'),
  ...require('./convolve'),
  ...require('./composite'),
  ...require('./presets'),
  ...require('./lookups'),
};
