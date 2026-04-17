/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const organicGradients = require('../../utils/gradientGenerators/organicGradients');

const category = 'organic';

/** @type {EffectManifest} */
const manifest = {
  id: 'organic',
  category,
  effects: [
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
  ],
};

module.exports = { manifest };
