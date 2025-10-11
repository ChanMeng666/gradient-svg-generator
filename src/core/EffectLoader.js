/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const { effectRegistry } = require('./EffectRegistry');

// Import all gradient generators
const basicGradients = require('../utils/gradientGenerators/basicGradients');
const shapeGradients = require('../utils/gradientGenerators/shapeGradients');
const effectGradients = require('../utils/gradientGenerators/effectGradients');
const futureTechGradients = require('../utils/gradientGenerators/futureTechGradients');
const artisticGradients = require('../utils/gradientGenerators/artisticGradients');
const luxuryGradients = require('../utils/gradientGenerators/luxuryGradients');
const organicGradients = require('../utils/gradientGenerators/organicGradients');
const gamingGradients = require('../utils/gradientGenerators/gamingGradients');
const morphingGradients = require('../utils/gradientGenerators/morphingGradients');
const fluidDynamicsGradients = require('../utils/gradientGenerators/fluidDynamicsGradients');
const dimensionalGradients = require('../utils/gradientGenerators/dimensionalGradients');

// Import advanced effect generators
const { generateAdvancedEffect } = require('../utils/advancedEffectGenerator');
const { generateAdvancedSVG } = require('../utils/advancedSvgGenerator');

/**
 * Template to effect name mappings
 * Consolidated from gradientGenerator.js
 */
const TEMPLATE_MAPPINGS = {
  // Shape templates
  'wave-flow': 'wave',
  'egg-shape': 'ellipse',
  'rounded-corners': 'square',
  'waving-banner': 'wave',

  // Animation templates
  'glitch-matrix': 'glitch',
  'typewriter-code': 'typewriter',
  'luminance-glow': 'luminance',
  'rainbow-wave': 'rainbow',
  'text-box-popup': 'textBox',
  'data-corruption': 'glitch',

  // Text effect templates
  'neon-luminance': 'luminance',
  'fire-luminance': 'luminance',
  'ocean-rainbow': 'rainbow',
  'rainbow-layer': 'rainbow-layer',
  'border-draw': 'textBox',
  'glitch-cyber': 'glitch',
  'typewriter-terminal': 'typewriter',

  // Future Tech templates
  'hologram-matrix': 'hologram',
  'quantum-field': 'quantum',
  'laser-grid': 'laserGrid',
  'neural-network': 'neuralNet',
  'plasma-core': 'plasma',
  'data-stream': 'dataStream',

  // Artistic templates
  'watercolor-dream': 'watercolor',
  'oil-painting': 'oilPaint',
  'ink-splash': 'inkSplash',
  'mosaic-tiles': 'mosaic',
  'abstract-geometry': 'abstractGeo',
  'graffiti-street': 'graffiti',
  'vintage-poster': 'vintage',

  // Luxury templates
  'golden-leaf': 'goldFoil',
  'diamond-sparkle': 'diamondSparkle',
  'marble-royal': 'marble',
  'platinum-shine': 'platinum',
  'rose-gold-elegance': 'roseGold',
  'crystal-prism': 'crystal',
  'velvet-luxury': 'velvet',

  // Gaming templates
  'pixel-art-retro': 'pixelArt',
  'neon-arcade': 'neonArcade',
  'energy-blast': 'energyBlast',
  'racing-speed': 'speedLines',
  'boss-battle': 'bossBattle',
  'power-up-glow': 'powerUp',
  'cyberpunk-city': 'cyberpunk',
  'retro-wave': 'retroWave',

  // Organic templates
  'flowing-water': 'flowingWater',
  'burning-flame': 'flame',
  'cloud-drift': 'clouds',
  'aurora-borealis': 'aurora',
  'ocean-waves': 'oceanWaves',
  'forest-canopy': 'forest',
  'lightning-storm': 'lightningStorm',
  'mountain-mist': 'mountainMist',

  // Morphing templates
  'liquid-mercury': 'liquidMorphing',
  'plasma-blob': 'plasmaMorphing',
  'cosmic-entity': 'cosmicMorphing',
  'bio-organism': 'bioMorphing',
  'quantum-foam': 'quantumMorphing',
  'molten-lava': 'lavaMorphing',

  // Fluid dynamics templates
  'turbulent-waves': 'turbulentWaves',
  'electromagnetic-field': 'electromagneticWaves',
  'aurora-streams': 'auroraWaves',
  'sound-visualization': 'soundWaves',
  'liquid-nitrogen': 'cryogenicWaves',
  'solar-wind': 'solarWaves',

  // Dimensional templates
  'portal-nexus': 'portalDistortion',
  'tesseract-projection': 'hypercubeProjection',
  'wormhole-transit': 'wormholeEffect',
  'fractal-dimension': 'fractalDimension',
  'parallel-universe': 'multiverseOverlap',
  'reality-glitch': 'realityDistortion',

  // Dimensional portal templates
  'quantum-tunnel': 'quantumTunnel',
  'parallel-universe': 'parallelUniverse',
  'wormhole-transit': 'wormholeTransit',
  'dimensional-rift': 'dimensionalRift',
  'holographic-matrix': 'holographicMatrix',
  'void-chamber': 'voidChamber',
  'astral-projection': 'astralProjection',

  // Digital life templates
  'ai-consciousness': 'aiConsciousness',
  'bio-digital-merge': 'bioDigitalMerge',
  'quantum-dna': 'quantumDNA',
  'digital-evolution': 'digitalEvolution',
  'synthetic-soul': 'syntheticSoul',
  'cyber-symbiosis': 'cyberSymbiosis',
  'neural-storm': 'neuralStorm',
  'digital-genome': 'digitalGenome',

  // Cyber aesthetics templates
  'neon-grid-city': 'neonGridCity',
  'data-stream-flow': 'dataStreamFlow',
  'cyber-punk-noir': 'cyberPunkNoir',
  'hologram-interface': 'hologramInterface',
  'digital-decay': 'digitalDecay',
  'chrome-reflection': 'chromeReflection',
  'virus-infection': 'virusInfection',
  'quantum-encryption': 'quantumEncryption',
  'augmented-reality': 'augmentedReality',

  // Consciousness stream templates
  'thought-waves': 'thoughtWaves',
  'memory-fragments': 'memoryFragments',
  'dream-logic': 'dreamLogic',
  'emotional-spectrum': 'emotionalSpectrum',
  'meditative-calm': 'meditativeCalm',
  'anxiety-spiral': 'anxietySpiral',
  'ego-dissolution': 'egoDissolution',
  'psychedelic-insight': 'psychedelicInsight',
  'collective-unconscious': 'collectiveUnconscious'
};

