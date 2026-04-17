/**
 * Merged nature effects manifest. Combines the previously-separate
 * organic and weather categories plus the generic-gradient-type
 * natureTemplates into one folder covering everything earth/sky/water.
 *
 * Effect names are public (used as gradientType URL params) and are
 * unchanged. The category label changes from 'organic'/'weather' to
 * 'nature', which is metadata only.
 *
 * Generators stay in src/utils/gradientGenerators/ for now; they
 * move in Phase 5.4 when generators get parameterized.
 *
 * @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest
 */

const organicGradients = require('../../utils/gradientGenerators/organicGradients');
const weatherGradients = require('../../utils/gradientGenerators/weatherGradients');

const category = 'nature';

/** @type {EffectManifest} */
const manifest = {
  id: 'nature',
  category,
  effects: [
    // Formerly "organic" -- water/fire/aurora/forest/lightning/mist
    {
      name: 'flowingWater',
      category,
      generator: organicGradients.createFlowingWaterGradient,
      outputType: 'gradient',
      description: 'Flowing water animation',
      templates: ['flowing-water'],
    },
    {
      name: 'flame',
      category,
      generator: organicGradients.createFlameGradient,
      outputType: 'gradient',
      description: 'Flickering flame effect',
      templates: ['burning-flame'],
    },
    {
      name: 'clouds',
      category,
      generator: organicGradients.createCloudsGradient,
      outputType: 'gradient',
      description: 'Cloudy atmosphere',
      templates: ['cloud-drift'],
    },
    {
      name: 'aurora',
      category,
      generator: organicGradients.createAuroraGradient,
      outputType: 'gradient',
      description: 'Aurora borealis lights',
      templates: ['aurora-borealis'],
    },
    {
      name: 'oceanWaves',
      category,
      generator: organicGradients.createOceanWavesGradient,
      outputType: 'gradient',
      description: 'Ocean wave motion',
      templates: ['ocean-waves'],
    },
    {
      name: 'forest',
      category,
      generator: organicGradients.createForestGradient,
      outputType: 'gradient',
      description: 'Forest ambiance',
      templates: ['forest-canopy'],
    },
    {
      name: 'lightningStorm',
      category,
      generator: organicGradients.createLightningGradient,
      outputType: 'gradient',
      description: 'Lightning storm effect',
      templates: ['lightning-storm'],
    },
    {
      name: 'mountainMist',
      category,
      generator: organicGradients.createMountainMistGradient,
      outputType: 'gradient',
      description: 'Mountain mist effect',
      templates: ['mountain-mist'],
    },

    // Formerly "weather" -- fog/rain/snow/sandstorm/tornado/prism
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
