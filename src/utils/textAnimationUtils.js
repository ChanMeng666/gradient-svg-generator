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

/**
 * Text Animation Utilities
 * Inspired by capsule-render project (https://github.com/kyechan99/capsule-render)
 *
 * Provides CSS-based text animations for SVG text elements:
 * - fadeIn: Smooth opacity fade (1.2s)
 * - scaleIn: Scale from 0 to 1 (0.8s)
 * - blink: Quick on/off pattern (0.6s)
 * - blinking: Continuous on/off (1.6s infinite)
 * - twinkling: Soft opacity pulsing (4s infinite)
 */

/**
 * Get CSS animation styles for text
 * @param {string} animationType - Type of animation (fadeIn, scaleIn, blink, blinking, twinkling)
 * @param {string} selector - CSS selector for text element (default: 'text')
 * @returns {string} CSS style block with animation definitions
 */
function getTextAnimationStyles(animationType = 'none', selector = 'text') {
  if (!animationType || animationType === 'none') {
    return '';
  }

  switch (animationType.toLowerCase()) {
    case 'fadein':
      return `
        <style>
          ${selector} {
            animation: fadeIn 1.2s ease-in-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        </style>
      `;

    case 'scalein':
      return `
        <style>
          ${selector} {
            animation: scaleIn 0.8s ease-in-out forwards;
            transform-origin: center;
            transform-box: fill-box;
          }
          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        </style>
      `;

    case 'blink':
      return `
        <style>
          ${selector} {
            animation: blink 0.6s step-start 0s backwards;
          }
          @keyframes blink {
            10% { opacity: 1; }
            25% { opacity: 0; }
            40% { opacity: 1; }
            55% { opacity: 0; }
            70% { opacity: 0; }
            80% { opacity: 1; }
          }
        </style>
      `;

    case 'blinking':
      return `
        <style>
          ${selector} {
            animation: blinking 1.6s step-start 0s infinite;
          }
          @keyframes blinking {
            20% { opacity: 1; }
            50% { opacity: 0; }
            80% { opacity: 1; }
          }
        </style>
      `;

    case 'twinkling':
      return `
        <style>
          ${selector} {
            animation: twinkling 4s ease-in-out infinite;
          }
          @keyframes twinkling {
            40% { opacity: 1; }
            50% { opacity: 0.5; }
            60% { opacity: 1; }
            70% { opacity: 0.5; }
            80% { opacity: 1; }
          }
        </style>
      `;

    default:
      return '';
  }
}

/**
 * Get SVG animate element for text (alternative to CSS animations)
 * Useful for better browser compatibility
 * @param {string} animationType - Type of animation
 * @returns {string} SVG animate elements
 */
function getTextAnimateElements(animationType = 'none') {
  if (!animationType || animationType === 'none') {
    return '';
  }

  switch (animationType.toLowerCase()) {
    case 'fadein':
      return `
        <animate
          attributeName="opacity"
          from="0"
          to="1"
          dur="1.2s"
          fill="freeze"
          calcMode="spline"
          keySplines="0.4 0.0 0.2 1"
        />
      `;

    case 'scalein':
      return `
        <animateTransform
          attributeName="transform"
          type="scale"
          from="0 0"
          to="1 1"
          dur="0.8s"
          fill="freeze"
          calcMode="spline"
          keySplines="0.4 0.0 0.2 1"
          additive="sum"
        />
        <animate
          attributeName="opacity"
          from="0"
          to="1"
          dur="0.8s"
          fill="freeze"
        />
      `;

    case 'blink':
      return `
        <animate
          attributeName="opacity"
          values="0;1;0;1;0;0;1;1"
          keyTimes="0;0.1;0.25;0.4;0.55;0.7;0.8;1"
          dur="0.6s"
          fill="freeze"
          calcMode="discrete"
        />
      `;

    case 'blinking':
      return `
        <animate
          attributeName="opacity"
          values="1;1;0;0;1;1"
          keyTimes="0;0.2;0.5;0.8;0.9;1"
          dur="1.6s"
          repeatCount="indefinite"
          calcMode="discrete"
        />
      `;

    case 'twinkling':
      return `
        <animate
          attributeName="opacity"
          values="1;1;0.5;1;0.5;1;1"
          keyTimes="0;0.4;0.5;0.6;0.7;0.8;1"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
        />
      `;

    default:
      return '';
  }
}

/**
 * Get list of available animation types
 * @returns {Array} Array of animation type names
 */
function getAvailableAnimations() {
  return ['fadeIn', 'scaleIn', 'blink', 'blinking', 'twinkling'];
}

/**
 * Validate animation type
 * @param {string} animationType - Animation type to validate
 * @returns {boolean} True if valid
 */
function isValidAnimation(animationType) {
  if (!animationType) return true; // 'none' is valid
  return getAvailableAnimations().some(
    type => type.toLowerCase() === animationType.toLowerCase()
  );
}

module.exports = {
  getTextAnimationStyles,
  getTextAnimateElements,
  getAvailableAnimations,
  isValidAnimation
};
