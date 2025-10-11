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

/**
 * Unified Gradient Generator - New streamlined SVG generation system
 *
 * This replaces the old gradientGenerator.js with a cleaner implementation
 * that uses the Effect Registry, SVG Composer, and Filter Library.
 */

const { effectRegistry } = require('./EffectRegistry');
const { svgComposer } = require('./SVGComposer');
const { loadAllEffects } = require('./EffectLoader');
const { getTemplateConfig } = require('../config/gradientConfig');
const { createGradientFromColors } = require('../utils/svgUtils');
const { generateTextEffectSVG } = require('../utils/textEffectGenerator');
const { generateAdvancedSVG } = require('../utils/advancedSvgGenerator');

// Initialize effect registry on first load
let initialized = false;

function ensureInitialized() {
  if (!initialized) {
    loadAllEffects();
    initialized = true;
  }
}

/**
 * Generate SVG with gradient effect
 *
 * This is the new unified entry point that replaces the old generateGradientSVG function.
 *
 * @param {Object} params - Generation parameters
 * @param {string} params.text - Text to display
 * @param {string[]} [params.colors=['000000']] - Array of hex colors (without #)
 * @param {number} [params.height=120] - SVG height in pixels
 * @param {string} [params.gradientType='horizontal'] - Gradient type or effect name
 * @param {string} [params.duration='6s'] - Animation duration
 * @param {string} [params.template=''] - Template name (optional)
 * @returns {string} Complete SVG document
 */
function generateGradientSVG({
  text,
  colors = ['000000'],
  height = 120,
  gradientType = 'horizontal',
  duration = '6s',
  template = ''
}) {
  // Ensure registry is initialized
  ensureInitialized();

  // If template is provided, use template configuration
  let effectName = gradientType;
  let effectColors = colors;
  let effectDuration = duration;

  if (template) {
    const config = getTemplateConfig(template);
    if (config) {
      effectColors = config.colors;
      effectDuration = config.animationDuration;

      // Check if template is mapped to a specific effect
      const effectMetadata = effectRegistry.get(template);
      if (effectMetadata) {
        effectName = effectMetadata.name;
      } else {
        effectName = config.gradientType;
      }
    }
  }

  // Try to get effect from registry
  const effectMetadata = effectRegistry.get(effectName);

  if (effectMetadata) {
    return generateFromRegistry(effectMetadata, {
      text,
      colors: effectColors,
      height,
      duration: effectDuration,
      gradientType: effectName
    });
  }

  // Fallback to legacy generation methods for effects not yet in registry
  return generateLegacy({
    text,
    colors: effectColors,
    height,
    gradientType: effectName,
    duration: effectDuration,
    template
  });
}

/**
 * Generate SVG using the effect registry
 *
 * @param {Object} effectMetadata - Effect metadata from registry
 * @param {Object} params - Generation parameters
 * @returns {string} Complete SVG document
 */
function generateFromRegistry(effectMetadata, params) {
  const { text, colors, height, duration, gradientType } = params;
  const width = 854; // Standard width

  // Call the generator function
  const animationConfig = `dur="${duration}" repeatCount="indefinite"`;

  try {
    // Handle different output types
    switch (effectMetadata.outputType) {
      case 'gradient': {
        // Generator returns gradient definition
        const colorsCopy = [...colors];
        const extendedColors = [...colorsCopy, ...colorsCopy];
        const stops = extendedColors.map((color, index) => {
          const offset = (index / (extendedColors.length - 1)) * 100;
          return `<stop offset="${offset}%" stop-color="#${color}" />`;
        }).join('');

        const result = effectMetadata.generator(stops, animationConfig, duration, colorsCopy);

        // Handle different return formats from legacy generators
        if (typeof result === 'string') {
          // Simple gradient definition string
          return svgComposer.composeGradientSVG({
            text,
            gradientDef: result,
            additionalElements: '',
            clipPath: '',
            gradientType,
            width,
            height
          });
        } else if (result && typeof result === 'object') {
          // Check if it's signaling to use advanced effect
          if (result.useAdvancedEffect) {
            return generateAdvancedSVG(result.effectType, text, colors, width, height, { duration });
          }

          // Object with gradient definition and metadata
          const gradientDef = result.gradientDef || result;
          const additionalElements = result.additionalElements || '';
          const clipPath = result.hasClipPath && result.clipPathId
            ? `clip-path="url(#${result.clipPathId})"`
            : '';

          return svgComposer.composeGradientSVG({
            text,
            gradientDef,
            additionalElements,
            clipPath,
            gradientType,
            width,
            height
          });
        }
        break;
      }

      case 'complete': {
        // Generator returns complete SVG document
        // Need to check if it's a signal to use advanced effect
        const colorsCopy = [...colors];
        const extendedColors = [...colorsCopy, ...colorsCopy];
        const stops = extendedColors.map((color, index) => {
          const offset = (index / (extendedColors.length - 1)) * 100;
          return `<stop offset="${offset}%" stop-color="#${color}" />`;
        }).join('');

        const result = effectMetadata.generator(stops, animationConfig, duration);

        // Check if it's signaling to use advanced effect
        if (result && typeof result === 'object' && result.useAdvancedEffect) {
          return generateAdvancedSVG(result.effectType, text, colors, width, height, { duration });
        }

        // Otherwise, treat as complete SVG document
        return svgComposer.compose({
          content: result,
          contentType: 'complete',
          width,
          height
        });
      }

      case 'fragment': {
        // Generator returns SVG fragment
        const colorsCopy = [...colors];
        const extendedColors = [...colorsCopy, ...colorsCopy];
        const stops = extendedColors.map((color, index) => {
          const offset = (index / (extendedColors.length - 1)) * 100;
          return `<stop offset="${offset}%" stop-color="#${color}" />`;
        }).join('');

        const result = effectMetadata.generator(stops, animationConfig, duration);

        // Check if it's signaling to use advanced effect
        if (result && typeof result === 'object' && result.useAdvancedEffect) {
          return generateAdvancedSVG(result.effectType, text, colors, width, height, { duration });
        }

        // Otherwise, treat as SVG fragment
        return svgComposer.compose({
          content: result,
          contentType: 'fragment',
          width,
          height,
          includeFilters: true
        });
      }

      default:
        throw new Error(`Unknown output type: ${effectMetadata.outputType}`);
    }
  } catch (error) {
    console.error(`Error generating effect '${effectMetadata.name}':`, error);
    // Fallback to basic gradient
    return generateFallback({ text, colors, height, duration });
  }
}