/**
 * Load and register all basic gradient effects
 */
function loadBasicGradients() {
  const effects = [
    {
      name: 'horizontal',
      category: 'basic',
      generator: basicGradients.createHorizontalGradient,
      outputType: 'gradient',
      description: 'Horizontal gradient with smooth animation'
    },
    {
      name: 'vertical',
      category: 'basic',
      generator: basicGradients.createVerticalGradient,
      outputType: 'gradient',
      description: 'Vertical gradient with smooth animation'
    },
    {
      name: 'diagonal',
      category: 'basic',
      generator: basicGradients.createDiagonalGradient,
      outputType: 'gradient',
      description: 'Diagonal gradient from corner to corner'
    },
    {
      name: 'radial',
      category: 'basic',
      generator: basicGradients.createRadialGradient,
      outputType: 'gradient',
      description: 'Radial gradient emanating from center',
      filters: ['radialBlur']
    },
    {
      name: 'burst',
      category: 'basic',
      generator: basicGradients.createBurstGradient,
      outputType: 'gradient',
      description: 'Explosive burst effect with radial animation',
      filters: ['energyEffect']
    },
    {
      name: 'pulse',
      category: 'basic',
      generator: basicGradients.createPulseGradient,
      outputType: 'gradient',
      description: 'Pulsing radial effect',
      filters: ['energyEffect']
    },
    {
      name: 'reflection',
      category: 'basic',
      generator: basicGradients.createReflectionGradient,
      outputType: 'gradient',
      description: 'Mirror reflection effect',
      filters: ['reflectionEffect']
    },
    {
      name: 'diamond',
      category: 'basic',
      generator: basicGradients.createDiamondGradient,
      outputType: 'gradient',
      description: 'Diamond-shaped gradient pattern',
      filters: ['crystalEffect']
    },
    {
      name: 'rainbow',
      category: 'basic',
      generator: basicGradients.createRainbowGradient,
      outputType: 'gradient',
      description: 'Multi-color rainbow effect',
      filters: ['rainbowEffect']
    }
  ];

  effects.forEach(effect => effectRegistry.register(effect));
}

