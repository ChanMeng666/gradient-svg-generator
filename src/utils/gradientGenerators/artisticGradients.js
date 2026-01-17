/*
 * MIT License
 * Copyright (c) 2025 ChanMeng666
 * Refactored to use centralized FilterLibrary and AnimationLibrary
 */

const {
  createBlurFilter,
  createTurbulenceFilter,
  createColorMatrixFilter
} = require('../../core/FilterLibrary');

const { multiplyDuration } = require('../../core/AnimationLibrary');

// Artistic gradient generators
function createWatercolorGradient(stops, animationConfig, animationDuration) {
  const watercolorFilter = `
    <filter id="watercolorBlur">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feOffset in="blur" dx="2" dy="2"/>
    </filter>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="40%" cy="40%" r="60%">
        ${stops}
        <animate attributeName="cx" values="40%;60%;40%" ${animationConfig} />
        <animate attributeName="cy" values="40%;60%;40%" dur="${multiplyDuration(animationDuration, 1.3)}" repeatCount="indefinite" />
      </radialGradient>
      ${watercolorFilter}`
  };
}

function createOilPaintGradient(stops, animationConfig, animationDuration) {
  const oilPaintFilter = createTurbulenceFilter('oilPaintTexture', {
    baseFrequency: '0.4',
    numOctaves: 2,
    scale: 5,
    animated: false
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;30%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;30%;0%" ${animationConfig} />
      </linearGradient>
      ${oilPaintFilter}`
  };
}

function createInkSplashGradient(stops, animationConfig, animationDuration) {
  const inkFilter = createTurbulenceFilter('inkSplatter', {
    baseFrequency: '1.2',
    numOctaves: 3,
    scale: 15,
    animated: true,
    animationValues: '15;30;15',
    duration: animationDuration
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="40%">
        ${stops}
        <animate attributeName="r" values="20%;80%;20%" ${animationConfig} />
      </radialGradient>
      ${inkFilter}`
  };
}

function createMosaicGradient(stops, animationConfig, animationDuration, colorsCopy) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
      </linearGradient>
      <pattern id="mosaicPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <rect width="15" height="15" fill="#${colorsCopy[0]}" opacity="0.8"/>
        <rect x="15" width="15" height="15" fill="#${colorsCopy[1]}" opacity="0.8"/>
        <rect y="15" width="15" height="15" fill="#${colorsCopy[2]}" opacity="0.8"/>
        <rect x="15" y="15" width="15" height="15" fill="#${colorsCopy[3] || colorsCopy[0]}" opacity="0.8"/>
        <animateTransform attributeName="patternTransform" type="rotate" values="0 15 15;360 15 15" ${animationConfig} />
      </pattern>`
  };
}

function createAbstractGeoGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animateTransform attributeName="gradientTransform" type="rotate" values="0 50 50;180 50 50;360 50 50" ${animationConfig} />
      </linearGradient>`
  };
}

function createGraffitiGradient(stops, animationConfig, animationDuration) {
  const graffitiFilter = createTurbulenceFilter('graffitiSpray', {
    baseFrequency: '2',
    numOctaves: 1,
    scale: 3,
    animated: false
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="-30%;70%;-30%" ${animationConfig} />
        <animate attributeName="x2" values="30%;130%;30%" ${animationConfig} />
      </linearGradient>
      ${graffitiFilter}`
  };
}

function createVintageGradient(stops, animationConfig, animationDuration) {
  const vintageFilter = `
    <filter id="vintageTexture">
      <feTurbulence baseFrequency="0.8" numOctaves="2"/>
      <feColorMatrix values="0.9 0.3 0.2 0 0.1 0.3 0.8 0.1 0 0.1 0.2 0.2 0.8 0 0.1 0 0 0 1 0"/>
    </filter>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
      </radialGradient>
      ${vintageFilter}`
  };
}

module.exports = {
  createWatercolorGradient,
  createOilPaintGradient,
  createInkSplashGradient,
  createMosaicGradient,
  createAbstractGeoGradient,
  createGraffitiGradient,
  createVintageGradient
};
