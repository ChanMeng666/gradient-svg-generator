/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */

/**
 * Legacy EffectLoader shim.
 *
 * This file used to hand-register every effect via 17 loadXxxGradients()
 * functions and a 140-entry TEMPLATE_MAPPINGS table totalling 1,507 LOC.
 * All of that is now declarative under src/features/<name>/effect.js and
 * driven by src/core/registry.js:loadEffectsFromManifests().
 *
 * What remains: a backwards-compat `loadAllEffects` export that is a no-op.
 * External consumers that used to call `loadAllEffects()` still work; the
 * registration itself happens via manifests when UnifiedGradientGenerator
 * runs ensureInitialized().
 *
 * TEMPLATE_MAPPINGS is no longer exported — its contents were split into
 * per-category `templates: [...]` arrays inside each manifest. Nothing in
 * the repo consumed TEMPLATE_MAPPINGS directly (verified via `rg
 * TEMPLATE_MAPPINGS`).
 */

function loadAllEffects() {
  // Registration happens in src/core/registry.js:loadEffectsFromManifests().
}

module.exports = { loadAllEffects };