/**
 * Load and register all shape gradient effects
 */
function loadShapeGradients() {
  const effects = [
    {
      name: 'circular',
      category: 'shapes',
      generator: shapeGradients.createCircularGradient,
      outputType: 'gradient',
      description: 'Circular gradient with rotation'
    },
    {
      name: 'star',
      category: 'shapes',
      generator: shapeGradients.createStarGradient,
      outputType: 'gradient',
      description: 'Star-shaped gradient pattern',
      filters: ['starEffect']
    },
    {
      name: 'heart',
      category: 'shapes',
      generator: shapeGradients.createHeartGradient,
      outputType: 'gradient',
      description: 'Heart-shaped gradient for romantic themes',
      filters: ['heartEffect']
    },
    {
      name: 'lightning',
      category: 'shapes',
      generator: shapeGradients.createLightningGradient,
      outputType: 'gradient',
      description: 'Electric lightning effect',
      filters: ['lightningEffect']
    },
    {
      name: 'wave',
      category: 'shapes',
      generator: shapeGradients.createWaveGradient,
      outputType: 'gradient',
      description: 'Wave pattern with flow animation',
      filters: ['waveEffect'],
      templates: ['wave-flow', 'waving-banner']
    },
    {
      name: 'zigzag',
      category: 'shapes',
      generator: shapeGradients.createZigzagGradient,
      outputType: 'gradient',
      description: 'Zigzag pattern effect',
      filters: ['zigzagEffect']
    },
    {
      name: 'ripple',
      category: 'shapes',
      generator: shapeGradients.createRippleGradient,
      outputType: 'gradient',
      description: 'Ripple effect like water',
      filters: ['rippleEffect']
    }
  ];

  effects.forEach(effect => effectRegistry.register(effect));
}

/**
 * Helper function to get template names for an effect from TEMPLATE_MAPPINGS
 */
function getTemplatesForEffect(effectName) {
  const templates = [];
  for (const [templateName, mappedEffectName] of Object.entries(TEMPLATE_MAPPINGS)) {
    if (mappedEffectName === effectName) {
      templates.push(templateName);
    }
  }
  return templates;
}

/**
 * Load and register Future Tech effects
 */
function loadFutureTechEffects() {
  const effects = [
    { name: 'hologram', generator: futureTechGradients.createHologramGradient, description: 'Holographic projection effect' },
    { name: 'quantum', generator: futureTechGradients.createQuantumGradient, description: 'Quantum field visualization' },
    { name: 'laserGrid', generator: futureTechGradients.createLaserGridGradient, description: 'Laser grid pattern' },
    { name: 'neuralNet', generator: futureTechGradients.createNeuralNetGradient, description: 'Neural network visualization' },
    { name: 'plasma', generator: futureTechGradients.createPlasmaGradient, description: 'Plasma energy effect' },
    { name: 'dataStream', generator: futureTechGradients.createDataStreamGradient, description: 'Flowing data stream' }
  ];

  effects.forEach(effect => {
    effectRegistry.register({
      ...effect,
      category: 'futureTech',
      outputType: 'gradient',
      templates: getTemplatesForEffect(effect.name)
    });
  });
}

/**
 * Load and register Artistic effects
 */
