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
 * Animation Library - Centralized SVG animation utilities
 *
 * This module extracts common animation patterns that are repeated 100+ times
 * across gradient generator files. Use these utilities to create consistent,
 * maintainable animations.
 */

// ============================================================================
// ANIMATION PRESETS
// ============================================================================

/**
 * Standard animation presets for common effects
 */
const ANIMATION_PRESETS = {
  // Opacity animations
  pulse: { values: '0.5;1;0.5', calcMode: 'linear' },
  breathe: { values: '0.7;1;0.7', calcMode: 'linear' },
  flicker: { values: '1;0.6;1;0.8;1', calcMode: 'discrete' },
  fadeInOut: { values: '0;1;0', calcMode: 'linear' },
  gentlePulse: { values: '0.8;1;0.8', calcMode: 'spline' },

  // Scale animations
  grow: { values: '0.95;1.05;0.95', calcMode: 'linear' },
  shrink: { values: '1.05;0.95;1.05', calcMode: 'linear' },
  bounce: { values: '1;1.1;0.9;1', calcMode: 'spline' },

  // Position animations (percentage-based)
  slideHorizontal: { values: '-50%;50%;-50%', calcMode: 'linear' },
  slideVertical: { values: '-50%;50%;-50%', calcMode: 'linear' },
  drift: { values: '0%;25%;0%', calcMode: 'linear' },

  // Rotation animations
  spin: { values: '0;360', calcMode: 'linear' },
  spinReverse: { values: '360;0', calcMode: 'linear' },
  oscillate: { values: '-15;15;-15', calcMode: 'linear' },
  wobble: { values: '-5;5;-5', calcMode: 'spline' },
};

// ============================================================================
// ANIMATION CONFIG BUILDER
// ============================================================================

/**
 * Build standard animation config string
 * This pattern appears 200+ times across the codebase
 *
 * @param {string} duration - Animation duration (e.g., '6s')
 * @param {Object} options - Additional options
 * @param {string} options.repeatCount - Repeat count (default: 'indefinite')
 * @param {string} options.calcMode - Calculation mode (default: 'linear')
 * @param {string} options.keySplines - Key splines for spline calcMode
 * @returns {string} Animation config attributes
 */
function buildAnimationConfig(duration, options = {}) {
  const {
    repeatCount = 'indefinite',
    calcMode = 'linear',
    keySplines = null
  } = options;

  let config = `dur="${duration}" repeatCount="${repeatCount}"`;

  if (calcMode !== 'linear') {
    config += ` calcMode="${calcMode}"`;
  }

  if (keySplines && calcMode === 'spline') {
    config += ` keySplines="${keySplines}"`;
  }

  return config;
}

// ============================================================================
// BASIC ANIMATION CREATORS
// ============================================================================

/**
 * Create an opacity animation
 *
 * @param {Object} options - Animation options
 * @param {string} options.values - Opacity values (default: '0.5;1;0.5')
 * @param {string} options.duration - Animation duration (default: '3s')
 * @param {string} options.preset - Use preset values (overrides values)
 * @returns {string} SVG animate element
 */
function createOpacityAnimation(options = {}) {
  const {
    values = '0.5;1;0.5',
    duration = '3s',
    preset = null
  } = options;

  const animValues = preset && ANIMATION_PRESETS[preset]
    ? ANIMATION_PRESETS[preset].values
    : values;

  const config = buildAnimationConfig(duration);

  return `<animate attributeName="opacity" values="${animValues}" ${config}/>`;
}

/**
 * Create a transform animation (rotate, scale, translate, skew)
 *
 * @param {string} type - Transform type: 'rotate', 'scale', 'translate', 'skewX', 'skewY'
 * @param {Object} options - Animation options
 * @param {string} options.values - Transform values
 * @param {string} options.duration - Animation duration (default: '6s')
 * @param {string} options.center - Transform origin for rotation (e.g., '427 60')
 * @returns {string} SVG animateTransform element
 */
function createTransformAnimation(type, options = {}) {
  const {
    values,
    duration = '6s',
    center = null
  } = options;

  const config = buildAnimationConfig(duration);

  // For rotation, append center coordinates to values
  let animValues = values;
  if (type === 'rotate' && center) {
    const [start, end] = values.split(';');
    animValues = values.includes(center) ? values : `${start} ${center};${end} ${center}`;
  }

  return `<animateTransform attributeName="transform" type="${type}" values="${animValues}" ${config}/>`;
}

