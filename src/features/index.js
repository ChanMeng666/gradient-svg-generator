/**
 * Barrel of all feature manifests.
 *
 * When adding a new effect category: create src/features/<name>/effect.js
 * exporting a `manifest`, then add a line here. The registry auto-picks it up.
 *
 * @typedef {import('../core/schema/effect.schema').EffectManifest} EffectManifest
 */

const { manifest: basicManifest } = require('./basic/effect');
const { manifest: shapeManifest } = require('./shape/effect');
const { manifest: effectsManifest } = require('./effects/effect');
const { manifest: techManifest } = require('./tech/effect');
const { manifest: artManifest } = require('./art/effect');
const { manifest: natureManifest } = require('./nature/effect');
const { manifest: luxuryManifest } = require('./luxury/effect');
const { manifest: gamingManifest } = require('./gaming/effect');
const { manifest: lightShadowManifest } = require('./lightShadow/effect');
const { manifest: culinaryLiquidManifest } = require('./culinaryLiquid/effect');
const { manifest: patternManifest } = require('./pattern/effect');
const { manifest: metallicManifest } = require('./metallic/effect');
const { manifest: pathTextManifest } = require('./pathText/effect');
const { manifest: githubProfileManifest } = require('./githubProfile/effect');
const { manifest: rawAdvancedManifest } = require('./rawAdvanced/effect');
const { manifest: advancedManifest } = require('./advanced/effect');

/** @type {ReadonlyArray<EffectManifest>} */
const manifests = [
  basicManifest,
  shapeManifest,
  effectsManifest,
  techManifest,
  artManifest,
  natureManifest,
  luxuryManifest,
  gamingManifest,
  lightShadowManifest,
  culinaryLiquidManifest,
  patternManifest,
  metallicManifest,
  pathTextManifest,
  githubProfileManifest,
  rawAdvancedManifest,
  advancedManifest,
];

module.exports = { manifests };
