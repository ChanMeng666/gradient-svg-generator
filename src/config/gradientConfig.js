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
const cinematicTemplates = require('../templates/cinematicTemplates');
const cosmicTemplates = require('../templates/cosmicTemplates');
const fashionTemplates = require('../templates/fashionTemplates');
const architectureTemplates = require('../templates/architectureTemplates');
const culturalTemplates = require('../templates/culturalTemplates');
const weatherTemplates = require('../templates/weatherTemplates');
const musicTemplates = require('../templates/musicTemplates');
const abstractTemplates = require('../templates/abstractTemplates');

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
  ...cinematicTemplates,
  ...cosmicTemplates,
  ...fashionTemplates,
  ...architectureTemplates,
  ...culturalTemplates,
  ...weatherTemplates,
  ...musicTemplates,
  ...abstractTemplates
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

  // Validate gradient type - use GRADIENT_TYPES array for consistency
  if (!GRADIENT_TYPES.includes(config.gradientType)) {
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
  // Basic gradient types
  'horizontal',
  'vertical',
  'diagonal',
  'circular',
  'radial',
  'conic',
  'wave',
  'spiral',
  'diamond',
  'burst',
  'reflection',
  'pulse',
  'star',
  'heart',
  'zigzag',
  'ripple',
  'galaxy',
  'lightning',
  'linear',
  'reflected',
  'square',
  'ellipse',
  // Text effect types
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
  // Cinematic Series
  'film-noir-shadows',
  'spotlight-glamour',
  'neon-rain',
  'heat-waves',
  'ice-crystals',
  'blood-moon',
  'soft-bokeh',
  'explosion-smoke',
  // Cosmic Series
  'galaxy-spiral',
  'nebula-swirl',
  'gravitational-lens',
  'stellar-explosion',
  'cosmic-aurora',
  'quantum-vacuum',
  'binary-stars',
  'cosmic-radiation',
  'wormhole-distortion',
  // Fashion Series
  'runway-spotlight',
  'couture-shimmer',
  'street-neon',
  'vintage-sepia',
  'avant-garde-geometry',
  'bohemian-waves',
  'minimalist-gradient',
  'gothic-shadows',
  'cyberpunk-fashion',
  // Architecture Series
  'gothic-arches',
  'bauhaus-geometry',
  'art-deco-rays',
  'brutalist-concrete',
  'organic-flow',
  'zen-minimalism',
  'parametric-waves',
  'classical-columns',
  'deconstructed-chaos',
  'islamic-patterns',
  // Cultural Series
  'ink-brush-strokes',
  'wabi-sabi-texture',
  'mandala-circles',
  'tile-mosaic',
  'textile-weave',
  'aurora-dance',
  'ceramic-glaze',
  'lacquer-shine',
  'carpet-weave',
  'dreamtime-dots',
  // Weather Series
  'storm-lightning',
  'rainbow-arc',
  'blizzard-snow',
  'hurricane-spiral',
  'tornado-vortex',
  'misty-fog',
  'sandstorm-swirl',
  'hail-impact',
  'sunshower-rays',
  'cloud-undulation',
  // Music Series
  'synthwave-grid',
  'classical-elegance',
  'jazz-smoke',
  'electronic-pulse',
  'rock-energy',
  'opera-grandeur',
  'ambient-flow',
  'orchestral-crescendo',
  'dubstep-bass',
  'piano-keys',
  'choir-harmony',
  // Abstract Series
  'kandinsky-chaos',
  'mondrian-grid',
  'pollock-splatter',
  'rothko-blend',
  'fractal-spiral',
  'suprematist-geometry',
  'minimalist-reduction',
  'constructivist-angles',
  'op-art-illusion',
  'dadaist-disorder',
  'conceptual-space',
  'fluxus-flow'
];

module.exports = { 
  getTemplateConfig,
  validateConfig,
  GRADIENT_TYPES
};