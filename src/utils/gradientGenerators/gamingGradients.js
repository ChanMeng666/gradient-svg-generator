/*
 * MIT License
 * Copyright (c) 2025 ChanMeng666
 * Refactored to use centralized FilterLibrary and AnimationLibrary
 */

const {
  createGlowFilter,
  createBlurFilter,
  createColorMatrixFilter
} = require('../../core/FilterLibrary');

const { multiplyDuration } = require('../../core/AnimationLibrary');

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
  const neonFilter = createGlowFilter('neonGlow', {
    color: '#ffffff',
    intensity: 5,
    opacity: 0.8
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" dur="${multiplyDuration(animationDuration, 0.5)}" repeatCount="indefinite" />
      </linearGradient>
      ${neonFilter}`
  };
}

function createEnergyBlastGradient(stops, animationConfig, animationDuration) {
  const energyFilter = `
    <filter id="energyWave">
      <feGaussianBlur stdDeviation="5"/>
      <feMorphology operator="dilate" radius="2"/>
    </filter>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
        <animate attributeName="r" values="30%;80%;30%" dur="${multiplyDuration(animationDuration, 0.4)}" repeatCount="indefinite" />
      </radialGradient>
      ${energyFilter}`
  };
}

function createSpeedLinesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="-50%;50%" dur="${multiplyDuration(animationDuration, 0.3)}" repeatCount="indefinite" />
        <animate attributeName="x2" values="50%;150%" dur="${multiplyDuration(animationDuration, 0.3)}" repeatCount="indefinite" />
      </linearGradient>`
  };
}

function createBossBattleGradient(stops, animationConfig, animationDuration) {
  const battleFilter = createColorMatrixFilter('battleIntensity', {
    saturation: 1.3,
    includeBlur: true,
    blurAmount: 3
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="r" values="40%;80%;40%" dur="${multiplyDuration(animationDuration, 0.5)}" repeatCount="indefinite" />
        <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
      </radialGradient>
      ${battleFilter}`
  };
}

function createPowerUpGradient(stops, animationConfig, animationDuration) {
  const powerFilter = createColorMatrixFilter('powerGlow', {
    saturation: 1.2,
    includeBlur: true,
    blurAmount: 4
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
        <animate attributeName="r" values="30%;70%;30%" dur="${multiplyDuration(animationDuration, 0.7)}" repeatCount="indefinite" />
      </radialGradient>
      ${powerFilter}`
  };
}

function createCyberpunkGradient(stops, animationConfig, animationDuration) {
  const cyberpunkFilter = createColorMatrixFilter('cyberpunkGlow', {
    saturation: 1.4,
    includeBlur: true,
    blurAmount: 3
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;100%;0%" dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite" />
      </linearGradient>
      ${cyberpunkFilter}`
  };
}

function createRetroWaveGradient(stops, animationConfig, animationDuration) {
  const retroFilter = createGlowFilter('retroGlow', {
    color: '#ffffff',
    intensity: 2,
    opacity: 0.7
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;50%;100%;50%;0%" ${animationConfig} />
        <animate attributeName="y1" values="100%;50%;0%;50%;100%" ${animationConfig} />
      </linearGradient>
      ${retroFilter}`
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
