/*
 * MIT License - Light & Shadow Play Gradient Generators
 * Optical effects and illumination patterns
 * Refactored to use centralized FilterLibrary and AnimationLibrary
 *
 * Copyright (c) 2025 ChanMeng666
 */

const { createTurbulenceFilter, createBlurFilter, createGlowFilter } = require('../../core/FilterLibrary');
const { multiplyDuration } = require('../../core/AnimationLibrary');

// Caustic Underwater - Light refraction through water surface
function createCausticUnderwaterGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="cx" values="40%;60%;40%" ${animationConfig} />
        <animate attributeName="cy" values="40%;60%;40%" dur="${multiplyDuration(animationDuration, 1.3)}" repeatCount="indefinite" />
      </radialGradient>
      <filter id="causticDistortion">
        <feTurbulence baseFrequency="0.3" numOctaves="2" result="noise">
          <animate attributeName="baseFrequency" values="0.2;0.4;0.2" ${animationConfig} />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15">
          <animate attributeName="scale" values="10;20;10" ${animationConfig} />
        </feDisplacementMap>
        <feGaussianBlur stdDeviation="2"/>
      </filter>`,
    additionalElements: `
      <g filter="url(#causticDistortion)">
        <ellipse cx="300" cy="200" rx="80" ry="50" fill="url(#gradient)" opacity="0.7">
          <animate attributeName="rx" values="60;100;60" ${animationConfig} />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="${multiplyDuration(animationDuration, 1.5)}" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="500" cy="300" rx="60" ry="40" fill="url(#gradient)" opacity="0.6">
          <animate attributeName="ry" values="30;50;30" dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="400" cy="400" rx="70" ry="45" fill="url(#gradient)" opacity="0.65">
          <animate attributeName="cx" values="380;420;380" dur="${multiplyDuration(animationDuration, 1.8)}" repeatCount="indefinite" />
        </ellipse>
      </g>`
  };
}

// Venetian Blind - Horizontal slat shadow patterns
function createVenetianBlindGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
      </linearGradient>
      <pattern id="blindPattern" x="0" y="0" width="800" height="40" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="800" height="25" fill="url(#gradient)" opacity="0.8"/>
        <rect x="0" y="25" width="800" height="15" fill="url(#gradient)" opacity="0.3">
          <animate attributeName="opacity" values="0.2;0.4;0.2" ${animationConfig} />
        </rect>
        <animateTransform attributeName="patternTransform" type="skewY" values="0;3;0" ${animationConfig} />
      </pattern>`
  };
}

// Stained Glass - Colored light transmission with leading
function createStainedGlassGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
      </radialGradient>
      <filter id="stainedGlassEffect">
        <feGaussianBlur stdDeviation="1"/>
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1"/>
          <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1"/>
          <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1"/>
        </feComponentTransfer>
      </filter>`,
    additionalElements: `
      <g filter="url(#stainedGlassEffect)">
        <circle cx="250" cy="250" r="80" fill="url(#gradient)" opacity="0.9" stroke="#222" stroke-width="4">
          <animate attributeName="opacity" values="0.8;1;0.8" ${animationConfig} />
        </circle>
        <circle cx="550" cy="250" r="80" fill="url(#gradient)" opacity="0.85" stroke="#222" stroke-width="4">
          <animate attributeName="opacity" values="0.7;0.95;0.7" dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="400" r="90" fill="url(#gradient)" opacity="0.9" stroke="#222" stroke-width="4">
          <animate attributeName="opacity" values="0.75;1;0.75" dur="${multiplyDuration(animationDuration, 0.8)}" repeatCount="indefinite" />
        </circle>
        <polygon points="400,150 500,350 300,350" fill="url(#gradient)" opacity="0.8" stroke="#222" stroke-width="4">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="${multiplyDuration(animationDuration, 1.5)}" repeatCount="indefinite" />
        </polygon>
      </g>`
  };
}

// Lens Flare - Optical artifact with hexagonal bokeh
function createLensFlareGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
      </radialGradient>
      <filter id="flareGlow">
        <feGaussianBlur stdDeviation="8"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="1.5"/>
        </feComponentTransfer>
      </filter>`,
    additionalElements: `
      <g filter="url(#flareGlow)">
        <circle cx="600" cy="150" r="60" fill="url(#gradient)" opacity="0.9">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="${multiplyDuration(animationDuration, 0.5)}" repeatCount="indefinite" />
        </circle>
        <polygon points="500,200 520,220 510,245 490,245 480,220" fill="url(#gradient)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="${multiplyDuration(animationDuration, 0.7)}" repeatCount="indefinite" />
        </polygon>
        <circle cx="400" cy="250" r="30" fill="url(#gradient)" opacity="0.5"/>
        <circle cx="300" cy="300" r="25" fill="url(#gradient)" opacity="0.4"/>
        <circle cx="200" cy="350" r="20" fill="url(#gradient)" opacity="0.3"/>
        <ellipse cx="650" cy="180" rx="80" ry="40" fill="url(#gradient)" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" ${animationConfig} />
        </ellipse>
      </g>`
  };
}

