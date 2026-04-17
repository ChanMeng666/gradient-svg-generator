/**
 * Basic gradient effects manifest.
 *
 * @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest
 */

const basicGradients = require('../../utils/gradientGenerators/basicGradients');

const category = 'basic';

/** @type {EffectManifest} */
const manifest = {
  id: 'basic',
  category,
  effects: [
    {
      name: 'horizontal',
      category,
      generator: basicGradients.createHorizontalGradient,
      outputType: 'gradient',
      description: 'Horizontal gradient with smooth animation',
    },
    {
      name: 'vertical',
      category,
      generator: basicGradients.createVerticalGradient,
      outputType: 'gradient',
      description: 'Vertical gradient with smooth animation',
    },
    {
      name: 'diagonal',
      category,
      generator: basicGradients.createDiagonalGradient,
      outputType: 'gradient',
      description: 'Diagonal gradient from corner to corner',
    },
    {
      name: 'radial',
      category,
      generator: basicGradients.createRadialGradient,
      outputType: 'gradient',
      description: 'Radial gradient emanating from center',
      filters: ['radialBlur'],
    },
    {
      name: 'burst',
      category,
      generator: basicGradients.createBurstGradient,
      outputType: 'gradient',
      description: 'Explosive burst effect with radial animation',
      filters: ['energyEffect'],
    },
    {
      name: 'pulse',
      category,
      generator: basicGradients.createPulseGradient,
      outputType: 'gradient',
      description: 'Pulsing radial effect',
      filters: ['energyEffect'],
    },
    {
      name: 'reflection',
      category,
      generator: basicGradients.createReflectionGradient,
      outputType: 'gradient',
      description: 'Mirror reflection effect',
      filters: ['reflectionEffect'],
    },
    {
      name: 'diamond',
      category,
      generator: basicGradients.createDiamondGradient,
      outputType: 'gradient',
      description: 'Diamond-shaped gradient pattern',
      filters: ['crystalEffect'],
    },
    {
      name: 'rainbow',
      category,
      generator: basicGradients.createRainbowGradient,
      outputType: 'gradient',
      description: 'Multi-color rainbow effect',
      filters: ['rainbowEffect'],
    },
  ],
};

module.exports = { manifest };
