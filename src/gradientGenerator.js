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

// gradientGenerator.js
const { createGradientFromColors } = require('./utils/svgUtils');
const { getTemplateConfig } = require('./config/gradientConfig');
const { generateTextEffectSVG } = require('./utils/textEffectGenerator');
const { generateAdvancedSVG } = require('./utils/advancedSvgGenerator');

function generateGradientSVG({ 
  text, 
  colors = ['000000'], 
  height = 120, 
  gradientType = 'horizontal',
  duration = '6s',
  template = '' 
}) {
  // If template is provided, use template configuration
  let config;
  if (template) {
    config = getTemplateConfig(template);
    colors = config.colors;
    gradientType = config.gradientType;
    duration = config.animationDuration;
  }

  // Map shape template names to shape types (only special shapes, not standard gradients)
  const shapeTemplateMap = {
    'wave-flow': 'wave',        // gradientType: 'wave' - needs special handling
    'egg-shape': 'ellipse',     // gradientType: 'ellipse' - needs special handling  
    'rounded-corners': 'square', // gradientType: 'square' - needs special handling
    'waving-banner': 'wave'     // gradientType: 'wave' - needs special handling
    // Note: Other shape templates use standard gradientTypes (horizontal, vertical, radial, diagonal)
    // and will be handled by the normal gradient system
  };

  // Map animation template names to animation types (only special animations, not standard gradients)
  const animationTemplateMap = {
    'glitch-matrix': 'glitch',
    'typewriter-code': 'typewriter',
    'luminance-glow': 'luminance',
    'rainbow-wave': 'rainbow',
    'text-box-popup': 'textBox',
    'data-corruption': 'glitch',
    // 🌟 NEW: Enhanced Effects - Inspired by svg-banners example
    'cyber-glitch-enhanced': 'glitchEnhanced',
    'data-corruption-pro': 'glitchEnhanced',
    'border-reveal': 'borderDrawing',
    'terminal-frame': 'borderDrawing',
    'rainbow-wave-cascade': 'layeredWave',
    'hacker-terminal-pro': 'typewriterEnhanced',
    'ocean-layers': 'layeredWave'
    // Note: Other animation templates use standard gradientTypes (horizontal, vertical, radial, etc.)
    // and will be handled by the normal gradient system
  };

  // Map text effect template names to effect types (only special effects, not standard gradients)
  const textEffectTemplateMap = {
    'luminance-glow': 'luminance',
    'rainbow-wave': 'rainbow',
    'border-draw': 'textBox',
    'glitch-cyber': 'glitch',
    'typewriter-terminal': 'typewriter',
    'neon-luminance': 'luminance',
    'fire-luminance': 'luminance',
    'ocean-rainbow': 'rainbow',
    'rainbow-layer': 'rainbow-layer',
    // 🌟 NEW: Enhanced Luminance Effects - Inspired by svg-banners example
    'luminance-reveal': 'luminanceEnhanced',
    'aurora-luminance': 'luminanceEnhanced'
    // Note: Other templates use standard gradientTypes and will be handled by the normal gradient system
  };

  // 🌟 NEW: Map morphing template names to morphing effect types
  const morphingTemplateMap = {
    'liquid-mercury': 'liquidMorphing',
    'plasma-blob': 'plasmaMorphing',
    'cosmic-entity': 'cosmicMorphing',
    'bio-organism': 'bioMorphing',
    'quantum-foam': 'quantumMorphing',
    'molten-lava': 'lavaMorphing'
  };

  // 🌟 NEW: Map fluid dynamics template names to fluid effect types
  const fluidDynamicsTemplateMap = {
    'turbulent-waves': 'turbulentWaves',
    'electromagnetic-field': 'electromagneticWaves',
    'aurora-streams': 'auroraWaves',
    'sound-visualization': 'soundWaves',
    'liquid-nitrogen': 'cryogenicWaves',
    'solar-wind': 'solarWaves'
  };

  // 🌟 NEW: Map dimensional template names to dimensional effect types
  const dimensionalTemplateMap = {
    'portal-nexus': 'portalDistortion',
    'tesseract-projection': 'hypercubeProjection',
    'wormhole-transit': 'wormholeEffect',
    'fractal-dimension': 'fractalDimension',
    'parallel-universe': 'multiverseOverlap',
    'reality-glitch': 'realityDistortion'
  };

  // 🌟 NEW: Map dimensional portal template names to dimensional portal effect types
  const dimensionalPortalTemplateMap = {
    'quantum-tunnel': 'quantumTunnel',
    'parallel-universe': 'parallelUniverse',
    'wormhole-transit': 'wormholeTransit',
    'dimensional-rift': 'dimensionalRift',
    'holographic-matrix': 'holographicMatrix',
    'void-chamber': 'voidChamber',
    'reality-glitch': 'realityGlitch',
    'astral-projection': 'astralProjection'
  };

  // 🌟 NEW: Map digital life template names to digital life effect types
  const digitalLifeTemplateMap = {
    'ai-consciousness': 'aiConsciousness',
    'bio-digital-merge': 'bioDigitalMerge',
    'quantum-dna': 'quantumDNA',
    'digital-evolution': 'digitalEvolution',
    'synthetic-soul': 'syntheticSoul',
    'cyber-symbiosis': 'cyberSymbiosis',
    'neural-storm': 'neuralStorm',
    'digital-genome': 'digitalGenome'
  };

  // 🌟 NEW: Map cyber aesthetics template names to cyber aesthetics effect types
  const cyberAestheticsTemplateMap = {
    'neon-grid-city': 'neonGridCity',
    'data-stream-flow': 'dataStreamFlow',
    'cyber-punk-noir': 'cyberPunkNoir',
    'hologram-interface': 'hologramInterface',
    'digital-decay': 'digitalDecay',
    'chrome-reflection': 'chromeReflection',
    'virus-infection': 'virusInfection',
    'quantum-encryption': 'quantumEncryption',
    'augmented-reality': 'augmentedReality'
  };

  // 🌟 NEW: Map consciousness stream template names to consciousness stream effect types
  const consciousnessStreamTemplateMap = {
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

  // Check if this is a shape template
  if (template && shapeTemplateMap[template]) {
    const shapeType = shapeTemplateMap[template];
    return generateAdvancedSVG(shapeType, text, colors, 854, height, { duration });
  }

  // Check if this is an animation template  
  if (template && animationTemplateMap[template]) {
    const animationType = animationTemplateMap[template];
    return generateAdvancedSVG(animationType, text, colors, 854, height, { duration });
  }

  // Check if this is a text effect template
  if (template && textEffectTemplateMap[template]) {
    const effectType = textEffectTemplateMap[template];
    return generateAdvancedSVG(effectType, text, colors, 854, height, { duration });
  }

  // 🌟 NEW: Check if this is a morphing effect template
  if (template && morphingTemplateMap[template]) {
    const effectType = morphingTemplateMap[template];
    return generateAdvancedSVG(effectType, text, colors, 854, height, { duration });
  }

  // 🌟 NEW: Check if this is a fluid dynamics template
  if (template && fluidDynamicsTemplateMap[template]) {
    const effectType = fluidDynamicsTemplateMap[template];
    return generateAdvancedSVG(effectType, text, colors, 854, height, { duration });
  }

  // 🌟 NEW: Check if this is a dimensional effect template
  if (template && dimensionalTemplateMap[template]) {
    const effectType = dimensionalTemplateMap[template];
    return generateAdvancedSVG(effectType, text, colors, 854, height, { duration });
  }

  // 🌟 NEW: Check if this is a dimensional portal template
  if (template && dimensionalPortalTemplateMap[template]) {
    const effectType = dimensionalPortalTemplateMap[template];
    return generateAdvancedSVG(effectType, text, colors, 854, height, { duration });
  }

  // 🌟 NEW: Check if this is a digital life template
  if (template && digitalLifeTemplateMap[template]) {
    const effectType = digitalLifeTemplateMap[template];
    return generateAdvancedSVG(effectType, text, colors, 854, height, { duration });
  }

  // 🌟 NEW: Check if this is a cyber aesthetics template
  if (template && cyberAestheticsTemplateMap[template]) {
    const effectType = cyberAestheticsTemplateMap[template];
    return generateAdvancedSVG(effectType, text, colors, 854, height, { duration });
  }

  // 🌟 NEW: Check if this is a consciousness stream template
  if (template && consciousnessStreamTemplateMap[template]) {
    const effectType = consciousnessStreamTemplateMap[template];
    return generateAdvancedSVG(effectType, text, colors, 854, height, { duration });
  }

  // Check if this is a geometric shape type (from advancedSvgGenerator)
  const geometricShapeTypes = ['wave', 'ellipse', 'square'];
  const animationEffectTypes = [
    'glitch', 'typewriter', 'luminance', 'rainbow',
    // 🌟 NEW: Enhanced Effects - Inspired by svg-banners example
    'glitchEnhanced', 'luminanceEnhanced', 'borderDrawing', 'layeredWave', 'typewriterEnhanced'
  ];

  if (geometricShapeTypes.includes(gradientType)) {
    // Use advanced SVG generator for geometric shapes
    return generateAdvancedSVG(gradientType, text, colors, 854, height, { duration });
  }

  if (animationEffectTypes.includes(gradientType)) {
    // Use advanced SVG generator for animation effects
    return generateAdvancedSVG(gradientType, text, colors, 854, height, { duration });
  }

  // Check if this is a text effect type or advanced effect type
  const textEffectTypes = ['luminance', 'rainbow', 'textBox', 'glitch', 'typewriter', 'rainbow-layer'];
  const advancedEffectTypes = [
    // Future Tech
    'hologram', 'quantum', 'laserGrid', 'neuralNet', 'plasma', 'dataStream',
    // Artistic
    'watercolor', 'oilPaint', 'inkSplash', 'mosaic', 'abstractGeo', 'graffiti', 'vintage',
    // Luxury
    'goldFoil', 'diamond', 'marble', 'platinum', 'roseGold', 'crystal', 'velvet',
    // Organic Nature
    'flowingWater', 'flame', 'clouds', 'aurora', 'oceanWaves', 'forest', 'lightning', 'mountainMist',
    // Gaming
    'pixelArt', 'neonArcade', 'energyBlast', 'speedLines', 'bossBattle', 'powerUp', 'cyberpunk', 'retroWave',
    // 🌟 NEW: Morphing Effects
    'liquidMorphing', 'plasmaMorphing', 'cosmicMorphing', 'bioMorphing', 'quantumMorphing', 'lavaMorphing',
    // 🌟 NEW: Fluid Dynamics
    'turbulentWaves', 'electromagneticWaves', 'auroraWaves', 'soundWaves', 'cryogenicWaves', 'solarWaves',
    // 🌟 NEW: Dimensional Effects
    'portalDistortion', 'hypercubeProjection', 'wormholeEffect', 'fractalDimension', 'multiverseOverlap', 'realityDistortion',
    // 🌟 NEW: Dimensional Portal Effects
    'quantumTunnel', 'parallelUniverse', 'wormholeTransit', 'dimensionalRift', 'holographicMatrix', 'voidChamber', 'realityGlitch', 'astralProjection',
    // 🌟 NEW: Digital Life Effects
    'aiConsciousness', 'bioDigitalMerge', 'quantumDNA', 'digitalEvolution', 'syntheticSoul', 'cyberSymbiosis', 'neuralStorm', 'digitalGenome',
    // 🌟 NEW: Cyber Aesthetics Effects
    'neonGridCity', 'dataStreamFlow', 'cyberPunkNoir', 'hologramInterface', 'digitalDecay', 'chromeReflection', 'virusInfection', 'quantumEncryption', 'augmentedReality',
    // 🌟 NEW: Consciousness Stream Effects
    'thoughtWaves', 'memoryFragments', 'dreamLogic', 'emotionalSpectrum', 'meditativeCalm', 'anxietySpiral', 'egoDissolution', 'psychedelicInsight', 'collectiveUnconscious'
  ];
  
  if (textEffectTypes.includes(gradientType) || advancedEffectTypes.includes(gradientType)) {
    return generateTextEffectSVG({
      text,
      colors,
      height,
      gradientType,
      duration,
      template
    });
  }

  const gradientResult = createGradientFromColors(colors, gradientType, duration);

  // 🌟 NEW: Handle special advanced effects that need generateAdvancedSVG
  if (gradientResult && gradientResult.useAdvancedEffect) {
    return generateAdvancedSVG(gradientResult.effectType, text, colors, 854, height, { duration });
  }

  // Choose appropriate filter effects based on gradient type
  let filterEffect = 'url(#smoothTransition)';
  let additionalFilters = '';

  switch (gradientType) {
    case 'radial':
      filterEffect = 'url(#radialBlur)';
      break;
    case 'circular':
      filterEffect = 'url(#energyEffect)';
      break;
    case 'burst':
    case 'pulse':
      filterEffect = 'url(#energyEffect)';
      break;
    case 'spiral':
      filterEffect = 'url(#spiralEffect)';
      break;
    case 'conic':
      filterEffect = 'url(#crystalEffect)';
      break;
    case 'wave':
      filterEffect = 'url(#waveEffect)';
      break;
    case 'diamond':
      filterEffect = 'url(#crystalEffect)';
      break;
    case 'reflection':
      filterEffect = 'url(#reflectionEffect)';
      break;
    case 'star':
      filterEffect = 'url(#starEffect)';
      break;
    case 'heart':
      filterEffect = 'url(#heartEffect)';
      break;
    case 'zigzag':
      filterEffect = 'url(#zigzagEffect)';
      break;
    case 'ripple':
      filterEffect = 'url(#rippleEffect)';
      break;
    case 'galaxy':
      filterEffect = 'url(#galaxyEffect)';
      break;
    case 'lightning':
      filterEffect = 'url(#lightningEffect)';
      break;
    case 'luminance':
      filterEffect = 'url(#luminanceEffect)';
      break;
    case 'rainbow':
      filterEffect = 'url(#rainbowEffect)';
      break;
    case 'textBox':
      filterEffect = 'url(#textBoxEffect)';
      break;
    case 'glitch':
      filterEffect = 'url(#glitchEffect)';
      break;
    case 'typewriter':
      filterEffect = 'url(#typewriterEffect)';
      break;
    default:
      filterEffect = 'url(#smoothTransition)';
  }

  // Determine if we need to apply clip path
  const clipPath = gradientResult.hasClipPath ? `clip-path="url(#${gradientResult.clipPathId})"` : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientResult.gradientDef}
        
        <!-- Enhanced Filter Effects -->
        <filter id="softLight">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feColorMatrix in="blur" type="saturate" values="1.2" result="saturated"/>
          <feMerge>
            <feMergeNode in="saturated"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="smoothTransition">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="1.5"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="radialBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          <feColorMatrix type="saturate" values="1.3"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="energyEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"/>
          <feColorMatrix type="saturate" values="1.8"/>
          <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="spiralEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="1.6"/>
          <feTurbulence baseFrequency="0.01" numOctaves="2" result="spiral"/>
          <feDisplacementMap in="SourceGraphic" in2="spiral" scale="3"/>
        </filter>

        <filter id="waveEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
          <feColorMatrix type="saturate" values="1.4"/>
          <feTurbulence baseFrequency="0.03 0.01" numOctaves="2" result="wave"/>
          <feDisplacementMap in="SourceGraphic" in2="wave" scale="1.5"/>
        </filter>

        <filter id="crystalEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
          <feColorMatrix type="saturate" values="1.7"/>
          <feSpecularLighting in="SourceGraphic" specularConstant="1.5" specularExponent="20" lighting-color="white">
            <fePointLight x="427" y="${height/4}" z="100"/>
          </feSpecularLighting>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="reflectionEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="1.3"/>
          <feOffset in="SourceGraphic" dx="0" dy="2" result="offset"/>
          <feFlood flood-color="rgba(255,255,255,0.3)" result="white"/>
          <feComposite in="white" in2="offset" operator="in" result="reflection"/>
          <feMerge>
            <feMergeNode in="SourceGraphic"/>
            <feMergeNode in="reflection"/>
          </feMerge>
        </filter>

        <filter id="starEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="2"/>
          <feSpecularLighting in="SourceGraphic" specularConstant="2" specularExponent="30" lighting-color="#ffff00">
            <fePointLight x="427" y="${height/2}" z="150"/>
          </feSpecularLighting>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="heartEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          <feColorMatrix type="saturate" values="1.8"/>
          <feColorMatrix type="hueRotate" values="15"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="zigzagEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
          <feColorMatrix type="saturate" values="1.6"/>
          <feTurbulence baseFrequency="0.05" numOctaves="1" result="zigzag"/>
          <feDisplacementMap in="SourceGraphic" in2="zigzag" scale="2"/>
        </filter>

        <filter id="rippleEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="1.4"/>
          <feConvolveMatrix kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="galaxyEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          <feColorMatrix type="saturate" values="2"/>
          <feTurbulence baseFrequency="0.02" numOctaves="4" result="galaxy"/>
          <feDisplacementMap in="SourceGraphic" in2="galaxy" scale="1"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="lightningEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
          <feColorMatrix type="saturate" values="2.5"/>
          <feColorMatrix type="brightness" values="1.3"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="luminanceEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          <feColorMatrix type="saturate" values="1.5"/>
          <feSpecularLighting in="SourceGraphic" specularConstant="3" specularExponent="25" lighting-color="white">
            <fePointLight x="427" y="${height/2}" z="200"/>
          </feSpecularLighting>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="rainbowEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="2"/>
          <feConvolveMatrix kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="textBoxEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="1.8"/>
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#19f6e8" flood-opacity="0.6"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="glitchEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
          <feColorMatrix type="saturate" values="2.2"/>
          <feOffset in="SourceGraphic" dx="1" dy="1" result="offsetRed"/>
          <feOffset in="SourceGraphic" dx="-1" dy="-1" result="offsetCyan"/>
          <feFlood flood-color="#ff0000" result="floodRed"/>
          <feFlood flood-color="#00ffff" result="floodCyan"/>
          <feComposite in="floodRed" in2="offsetRed" operator="in" result="redGlow"/>
          <feComposite in="floodCyan" in2="offsetCyan" operator="in" result="cyanGlow"/>
          <feMerge>
            <feMergeNode in="SourceGraphic"/>
            <feMergeNode in="redGlow"/>
            <feMergeNode in="cyanGlow"/>
          </feMerge>
        </filter>

        <filter id="typewriterEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.3"/>
          <feColorMatrix type="saturate" values="1.3"/>
          <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="#00ff00" flood-opacity="0.4"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <!-- Text Shadow Effect -->
        <filter id="textShadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.5"/>
          <feColorMatrix type="saturate" values="1.2"/>
        </filter>
      </defs>
      
      <!-- Additional elements for complex effects -->
      ${gradientResult.additionalElements}
      
      <rect 
        width="854" 
        height="${height}" 
        fill="url(#gradient)"
        filter="${filterEffect}"
        ${clipPath}
      >
        <animate
          attributeName="opacity"
          values="0.95;1;0.95"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"
        />
      </rect>
      
      <text 
        x="427" 
        y="${height/2}"
        font-size="40"
        font-family="'Arial Black', Arial, sans-serif"
        font-weight="bold"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="#ffffff"
        filter="url(#textShadow)"
      >
        ${text}
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.3 0.0 0.2 1; 0.3 0.0 0.2 1"
        />
      </text>
    </svg>`;
}

module.exports = generateGradientSVG;