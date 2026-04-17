/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const culinaryLiquidGradients = require('../../utils/gradientGenerators/culinaryLiquidGradients');

const category = 'culinaryLiquid';

/** @type {EffectManifest} */
const manifest = {
  id: 'culinaryLiquid',
  category,
  effects: [
    {
      name: 'coffeeCream',
      category,
      generator: culinaryLiquidGradients.createCoffeeCreamGradient,
      outputType: 'gradient',
      description: 'Coffee and cream swirl',
      templates: [],
    },
    {
      name: 'winePour',
      category,
      generator: culinaryLiquidGradients.createWinePourGradient,
      outputType: 'gradient',
      description: 'Wine pouring effect',
      templates: [],
    },
    {
      name: 'honeyDrizzle',
      category,
      generator: culinaryLiquidGradients.createHoneyDrizzleGradient,
      outputType: 'gradient',
      description: 'Honey drizzle flow',
      templates: [],
    },
    {
      name: 'chocolateMelt',
      category,
      generator: culinaryLiquidGradients.createChocolateMeltGradient,
      outputType: 'gradient',
      description: 'Melting chocolate',
      templates: [],
    },
    {
      name: 'caramelSwirl',
      category,
      generator: culinaryLiquidGradients.createCaramelSwirlGradient,
      outputType: 'gradient',
      description: 'Caramel swirl pattern',
      templates: [],
    },
    {
      name: 'tieDye',
      category,
      generator: culinaryLiquidGradients.createTieDyeGradient,
      outputType: 'gradient',
      description: 'Tie-dye pattern',
      templates: [],
    },
    {
      name: 'marbleMixing',
      category,
      generator: culinaryLiquidGradients.createMarbleMixingGradient,
      outputType: 'gradient',
      description: 'Marble mixing effect',
      templates: [],
    },
  ],
};

module.exports = { manifest };
