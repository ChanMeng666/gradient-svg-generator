/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 * Refactored to use centralized AnimationLibrary
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { multiplyDuration } = require('../../core/AnimationLibrary');

// Pattern-based gradient generators inspired by example project

function createCandystripeGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <pattern id="candystripe-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="url(#gradient)" opacity="0.8"/>
        <path d="M0,40 L40,0 M-10,10 L10,-10 M30,50 L50,30"
              stroke="rgba(255,255,255,0.4)" stroke-width="10"/>
        <animateTransform attributeName="patternTransform" type="translate"
          from="0 0" to="40 0" dur="${multiplyDuration(animationDuration, 0.5)}" repeatCount="indefinite"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#candystripe-pattern)" opacity="0.9"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;200%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createZigzagGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <pattern id="zigzag-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="url(#gradient)" opacity="0.7"/>
        <path d="M0,20 L10,10 L20,20 L30,10 L40,20 L30,30 L20,20 L10,30 Z"
              fill="url(#gradient-light)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" ${animationConfig} />
        </path>
        <animateTransform attributeName="patternTransform" type="translate"
          from="0 0" to="40 0" dur="${multiplyDuration(animationDuration, 0.7)}" repeatCount="indefinite"/>
      </pattern>
      <linearGradient id="gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgba(255,255,255,0.3)" />
        <stop offset="100%" style="stop-color:rgba(255,255,255,0.1)" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#zigzag-pattern)" opacity="0.95"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;50%;0%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createDiamondPatternGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <pattern id="diamond-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="url(#gradient)" opacity="0.6"/>
        <path d="M25,0 L50,25 L25,50 L0,25 Z" fill="url(#gradient-diamond)" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" ${animationConfig} />
        </path>
        <animateTransform attributeName="patternTransform" type="scale"
          values="1;1.2;1" dur="${multiplyDuration(animationDuration, 0.6)}"
          additive="sum" repeatCount="indefinite"/>
      </pattern>
      <linearGradient id="gradient-diamond" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgba(255,255,255,0.4)" />
        <stop offset="50%" style="stop-color:rgba(255,255,255,0.2)" />
        <stop offset="100%" style="stop-color:rgba(255,255,255,0.4)" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#diamond-pattern)" opacity="0.9"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;50%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;50%;0%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createHeartsPatternGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <pattern id="hearts-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect width="60" height="60" fill="url(#gradient)" opacity="0.7"/>
        <path d="M30,45 L20,35 Q15,30 15,25 Q15,18 20,15 Q25,12 30,15 Q35,12 40,15 Q45,18 45,25 Q45,30 40,35 Z"
              fill="rgba(255,255,255,0.3)">
          <animate attributeName="opacity" values="0.2;0.5;0.2" ${animationConfig} />
        </path>
        <animateTransform attributeName="patternTransform" type="translate"
          from="0 0" to="60 0" dur="${multiplyDuration(animationDuration, 0.8)}" repeatCount="indefinite"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#hearts-pattern)" opacity="0.95"/>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="r" values="50%;80%;50%" ${animationConfig} />
      </radialGradient>`,
    additionalElements
  };
}

function createCheckeredGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <pattern id="checker-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="url(#gradient)" opacity="0.7"/>
        <rect x="0" y="0" width="20" height="20" fill="rgba(255,255,255,0.2)">
          <animate attributeName="opacity" values="0.1;0.3;0.1" ${animationConfig} />
        </rect>
        <rect x="20" y="20" width="20" height="20" fill="rgba(255,255,255,0.2)">
          <animate attributeName="opacity" values="0.1;0.3;0.1" ${animationConfig} />
        </rect>
        <animateTransform attributeName="patternTransform" type="rotate"
          from="0 20 20" to="360 20 20" dur="${animationDuration}" repeatCount="indefinite"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#checker-pattern)" opacity="0.9"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createDiagonalFlowGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <pattern id="diagonal-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="30" height="30" fill="url(#gradient)" opacity="0.8"/>
        <line x1="0" y1="0" x2="30" y2="30" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
        <line x1="-10" y1="10" x2="20" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="10" y1="-10" x2="40" y2="20" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <animateTransform attributeName="patternTransform" type="translate"
          from="0 0" to="30 30" dur="${multiplyDuration(animationDuration, 0.5)}" repeatCount="indefinite"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#diagonal-pattern)" opacity="0.95"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;0%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createGeometricPulseGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <pattern id="geometric-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="url(#gradient)" opacity="0.7"/>
        <circle cx="40" cy="40" r="15" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2">
          <animate attributeName="r" values="10;20;10" ${animationConfig} />
          <animate attributeName="opacity" values="0.2;0.6;0.2" ${animationConfig} />
        </circle>
        <rect x="25" y="25" width="30" height="30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"
              transform="rotate(45 40 40)">
          <animate attributeName="opacity" values="0.3;0.7;0.3" ${animationConfig} />
        </rect>
      </pattern>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#geometric-pattern)" opacity="0.95"/>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="r" values="40%;80%;40%" ${animationConfig} />
        <animate attributeName="cx" values="50%;60%;40%;50%" ${animationConfig} />
      </radialGradient>`,
    additionalElements
  };
}

function createPatternWaveGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <pattern id="wave-pattern" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
        <rect width="100" height="40" fill="url(#gradient)" opacity="0.7"/>
        <path d="M0,20 Q25,10 50,20 T100,20" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="3">
          <animate attributeName="d"
            values="M0,20 Q25,10 50,20 T100,20;M0,20 Q25,30 50,20 T100,20;M0,20 Q25,10 50,20 T100,20"
            ${animationConfig} />
        </path>
        <path d="M0,15 Q25,5 50,15 T100,15" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2">
          <animate attributeName="d"
            values="M0,15 Q25,5 50,15 T100,15;M0,15 Q25,25 50,15 T100,15;M0,15 Q25,5 50,15 T100,15"
            dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite"/>
        </path>
        <animateTransform attributeName="patternTransform" type="translate"
          from="0 0" to="100 0" dur="${animationDuration}" repeatCount="indefinite"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#wave-pattern)" opacity="0.95"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;200%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

module.exports = {
  createCandystripeGradient,
  createZigzagGradient,
  createDiamondPatternGradient,
  createHeartsPatternGradient,
  createCheckeredGradient,
  createDiagonalFlowGradient,
  createGeometricPulseGradient,
  createPatternWaveGradient
};
