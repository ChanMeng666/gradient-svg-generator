/*
 * MIT License - Weather & Atmospheric Gradient Generators
 * Natural weather phenomena and atmospheric effects
 * Refactored to use centralized FilterLibrary and AnimationLibrary
 *
 * Copyright (c) 2025 ChanMeng666
 */

const {
  createBlurFilter,
  createTurbulenceFilter,
  createGlowFilter
} = require('../../core/FilterLibrary');

const {
  multiplyDuration,
  createOpacityAnimation
} = require('../../core/AnimationLibrary');

// Fog Rolling - Layered horizontal gradients with slow-moving opacity
function createFogRollingGradient(stops, animationConfig, animationDuration) {
  const fogFilter = `
    <filter id="fogBlur">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.7"/>
      </feComponentTransfer>
    </filter>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;-30%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;130%;100%" ${animationConfig} />
      </linearGradient>
      ${fogFilter}`,
    additionalElements: `
      <g opacity="0.9">
        <rect x="0" y="150" width="800" height="100" fill="url(#gradient)" filter="url(#fogBlur)">
          <animate attributeName="opacity" values="0.6;0.9;0.6" dur="${multiplyDuration(animationDuration, 1.5)}" repeatCount="indefinite" />
        </rect>
        <rect x="0" y="250" width="800" height="120" fill="url(#gradient)" filter="url(#fogBlur)">
          <animate attributeName="opacity" values="0.8;0.5;0.8" dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite" />
        </rect>
        <rect x="0" y="100" width="800" height="80" fill="url(#gradient)" filter="url(#fogBlur)">
          <animate attributeName="opacity" values="0.5;0.7;0.5" dur="${multiplyDuration(animationDuration, 1.8)}" repeatCount="indefinite" />
        </rect>
      </g>`
  };
}

