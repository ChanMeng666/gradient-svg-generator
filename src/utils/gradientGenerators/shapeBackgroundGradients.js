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

  // Cylinder path: Rectangle with semicircular ends
  // Assuming width=854, height varies
  const cylinderPath = (width, height) => {
    const radius = height / 2;
    return `M ${radius} 0 L ${width - radius} 0 A ${radius} ${radius} 0 1 1 ${width - radius} ${height} L ${radius} ${height} A ${radius} ${radius} 0 1 1 ${radius} 0 Z`;
  };

  const additionalElements = `
    <path
      d="${cylinderPath(854, '{{HEIGHT}}')}"
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
      width="854"
      height="{{HEIGHT}}"
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

  // Egg shape path - complex bezier curves forming an egg
  const eggPath = (width, height) => {
    const midX = width / 2;
    return `M ${midX} ${height} Q ${midX - 100} ${height / 3} ${midX - 213.5} ${height} Q ${midX - 327} ${height / 3} ${midX - 427} ${height} Q ${midX - 377} 0 ${midX} 0 Q ${midX + 323} 0 ${width} ${height} Q ${width - 127} ${height / 3} ${width - 214.5} ${height} Q ${width - 327} ${height / 3} ${midX} ${height}`;
  };

  const additionalElements = `
    <path
      d="${eggPath(854, '{{HEIGHT}}')}"
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

  // Slice path: Triangle shape from top-left corner
  const slicePath = (width, height) => {
    return `M 0 0 L ${width} ${height} L ${width} 0 L 0 0 Z`;
  };

  const additionalElements = `
    <path
      d="${slicePath(854, '{{HEIGHT}}')}"
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
 * Create speech bubble shaped gradient
 * Rectangle with rounded corners and a tail/pointer
 * Perfect for callouts and messages
 */
function createSpeechBubbleGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  // Speech bubble path: Rounded rectangle with a tail at bottom center
  const speechBubblePath = (width, height) => {
    const cornerRadius = 25;
    const tailWidth = 30;
    const tailHeight = 20;
    const tailPosX = width / 2;

    return `
      M ${cornerRadius} 0
      L ${width - cornerRadius} 0
      Q ${width} 0 ${width} ${cornerRadius}
      L ${width} ${height - cornerRadius}
      Q ${width} ${height} ${width - cornerRadius} ${height}
      L ${tailPosX + tailWidth} ${height}
      L ${tailPosX} ${height + tailHeight}
      L ${tailPosX - tailWidth} ${height}
      L ${cornerRadius} ${height}
      Q 0 ${height} 0 ${height - cornerRadius}
      L 0 ${cornerRadius}
      Q 0 0 ${cornerRadius} 0
      Z
    `;
  };

  const additionalElements = `
    <path
      d="${speechBubblePath(854, '{{HEIGHT}}')}"
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
 * Create shark teeth/wave gradient
 * Zigzag pattern at the bottom for dynamic energy
 * Inspired by capsule-render's Shark shape
 */
function createSharkTeethGradient(stops, animationConfig, duration = '6s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  // Shark teeth path: Rectangle with zigzag bottom edge
  const sharkPath = (width, height) => {
    const toothWidth = 61; // Width of each tooth
    const toothDepth = 27; // How far teeth extend beyond baseline
    const baseline = height - 95;

    let path = `M 0 0 L ${width} 0 L ${width} ${baseline}`;

    // Create zigzag teeth along the bottom
    const numTeeth = Math.floor(width / toothWidth);
    for (let i = numTeeth; i >= 0; i--) {
      const x = i * toothWidth;
      path += ` C ${x} ${baseline + toothDepth} ${x} ${baseline + toothDepth} ${x - toothWidth / 2} ${baseline}`;
      if (i > 0) {
        path += ` C ${x - toothWidth / 2} ${baseline + toothDepth} ${x - toothWidth / 2} ${baseline + toothDepth} ${x - toothWidth} ${baseline}`;
      }
    }

    path += ` L 0 ${baseline} Z`;
    return path;
  };

  const additionalElements = `
    <path
      d="${sharkPath(854, '{{HEIGHT}}')}"
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

  // Large rounded rectangle path
  const roundedPath = (width, height) => {
    const radius = 61; // Large corner radius
    return `
      M ${radius} 0
      L ${width - radius} 0
      Q ${width} 0 ${width} ${radius}
      L ${width} ${height - radius}
      Q ${width} ${height} ${width - radius} ${height}
      L ${radius} ${height}
      Q 0 ${height} 0 ${height - radius}
      L 0 ${radius}
      Q 0 0 ${radius} 0
      Z
    `;
  };

  const additionalElements = `
    <path
      d="${roundedPath(854, '{{HEIGHT}}')}"
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

module.exports = {
  createCylinderGradient,
  createSoftRoundedGradient,
  createEggShapeGradient,
  createSliceGradient,
  createSpeechBubbleGradient,
  createSharkTeethGradient,
  createLargeRoundedGradient
};
