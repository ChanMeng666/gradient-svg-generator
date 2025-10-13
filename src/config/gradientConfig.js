/*
 *
 */

/*
 *
 */

/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 *
 */

// gradientConfig.js
const basicTemplates = require('../templates/basicTemplates');
const prideTemplates = require('../templates/prideTemplates');
const natureTemplates = require('../templates/natureTemplates');
const techTemplates = require('../templates/techTemplates');
const artTemplates = require('../templates/artTemplates');
const emotionTemplates = require('../templates/emotionTemplates');
const materialTemplates = require('../templates/materialTemplates');
const textEffectTemplates = require('../templates/textEffectTemplates');
const futureTechTemplates = require('../templates/futureTechTemplates');
const artisticTemplates = require('../templates/artisticTemplates');
const luxuryTemplates = require('../templates/luxuryTemplates');
const organicTemplates = require('../templates/organicTemplates');
const gamingTemplates = require('../templates/gamingTemplates');
// 新增的模板类别 - 借鉴自示例项目
const shapeTemplates = require('../templates/shapeTemplates');
const animationTemplates = require('../templates/animationTemplates');
// 🌟 NEW: 前沿创新模板系列
const morphingTemplates = require('../templates/morphingTemplates');
const fluidDynamicsTemplates = require('../templates/fluidDynamicsTemplates');
const dimensionalTemplates = require('../templates/dimensionalTemplates');
// 🌟 NEW: 最新前卫模板系列
const dimensionalPortalTemplates = require('../templates/dimensionalPortalTemplates');
const digitalLifeTemplates = require('../templates/digitalLifeTemplates');
const cyberAestheticsTemplates = require('../templates/cyberAestheticsTemplates');
const consciousnessStreamTemplates = require('../templates/consciousnessStreamTemplates');
// 🌟 NEW: 2025 创意扩展系列
const weatherTemplates = require('../templates/weatherTemplates');
const lightShadowTemplates = require('../templates/lightShadowTemplates');
const artMovementTemplates = require('../templates/artMovementTemplates');
const culinaryLiquidTemplates = require('../templates/culinaryLiquidTemplates');
const patternTemplates = require('../templates/patternTemplates');
const metallicTemplates = require('../templates/metallicTemplates');
const { getRandomGradientPalette, getTimedPalette } = require('./colorPalettes');

const templates = { 
  ...basicTemplates, 
  ...prideTemplates,
  ...natureTemplates,
  ...techTemplates,
  ...artTemplates,
  ...emotionTemplates,
  ...materialTemplates,
  ...textEffectTemplates,
  ...futureTechTemplates,
  ...artisticTemplates,
  ...luxuryTemplates,
  ...organicTemplates,
  ...gamingTemplates,
  // 新增模板类别
  ...shapeTemplates,
  ...animationTemplates,
  // 🌟 NEW: 前沿创新模板系列
  ...morphingTemplates,
  ...fluidDynamicsTemplates,
  ...dimensionalTemplates,
  // 🌟 NEW: 最新前卫模板系列
  ...dimensionalPortalTemplates,
  ...digitalLifeTemplates,
  ...cyberAestheticsTemplates,
  ...consciousnessStreamTemplates,
  // 🌟 NEW: 2025 创意扩展系列
  ...weatherTemplates,
  ...lightShadowTemplates,
  ...artMovementTemplates,
  ...culinaryLiquidTemplates,
  // 🌟 NEW: Pattern & Metallic templates (inspired by example project)
  ...patternTemplates,
  ...metallicTemplates
};

function getTemplateConfig(template, defaultColor = '000000') {
  if (!template || !templates[template]) {
    return {
      colors: [defaultColor, `${defaultColor}88`],
      gradientType: 'horizontal',
      animationDuration: '6s'
    };
  }

  const selectedTemplate = templates[template];
  
  return {
    colors: selectedTemplate.colors || [defaultColor, `${defaultColor}88`],
    gradientType: selectedTemplate.gradientType || 'horizontal',
    animationDuration: selectedTemplate.animationDuration || '6s',
    name: selectedTemplate.name,
    label: selectedTemplate.label,
    description: selectedTemplate.description
  };
}

// Add a helper function to validate and normalize configuration
function validateConfig(config) {
  const defaultConfig = {
    colors: ['000000'],
    gradientType: 'horizontal',
    animationDuration: '6s'
  };

  // Validate colors
  if (!Array.isArray(config.colors) || config.colors.length === 0) {
    config.colors = defaultConfig.colors;
  }

  // Validate gradient type
  const validGradientTypes = ['horizontal', 'vertical', 'diagonal', 'circular', 'radial', 'conic', 'wave', 'spiral', 'diamond', 'burst', 'reflection', 'pulse', 'star', 'heart', 'zigzag', 'ripple', 'galaxy', 'lightning', 'luminance', 'rainbow', 'textBox', 'glitch', 'typewriter'];
  if (!validGradientTypes.includes(config.gradientType)) {
    config.gradientType = defaultConfig.gradientType;
  }

  // Validate animation duration
  const duration = parseInt(config.animationDuration);
  if (isNaN(duration) || duration < 1 || duration > 20) {
    config.animationDuration = defaultConfig.animationDuration;
  } else {
    config.animationDuration = `${duration}s`;
  }

  return config;
}