/**
 * Generate SVG using legacy methods (for effects not yet in registry)
 *
 * @param {Object} params - Generation parameters
 * @returns {string} Complete SVG document
 */
function generateLegacy(params) {
  const { text, colors, height, gradientType, duration, template } = params;
  const width = 854;

  // Special handling for advanced effects using advancedSvgGenerator
  const geometricShapeTypes = ['wave', 'ellipse', 'square'];
  const animationEffectTypes = ['glitch', 'typewriter', 'luminance', 'rainbow', 'textBox'];

  if (geometricShapeTypes.includes(gradientType) || animationEffectTypes.includes(gradientType)) {
    return generateAdvancedSVG(gradientType, text, colors, width, height, { duration });
  }

  // Special handling for text effects
  const textEffectTypes = ['luminance', 'rainbow', 'textBox', 'glitch', 'typewriter', 'rainbow-layer'];
  const advancedEffectTypes = [
    'hologram', 'quantum', 'laserGrid', 'neuralNet', 'plasma', 'dataStream',
    'watercolor', 'oilPaint', 'inkSplash', 'mosaic', 'abstractGeo', 'graffiti', 'vintage',
    'goldFoil', 'diamond', 'marble', 'platinum', 'roseGold', 'crystal', 'velvet',
    'flowingWater', 'flame', 'clouds', 'aurora', 'oceanWaves', 'forest', 'lightning', 'mountainMist',
    'pixelArt', 'neonArcade', 'energyBlast', 'speedLines', 'bossBattle', 'powerUp', 'cyberpunk', 'retroWave',
    'liquidMorphing', 'plasmaMorphing', 'cosmicMorphing', 'bioMorphing', 'quantumMorphing', 'lavaMorphing',
    'turbulentWaves', 'electromagneticWaves', 'auroraWaves', 'soundWaves', 'cryogenicWaves', 'solarWaves',
    'portalDistortion', 'hypercubeProjection', 'wormholeEffect', 'fractalDimension', 'multiverseOverlap', 'realityDistortion',
    'quantumTunnel', 'parallelUniverse', 'wormholeTransit', 'dimensionalRift', 'holographicMatrix', 'voidChamber', 'realityGlitch', 'astralProjection',
    'aiConsciousness', 'bioDigitalMerge', 'quantumDNA', 'digitalEvolution', 'syntheticSoul', 'cyberSymbiosis', 'neuralStorm', 'digitalGenome',
    'neonGridCity', 'dataStreamFlow', 'cyberPunkNoir', 'hologramInterface', 'digitalDecay', 'chromeReflection', 'virusInfection', 'quantumEncryption', 'augmentedReality',
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

  // Default: Use standard gradient generation
  const gradientResult = createGradientFromColors(colors, gradientType, duration);

  // Check if it signals to use advanced effect
  if (gradientResult && gradientResult.useAdvancedEffect) {
    return generateAdvancedSVG(gradientResult.effectType, text, colors, width, height, { duration });
  }

  // Compose standard gradient SVG
  return svgComposer.composeGradientSVG({
    text,
    gradientDef: gradientResult.gradientDef,
    additionalElements: gradientResult.additionalElements || '',
    clipPath: gradientResult.hasClipPath && gradientResult.clipPathId
      ? `clip-path="url(#${gradientResult.clipPathId})"`
      : '',
    gradientType,
    width,
    height
  });
}

/**
 * Generate fallback SVG (basic horizontal gradient)
 *
 * @param {Object} params - Generation parameters
 * @returns {string} Complete SVG document
 */
function generateFallback(params) {
  const { text, colors, height, duration } = params;
  const width = 854;

  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      ${colors.map((color, index) => {
        const offset = (index / (colors.length - 1)) * 100;
        return `<stop offset="${offset}%" stop-color="#${color}" />`;
      }).join('')}
      <animate attributeName="x1" values="-50%;50%;100%;50%;-50%" dur="${duration}" repeatCount="indefinite" />
      <animate attributeName="x2" values="50%;150%;200%;150%;50%" dur="${duration}" repeatCount="indefinite" />
    </linearGradient>`;

  return svgComposer.composeGradientSVG({
    text,
    gradientDef,
    gradientType: 'horizontal',
    width,
    height
  });
}

/**
 * Get statistics about the gradient generation system
 *
 * @returns {Object} System statistics
 */
function getSystemStats() {
  ensureInitialized();
  return {
    registry: effectRegistry.getStats(),
    categories: effectRegistry.getCategories(),
    totalEffects: effectRegistry.getAllEffects().length
  };
}

module.exports = {
  generateGradientSVG,
  getSystemStats
};