// Bokeh Blur - Out-of-focus light circles
function createBokehBlurGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
      </radialGradient>
      <filter id="bokehFilter">
        <feGaussianBlur stdDeviation="6"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.8"/>
        </feComponentTransfer>
      </filter>`,
    additionalElements: `
      <g filter="url(#bokehFilter)">
        ${Array.from({length: 15}, (_, i) => {
          const x = 100 + (i * 50) % 700;
          const y = 150 + ((i * 37) % 300);
          const r = 20 + (i % 4) * 10;
          const duration = 3 + (i % 3);
          return `
            <circle cx="${x}" cy="${y}" r="${r}" fill="url(#gradient)" opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="${duration}s" repeatCount="indefinite" />
              <animate attributeName="r" values="${r};${r + 10};${r}" dur="${duration * 1.5}s" repeatCount="indefinite" />
            </circle>
          `;
        }).join('')}
      </g>`
  };
}

// God Rays - Crepuscular beams through atmosphere
function createGodRaysGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
        ${stops}
      </linearGradient>
      <filter id="rayGlow">
        <feGaussianBlur stdDeviation="5"/>
      </filter>`,
    additionalElements: `
      <g transform="translate(400, 100)" filter="url(#rayGlow)">
        ${Array.from({length: 7}, (_, i) => {
          const angle = -30 + i * 10;
          const width = 40 + (i % 3) * 20;
          return `
            <rect x="-${width/2}" y="0" width="${width}" height="500" fill="url(#gradient)" opacity="0.5"
                  transform="rotate(${angle})">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="${4 + i}s" repeatCount="indefinite" />
            </rect>
          `;
        }).join('')}
      </g>`
  };
}

// Eclipse Corona - Solar corona during totality
function createEclipseCoronaGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
      </radialGradient>
      <filter id="coronaGlow">
        <feGaussianBlur stdDeviation="10"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="1.2"/>
        </feComponentTransfer>
      </filter>`,
    additionalElements: `
      <g transform="translate(400, 300)">
        <circle r="80" fill="#000000" opacity="1"/>
        <circle r="120" fill="url(#gradient)" filter="url(#coronaGlow)" opacity="0.8">
          <animate attributeName="r" values="110;130;110" ${animationConfig} />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="${multiplyDuration(animationDuration, 1.5)}" repeatCount="indefinite" />
        </circle>
        <circle r="150" fill="url(#gradient)" filter="url(#coronaGlow)" opacity="0.5">
          <animate attributeName="r" values="140;160;140" dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite" />
        </circle>
        <circle r="180" fill="url(#gradient)" filter="url(#coronaGlow)" opacity="0.3">
          <animate attributeName="r" values="170;190;170" dur="${multiplyDuration(animationDuration, 0.9)}" repeatCount="indefinite" />
        </circle>
      </g>`
  };
}

module.exports = {
  createCausticUnderwaterGradient,
  createVenetianBlindGradient,
  createStainedGlassGradient,
  createLensFlareGradient,
  createBokehBlurGradient,
  createGodRaysGradient,
  createEclipseCoronaGradient
};
