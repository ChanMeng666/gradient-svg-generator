/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const luxuryGradients = require('../../utils/gradientGenerators/luxuryGradients');

const category = 'luxury';

/** @type {EffectManifest} */
const manifest = {
  id: 'luxury',
  category,
  effects: [
    {
      name: 'goldFoil',
      category,
      generator: luxuryGradients.createGoldFoilGradient,
      outputType: 'gradient',
      description: 'Gold foil shimmer',
      templates: ['golden-leaf'],
    },
    {
      name: 'diamondSparkle',
      category,
      generator: luxuryGradients.createDiamondGradient,
      outputType: 'gradient',
      description: 'Diamond sparkle effect',
      templates: ['diamond-sparkle'],
    },
    {
      name: 'marble',
      category,
      generator: luxuryGradients.createMarbleGradient,
      outputType: 'gradient',
      description: 'Marble stone texture',
      templates: ['marble-royal'],
    },
    {
      name: 'platinum',
      category,
      generator: luxuryGradients.createPlatinumGradient,
      outputType: 'gradient',
      description: 'Platinum metallic finish',
      templates: ['platinum-shine'],
    },
    {
      name: 'roseGold',
      category,
      generator: luxuryGradients.createRoseGoldGradient,
      outputType: 'gradient',
      description: 'Rose gold elegance',
      templates: ['rose-gold-elegance'],
    },
    {
      name: 'crystal',
      category,
      generator: luxuryGradients.createCrystalGradient,
      outputType: 'gradient',
      description: 'Crystal clear effect',
      templates: ['crystal-prism'],
    },
    {
      name: 'velvet',
      category,
      generator: luxuryGradients.createVelvetGradient,
      outputType: 'gradient',
      description: 'Soft velvet texture',
      templates: ['velvet-luxury'],
    },
  ],
};

module.exports = { manifest };
