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

// Future Tech gradient generators
// Refactored to use centralized FilterLibrary and AnimationLibrary

const {
  createTurbulenceFilter,
  createGlowFilter
} = require('../../core/FilterLibrary');

const {
  multiplyDuration
} = require('../../core/AnimationLibrary');

function createHologramGradient(stops, animationConfig, animationDuration) {
  const hologramFilter = createGlowFilter('hologramGlow', {
    color: '#00ffff',
    intensity: 3,
    opacity: 0.6
  });

  const additionalElements = `<animateTransform attributeName="transform" type="skewX" values="0;2;0;-2;0" ${animationConfig} />`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;50%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;50%;0%" ${animationConfig} />
      </linearGradient>
      ${hologramFilter}`,
    additionalElements
  };
}

function createQuantumGradient(stops, animationConfig, animationDuration) {
  const quantumFilter = createTurbulenceFilter('quantumTurbulence', {
    baseFrequency: '0.9',
    numOctaves: 4,
    scale: 20,
    animated: true,
    animationValues: '20;40;20',
    duration: animationDuration
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
        <animate attributeName="r" values="30%;80%;30%" ${animationConfig} />
      </radialGradient>
      ${quantumFilter}`
  };
}

function createLaserGridGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
      </linearGradient>
      <pattern id="laserPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <line x1="0" y1="20" x2="40" y2="20" stroke="#ff00ff" stroke-width="1" opacity="0.8"/>
        <line x1="20" y1="0" x2="20" y2="40" stroke="#00ffff" stroke-width="1" opacity="0.8"/>
        <animate attributeName="x" values="0;40;0" ${animationConfig} />
      </pattern>`
  };
}

function createNeuralNetGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
        <animate attributeName="cy" values="30%;70%;30%" dur="${multiplyDuration(animationDuration, 1.5)}" repeatCount="indefinite" />
      </radialGradient>`
  };
}

function createPlasmaGradient(stops, animationConfig, animationDuration) {
  const plasmaFilter = createTurbulenceFilter('plasmaTurbulence', {
    baseFrequency: '0.6',
    numOctaves: 3,
    scale: 30,
    animated: true,
    animationValues: '30;60;30',
    duration: animationDuration
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
        <animate attributeName="r" values="30%;100%;30%" ${animationConfig} />
      </radialGradient>
      ${plasmaFilter}`
  };
}

function createDataStreamGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        ${stops}
        <animate attributeName="y1" values="-50%;50%" ${animationConfig} />
        <animate attributeName="y2" values="50%;150%" ${animationConfig} />
      </linearGradient>`
  };
}

module.exports = {
  createHologramGradient,
  createQuantumGradient,
  createLaserGridGradient,
  createNeuralNetGradient,
  createPlasmaGradient,
  createDataStreamGradient
};