const GRADIENT_TYPES = [
  'linear',
  'radial',
  'conic',
  'diamond',
  'reflected',
  'square',
  'ellipse',
  'luminance',
  'rainbow',
  'textBox',
  'glitch',
  'typewriter',
  // Future Tech Series
  'hologram',
  'quantum',
  'laserGrid',
  'neuralNet',
  'plasma',
  'dataStream',
  // Artistic Series
  'watercolor',
  'oilPaint',
  'inkSplash',
  'mosaic',
  'abstractGeo',
  'graffiti',
  'vintage',
  // Luxury Series
  'goldFoil',
  'diamond',
  'marble',
  'platinum',
  'roseGold',
  'crystal',
  'velvet',
  // Organic Nature Series
  'flowingWater',
  'flame',
  'clouds',
  'aurora',
  'oceanWaves',
  'forest',
  'lightning',
  'mountainMist',
  // Gaming Series
  'pixelArt',
  'neonArcade',
  'energyBlast',
  'speedLines',
  'bossBattle',
  'powerUp',
  'cyberpunk',
  'retroWave',
  // 🌟 NEW: Morphing Effects
  'liquidMorphing',
  'plasmaMorphing',
  'cosmicMorphing',
  'bioMorphing',
  'quantumMorphing',
  'lavaMorphing',
  // 🌟 NEW: Fluid Dynamics
  'turbulentWaves',
  'electromagneticWaves',
  'auroraWaves',
  'soundWaves',
  'cryogenicWaves',
  'solarWaves',
  // 🌟 NEW: Dimensional Effects
  'portalDistortion',
  'hypercubeProjection',
  'wormholeEffect',
  'fractalDimension',
  'multiverseOverlap',
  'realityDistortion',
  // 🌟 NEW: Dimensional Portal Effects
  'quantumTunnel',
  'parallelDimension',
  'wormholePortal',
  'dimensionalTear',
  'holographicGrid',
  'voidDistortion',
  'astralPlane',
  // 🌟 NEW: Digital Life Effects
  'aiConsciousness',
  'bioDigitalMerge',
  'quantumDNA',
  'digitalEvolution',
  'syntheticSoul',
  'cyberSymbiosis',
  'neuralStorm',
  'digitalGenome',
  // 🌟 NEW: Cyber Aesthetics Effects
  'neonCityscape',
  'dataMatrix',
  'cyberpunkShadow',
  'holographicUI',
  'pixelCorruption',
  'chromeFinish',
  'viralSpread',
  'encryptionField',
  'arOverlay',
  // 🌟 NEW: Consciousness Stream Effects
  'thoughtWaves',
  'memoryFragments',
  'dreamLogic',
  'emotionalSpectrum',
  'meditativeCalm',
  'anxietySpiral',
  'egoDissolution',
  'psychedelicInsight',
  'collectiveUnconscious',
  // 🌟 NEW: Weather & Atmospheric Effects
  'fogRolling',
  'monsoonRain',
  'snowfallDrift',
  'sandstormSwirl',
  'tornadoVortex',
  'lightningWeb',
  'prismRefraction',
  // 🌟 NEW: Light & Shadow Play Effects
  'causticUnderwater',
  'venetianBlind',
  'stainedGlass',
  'lensFlare',
  'bokehBlur',
  'godRays',
  'eclipseCorona',
  // 🌟 NEW: Art Movement Effects
  'artNouveauFlow',
  'artDecoLuxury',
  'bauhausMinimal',
  'impressionistDots',
  'cubistFragments',
  'surrealistMelt',
  'popArtHalftone',
  // 🌟 NEW: Culinary & Liquid Flow Effects
  'coffeeCream',
  'winePour',
  'honeyDrizzle',
  'chocolateMelt',
  'caramelSwirl',
  'tieDye',
  'marbleMixing',
  // 🌟 NEW: Pattern-based Effects (inspired by example project)
  'candystripe',
  'patternZigzag',
  'diamondPattern',
  'heartsPattern',
  'checkered',
  'diagonalFlow',
  'geometricPulse',
  'patternWave',
  // 🌟 NEW: Metallic & Shimmer Effects (inspired by example project)
  'copperMetallic',
  'shineShimmer',
  'neonPulse',
  'aquaFlow',
  'sparkleEffect',
  'chromeFlow',
  'bronzeGleam',
  'platinumSparkle',
  'steelAqua'
];

module.exports = { 
  getTemplateConfig,
  validateConfig,
  GRADIENT_TYPES
};