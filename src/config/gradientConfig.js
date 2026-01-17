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

// gradientConfig.js - Now uses lazy loading via TemplateRegistry
const TemplateRegistry = require('../core/TemplateRegistry');
const { getRandomGradientPalette, getTimedPalette } = require('./colorPalettes');

// Lazy template access - templates are loaded on-demand
const getTemplateByName = (name) => TemplateRegistry.getTemplate(name);

function getTemplateConfig(template, defaultColor = '000000') {
  console.log(`[gradientConfig] getTemplateConfig called with template="${template}"`);

  const selectedTemplate = getTemplateByName(template);

  console.log(`[gradientConfig] Template lookup result:`, {
    templateName: template,
    found: !!selectedTemplate,
    templateData: selectedTemplate ? {
      name: selectedTemplate.name,
      colors: selectedTemplate.colors,
      gradientType: selectedTemplate.gradientType,
      animationDuration: selectedTemplate.animationDuration
    } : null
  });

  if (!template || !selectedTemplate) {
    console.log(`[gradientConfig] ⚠️ Template NOT found, using defaults`);
    return {
      colors: [defaultColor, `${defaultColor}88`],
      gradientType: 'horizontal',
      animationDuration: '6s'
    };
  }

  console.log(`[gradientConfig] ✅ Template found, returning config with colors:`, selectedTemplate.colors);
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
  'steelAqua',
  // 🌟 NEW: Enhanced Animation Effects (inspired by svg-banners example project)
  'rainbowLayer',
  'glitchEnhanced',
  'luminanceEnhanced',
  'borderDrawing',
  'layeredWave',
  'typewriterEnhanced',
  // 🌟 NEW: Path-Based Text Animation (inspired by Readme Typing SVG)
  'typingPathReveal',
  'curvedFlow',
  'spiralText',
  'waveTextPath',
  'charByChar',
  'wordCascade',
  'lineSequence',
  'fadeInPath',
  'handwriting',
  'brushStroke',
  'neonFlicker',
  'elasticBounce',
  // 🌟 NEW: Blob Morphing Effects (inspired by capsule-render Venom effect)
  'blobMorph',
  'liquidBlob',
  'organicBlob',
  // 🌟 NEW: Layered Wave Effects (inspired by capsule-render Waving effect)
  'layeredWaves',
  // 🌟 NEW: Blur Motion Effects (inspired by capsule-render Blur effect)
  'blurMotion',
  'dreamyCircles',
  'abstractBlur',
  // 🌟 NEW: Shape Background Effects (inspired by capsule-render shape types)
  'cylinder',
  'softRounded',
  'eggShape',
  'sliceShape',
  'speechBubble',
  'sharkTeeth',
  'largeRounded'
];

module.exports = {
  getTemplateConfig,
  validateConfig,
  GRADIENT_TYPES
};