/**
 * Create a position animation for gradient coordinates
 *
 * @param {string} attribute - Attribute name (x1, y1, x2, y2, cx, cy, etc.)
 * @param {Object} options - Animation options
 * @param {string} options.values - Position values (e.g., '0%;100%;0%')
 * @param {string} options.duration - Animation duration (default: '6s')
 * @returns {string} SVG animate element
 */
function createPositionAnimation(attribute, options = {}) {
  const {
    values,
    duration = '6s'
  } = options;

  const config = buildAnimationConfig(duration);

  return `<animate attributeName="${attribute}" values="${values}" ${config}/>`;
}

/**
 * Create a radius animation (for radial gradients or circles)
 *
 * @param {Object} options - Animation options
 * @param {string} options.values - Radius values (e.g., '40%;60%;40%')
 * @param {string} options.duration - Animation duration (default: '6s')
 * @param {string} options.attribute - Attribute name (default: 'r')
 * @returns {string} SVG animate element
 */
function createRadiusAnimation(options = {}) {
  const {
    values = '40%;60%;40%',
    duration = '6s',
    attribute = 'r'
  } = options;

  const config = buildAnimationConfig(duration);

  return `<animate attributeName="${attribute}" values="${values}" ${config}/>`;
}

// ============================================================================
// COMPLEX ANIMATION PATTERNS
// ============================================================================

/**
 * Create a linear gradient animation (commonly used pattern)
 * This pattern is repeated 50+ times for horizontal/vertical/diagonal gradients
 *
 * @param {string} direction - 'horizontal', 'vertical', 'diagonal', 'diagonal-reverse'
 * @param {Object} options - Animation options
 * @param {string} options.duration - Animation duration (default: '6s')
 * @param {string} options.range - Animation range (default: '50%')
 * @returns {string} Combined animate elements
 */
function createLinearGradientAnimation(direction, options = {}) {
  const {
    duration = '6s',
    range = '50%'
  } = options;

  const config = buildAnimationConfig(duration);
  const rangeNum = parseInt(range);

  const patterns = {
    horizontal: {
      x1: `-${rangeNum}%;${rangeNum}%;${100 + rangeNum}%;${rangeNum}%;-${rangeNum}%`,
      x2: `${rangeNum}%;${100 + rangeNum}%;${200 + rangeNum}%;${100 + rangeNum}%;${rangeNum}%`
    },
    vertical: {
      y1: `-${rangeNum}%;${rangeNum}%;${100 + rangeNum}%;${rangeNum}%;-${rangeNum}%`,
      y2: `${rangeNum}%;${100 + rangeNum}%;${200 + rangeNum}%;${100 + rangeNum}%;${rangeNum}%`
    },
    diagonal: {
      x1: `-${rangeNum}%;${rangeNum}%;-${rangeNum}%`,
      y1: `-${rangeNum}%;${rangeNum}%;-${rangeNum}%`,
      x2: `${100 + rangeNum}%;${150 + rangeNum}%;${100 + rangeNum}%`,
      y2: `${100 + rangeNum}%;${150 + rangeNum}%;${100 + rangeNum}%`
    },
    'diagonal-reverse': {
      x1: `${100 + rangeNum}%;${rangeNum}%;${100 + rangeNum}%`,
      y1: `-${rangeNum}%;${rangeNum}%;-${rangeNum}%`,
      x2: `${200 + rangeNum}%;${100 + rangeNum}%;${200 + rangeNum}%`,
      y2: `${100 + rangeNum}%;${150 + rangeNum}%;${100 + rangeNum}%`
    }
  };

  const pattern = patterns[direction] || patterns.horizontal;

  return Object.entries(pattern)
    .map(([attr, values]) => `<animate attributeName="${attr}" values="${values}" ${config}/>`)
    .join('\n        ');
}

/**
 * Create a radial gradient animation
 * This pattern is repeated 30+ times for radial/circular effects
 *
 * @param {string} type - 'pulse', 'drift', 'breathe'
 * @param {Object} options - Animation options
 * @param {string} options.duration - Animation duration (default: '6s')
 * @returns {string} Combined animate elements
 */
