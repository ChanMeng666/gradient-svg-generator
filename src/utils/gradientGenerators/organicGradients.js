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

// Organic nature gradient generators
// Refactored to use centralized FilterLibrary, AnimationLibrary, and svgPrimitives

const { createTurbulenceFilter, createColorMatrixFilter } = require('../../core/FilterLibrary');
const { multiplyDuration } = require('../../core/AnimationLibrary');
const {
  animatedLinearGradient,
  animatedRadialGradient,
} = require('../../features/_shared/svgPrimitives');

const longDur = (base, factor) =>
  `dur="${multiplyDuration(base, factor)}" repeatCount="indefinite"`;

function createFlowingWaterGradient(stops, animationConfig, animationDuration) {
  const waterFilter = createTurbulenceFilter('waterRipple', {
    baseFrequency: '0.5',
    numOctaves: 2,
    scale: 10,
    animated: true,
    animationValues: '5;15;5',
    duration: animationDuration,
  });

  return {
    gradientDef:
      animatedLinearGradient(stops, animationConfig, {
        coords: 'x1="0%" y1="0%" x2="100%" y2="100%"',
        animates: [
          ['x1', '0%;100%;0%'],
          { attr: 'y1', values: '0%;100%;0%', cfg: longDur(animationDuration, 1.3) },
        ],
        indent: 6,
      }) + `\n      ${waterFilter}`,
  };
}

function createFlameGradient(stops, animationConfig, animationDuration) {
  const flameFilter = createTurbulenceFilter('flameFlicker', {
    baseFrequency: '0.9',
    numOctaves: 4,
    scale: 15,
    animated: true,
    animationValues: '15;25;15',
    duration: animationDuration,
  });

  return {
    gradientDef:
      animatedRadialGradient(stops, animationConfig, {
        coords: 'cx="50%" cy="80%" r="60%"',
        animates: [
          ['cy', '80%;60%;80%'],
          { attr: 'r', values: '60%;80%;60%', cfg: longDur(animationDuration, 0.8) },
        ],
        indent: 6,
      }) + `\n      ${flameFilter}`,
  };
}

function createCloudsGradient(stops, animationConfig, animationDuration) {
  const cloudFilter = createTurbulenceFilter('cloudFloat', {
    baseFrequency: '0.2',
    numOctaves: 3,
    scale: 20,
    animated: true,
    animationValues: '20;30;20',
    duration: animationDuration,
  });

  return {
    gradientDef:
      animatedRadialGradient(stops, animationConfig, {
        coords: 'cx="50%" cy="40%" r="80%"',
        animates: [
          { attr: 'cx', values: '30%;70%;30%', cfg: longDur(animationDuration, 2) },
          ['cy', '40%;60%;40%'],
        ],
        indent: 6,
      }) + `\n      ${cloudFilter}`,
  };
}

function createAuroraGradient(stops, animationConfig, animationDuration) {
  const auroraFilter = createTurbulenceFilter('auroraWave', {
    baseFrequency: '0.6',
    numOctaves: 3,
    scale: 25,
    animated: true,
    animationValues: '25;40;25',
    duration: animationDuration,
  });

  return {
    gradientDef:
      animatedLinearGradient(stops, animationConfig, {
        coords: 'x1="0%" y1="0%" x2="100%" y2="100%"',
        animates: [
          ['x1', '0%;100%;0%'],
          { attr: 'y1', values: '0%;50%;100%;50%;0%', cfg: longDur(animationDuration, 1.5) },
        ],
        indent: 6,
      }) + `\n      ${auroraFilter}`,
  };
}

function createOceanWavesGradient(stops, animationConfig, animationDuration) {
  const oceanFilter = createTurbulenceFilter('oceanFlow', {
    baseFrequency: '0.4',
    numOctaves: 2,
    scale: 12,
    animated: true,
    animationValues: '12;20;12',
    duration: animationDuration,
  });

  return {
    gradientDef:
      animatedRadialGradient(stops, animationConfig, {
        coords: 'cx="50%" cy="100%" r="70%"',
        animates: [
          ['r', '50%;90%;50%'],
          { attr: 'cy', values: '100%;80%;100%', cfg: longDur(animationDuration, 1.2) },
        ],
        indent: 6,
      }) + `\n      ${oceanFilter}`,
  };
}

function createForestGradient(stops, animationConfig, animationDuration) {
  const forestFilter = createTurbulenceFilter('forestCanopy', {
    baseFrequency: '0.8',
    numOctaves: 3,
    scale: 5,
    animated: false,
  });

  return {
    gradientDef:
      animatedLinearGradient(stops, animationConfig, {
        coords: 'x1="0%" y1="0%" x2="0%" y2="100%"',
        animates: [
          ['y1', '0%;30%;0%'],
          ['y2', '100%;70%;100%'],
        ],
        indent: 6,
      }) + `\n      ${forestFilter}`,
  };
}

function createLightningGradient(stops, animationConfig, animationDuration) {
  const lightningFilter = createColorMatrixFilter('lightningBolt', {
    saturation: 1.5,
    includeBlur: true,
    blurAmount: 3,
  });

  return {
    gradientDef:
      animatedRadialGradient(stops, animationConfig, {
        coords: 'cx="50%" cy="50%" r="40%"',
        animates: [{ attr: 'r', values: '20%;60%;20%', cfg: longDur(animationDuration, 0.3) }],
        indent: 6,
      }) + `\n      ${lightningFilter}`,
  };
}

function createMountainMistGradient(stops, animationConfig, animationDuration) {
  // Mist effect combines turbulence with blur
  const mistFilter = `
    <filter id="mistEffect">
      <feTurbulence baseFrequency="0.3" numOctaves="4" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="15">
        <animate attributeName="scale" values="15;25;15" ${animationConfig} />
      </feDisplacementMap>
      <feGaussianBlur stdDeviation="2"/>
    </filter>`;

  return {
    gradientDef:
      animatedLinearGradient(stops, animationConfig, {
        coords: 'x1="0%" y1="100%" x2="100%" y2="0%"',
        animates: [
          ['y1', '100%;80%;100%'],
          ['y2', '0%;20%;0%'],
        ],
        indent: 6,
      }) + `\n      ${mistFilter}`,
  };
}

module.exports = {
  createFlowingWaterGradient,
  createFlameGradient,
  createCloudsGradient,
  createAuroraGradient,
  createOceanWavesGradient,
  createForestGradient,
  createLightningGradient,
  createMountainMistGradient,
};