function loadArtisticEffects() {
  const effects = [
    { name: 'watercolor', generator: artisticGradients.createWatercolorGradient, description: 'Watercolor paint effect' },
    { name: 'oilPaint', generator: artisticGradients.createOilPaintGradient, description: 'Oil painting texture' },
    { name: 'inkSplash', generator: artisticGradients.createInkSplashGradient, description: 'Ink splash effect' },
    { name: 'mosaic', generator: artisticGradients.createMosaicGradient, description: 'Mosaic tile pattern' },
    { name: 'abstractGeo', generator: artisticGradients.createAbstractGeoGradient, description: 'Abstract geometric shapes' },
    { name: 'graffiti', generator: artisticGradients.createGraffitiGradient, description: 'Graffiti street art style' },
    { name: 'vintage', generator: artisticGradients.createVintageGradient, description: 'Vintage retro effect' }
  ];

  effects.forEach(effect => {
    effectRegistry.register({
      ...effect,
      category: 'artistic',
      outputType: 'gradient',
      templates: getTemplatesForEffect(effect.name)
    });
  });
}

/**
 * Load and register Luxury effects
 */
function loadLuxuryEffects() {
  const effects = [
    { name: 'goldFoil', generator: luxuryGradients.createGoldFoilGradient, description: 'Gold foil shimmer' },
    { name: 'diamondSparkle', generator: luxuryGradients.createDiamondGradient, description: 'Diamond sparkle effect' },
    { name: 'marble', generator: luxuryGradients.createMarbleGradient, description: 'Marble stone texture' },
    { name: 'platinum', generator: luxuryGradients.createPlatinumGradient, description: 'Platinum metallic finish' },
    { name: 'roseGold', generator: luxuryGradients.createRoseGoldGradient, description: 'Rose gold elegance' },
    { name: 'crystal', generator: luxuryGradients.createCrystalGradient, description: 'Crystal clear effect' },
    { name: 'velvet', generator: luxuryGradients.createVelvetGradient, description: 'Soft velvet texture' }
  ];

  effects.forEach(effect => {
    effectRegistry.register({
      ...effect,
      category: 'luxury',
      outputType: 'gradient',
      templates: getTemplatesForEffect(effect.name)
    });
  });
}

/**
 * Load and register Gaming effects
 */
function loadGamingEffects() {
  const effects = [
    { name: 'pixelArt', generator: gamingGradients.createPixelArtGradient, description: '8-bit pixel art style' },
    { name: 'neonArcade', generator: gamingGradients.createNeonArcadeGradient, description: 'Neon arcade aesthetic' },
    { name: 'energyBlast', generator: gamingGradients.createEnergyBlastGradient, description: 'Energy blast animation' },
    { name: 'speedLines', generator: gamingGradients.createSpeedLinesGradient, description: 'Speed lines motion effect' },
    { name: 'bossBattle', generator: gamingGradients.createBossBattleGradient, description: 'Epic boss battle atmosphere' },
    { name: 'powerUp', generator: gamingGradients.createPowerUpGradient, description: 'Power-up collection effect' },
    { name: 'cyberpunk', generator: gamingGradients.createCyberpunkGradient, description: 'Cyberpunk aesthetic' },
    { name: 'retroWave', generator: gamingGradients.createRetroWaveGradient, description: 'Retro wave 80s style' }
  ];

  effects.forEach(effect => {
    effectRegistry.register({
      ...effect,
      category: 'gaming',
      outputType: 'gradient',
      templates: getTemplatesForEffect(effect.name)
    });
  });
}

/**
 * Load and register Organic effects
 */
function loadOrganicEffects() {
  const effects = [
    { name: 'flowingWater', generator: organicGradients.createFlowingWaterGradient, description: 'Flowing water animation' },
    { name: 'flame', generator: organicGradients.createFlameGradient, description: 'Flickering flame effect' },
    { name: 'clouds', generator: organicGradients.createCloudsGradient, description: 'Cloudy atmosphere' },
    { name: 'aurora', generator: organicGradients.createAuroraGradient, description: 'Aurora borealis lights' },
    { name: 'oceanWaves', generator: organicGradients.createOceanWavesGradient, description: 'Ocean wave motion' },
    { name: 'forest', generator: organicGradients.createForestGradient, description: 'Forest ambiance' },
    { name: 'lightningStorm', generator: organicGradients.createLightningGradient, description: 'Lightning storm effect' },
    { name: 'mountainMist', generator: organicGradients.createMountainMistGradient, description: 'Mountain mist effect' }
  ];

  effects.forEach(effect => {
    effectRegistry.register({
      ...effect,
      category: 'organic',
      outputType: 'gradient',
      templates: getTemplatesForEffect(effect.name)
    });
  });
}

