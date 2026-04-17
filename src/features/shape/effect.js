/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const shapeGradients = require('../../utils/gradientGenerators/shapeGradients');

const category = 'shapes';

/** @type {EffectManifest} */
const manifest = {
  id: 'shape',
  category,
  effects: [
    {
      name: 'circular',
      category,
      generator: shapeGradients.createCircularGradient,
      outputType: 'gradient',
      description: 'Circular gradient with rotation',
    },
    {
      name: 'star',
      category,
      generator: shapeGradients.createStarGradient,
      outputType: 'gradient',
      description: 'Star-shaped gradient pattern',
      filters: ['starEffect'],
    },
    {
      name: 'heart',
      category,
      generator: shapeGradients.createHeartGradient,
      outputType: 'gradient',
      description: 'Heart-shaped gradient for romantic themes',
      filters: ['heartEffect'],
    },
    {
      name: 'lightning',
      category,
      generator: shapeGradients.createLightningGradient,
      outputType: 'gradient',
      description: 'Electric lightning effect',
      filters: ['lightningEffect'],
    },
    {
      name: 'wave',
      category,
      generator: shapeGradients.createWaveGradient,
      outputType: 'gradient',
      description: 'Wave pattern with flow animation',
      filters: ['waveEffect'],
      templates: ['wave-flow', 'waving-banner'],
    },
    {
      name: 'zigzag',
      category,
      generator: shapeGradients.createZigzagGradient,
      outputType: 'gradient',
      description: 'Zigzag pattern effect',
      filters: ['zigzagEffect'],
    },
    {
      name: 'ripple',
      category,
      generator: shapeGradients.createRippleGradient,
      outputType: 'gradient',
      description: 'Ripple effect like water',
      filters: ['rippleEffect'],
    },
  ],
};

module.exports = { manifest };
