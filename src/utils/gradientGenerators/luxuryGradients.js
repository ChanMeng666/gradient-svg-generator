/*
 * MIT License
 * Copyright (c) 2025 ChanMeng666
 * Refactored to use centralized FilterLibrary and AnimationLibrary
 */

const {
  createGlowFilter,
  createTurbulenceFilter,
  createColorMatrixFilter,
  createSpecularLightingFilter
} = require('../../core/FilterLibrary');

const { multiplyDuration } = require('../../core/AnimationLibrary');

// Luxury gradient generators
function createGoldFoilGradient(stops, animationConfig, animationDuration) {
  const goldFilter = createGlowFilter('goldGlow', {
    color: '#ffd700',
    intensity: 2,
    opacity: 0.6
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animateTransform attributeName="gradientTransform" type="rotate" values="0 50 50;360 50 50" ${animationConfig} />
      </linearGradient>
      ${goldFilter}`
  };
}

function createDiamondGradient(stops, animationConfig, animationDuration) {
  const diamondFilter = createColorMatrixFilter('diamondSparkle', {
    saturation: 1.5,
    includeBlur: true,
    blurAmount: 1
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="40%">
        ${stops}
        <animate attributeName="r" values="30%;60%;30%" dur="${multiplyDuration(animationDuration, 0.6)}" repeatCount="indefinite" />
      </radialGradient>
      ${diamondFilter}`
  };
}

function createMarbleGradient(stops, animationConfig, animationDuration) {
  const marbleFilter = createTurbulenceFilter('marbleVeins', {
    baseFrequency: '0.3',
    numOctaves: 4,
    scale: 8,
    animated: false
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x2" values="100%;80%;120%;100%" ${animationConfig} />
        <animate attributeName="y2" values="100%;120%;80%;100%" ${animationConfig} />
      </linearGradient>
      ${marbleFilter}`
  };
}

function createPlatinumGradient(stops, animationConfig, animationDuration) {
  const platinumFilter = createSpecularLightingFilter('platinumShine', {
    specularConstant: 1.5,
    specularExponent: 20,
    lightColor: 'white',
    lightPosition: { x: 50, y: 50, z: 200 }
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;20%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;80%;100%" ${animationConfig} />
      </linearGradient>
      ${platinumFilter}`
  };
}

function createRoseGoldGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
        <animate attributeName="cy" values="30%;70%;30%" dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite" />
      </radialGradient>`
  };
}

function createCrystalGradient(stops, animationConfig, animationDuration) {
  const crystalFilter = createColorMatrixFilter('crystalPrism', {
    saturation: 1.2,
    includeBlur: true,
    blurAmount: 2
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" dur="${multiplyDuration(animationDuration, 0.8)}" repeatCount="indefinite" />
        <animate attributeName="x2" values="100%;200%;100%" dur="${multiplyDuration(animationDuration, 0.8)}" repeatCount="indefinite" />
      </linearGradient>
      ${crystalFilter}`
  };
}

function createVelvetGradient(stops, animationConfig, animationDuration) {
  const velvetFilter = `
    <filter id="velvetTexture">
      <feTurbulence baseFrequency="1.5" numOctaves="2"/>
      <feDisplacementMap scale="2"/>
      <feGaussianBlur stdDeviation="0.5"/>
    </filter>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="80%">
        ${stops}
        <animate attributeName="r" values="60%;100%;60%" ${animationConfig} />
      </radialGradient>
      ${velvetFilter}`
  };
}

module.exports = {
  createGoldFoilGradient,
  createDiamondGradient,
  createMarbleGradient,
  createPlatinumGradient,
  createRoseGoldGradient,
  createCrystalGradient,
  createVelvetGradient
};
