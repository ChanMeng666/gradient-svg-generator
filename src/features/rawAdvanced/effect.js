/**
 * Raw-advanced shape and text-effect wrappers.
 *
 * These effects (ellipse/square geometric shapes and the 5 "enhanced"
 * text effects) don't have individual gradient generator functions --
 * they produce complete SVG directly via advancedSvgGenerator.
 *
 * Prior to Phase 4d they were dispatched by two hardcoded arrays
 * (geometricShapeTypes, animationEffectTypes) inside
 * UnifiedGradientGenerator.js:generateLegacy. Registering them as
 * manifest effects with outputType: 'complete' moves dispatch into the
 * declarative registry path and lets those arrays be deleted.
 *
 * @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest
 */

const { generateAdvancedSVG } = require('../../utils/advancedSvgGenerator');

// Matches SVG_WIDTH in src/core/constants.ts. Hardcoded here because .js
// manifests can't require .ts constants until Phase 5 flips the runtime
// to TypeScript.
const WIDTH = 854;

/**
 * Wrapper that invokes generateAdvancedSVG with the correct effect type.
 * Returns a complete SVG document string; the `case 'complete'` branch in
 * UnifiedGradientGenerator pipes this through svgComposer.compose, which
 * passes complete content through untouched.
 *
 * @param {string} effectType
 */
function rawAdvancedGenerator(effectType) {
  return function rawAdvancedWrapper(_stops, _animConfig, duration, context) {
    return generateAdvancedSVG(effectType, context.text, context.colors, WIDTH, context.height, {
      duration,
    });
  };
}

const RAW_ADVANCED_EFFECTS = [
  // Geometric shapes
  { name: 'ellipse', category: 'shapes', description: 'Ellipse shape with radial gradient' },
  { name: 'square', category: 'shapes', description: 'Rounded square with gradient fill' },

  // Enhanced text/animation effects
  {
    name: 'glitchEnhanced',
    category: 'effects',
    description: 'Enhanced glitch with RGB channel split',
  },
  {
    name: 'luminanceEnhanced',
    category: 'effects',
    description: 'Enhanced luminance with pulse',
  },
  {
    name: 'borderDrawing',
    category: 'effects',
    description: 'Animated border-drawing reveal',
  },
  {
    name: 'layeredWave',
    category: 'effects',
    description: 'Layered wave animation',
  },
  {
    name: 'typewriterEnhanced',
    category: 'effects',
    description: 'Enhanced typewriter with cursor blink',
  },
];

/** @type {EffectManifest} */
const manifest = {
  id: 'rawAdvanced',
  category: 'rawAdvanced',
  effects: RAW_ADVANCED_EFFECTS.map((e) => ({
    ...e,
    generator: rawAdvancedGenerator(e.name),
    outputType: 'complete',
  })),
};

module.exports = { manifest };
