/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const effectGradients = require('../../utils/gradientGenerators/effectGradients');

const category = 'effects';

/** @type {EffectManifest} */
const manifest = {
  id: 'effects',
  category,
  effects: [
    {
      name: 'galaxy',
      category,
      generator: effectGradients.createGalaxyGradient,
      outputType: 'gradient',
      description: 'Galaxy spiral effect',
      filters: ['galaxyEffect'],
      templates: [],
    },
    {
      name: 'spiral',
      category,
      generator: effectGradients.createSpiralGradient,
      outputType: 'gradient',
      description: 'Hypnotic spiral pattern',
      filters: ['spiralEffect'],
      templates: [],
    },
    {
      name: 'conic',
      category,
      generator: effectGradients.createConicGradient,
      outputType: 'gradient',
      description: 'Conic gradient rotation',
      filters: ['crystalEffect'],
      templates: [],
    },
    {
      name: 'luminance',
      category,
      generator: effectGradients.createLuminanceGradient,
      outputType: 'gradient',
      description: 'Luminance glow effect',
      filters: ['luminanceEffect'],
      templates: ['luminance-glow', 'neon-luminance', 'fire-luminance'],
    },
    {
      name: 'textBox',
      category,
      generator: effectGradients.createTextBoxGradient,
      outputType: 'gradient',
      description: 'Text box popup effect',
      filters: ['textBoxEffect'],
      templates: ['text-box-popup', 'border-draw'],
    },
    {
      name: 'glitch',
      category,
      generator: effectGradients.createGlitchGradient,
      outputType: 'gradient',
      description: 'Digital glitch effect',
      filters: ['glitchEffect'],
      templates: ['glitch-matrix', 'data-corruption', 'glitch-cyber'],
    },
    {
      name: 'typewriter',
      category,
      generator: effectGradients.createTypewriterGradient,
      outputType: 'gradient',
      description: 'Typewriter text reveal',
      filters: ['typewriterEffect'],
      templates: ['typewriter-code', 'typewriter-terminal'],
    },
  ],
};

module.exports = { manifest };
