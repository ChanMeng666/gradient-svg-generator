/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const gamingGradients = require('../../utils/gradientGenerators/gamingGradients');

const category = 'gaming';

/** @type {EffectManifest} */
const manifest = {
  id: 'gaming',
  category,
  effects: [
    {
      name: 'pixelArt',
      category,
      generator: gamingGradients.createPixelArtGradient,
      outputType: 'gradient',
      description: '8-bit pixel art style',
      templates: ['pixel-art-retro'],
    },
    {
      name: 'neonArcade',
      category,
      generator: gamingGradients.createNeonArcadeGradient,
      outputType: 'gradient',
      description: 'Neon arcade aesthetic',
      templates: ['neon-arcade'],
    },
    {
      name: 'energyBlast',
      category,
      generator: gamingGradients.createEnergyBlastGradient,
      outputType: 'gradient',
      description: 'Energy blast animation',
      templates: ['energy-blast'],
    },
    {
      name: 'speedLines',
      category,
      generator: gamingGradients.createSpeedLinesGradient,
      outputType: 'gradient',
      description: 'Speed lines motion effect',
      templates: ['racing-speed'],
    },
    {
      name: 'bossBattle',
      category,
      generator: gamingGradients.createBossBattleGradient,
      outputType: 'gradient',
      description: 'Epic boss battle atmosphere',
      templates: ['boss-battle'],
    },
    {
      name: 'powerUp',
      category,
      generator: gamingGradients.createPowerUpGradient,
      outputType: 'gradient',
      description: 'Power-up collection effect',
      templates: ['power-up-glow'],
    },
    {
      name: 'cyberpunk',
      category,
      generator: gamingGradients.createCyberpunkGradient,
      outputType: 'gradient',
      description: 'Cyberpunk aesthetic',
      templates: ['cyberpunk-city'],
    },
    {
      name: 'retroWave',
      category,
      generator: gamingGradients.createRetroWaveGradient,
      outputType: 'gradient',
      description: 'Retro wave 80s style',
      templates: ['retro-wave'],
    },
  ],
};

module.exports = { manifest };
