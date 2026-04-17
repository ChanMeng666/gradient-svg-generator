/**
 * Effect registration driven by declarative manifests.
 *
 * Replaces the hand-written loadXxxGradients() functions in
 * src/core/EffectLoader.js. Each manifest declares its effects and template
 * aliases; this module iterates them and feeds EffectRegistry.
 *
 * @typedef {import('./schema/effect.schema').EffectManifest} EffectManifest
 */

const { effectRegistry } = require('./EffectRegistry');
const { manifests } = require('../features');

/**
 * Register every effect declared by the given manifests. Effects already
 * present in the registry are skipped, so this function is safe to call
 * alongside the legacy EffectLoader during the migration window.
 *
 * @param {ReadonlyArray<EffectManifest>} [manifestList]
 */
function loadEffectsFromManifests(manifestList = manifests) {
  for (const manifest of manifestList) {
    for (const effect of manifest.effects) {
      if (effectRegistry.has(effect.name)) continue;
      effectRegistry.register(effect);
    }
  }
}

/**
 * IDs of the feature manifests that own their effect registration. The
 * legacy EffectLoader.js can consult this to skip hand-written loaders
 * for any category that has already migrated to a manifest.
 *
 * @returns {Set<string>}
 */
function getMigratedCategoryIds() {
  return new Set(manifests.map((m) => m.id));
}

module.exports = { loadEffectsFromManifests, getMigratedCategoryIds };
