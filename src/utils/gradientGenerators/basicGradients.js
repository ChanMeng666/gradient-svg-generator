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

const {
  animatedLinearGradient,
  animatedRadialGradient,
} = require('../../features/_shared/svgPrimitives');

function createHorizontalGradient(stops, animationConfig) {
  return animatedLinearGradient(stops, animationConfig, {
    coords: 'x1="0%" y1="0%" x2="100%" y2="0%"',
    animates: [
      ['x1', '-50%;50%;100%;50%;-50%'],
      ['x2', '50%;150%;200%;150%;50%'],
    ],
  });
}

function createVerticalGradient(stops, animationConfig) {
  return animatedLinearGradient(stops, animationConfig, {
    coords: 'x1="0%" y1="0%" x2="0%" y2="100%"',
    animates: [
      ['y1', '-50%;50%;100%;50%;-50%'],
      ['y2', '50%;150%;200%;150%;50%'],
    ],
  });
}

function createDiagonalGradient(stops, animationConfig) {
  return animatedLinearGradient(stops, animationConfig, {
    coords: 'x1="0%" y1="0%" x2="100%" y2="100%"',
    animates: [
      ['x1', '-50%;25%;100%;25%;-50%'],
      ['y1', '-50%;25%;100%;25%;-50%'],
      ['x2', '50%;125%;200%;125%;50%'],
      ['y2', '50%;125%;200%;125%;50%'],
    ],
  });
}

function createRadialGradient(stops, animationConfig) {
  return animatedRadialGradient(stops, animationConfig, {
    coords: 'cx="50%" cy="50%" r="50%"',
    animates: [['r', '20%;70%;100%;70%;20%']],
  });
}

function createBurstGradient(stops, animationConfig) {
  return animatedRadialGradient(stops, animationConfig, {
    coords: 'cx="50%" cy="50%" r="60%"',
    animates: [
      ['r', '10%;120%;40%;150%;10%'],
      ['cx', '50%;30%;70%;40%;60%;50%'],
      ['cy', '50%;70%;30%;60%;40%;50%'],
    ],
  });
}

function createPulseGradient(stops, animationConfig) {
  return animatedRadialGradient(stops, animationConfig, {
    coords: 'cx="50%" cy="50%" r="50%"',
    animates: [['r', '15%;75%;25%;100%;15%']],
  });
}

function createReflectionGradient(stops, animationConfig) {
  return animatedLinearGradient(stops, animationConfig, {
    coords: 'x1="0%" y1="50%" x2="100%" y2="50%"',
    animates: [
      ['x1', '0%;25%;50%;75%;100%;75%;50%;25%;0%'],
      ['x2', '100%;75%;50%;25%;0%;25%;50%;75%;100%'],
    ],
  });
}

function createDiamondGradient(stops, animationConfig) {
  return animatedLinearGradient(stops, animationConfig, {
    coords: 'x1="50%" y1="0%" x2="50%" y2="100%"',
    animates: [
      ['x1', '20%;50%;80%;50%;20%'],
      ['y1', '20%;0%;20%;0%;20%'],
      ['x2', '80%;50%;20%;50%;80%'],
      ['y2', '80%;100%;80%;100%;80%'],
    ],
  });
}

function createRainbowGradient(stops, animationConfig) {
  const additionalElements = `
    <defs>
      <style>
        .rainbow-layer {
          font-size: 40px;
          font-weight: 600;
          text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 4px 4px 0 rgba(0, 0, 0, 0.2);
          animation: rainbowWave ${animationConfig.replace(`dur="`, '').replace(`" repeatCount="indefinite"`, '')} ease-in-out infinite;
        }
        @keyframes rainbowWave {
          0%, 100% { transform: translateY(2px); }
          50% { transform: translateY(-2px); }
        }
      </style>
    </defs>`;

  return {
    gradientDef: animatedLinearGradient(stops, animationConfig, {
      coords: 'x1="0%" y1="0%" x2="100%" y2="0%"',
      animates: [
        ['x1', '-20%;100%;-20%'],
        ['x2', '20%;120%;20%'],
      ],
      indent: 6,
    }),
    additionalElements,
  };
}

module.exports = {
  createHorizontalGradient,
  createVerticalGradient,
  createDiagonalGradient,
  createRadialGradient,
  createBurstGradient,
  createPulseGradient,
  createReflectionGradient,
  createDiamondGradient,
  createRainbowGradient,
};
