/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const metallicGradients = require('../../utils/gradientGenerators/metallicGradients');

const category = 'metallic';

/** @type {EffectManifest} */
const manifest = {
  id: 'metallic',
  category,
  effects: [
    {
      name: 'copperMetallic',
      category,
      generator: metallicGradients.createCopperMetallicGradient,
      outputType: 'gradient',
      description: 'Copper metallic finish',
      templates: [],
    },
    {
      name: 'shineShimmer',
      category,
      generator: metallicGradients.createShineShimmerGradient,
      outputType: 'gradient',
      description: 'Shimmering shine effect',
      templates: [],
    },
    {
      name: 'neonPulse',
      category,
      generator: metallicGradients.createNeonPulseGradient,
      outputType: 'gradient',
      description: 'Neon pulse glow',
      templates: [],
    },
    {
      name: 'aquaFlow',
      category,
      generator: metallicGradients.createAquaFlowGradient,
      outputType: 'gradient',
      description: 'Aqua flow effect',
      templates: [],
    },
    {
      name: 'sparkleEffect',
      category,
      generator: metallicGradients.createSparkleEffectGradient,
      outputType: 'gradient',
      description: 'Sparkle glitter effect',
      templates: [],
    },
    {
      name: 'chromeFlow',
      category,
      generator: metallicGradients.createChromeFlowGradient,
      outputType: 'gradient',
      description: 'Chrome flow finish',
      templates: [],
    },
    {
      name: 'bronzeGleam',
      category,
      generator: metallicGradients.createBronzeGleamGradient,
      outputType: 'gradient',
      description: 'Bronze gleam shine',
      templates: [],
    },
    {
      name: 'platinumSparkle',
      category,
      generator: metallicGradients.createPlatinumSparkleGradient,
      outputType: 'gradient',
      description: 'Platinum sparkle',
      templates: [],
    },
    {
      name: 'steelAqua',
      category,
      generator: metallicGradients.createSteelAquaGradient,
      outputType: 'gradient',
      description: 'Steel aqua blend',
      templates: [],
    },
  ],
};

module.exports = { manifest };
