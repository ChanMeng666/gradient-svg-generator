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
 * Shape Background Gradient Generators
 * Inspired by capsule-render's shape types (https://github.com/kyechan99/capsule-render)
 *
 * Creates various shaped backgrounds (cylinder, soft rounded, egg, slice, speech bubble, shark teeth)
 * These shapes replace the standard rectangular background with interesting geometric forms.
 */

/**
 * Create cylinder/capsule shaped gradient
 * A rectangle with rounded ends (semicircles on left and right)
 * Inspired by capsule-render's Cylinder shape
 */
function createCylinderGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  // Cylinder path: Rectangle with semicircular ends (capsule shape)
  // rx = width/2 = 427, ry = height/2 = 60 creates pill/capsule shape
  // This creates full semicircular ends on left and right sides
  const additionalElements = `
    <rect
      x="0"
      y="0"
      width="854"
      height="120"
      rx="427"
      ry="60"
      fill="url(#gradient)"
      opacity="1"
    >
      <animate
        attributeName="opacity"
        values="0.95;1;0.95"
        dur="3s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      />
    </rect>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null,
    replaceMainRect: true
  };
}

/**
 * Create soft rounded rectangle gradient
 * Subtle rounded corners for a modern, friendly look
 * Inspired by capsule-render's Soft shape
 */
function createSoftRoundedGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  const additionalElements = `
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      rx="15"
      ry="15"
      fill="url(#gradient)"
      opacity="1"
    >
      <animate
        attributeName="opacity"
        values="0.95;1;0.95"
        dur="3s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      />
    </rect>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null,
    replaceMainRect: true
  };
}

/**
 * Create egg/oval shaped gradient
 * Organic oval shape reminiscent of an egg
 * Inspired by capsule-render's Egg shape
 */
function createEggShapeGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
      ${stops}
      ${animationConfig}
    </radialGradient>
  `;

  // Egg shape using ellipse with slightly adjusted proportions
  const additionalElements = `
    <ellipse
      cx="50%"
      cy="50%"
      rx="45%"
      ry="50%"
      fill="url(#gradient)"
      opacity="1"
    >
      <animate
        attributeName="opacity"
        values="0.95;1;0.95"
        dur="3s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      />
    </ellipse>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null,
    replaceMainRect: true
  };
}

/**
 * Create diagonal slice gradient
 * Angular, dynamic diagonal cut from top-left to bottom-right
 * Inspired by capsule-render's Slice shape
 */
function createSliceGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  // Slice shape: Triangle using polygon with fixed coordinates
  const additionalElements = `
    <polygon
      points="0,0 854,120 854,0"
      fill="url(#gradient)"
      opacity="1"
    >
      <animate
        attributeName="opacity"
        values="0.95;1;0.95"
        dur="3s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      />
    </polygon>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null,
    replaceMainRect: true
  };
}

/**
 * Create speech bubble shaped gradient
 * Rectangle with rounded corners for message/callout appearance
 * Simplified version for consistent rendering
 */
function createSpeechBubbleGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  // Speech bubble shape: Medium rounded rectangle
  const additionalElements = `
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      rx="25"
      ry="25"
      fill="url(#gradient)"
      opacity="1"
    >
      <animate
        attributeName="opacity"
        values="0.95;1;0.95"
        dur="3s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      />
    </rect>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null,
    replaceMainRect: true
  };
}

/**
 * Create shark teeth/wave gradient
 * Zigzag bottom edge for dynamic energy
 * Inspired by capsule-render's Shark shape
 */
function createSharkTeethGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  // Shark teeth shape: Rectangle with zigzag bottom edge
  // Simplified to fixed coordinates for consistent rendering
  const additionalElements = `
    <path
      d="M 0 0 L 854 0 L 854 95 L 793 122 L 732 95 L 671 122 L 610 95 L 549 122 L 488 95 L 427 122 L 366 95 L 305 122 L 244 95 L 183 122 L 122 95 L 61 122 L 0 95 Z"
      fill="url(#gradient)"
      opacity="1"
    >
      <animate
        attributeName="opacity"
        values="0.95;1;0.95"
        dur="3s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      />
    </path>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null,
    replaceMainRect: true
  };
}

/**
 * Create large rounded corners gradient
 * Bold, friendly rounded corners for modern design
 * Inspired by capsule-render's Rounded shape
 */
function createLargeRoundedGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  // Large rounded rectangle using simple rect element
  const additionalElements = `
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      rx="61"
      ry="61"
      fill="url(#gradient)"
      opacity="1"
    >
      <animate
        attributeName="opacity"
        values="0.95;1;0.95"
        dur="3s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
      />
    </rect>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null,
    replaceMainRect: true
  };
}

module.exports = {
  createCylinderGradient,
  createSoftRoundedGradient,
  createEggShapeGradient,
  createSliceGradient,
  createSpeechBubbleGradient,
  createSharkTeethGradient,
  createLargeRoundedGradient
};
