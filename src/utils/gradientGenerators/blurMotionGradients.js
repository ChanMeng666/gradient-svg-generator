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
 * Blur Motion Gradient Generators
 * Inspired by capsule-render's Blur effect (https://github.com/kyechan99/capsule-render)
 *
 * Creates abstract, dreamy effects with soft floating circles and heavy blur filters.
 * Multiple circles with independent X/Y animations create organic, atmospheric motion.
 */

/**
 * Create blur motion gradient (inspired by Blur effect)
 * Soft floating circles with heavy blur - abstract and atmospheric
 */
function createBlurMotionGradient(stops, animationConfig, duration = '12s') {
  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
    <filter id="heavyBlur">
      <feGaussianBlur stdDeviation="12" />
    </filter>
  `;

  const additionalElements = `
    <g class="blur-circles">
      <!-- Large background circle -->
      <circle
        cx="50%"
        cy="50%"
        r="25%"
        fill="url(#gradient)"
        opacity="0.2"
        filter="url(#heavyBlur)"
      >
        <animate
          attributeName="cx"
          values="50%;50%;50%;50%;50%"
          dur="${parseFloat(duration) * 1}s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="cy"
          values="50%;50%;50%;50%;50%"
          dur="${parseFloat(duration) * 1.2}s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
      </circle>

      <!-- Medium floating circle -->
      <circle
        cx="45%"
        cy="50%"
        r="30%"
        fill="url(#gradient)"
        opacity="0.3"
        filter="url(#heavyBlur)"
      >
        <animate
          attributeName="cx"
          values="45%;50%;45%;50%;45%"
          dur="${parseFloat(duration) * 2.5}s"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="cy"
          values="50%;50%;50%;50%;50%"
          dur="${parseFloat(duration) * 1.25}s"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
      </circle>

      <!-- Small foreground circle -->
      <circle
        cx="60%"
        cy="50%"
        r="28%"
        fill="url(#gradient)"
        opacity="0.15"
        filter="url(#heavyBlur)"
      >
        <animate
          attributeName="cx"
          values="60%;40%;60%;40%;60%"
          dur="${parseFloat(duration) * 1.25}s"
          begin="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="cy"
          values="50%;50%;50%;50%;50%"
          dur="${parseFloat(duration) * 1}s"
          begin="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
      </circle>
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
 * Create dreamy circles gradient
 * Multiple soft circles with varied opacity and gentle floating motion
 */
function createDreamyCirclesGradient(stops, animationConfig, duration = '15s') {
  const gradientDef = `
    <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
      ${stops}
      ${animationConfig}
    </radialGradient>
    <filter id="dreamyBlur">
      <feGaussianBlur stdDeviation="8" />
      <feColorMatrix type="saturate" values="1.4"/>
    </filter>
  `;

  const additionalElements = `
    <g class="dreamy-circles">
      <!-- Circle 1 -->
      <circle
        cx="20%"
        cy="30%"
        r="20%"
        fill="url(#gradient)"
        opacity="0.25"
        filter="url(#dreamyBlur)"
      >
        <animate
          attributeName="cx"
          values="20%;30%;25%;35%;20%"
          dur="${parseFloat(duration) * 1}s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
        <animate
          attributeName="cy"
          values="30%;40%;35%;25%;30%"
          dur="${parseFloat(duration) * 1.3}s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
      </circle>

      <!-- Circle 2 -->
      <circle
        cx="70%"
        cy="60%"
        r="25%"
        fill="url(#gradient)"
        opacity="0.2"
        filter="url(#dreamyBlur)"
      >
        <animate
          attributeName="cx"
          values="70%;60%;75%;65%;70%"
          dur="${parseFloat(duration) * 1.2}s"
          begin="0.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
        <animate
          attributeName="cy"
          values="60%;70%;55%;65%;60%"
          dur="${parseFloat(duration) * 0.9}s"
          begin="0.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
      </circle>

      <!-- Circle 3 -->
      <circle
        cx="50%"
        cy="50%"
        r="35%"
        fill="url(#gradient)"
        opacity="0.3"
        filter="url(#dreamyBlur)"
      >
        <animate
          attributeName="cx"
          values="50%;45%;55%;48%;50%"
          dur="${parseFloat(duration) * 1.5}s"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
        <animate
          attributeName="cy"
          values="50%;55%;45%;52%;50%"
          dur="${parseFloat(duration) * 1.1}s"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
      </circle>

      <!-- Circle 4 -->
      <circle
        cx="85%"
        cy="40%"
        r="18%"
        fill="url(#gradient)"
        opacity="0.18"
        filter="url(#dreamyBlur)"
      >
        <animate
          attributeName="cx"
          values="85%;75%;90%;80%;85%"
          dur="${parseFloat(duration) * 0.8}s"
          begin="1.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
        <animate
          attributeName="cy"
          values="40%;30%;50%;35%;40%"
          dur="${parseFloat(duration) * 1.4}s"
          begin="1.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
      </circle>
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
 * Create abstract blur gradient
 * Minimal circles with maximum blur for pure abstract aesthetic
 */
function createAbstractBlurGradient(stops, animationConfig, duration = '20s') {
  const gradientDef = `
    <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
      ${stops}
      ${animationConfig}
    </radialGradient>
    <filter id="maxBlur">
      <feGaussianBlur stdDeviation="15" />
      <feColorMatrix type="saturate" values="1.6"/>
    </filter>
  `;

  const additionalElements = `
    <g class="abstract-blur">
      <!-- Large centered circle -->
      <circle
        cx="50%"
        cy="50%"
        r="40%"
        fill="url(#gradient)"
        opacity="0.4"
        filter="url(#maxBlur)"
      >
        <animate
          attributeName="r"
          values="40%;45%;38%;42%;40%"
          dur="${parseFloat(duration) * 1}s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.5;0.35;0.45;0.4"
          dur="${parseFloat(duration) * 0.8}s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
      </circle>

      <!-- Offset circle -->
      <circle
        cx="65%"
        cy="45%"
        r="30%"
        fill="url(#gradient)"
        opacity="0.25"
        filter="url(#maxBlur)"
      >
        <animate
          attributeName="cx"
          values="65%;60%;70%;62%;65%"
          dur="${parseFloat(duration) * 1.5}s"
          begin="0.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
        <animate
          attributeName="cy"
          values="45%;50%;40%;48%;45%"
          dur="${parseFloat(duration) * 1.2}s"
          begin="0.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
      </circle>

      <!-- Small accent circle -->
      <circle
        cx="35%"
        cy="55%"
        r="25%"
        fill="url(#gradient)"
        opacity="0.3"
        filter="url(#maxBlur)"
      >
        <animate
          attributeName="cx"
          values="35%;40%;30%;38%;35%"
          dur="${parseFloat(duration) * 1.3}s"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
        <animate
          attributeName="cy"
          values="55%;50%;60%;52%;55%"
          dur="${parseFloat(duration) * 0.9}s"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
      </circle>
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
  createBlurMotionGradient,
  createDreamyCirclesGradient,
  createAbstractBlurGradient
};
