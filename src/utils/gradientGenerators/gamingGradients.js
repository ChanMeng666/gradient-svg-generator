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

// Gaming gradient generators
function createPixelArtGradient(stops, animationConfig, animationDuration, colorsCopy) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
      </linearGradient>
      <pattern id="pixelPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="10" height="10" fill="#${colorsCopy[0]}"/>
        <rect x="10" y="0" width="10" height="10" fill="#${colorsCopy[1]}"/>
        <rect x="0" y="10" width="10" height="10" fill="#${colorsCopy[2]}"/>
        <rect x="10" y="10" width="10" height="10" fill="#${colorsCopy[3] || colorsCopy[0]}"/>
        <animateTransform attributeName="patternTransform" type="translate" values="0,0;20,0;0,20;0,0" ${animationConfig} />
      </pattern>`
  };
}

function createNeonArcadeGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
      </linearGradient>
      <filter id="neonGlow">
        <feGaussianBlur stdDeviation="5"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>`
  };
}

function createEnergyBlastGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
        <animate attributeName="r" values="30%;80%;30%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="energyWave">
        <feGaussianBlur stdDeviation="5"/>
        <feMorphology operator="dilate" radius="2"/>
      </filter>`
  };
}

function createSpeedLinesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="-50%;50%" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
        <animate attributeName="x2" values="50%;150%" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
      </linearGradient>`
  };
}

function createBossBattleGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="r" values="40%;80%;40%" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
        <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
      </radialGradient>
      <filter id="battleIntensity">
        <feGaussianBlur stdDeviation="3"/>
        <feColorMatrix values="1.3 0 0 0 0 0 1.3 0 0 0 0 0 1.3 0 0 0 0 0 1 0"/>
      </filter>`
  };
}

function createPowerUpGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
        <animate attributeName="r" values="30%;70%;30%" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="powerGlow">
        <feGaussianBlur stdDeviation="4"/>
        <feColorMatrix values="1.2 0 0 0 0 0 1.2 0 0 0 0 0 1.2 0 0 0 0 0 1 0"/>
      </filter>`
  };
}

function createCyberpunkGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
      </linearGradient>
      <filter id="cyberpunkGlow">
        <feGaussianBlur stdDeviation="3"/>
        <feColorMatrix values="1.4 0 0 0 0 0 1.4 0 0 0 0 0 1.4 0 0 0 0 0 1 0"/>
      </filter>`
  };
}

function createRetroWaveGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;50%;100%;50%;0%" ${animationConfig} />
        <animate attributeName="y1" values="100%;50%;0%;50%;100%" ${animationConfig} />
      </linearGradient>
      <filter id="retroGlow">
        <feGaussianBlur stdDeviation="2"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>`
  };
}

module.exports = {
  createPixelArtGradient,
  createNeonArcadeGradient,
  createEnergyBlastGradient,
  createSpeedLinesGradient,
  createBossBattleGradient,
  createPowerUpGradient,
  createCyberpunkGradient,
  createRetroWaveGradient
}; 