/**
 * Load and register advanced effects that use advancedEffectGenerator
 * These are effects that require complete SVG generation (not just gradients)
 */
function loadAdvancedComplexEffects() {
  const advancedEffects = [
    // Morphing
    { name: 'liquidMorphing', category: 'morphing', description: 'Liquid mercury morphing', templates: ['liquid-mercury'] },
    { name: 'plasmaMorphing', category: 'morphing', description: 'Plasma blob morphing', templates: ['plasma-blob'] },
    { name: 'cosmicMorphing', category: 'morphing', description: 'Cosmic entity morphing', templates: ['cosmic-entity'] },
    { name: 'bioMorphing', category: 'morphing', description: 'Biological morphing', templates: ['bio-organism'] },
    { name: 'quantumMorphing', category: 'morphing', description: 'Quantum foam morphing', templates: ['quantum-foam'] },
    { name: 'lavaMorphing', category: 'morphing', description: 'Molten lava morphing', templates: ['molten-lava'] },

    // Fluid Dynamics
    { name: 'turbulentWaves', category: 'fluidDynamics', description: 'Turbulent wave motion', templates: ['turbulent-waves'] },
    { name: 'electromagneticWaves', category: 'fluidDynamics', description: 'Electromagnetic field waves', templates: ['electromagnetic-field'] },
    { name: 'auroraWaves', category: 'fluidDynamics', description: 'Aurora wave streams', templates: ['aurora-streams'] },
    { name: 'soundWaves', category: 'fluidDynamics', description: 'Sound wave visualization', templates: ['sound-visualization'] },
    { name: 'cryogenicWaves', category: 'fluidDynamics', description: 'Cryogenic wave effect', templates: ['liquid-nitrogen'] },
    { name: 'solarWaves', category: 'fluidDynamics', description: 'Solar wind waves', templates: ['solar-wind'] },

    // Dimensional
    { name: 'portalDistortion', category: 'dimensional', description: 'Portal distortion effect', templates: ['portal-nexus'] },
    { name: 'hypercubeProjection', category: 'dimensional', description: 'Hypercube 4D projection', templates: ['tesseract-projection'] },
    { name: 'wormholeEffect', category: 'dimensional', description: 'Wormhole space-time effect', templates: ['wormhole-transit'] },
    { name: 'fractalDimension', category: 'dimensional', description: 'Fractal dimension visualization', templates: ['fractal-dimension'] },
    { name: 'multiverseOverlap', category: 'dimensional', description: 'Parallel universe overlap', templates: ['parallel-universe'] },
    { name: 'realityDistortion', category: 'dimensional', description: 'Reality distortion glitch', templates: ['reality-glitch'] },

    // Dimensional Portal
    { name: 'quantumTunnel', category: 'dimensionalPortal', description: 'Quantum tunnel passage', templates: ['quantum-tunnel'] },
    { name: 'parallelUniverse', category: 'dimensionalPortal', description: 'Parallel universe portal', templates: ['parallel-universe'] },
    { name: 'wormholeTransit', category: 'dimensionalPortal', description: 'Wormhole transit animation', templates: ['wormhole-transit'] },
    { name: 'dimensionalRift', category: 'dimensionalPortal', description: 'Dimensional rift opening', templates: ['dimensional-rift'] },
    { name: 'holographicMatrix', category: 'dimensionalPortal', description: 'Holographic matrix grid', templates: ['holographic-matrix'] },
    { name: 'voidChamber', category: 'dimensionalPortal', description: 'Void chamber darkness', templates: ['void-chamber'] },
    { name: 'realityGlitch', category: 'dimensionalPortal', description: 'Reality glitch effect', templates: ['reality-glitch'] },
    { name: 'astralProjection', category: 'dimensionalPortal', description: 'Astral projection effect', templates: ['astral-projection'] },

    // Digital Life
    { name: 'aiConsciousness', category: 'digitalLife', description: 'AI consciousness visualization', templates: ['ai-consciousness'] },
    { name: 'bioDigitalMerge', category: 'digitalLife', description: 'Bio-digital fusion effect', templates: ['bio-digital-merge'] },
    { name: 'quantumDNA', category: 'digitalLife', description: 'Quantum DNA helix', templates: ['quantum-dna'] },
    { name: 'digitalEvolution', category: 'digitalLife', description: 'Digital evolution process', templates: ['digital-evolution'] },
    { name: 'syntheticSoul', category: 'digitalLife', description: 'Synthetic soul visualization', templates: ['synthetic-soul'] },
    { name: 'cyberSymbiosis', category: 'digitalLife', description: 'Cyber symbiosis effect', templates: ['cyber-symbiosis'] },
    { name: 'neuralStorm', category: 'digitalLife', description: 'Neural storm activity', templates: ['neural-storm'] },
    { name: 'digitalGenome', category: 'digitalLife', description: 'Digital genome sequence', templates: ['digital-genome'] },

    // Cyber Aesthetics
    { name: 'neonGridCity', category: 'cyberAesthetics', description: 'Neon grid cityscape', templates: ['neon-grid-city'] },
    { name: 'dataStreamFlow', category: 'cyberAesthetics', description: 'Data stream matrix flow', templates: ['data-stream-flow'] },
    { name: 'cyberPunkNoir', category: 'cyberAesthetics', description: 'Cyberpunk noir atmosphere', templates: ['cyber-punk-noir'] },
    { name: 'hologramInterface', category: 'cyberAesthetics', description: 'Hologram UI interface', templates: ['hologram-interface'] },
    { name: 'digitalDecay', category: 'cyberAesthetics', description: 'Digital decay corruption', templates: ['digital-decay'] },
    { name: 'chromeReflection', category: 'cyberAesthetics', description: 'Chrome reflection finish', templates: ['chrome-reflection'] },
    { name: 'virusInfection', category: 'cyberAesthetics', description: 'Virus infection spread', templates: ['virus-infection'] },
    { name: 'quantumEncryption', category: 'cyberAesthetics', description: 'Quantum encryption field', templates: ['quantum-encryption'] },
    { name: 'augmentedReality', category: 'cyberAesthetics', description: 'Augmented reality overlay', templates: ['augmented-reality'] },

    // Consciousness Stream
    { name: 'thoughtWaves', category: 'consciousness', description: 'Thought wave patterns', templates: ['thought-waves'] },
    { name: 'memoryFragments', category: 'consciousness', description: 'Memory fragment visualization', templates: ['memory-fragments'] },
    { name: 'dreamLogic', category: 'consciousness', description: 'Dream logic surrealism', templates: ['dream-logic'] },
    { name: 'emotionalSpectrum', category: 'consciousness', description: 'Emotional spectrum colors', templates: ['emotional-spectrum'] },
    { name: 'meditativeCalm', category: 'consciousness', description: 'Meditative calm state', templates: ['meditative-calm'] },
    { name: 'anxietySpiral', category: 'consciousness', description: 'Anxiety spiral pattern', templates: ['anxiety-spiral'] },
    { name: 'egoDissolution', category: 'consciousness', description: 'Ego dissolution effect', templates: ['ego-dissolution'] },
    { name: 'psychedelicInsight', category: 'consciousness', description: 'Psychedelic insight visualization', templates: ['psychedelic-insight'] },
    { name: 'collectiveUnconscious', category: 'consciousness', description: 'Collective unconscious patterns', templates: ['collective-unconscious'] }
  ];

  advancedEffects.forEach(effect => {
    effectRegistry.register({
      ...effect,
      generator: (stops, animationConfig, duration) => {
        // Wrapper function that calls the advanced effect generator
        return {
          useAdvancedEffect: true,
          effectType: effect.name
        };
      },
      outputType: 'complete'
    });
  });
}

/**
 * Load all effects into the registry
 */
function loadAllEffects() {
  loadBasicGradients();
  loadShapeGradients();
  loadFutureTechEffects();
  loadArtisticEffects();
  loadLuxuryEffects();
  loadGamingEffects();
  loadOrganicEffects();
  loadAdvancedComplexEffects();

  console.log('✅ Loaded all effects into registry');
  console.log(effectRegistry.getStats());
}

module.exports = {
  loadAllEffects,
  TEMPLATE_MAPPINGS
};
