/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 * Refactored to use centralized FilterLibrary and AnimationLibrary
 */

/**
 * Blur Motion Gradient Generators
 * Inspired by capsule-render's Blur effect (https://github.com/kyechan99/capsule-render)
 *
 * Creates abstract, dreamy effects with soft floating circles and heavy blur filters.
 * Multiple circles with independent X/Y animations create organic, atmospheric motion.
 */

const { createBlurFilter } = require('../../core/FilterLibrary');
const { multiplyDuration } = require('../../core/AnimationLibrary');

/**
 * Create blur motion gradient (inspired by Blur effect)
 * Soft floating circles with heavy blur - abstract and atmospheric
 */
function createBlurMotionGradient(stops, animationConfig, duration = '12s') {
  const heavyBlur = createBlurFilter('heavyBlur', {
    stdDeviation: 12,
    saturate: false
  });

  const gradientDef = `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
      ${animationConfig}
    </linearGradient>
    ${heavyBlur}
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
          dur="${multiplyDuration(duration, 1)}"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="cy"
          values="50%;50%;50%;50%;50%"
          dur="${multiplyDuration(duration, 1.2)}"
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
          dur="${multiplyDuration(duration, 2.5)}"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="cy"
          values="50%;50%;50%;50%;50%"
          dur="${multiplyDuration(duration, 1.25)}"
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
          dur="${multiplyDuration(duration, 1.25)}"
          begin="2s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="cy"
          values="50%;50%;50%;50%;50%"
          dur="${multiplyDuration(duration, 1)}"
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
  const dreamyBlur = createBlurFilter('dreamyBlur', {
    stdDeviation: 8,
    saturate: true,
    saturateAmount: 1.4
  });

  const gradientDef = `
    <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
      ${stops}
      ${animationConfig}
    </radialGradient>
    ${dreamyBlur}
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
          dur="${multiplyDuration(duration, 1)}"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
        <animate
          attributeName="cy"
          values="30%;40%;35%;25%;30%"
          dur="${multiplyDuration(duration, 1.3)}"
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
          dur="${multiplyDuration(duration, 1.2)}"
          begin="0.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
        <animate
          attributeName="cy"
          values="60%;70%;55%;65%;60%"
          dur="${multiplyDuration(duration, 0.9)}"
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
          dur="${multiplyDuration(duration, 1.5)}"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
        <animate
          attributeName="cy"
          values="50%;55%;45%;52%;50%"
          dur="${multiplyDuration(duration, 1.1)}"
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
          dur="${multiplyDuration(duration, 0.8)}"
          begin="1.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1; 0.3 0 0.7 1"
        />
        <animate
          attributeName="cy"
          values="40%;30%;50%;35%;40%"
          dur="${multiplyDuration(duration, 1.4)}"
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
  const maxBlur = createBlurFilter('maxBlur', {
    stdDeviation: 15,
    saturate: true,
    saturateAmount: 1.6
  });

  const gradientDef = `
    <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
      ${stops}
      ${animationConfig}
    </radialGradient>
    ${maxBlur}
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
          dur="${multiplyDuration(duration, 1)}"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.5;0.35;0.45;0.4"
          dur="${multiplyDuration(duration, 0.8)}"
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
          dur="${multiplyDuration(duration, 1.5)}"
          begin="0.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
        <animate
          attributeName="cy"
          values="45%;50%;40%;48%;45%"
          dur="${multiplyDuration(duration, 1.2)}"
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
          dur="${multiplyDuration(duration, 1.3)}"
          begin="1s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
        />
        <animate
          attributeName="cy"
          values="55%;50%;60%;52%;55%"
          dur="${multiplyDuration(duration, 0.9)}"
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
