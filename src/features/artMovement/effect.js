/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const artMovementGradients = require('../../utils/gradientGenerators/artMovementGradients');

const category = 'artMovement';

/** @type {EffectManifest} */
const manifest = {
  id: 'artMovement',
  category,
  effects: [
    {
      name: 'artNouveauFlow',
      category,
      generator: artMovementGradients.createArtNouveauFlowGradient,
      outputType: 'gradient',
      description: 'Art Nouveau flowing curves',
      templates: [],
    },
    {
      name: 'artDecoLuxury',
      category,
      generator: artMovementGradients.createArtDecoLuxuryGradient,
      outputType: 'gradient',
      description: 'Art Deco geometric luxury',
      templates: [],
    },
    {
      name: 'bauhausMinimal',
      category,
      generator: artMovementGradients.createBauhausMinimalGradient,
      outputType: 'gradient',
      description: 'Bauhaus minimalist design',
      templates: [],
    },
    {
      name: 'impressionistDots',
      category,
      generator: artMovementGradients.createImpressionistDotsGradient,
      outputType: 'gradient',
      description: 'Impressionist pointillism',
      templates: [],
    },
    {
      name: 'cubistFragments',
      category,
      generator: artMovementGradients.createCubistFragmentsGradient,
      outputType: 'gradient',
      description: 'Cubist fragmented shapes',
      templates: [],
    },
    {
      name: 'surrealistMelt',
      category,
      generator: artMovementGradients.createSurrealistMeltGradient,
      outputType: 'gradient',
      description: 'Surrealist melting effect',
      templates: [],
    },
    {
      name: 'popArtHalftone',
      category,
      generator: artMovementGradients.createPopArtHalftoneGradient,
      outputType: 'gradient',
      description: 'Pop Art halftone pattern',
      templates: [],
    },
  ],
};

module.exports = { manifest };
