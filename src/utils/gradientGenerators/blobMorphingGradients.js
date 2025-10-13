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
 * Blob Morphing Gradient Generators
 * Inspired by capsule-render's Venom effect (https://github.com/kyechan99/capsule-render)
 *
 * Creates organic, liquid-like shapes that continuously morph between different forms
 * using SVG path animation techniques.
 */

/**
 * Generate multiple blob path states for morphing animation
 * @param {number} width - SVG width
 * @param {number} height - SVG height
 * @param {number} complexity - Number of control points (3-6)
 * @returns {Array<string>} Array of SVG path data strings
 */
function generateBlobPaths(width, height, complexity = 4) {
  const paths = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(width, height) * 0.3;

  // Generate 3-4 different blob shapes
  for (let pathIndex = 0; pathIndex < complexity; pathIndex++) {
    let pathData = '';
    const points = [];

    // Generate organic control points around a circle
    const numPoints = 8 + (pathIndex % 3);
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      // Add randomness for organic feel
      const radiusVariation = baseRadius * (0.7 + Math.sin(angle * 3 + pathIndex) * 0.3);
      const x = centerX + Math.cos(angle) * radiusVariation;
      const y = centerY + Math.sin(angle) * radiusVariation;
      points.push({ x, y });
    }

    // Create smooth closed path using quadratic curves
    pathData = `M${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const controlX = (current.x + next.x) / 2;
      const controlY = (current.y + next.y) / 2;
      pathData += ` Q${current.x},${current.y} ${controlX},${controlY}`;
    }
    pathData += ' Z';

    paths.push(pathData);
  }

  return paths;
}

/**
 * Create blob morphing gradient (inspired by Venom effect)
 * Organic liquid-like shape that morphs between different forms
 */
function createBlobMorphingGradient(stops, animationConfig, duration = '10s') {
  const paths = generateBlobPaths(854, 120, 3);

  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      ${stops}
      ${animationConfig}
    </linearGradient>
  `;

  const additionalElements = `
    <g transform="translate(427, 60)">
      <path fill="url(#gradient)" opacity="0.9" d="${paths[0]}">
        <animate
          attributeName="d"
          dur="${duration}"
          repeatCount="indefinite"
          values="${paths.join('; ')};${paths[0]}"
          calcMode="spline"
          keyTimes="${Array.from({ length: paths.length + 1 }, (_, i) => i / paths.length).join(';')}"
          keySplines="${Array.from({ length: paths.length }, () => '0.4 0 0.6 1').join('; ')}"
        />
      </path>
    </g>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null
  };
}

/**
 * Create liquid blob gradient with multi-layer morphing
 * Multiple overlapping blobs create depth and liquid effect
 */
function createLiquidBlobGradient(stops, animationConfig, duration = '12s') {
  const layer1Paths = generateBlobPaths(854, 120, 3);
  const layer2Paths = generateBlobPaths(854, 120, 4);

  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
    <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
    <filter id="blobBlur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
      <feColorMatrix type="saturate" values="1.5"/>
    </filter>
  `;

  const additionalElements = `
    <g transform="translate(427, 60)">
      <!-- Background blob -->
      <path fill="url(#gradient)" opacity="0.5" filter="url(#blobBlur)" d="${layer1Paths[0]}">
        <animate
          attributeName="d"
          dur="${duration}"
          repeatCount="indefinite"
          values="${layer1Paths.join('; ')};${layer1Paths[0]}"
          calcMode="spline"
          keyTimes="${Array.from({ length: layer1Paths.length + 1 }, (_, i) => i / layer1Paths.length).join(';')}"
          keySplines="${Array.from({ length: layer1Paths.length }, () => '0.3 0 0.7 1').join('; ')}"
        />
      </path>
      <!-- Foreground blob -->
      <path fill="url(#gradient2)" opacity="0.7" d="${layer2Paths[0]}">
        <animate
          attributeName="d"
          dur="${parseFloat(duration) * 0.8}s"
          begin="-${parseFloat(duration) * 0.3}s"
          repeatCount="indefinite"
          values="${layer2Paths.join('; ')};${layer2Paths[0]}"
          calcMode="spline"
          keyTimes="${Array.from({ length: layer2Paths.length + 1 }, (_, i) => i / layer2Paths.length).join(';')}"
          keySplines="${Array.from({ length: layer2Paths.length }, () => '0.4 0 0.6 1').join('; ')}"
        />
      </path>
    </g>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null
  };
}

/**
 * Create organic blob gradient with irregular morphing
 * More complex shape transformations for dramatic effect
 */
function createOrganicBlobGradient(stops, animationConfig, duration = '15s') {
  const paths = generateBlobPaths(854, 120, 5);

  const gradientDef = `
    <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
      ${stops}
      ${animationConfig}
    </radialGradient>
    <filter id="organicGlow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
      <feColorMatrix in="blur" type="saturate" values="1.8" result="saturated"/>
      <feMerge>
        <feMergeNode in="saturated"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  `;

  const additionalElements = `
    <g transform="translate(427, 60)">
      <path fill="url(#gradient)" filter="url(#organicGlow)" d="${paths[0]}">
        <animate
          attributeName="d"
          dur="${duration}"
          repeatCount="indefinite"
          values="${paths.join('; ')};${paths[0]}"
          calcMode="spline"
          keyTimes="${Array.from({ length: paths.length + 1 }, (_, i) => i / paths.length).join(';')}"
          keySplines="${Array.from({ length: paths.length }, () => '0.5 0 0.5 1').join('; ')}"
        />
        <animate
          attributeName="opacity"
          values="0.85;1;0.85"
          dur="${parseFloat(duration) * 0.6}s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  `;

  return {
    gradientDef,
    additionalElements,
    hasClipPath: false,
    clipPathId: null
  };
}

module.exports = {
  createBlobMorphingGradient,
  createLiquidBlobGradient,
  createOrganicBlobGradient
};
