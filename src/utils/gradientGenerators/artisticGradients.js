/*
 * MIT License
 * Copyright (c) 2025 ChanMeng666
 * Refactored to use centralized FilterLibrary and AnimationLibrary
 */

const { createTurbulenceFilter } = require('../../core/FilterLibrary');
const { multiplyDuration } = require('../../core/AnimationLibrary');
const {
  animatedLinearGradient,
  animatedRadialGradient,
} = require('../../features/_shared/svgPrimitives');

function createWatercolorGradient(stops, animationConfig, animationDuration) {
  const watercolorFilter = `
    <filter id="watercolorBlur">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feOffset in="blur" dx="2" dy="2"/>
    </filter>`;

  return {
    gradientDef:
      animatedRadialGradient(stops, animationConfig, {
        coords: 'cx="40%" cy="40%" r="60%"',
        animates: [
          ['cx', '40%;60%;40%'],
          {
            attr: 'cy',
            values: '40%;60%;40%',
            cfg: `dur="${multiplyDuration(animationDuration, 1.3)}" repeatCount="indefinite"`,
          },
        ],
        indent: 6,
      }) + `\n      ${watercolorFilter}`,
  };
}

function createOilPaintGradient(stops, animationConfig, animationDuration) {
  const oilPaintFilter = createTurbulenceFilter('oilPaintTexture', {
    baseFrequency: '0.4',
    numOctaves: 2,
    scale: 5,
    animated: false,
  });

  return {
    gradientDef:
      animatedLinearGradient(stops, animationConfig, {
        coords: 'x1="0%" y1="0%" x2="100%" y2="100%"',
        animates: [
          ['x1', '0%;30%;0%'],
          ['y1', '0%;30%;0%'],
        ],
        indent: 6,
      }) + `\n      ${oilPaintFilter}`,
  };
}

function createInkSplashGradient(stops, animationConfig, animationDuration) {
  const inkFilter = createTurbulenceFilter('inkSplatter', {
    baseFrequency: '1.2',
    numOctaves: 3,
    scale: 15,
    animated: true,
    animationValues: '15;30;15',
    duration: animationDuration,
  });

  return {
    gradientDef:
      animatedRadialGradient(stops, animationConfig, {
        coords: 'cx="50%" cy="50%" r="40%"',
        animates: [['r', '20%;80%;20%']],
        indent: 6,
      }) + `\n      ${inkFilter}`,
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
      </pattern>`,
  };
}

function createAbstractGeoGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: animatedLinearGradient(stops, animationConfig, {
      coords: 'x1="0%" y1="0%" x2="100%" y2="100%"',
      animates: [
        {
          attr: 'gradientTransform',
          values: '0 50 50;180 50 50;360 50 50',
          type: 'transform',
        },
      ],
      indent: 6,
    }),
  };
}

function createGraffitiGradient(stops, animationConfig, animationDuration) {
  const graffitiFilter = createTurbulenceFilter('graffitiSpray', {
    baseFrequency: '2',
    numOctaves: 1,
    scale: 3,
    animated: false,
  });

  return {
    gradientDef:
      animatedLinearGradient(stops, animationConfig, {
        coords: 'x1="0%" y1="50%" x2="100%" y2="50%"',
        animates: [
          ['x1', '-30%;70%;-30%'],
          ['x2', '30%;130%;30%'],
        ],
        indent: 6,
      }) + `\n      ${graffitiFilter}`,
  };
}

function createVintageGradient(stops, animationConfig, animationDuration) {
  const vintageFilter = `
    <filter id="vintageTexture">
      <feTurbulence baseFrequency="0.8" numOctaves="2"/>
      <feColorMatrix values="0.9 0.3 0.2 0 0.1 0.3 0.8 0.1 0 0.1 0.2 0.2 0.8 0 0.1 0 0 0 1 0"/>
    </filter>`;

  return {
    gradientDef:
      animatedRadialGradient(stops, animationConfig, {
        coords: 'cx="50%" cy="50%" r="70%"',
        animates: [['r', '50%;90%;50%']],
        indent: 6,
      }) + `\n      ${vintageFilter}`,
  };
}

module.exports = {
  createWatercolorGradient,
  createOilPaintGradient,
  createInkSplashGradient,
  createMosaicGradient,
  createAbstractGeoGradient,
  createGraffitiGradient,
  createVintageGradient,
};
