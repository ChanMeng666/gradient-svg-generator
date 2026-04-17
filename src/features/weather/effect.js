/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const weatherGradients = require('../../utils/gradientGenerators/weatherGradients');

const category = 'weather';

/** @type {EffectManifest} */
const manifest = {
  id: 'weather',
  category,
  effects: [
    {
      name: 'fogRolling',
      category,
      generator: weatherGradients.createFogRollingGradient,
      outputType: 'gradient',
      description: 'Rolling fog atmosphere',
      templates: [],
    },
    {
      name: 'monsoonRain',
      category,
      generator: weatherGradients.createMonsoonRainGradient,
      outputType: 'gradient',
      description: 'Monsoon rain effect',
      templates: [],
    },
    {
      name: 'snowfallDrift',
      category,
      generator: weatherGradients.createSnowfallDriftGradient,
      outputType: 'gradient',
      description: 'Gentle snowfall drift',
      templates: [],
    },
    {
      name: 'sandstormSwirl',
      category,
      generator: weatherGradients.createSandstormSwirlGradient,
      outputType: 'gradient',
      description: 'Swirling sandstorm',
      templates: [],
    },
    {
      name: 'tornadoVortex',
      category,
      generator: weatherGradients.createTornadoVortexGradient,
      outputType: 'gradient',
      description: 'Tornado vortex effect',
      templates: [],
    },
    {
      name: 'lightningWeb',
      category,
      generator: weatherGradients.createLightningWebGradient,
      outputType: 'gradient',
      description: 'Lightning web pattern',
      templates: [],
    },
    {
      name: 'prismRefraction',
      category,
      generator: weatherGradients.createPrismRefractionGradient,
      outputType: 'gradient',
      description: 'Prism light refraction',
      templates: [],
    },
  ],
};

module.exports = { manifest };