function createRadialGradientAnimation(type, options = {}) {
  const {
    duration = '6s'
  } = options;

  const config = buildAnimationConfig(duration);

  const patterns = {
    pulse: {
      r: '40%;70%;40%'
    },
    drift: {
      cx: '40%;60%;40%',
      cy: '40%;60%;40%'
    },
    breathe: {
      r: '45%;55%;45%',
      cx: '45%;55%;45%',
      cy: '45%;55%;45%'
    }
  };

  const pattern = patterns[type] || patterns.pulse;

  return Object.entries(pattern)
    .map(([attr, values]) => `<animate attributeName="${attr}" values="${values}" ${config}/>`)
    .join('\n        ');
}

/**
 * Create a pulsing circle animation set
 * This pattern is repeated 30+ times for decorative circles
 *
 * @param {Object} options - Animation options
 * @param {number} options.cx - Circle center X (default: 427)
 * @param {number} options.cy - Circle center Y (default: 60)
 * @param {number} options.baseRadius - Base radius (default: 20)
 * @param {string} options.duration - Animation duration (default: '4s')
 * @param {boolean} options.rotate - Whether to add rotation (default: false)
 * @returns {Object} Object with circle element and animations
 */
function createPulsingCircle(options = {}) {
  const {
    cx = 427,
    cy = 60,
    baseRadius = 20,
    duration = '4s',
    rotate = false
  } = options;

  const config = buildAnimationConfig(duration);
  const minR = Math.round(baseRadius * 0.75);
  const maxR = Math.round(baseRadius * 1.25);

  let animations = `<animate attributeName="r" values="${minR};${maxR};${minR}" ${config}/>`;
  animations += `\n          <animate attributeName="opacity" values="0.6;1;0.6" ${config}/>`;

  if (rotate) {
    animations += `\n          <animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy};360 ${cx} ${cy}" ${config}/>`;
  }

  return {
    element: `<circle cx="${cx}" cy="${cy}" r="${baseRadius}" fill="url(#gradient)">`,
    animations,
    full: `<circle cx="${cx}" cy="${cy}" r="${baseRadius}" fill="url(#gradient)">
          ${animations}
        </circle>`
  };
}

/**
 * Create wave/undulation animation
 * Used for water, wave, and organic effects
 *
 * @param {Object} options - Animation options
 * @param {string} options.duration - Animation duration (default: '8s')
 * @param {number} options.amplitude - Wave amplitude (default: 10)
 * @param {string} options.axis - 'x' or 'y' (default: 'y')
 * @returns {string} SVG animate element
 */
function createWaveAnimation(options = {}) {
  const {
    duration = '8s',
    amplitude = 10,
    axis = 'y'
  } = options;

  const config = buildAnimationConfig(duration);
  const attr = axis === 'x' ? 'dx' : 'dy';

  return `<animate attributeName="${attr}" values="0;${amplitude};0;-${amplitude};0" ${config}/>`;
}

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Get duration multiplier for animation variations
 *
 * @param {string} baseDuration - Base duration (e.g., '6s')
 * @param {number} multiplier - Duration multiplier (e.g., 0.8, 1.2)
 * @returns {string} New duration string
 */
function multiplyDuration(baseDuration, multiplier) {
  const value = parseFloat(baseDuration);
  return `${(value * multiplier).toFixed(1)}s`;
}

/**
 * Create staggered animations for multiple elements
 *
 * @param {number} count - Number of elements
 * @param {string} baseDuration - Base duration
 * @param {number} staggerAmount - Stagger offset in seconds (default: 0.5)
 * @returns {string[]} Array of begin values for each element
 */
function createStaggeredBegins(count, baseDuration, staggerAmount = 0.5) {
  return Array.from({ length: count }, (_, i) => `${i * staggerAmount}s`);
}

/**
 * Create keyframe values from an array of positions
 *
 * @param {number[]} positions - Array of position values
 * @param {string} unit - Unit to append (default: '%')
 * @returns {string} Semicolon-separated values string
 */
function createKeyframeValues(positions, unit = '%') {
  return positions.map(p => `${p}${unit}`).join(';');
}

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  // Presets
  ANIMATION_PRESETS,

  // Config builder
  buildAnimationConfig,

  // Basic animations
  createOpacityAnimation,
  createTransformAnimation,
  createPositionAnimation,
  createRadiusAnimation,

  // Complex patterns
  createLinearGradientAnimation,
  createRadialGradientAnimation,
  createPulsingCircle,
  createWaveAnimation,

  // Utilities
  multiplyDuration,
  createStaggeredBegins,
  createKeyframeValues
};
