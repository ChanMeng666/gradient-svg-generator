/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const futureTechGradients = require('../../utils/gradientGenerators/futureTechGradients');

const category = 'tech';

/** @type {EffectManifest} */
const manifest = {
  id: 'tech',
  category,
  effects: [
    {
      name: 'hologram',
      category,
      generator: futureTechGradients.createHologramGradient,
      outputType: 'gradient',
      description: 'Holographic projection effect',
      templates: ['hologram-matrix'],
    },
    {
      name: 'quantum',
      category,
      generator: futureTechGradients.createQuantumGradient,
      outputType: 'gradient',
      description: 'Quantum field visualization',
      templates: ['quantum-field'],
    },
    {
      name: 'laserGrid',
      category,
      generator: futureTechGradients.createLaserGridGradient,
      outputType: 'gradient',
      description: 'Laser grid pattern',
      templates: ['laser-grid'],
    },
    {
      name: 'neuralNet',
      category,
      generator: futureTechGradients.createNeuralNetGradient,
      outputType: 'gradient',
      description: 'Neural network visualization',
      templates: ['neural-network'],
    },
    {
      name: 'plasma',
      category,
      generator: futureTechGradients.createPlasmaGradient,
      outputType: 'gradient',
      description: 'Plasma energy effect',
      templates: ['plasma-core'],
    },
    {
      name: 'dataStream',
      category,
      generator: futureTechGradients.createDataStreamGradient,
      outputType: 'gradient',
      description: 'Flowing data stream',
      templates: ['data-stream'],
    },
  ],
};

module.exports = { manifest };
