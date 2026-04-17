/**
 * Merged art effects manifest. Combines the previously-separate
 * artistic and artMovement categories into one folder so the "art"
 * family lives in a single vertical slice.
 *
 * Effect names stay identical (they're public -- users embed them in
 * gradientType URL params). The `category` label changes from
 * 'artistic'/'artMovement' to 'art', which is metadata only and drives
 * sidebar display grouping.
 *
 * Generators still live in src/utils/gradientGenerators/; they'll get
 * co-located when Phase 5.4 parameterizes them.
 *
 * @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest
 */

const artisticGradients = require('../../utils/gradientGenerators/artisticGradients');
const artMovementGradients = require('../../utils/gradientGenerators/artMovementGradients');

const category = 'art';

/** @type {EffectManifest} */
const manifest = {
  id: 'art',
  category,
  effects: [
    // Formerly "artistic" -- painterly media effects
    {
      name: 'watercolor',
      category,
      generator: artisticGradients.createWatercolorGradient,
      outputType: 'gradient',
      description: 'Watercolor paint effect',
      templates: ['watercolor-dream'],
    },
    {
      name: 'oilPaint',
      category,
      generator: artisticGradients.createOilPaintGradient,
      outputType: 'gradient',
      description: 'Oil painting texture',
      templates: ['oil-painting'],
    },
    {
      name: 'inkSplash',
      category,
      generator: artisticGradients.createInkSplashGradient,
      outputType: 'gradient',
      description: 'Ink splash effect',
      templates: ['ink-splash'],
    },
    {
      name: 'mosaic',
      category,
      generator: artisticGradients.createMosaicGradient,
      outputType: 'gradient',
      description: 'Mosaic tile pattern',
      templates: ['mosaic-tiles'],
    },
    {
      name: 'abstractGeo',
      category,
      generator: artisticGradients.createAbstractGeoGradient,
      outputType: 'gradient',
      description: 'Abstract geometric shapes',
      templates: ['abstract-geometry'],
    },
    {
      name: 'graffiti',
      category,
      generator: artisticGradients.createGraffitiGradient,
      outputType: 'gradient',
      description: 'Graffiti street art style',
      templates: ['graffiti-street'],
    },
    {
      name: 'vintage',
      category,
      generator: artisticGradients.createVintageGradient,
      outputType: 'gradient',
      description: 'Vintage retro effect',
      templates: ['vintage-poster'],
    },

    // Formerly "artMovement" -- historical art-movement aesthetics
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
