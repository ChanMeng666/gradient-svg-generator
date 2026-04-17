/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const pathTextGradients = require('../../utils/gradientGenerators/pathTextGradients');

const category = 'pathText';

/** @type {EffectManifest} */
const manifest = {
  id: 'pathText',
  category,
  effects: [
    {
      name: 'pathText',
      category,
      generator: pathTextGradients.createPathTextGradient,
      outputType: 'complete',
      description: 'Animated path text reveal',
      templates: [],
    },
  ],
};

module.exports = { manifest };
