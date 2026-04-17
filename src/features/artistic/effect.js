/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const artisticGradients = require('../../utils/gradientGenerators/artisticGradients');

const category = 'artistic';

/** @type {EffectManifest} */
const manifest = {
  id: 'artistic',
  category,
  effects: [
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
  ],
};

module.exports = { manifest };
