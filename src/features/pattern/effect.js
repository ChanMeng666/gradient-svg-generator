/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const patternGradients = require('../../utils/gradientGenerators/patternGradients');

const category = 'pattern';

/** @type {EffectManifest} */
const manifest = {
  id: 'pattern',
  category,
  effects: [
    {
      name: 'candystripe',
      category,
      generator: patternGradients.createCandystripeGradient,
      outputType: 'gradient',
      description: 'Candy stripe pattern',
      templates: [],
    },
    {
      name: 'zigzagPattern',
      category,
      generator: patternGradients.createZigzagGradient,
      outputType: 'gradient',
      description: 'Zigzag pattern',
      templates: [],
    },
    {
      name: 'diamondPattern',
      category,
      generator: patternGradients.createDiamondPatternGradient,
      outputType: 'gradient',
      description: 'Diamond pattern',
      templates: [],
    },
    {
      name: 'heartsPattern',
      category,
      generator: patternGradients.createHeartsPatternGradient,
      outputType: 'gradient',
      description: 'Hearts pattern',
      templates: [],
    },
    {
      name: 'checkered',
      category,
      generator: patternGradients.createCheckeredGradient,
      outputType: 'gradient',
      description: 'Checkered pattern',
      templates: [],
    },
    {
      name: 'diagonalFlow',
      category,
      generator: patternGradients.createDiagonalFlowGradient,
      outputType: 'gradient',
      description: 'Diagonal flow lines',
      templates: [],
    },
    {
      name: 'geometricPulse',
      category,
      generator: patternGradients.createGeometricPulseGradient,
      outputType: 'gradient',
      description: 'Geometric pulse animation',
      templates: [],
    },
    {
      name: 'patternWave',
      category,
      generator: patternGradients.createPatternWaveGradient,
      outputType: 'gradient',
      description: 'Pattern wave effect',
      templates: [],
    },
  ],
};

module.exports = { manifest };
