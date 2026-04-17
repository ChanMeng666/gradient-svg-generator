/**
 * Barrel of all feature manifests.
 *
 * When adding a new effect category, add it here. Every manifest listed here
 * is registered automatically by src/core/registry.js on startup — there is
 * no additional table to update.
 *
 * During the Phase 4 migration this list will grow one category at a time;
 * anything not listed here continues to load via the legacy paths in
 * src/core/EffectLoader.js.
 *
 * @typedef {import('../core/schema/effect.schema').EffectManifest} EffectManifest
 */

const { manifest: basicManifest } = require('./basic/effect');

/** @type {ReadonlyArray<EffectManifest>} */
const manifests = [basicManifest];

module.exports = { manifests };