// Monsoon Rain - Diagonal streaks with varying speeds
function createMonsoonRainGradient(stops, animationConfig, animationDuration) {
  const rainFilter = createBlurFilter('rainBlur', {
    stdDeviation: 0.5,
    saturate: false
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="30%" y1="0%" x2="70%" y2="100%">
        ${stops}
      </linearGradient>
      <pattern id="rainPattern" x="0" y="0" width="40" height="100" patternUnits="userSpaceOnUse">
        <line x1="10" y1="0" x2="15" y2="100" stroke="url(#gradient)" stroke-width="2" opacity="0.7">
          <animate attributeName="y1" values="0;100" dur="${multiplyDuration(animationDuration, 0.3)}" repeatCount="indefinite" />
          <animate attributeName="y2" values="100;200" dur="${multiplyDuration(animationDuration, 0.3)}" repeatCount="indefinite" />
        </line>
        <line x1="25" y1="-30" x2="30" y2="70" stroke="url(#gradient)" stroke-width="1.5" opacity="0.5">
          <animate attributeName="y1" values="-30;70" dur="${multiplyDuration(animationDuration, 0.25)}" repeatCount="indefinite" />
          <animate attributeName="y2" values="70;170" dur="${multiplyDuration(animationDuration, 0.25)}" repeatCount="indefinite" />
        </line>
      </pattern>
      ${rainFilter}`
  };
}

// Snowfall Drift - Gentle floating particles with soft animation
function createSnowfallDriftGradient(stops, animationConfig, animationDuration) {
  const snowFilter = createGlowFilter('snowGlow', {
    color: '#ffffff',
    intensity: 3,
    opacity: 0.9
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
      </radialGradient>
      ${snowFilter}`,
    additionalElements: `
      <g filter="url(#snowGlow)">
        ${Array.from({length: 20}, (_, i) => `
          <circle cx="${50 + i * 40}" cy="${100 + (i % 3) * 150}" r="${3 + (i % 3)}" fill="url(#gradient)" opacity="0.8">
            <animate attributeName="cy" values="${100 + (i % 3) * 150};${600 + (i % 3) * 150};${100 + (i % 3) * 150}" dur="${8 + (i % 4) * 2}s" repeatCount="indefinite" />
            <animate attributeName="cx" values="${50 + i * 40};${70 + i * 40};${50 + i * 40}" dur="${4 + (i % 3)}s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="${3 + (i % 2)}s" repeatCount="indefinite" />
          </circle>
        `).join('')}
      </g>`
  };
}

// Sandstorm Swirl - Turbulent opaque particles
function createSandstormSwirlGradient(stops, animationConfig, animationDuration) {
  const sandstormFilter = createTurbulenceFilter('sandstormTurbulence', {
    baseFrequency: '0.8',
    numOctaves: 3,
    scale: 30,
    animated: true,
    animationValues: '20;40;20',
    duration: animationDuration
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;50%;0%" dur="${multiplyDuration(animationDuration, 0.5)}" repeatCount="indefinite" />
        <animate attributeName="y1" values="0%;30%;0%" dur="${multiplyDuration(animationDuration, 0.7)}" repeatCount="indefinite" />
      </linearGradient>
      ${sandstormFilter}`
  };
}

// Tornado Vortex - Aggressive spiral rotation
function createTornadoVortexGradient(stops, animationConfig, animationDuration) {
  const tornadoFilter = createTurbulenceFilter('tornadoDistortion', {
    baseFrequency: '0.5',
    numOctaves: 4,
    scale: 40,
    animated: true,
    animationValues: '30;50;30',
    duration: multiplyDuration(animationDuration, 0.5)
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="r" values="40%;70%;40%" ${animationConfig} />
      </radialGradient>
      ${tornadoFilter}`,
    additionalElements: `
      <g transform="translate(400, 300)">
        <ellipse rx="100" ry="250" fill="url(#gradient)" filter="url(#tornadoDistortion)" opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${multiplyDuration(animationDuration, 0.8)}" repeatCount="indefinite"/>
        </ellipse>
        <ellipse rx="70" ry="200" fill="url(#gradient)" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${multiplyDuration(animationDuration, 0.6)}" repeatCount="indefinite"/>
        </ellipse>
        <ellipse rx="40" ry="150" fill="url(#gradient)" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="360;0" dur="${multiplyDuration(animationDuration, 0.4)}" repeatCount="indefinite"/>
        </ellipse>
      </g>`
  };
}

// Lightning Web - Branching electric patterns with sharp opacity flashes
function createLightningWebGradient(stops, animationConfig, animationDuration) {
  const lightningFilter = createGlowFilter('lightningGlow', {
    color: '#ffffff',
    intensity: 4,
    opacity: 1.2
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
      </linearGradient>
      ${lightningFilter}`,
    additionalElements: `
      <g filter="url(#lightningGlow)">
        <path d="M 400 50 L 420 150 L 380 150 L 410 250 L 370 250 L 400 350" stroke="url(#gradient)" stroke-width="4" fill="none" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="${multiplyDuration(animationDuration, 0.15)}" repeatCount="indefinite" />
        </path>
        <path d="M 300 100 L 280 180 L 320 180 L 290 280" stroke="url(#gradient)" stroke-width="3" fill="none" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="${multiplyDuration(animationDuration, 0.2)}" begin="${multiplyDuration(animationDuration, 0.1)}" repeatCount="indefinite" />
        </path>
        <path d="M 500 80 L 520 160 L 480 160 L 510 260 L 490 300" stroke="url(#gradient)" stroke-width="3" fill="none" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="${multiplyDuration(animationDuration, 0.18)}" begin="${multiplyDuration(animationDuration, 0.05)}" repeatCount="indefinite" />
        </path>
      </g>`
  };
}

// Prism Refraction - Spectral light separation
function createPrismRefractionGradient(stops, animationConfig, animationDuration) {
  const chromaticFilter = `
    <filter id="chromaticSplit">
      <feOffset in="SourceGraphic" dx="2" dy="0" result="red"/>
      <feOffset in="SourceGraphic" dx="0" dy="0" result="green"/>
      <feOffset in="SourceGraphic" dx="-2" dy="0" result="blue"/>
      <feBlend in="red" in2="green" mode="screen" result="rg"/>
      <feBlend in="rg" in2="blue" mode="screen"/>
    </filter>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="30%" y1="50%" x2="70%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="30%;20%;30%" ${animationConfig} />
        <animate attributeName="x2" values="70%;80%;70%" ${animationConfig} />
      </linearGradient>
      ${chromaticFilter}`,
    additionalElements: `
      <g filter="url(#chromaticSplit)">
        <polygon points="300,200 500,100 500,400" fill="url(#gradient)" opacity="0.8">
          <animate attributeName="opacity" values="0.6;0.9;0.6" ${animationConfig} />
        </polygon>
        <rect x="200" y="150" width="150" height="300" fill="url(#gradient)" opacity="0.4">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="${multiplyDuration(animationDuration, 1.3)}" repeatCount="indefinite" />
        </rect>
      </g>`
  };
}

module.exports = {
  createFogRollingGradient,
  createMonsoonRainGradient,
  createSnowfallDriftGradient,
  createSandstormSwirlGradient,
  createTornadoVortexGradient,
  createLightningWebGradient,
  createPrismRefractionGradient
};
