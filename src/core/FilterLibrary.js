/**
 * Filter library facade.
 *
 * The filter primitives originally lived in this 604-LOC file. Phase 6 split
 * them into per-factory modules under `src/core/filters/` (blur, turbulence,
 * glow, shadow, colorMatrix, lighting, morphology, convolve, composite) plus
 * `presets.js` for the static filter catalog and `lookups.js` for the
 * registry helpers.
 *
 * This file is now a thin backward-compat shim so the 16+ existing consumers
 * keep working unchanged. New code should import directly from
 * `src/core/filters` or its sub-modules.
 */

module.exports = require('./filters');
