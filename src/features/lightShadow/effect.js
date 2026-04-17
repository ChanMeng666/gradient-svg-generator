/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const lightShadowGradients = require('../../utils/gradientGenerators/lightShadowGradients');

const category = 'lightShadow';

/** @type {EffectManifest} */
const manifest = {
  id: 'lightShadow',
  category,
  effects: [
    {
      name: 'causticUnderwater',
      category,
      generator: lightShadowGradients.createCausticUnderwaterGradient,
      outputType: 'gradient',
      description: 'Underwater caustic light',
      templates: [],
    },
    {
      name: 'venetianBlind',
      category,
      generator: lightShadowGradients.createVenetianBlindGradient,
      outputType: 'gradient',
      description: 'Venetian blind shadows',
      templates: [],
    },
    {
      name: 'stainedGlass',
      category,
      generator: lightShadowGradients.createStainedGlassGradient,
      outputType: 'gradient',
      description: 'Stained glass light',
      templates: [],
    },
    {
      name: 'lensFlare',
      category,
      generator: lightShadowGradients.createLensFlareGradient,
      outputType: 'gradient',
      description: 'Camera lens flare',
      templates: [],
    },
    {
      name: 'bokehBlur',
      category,
      generator: lightShadowGradients.createBokehBlurGradient,
      outputType: 'gradient',
      description: 'Bokeh blur effect',
      templates: [],
    },
    {
      name: 'godRays',
      category,
      generator: lightShadowGradients.createGodRaysGradient,
      outputType: 'gradient',
      description: 'God rays light beams',
      templates: [],
    },
    {
      name: 'eclipseCorona',
      category,
      generator: lightShadowGradients.createEclipseCoronaGradient,
      outputType: 'gradient',
      description: 'Eclipse corona effect',
      templates: [],
    },
  ],
};

module.exports = { manifest };
