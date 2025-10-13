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

// Metallic and shimmer gradient generators inspired by example project

function createCopperMetallicGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <filter id="copper-3d" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="2" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="copper-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgba(243,226,199,0.8)" />
        <stop offset="50%" style="stop-color:rgba(182,141,76,0.9)" />
        <stop offset="100%" style="stop-color:rgba(233,212,179,0.8)" />
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#copper-highlight)" filter="url(#copper-3d)" opacity="0.4"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        ${stops}
        <animate attributeName="y1" values="0%;100%;0%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createShineShimmerGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <linearGradient id="shine-sweep" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:rgba(255,255,255,0)" />
        <stop offset="45%" style="stop-color:rgba(255,255,255,0)" />
        <stop offset="50%" style="stop-color:rgba(255,255,255,0.8)" />
        <stop offset="55%" style="stop-color:rgba(255,255,255,0)" />
        <stop offset="100%" style="stop-color:rgba(255,255,255,0)" />
        <animate attributeName="x1" values="-100%;100%" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite"/>
        <animate attributeName="x2" values="0%;200%" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#shine-sweep)" opacity="0.6"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createNeonPulseGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2"/>
        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur3"/>
        <feMerge>
          <feMergeNode in="blur3"/>
          <feMergeNode in="blur2"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
        <animate attributeName="stdDeviation" values="5;15;5" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#gradient)" filter="url(#neon-glow)" opacity="0.8">
      <animate attributeName="opacity" values="0.6;1;0.6" ${animationConfig} />
    </rect>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="r" values="50%;80%;50%" ${animationConfig} />
      </radialGradient>`,
    additionalElements
  };
}

function createAquaFlowGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <linearGradient id="aqua-flow" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:rgba(209,255,251,0.6)">
          <animate attributeName="offset" values="0%;1%;0%" ${animationConfig} />
        </stop>
        <stop offset="100%" style="stop-color:rgba(0,186,186,0.8)">
          <animate attributeName="offset" values="0.5%;1.5%;0.5%" ${animationConfig} />
        </stop>
      </linearGradient>
      <filter id="aqua-blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#aqua-flow)" filter="url(#aqua-blur)" opacity="0.5"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;200%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createSparkleEffectGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <filter id="sparkle-glow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur"/>
        <feColorMatrix in="blur" type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/>
        <feBlend in="SourceGraphic" in2="blur" mode="screen"/>
      </filter>
    </defs>
    <g filter="url(#sparkle-glow)">
      <circle cx="100" cy="30" r="3" fill="white" opacity="0.8">
        <animate attributeName="opacity" values="0;0.8;0" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="100;800" dur="${parseFloat(animationDuration)}s" repeatCount="indefinite"/>
      </circle>
      <circle cx="300" cy="60" r="2" fill="white" opacity="0.6">
        <animate attributeName="opacity" values="0;0.6;0" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" begin="0.3s"/>
        <animate attributeName="cx" values="300;750" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite"/>
      </circle>
      <circle cx="500" cy="90" r="4" fill="white" opacity="0.7">
        <animate attributeName="opacity" values="0;0.7;0" dur="${parseFloat(animationDuration) * 0.35}s" repeatCount="indefinite" begin="0.6s"/>
        <animate attributeName="cx" values="500;850" dur="${parseFloat(animationDuration) * 0.9}s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="45" r="2.5" fill="white" opacity="0.5">
        <animate attributeName="opacity" values="0;0.5;0" dur="${parseFloat(animationDuration) * 0.45}s" repeatCount="indefinite" begin="0.2s"/>
        <animate attributeName="cx" values="200;700" dur="${parseFloat(animationDuration) * 1.1}s" repeatCount="indefinite"/>
      </circle>
      <circle cx="400" cy="75" r="3.5" fill="white" opacity="0.65">
        <animate attributeName="opacity" values="0;0.65;0" dur="${parseFloat(animationDuration) * 0.38}s" repeatCount="indefinite" begin="0.5s"/>
        <animate attributeName="cx" values="400;800" dur="${parseFloat(animationDuration) * 0.95}s" repeatCount="indefinite"/>
      </circle>
    </g>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;0%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createChromeFlowGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <linearGradient id="chrome-layer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgba(200,200,200,0.4)" />
        <stop offset="30%" style="stop-color:rgba(255,255,255,0.7)" />
        <stop offset="50%" style="stop-color:rgba(180,180,180,0.5)" />
        <stop offset="70%" style="stop-color:rgba(255,255,255,0.6)" />
        <stop offset="100%" style="stop-color:rgba(150,150,150,0.4)" />
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite"/>
      </linearGradient>
      <filter id="chrome-shine">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#chrome-layer)" filter="url(#chrome-shine)" opacity="0.5"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createBronzeGleamGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <radialGradient id="bronze-gleam" cx="50%" cy="50%" r="60%">
        <stop offset="0%" style="stop-color:rgba(205,127,50,0.7)" />
        <stop offset="50%" style="stop-color:rgba(184,115,51,0.8)" />
        <stop offset="100%" style="stop-color:rgba(139,90,43,0.6)" />
        <animate attributeName="r" values="40%;70%;40%" ${animationConfig} />
        <animate attributeName="cx" values="50%;60%;40%;50%" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite"/>
      </radialGradient>
      <filter id="bronze-depth">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
        <feOffset dx="1" dy="1" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#bronze-gleam)" filter="url(#bronze-depth)" opacity="0.5"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="y2" values="100%;0%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createPlatinumSparkleGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <linearGradient id="platinum-base" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:rgba(229,228,226,0.6)" />
        <stop offset="50%" style="stop-color:rgba(255,255,255,0.8)" />
        <stop offset="100%" style="stop-color:rgba(204,204,204,0.6)" />
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
      </linearGradient>
      <filter id="platinum-sparkle" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
        <feColorMatrix in="noise" type="saturate" values="0" result="desaturatedNoise"/>
        <feComponentTransfer in="desaturatedNoise" result="theNoise">
          <feFuncA type="discrete" tableValues="0 0 0 0 0 1 0 0 0 0"/>
        </feComponentTransfer>
        <feBlend in="SourceGraphic" in2="theNoise" mode="screen"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#platinum-base)" filter="url(#platinum-sparkle)" opacity="0.4"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;200%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createSteelAquaGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <linearGradient id="steel-layer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgba(176,196,222,0.5)">
          <animate attributeName="stop-color"
            values="rgba(176,196,222,0.5);rgba(135,206,235,0.6);rgba(176,196,222,0.5)"
            ${animationConfig} />
        </stop>
        <stop offset="100%" style="stop-color:rgba(70,130,180,0.6)">
          <animate attributeName="stop-color"
            values="rgba(70,130,180,0.6);rgba(100,149,237,0.7);rgba(70,130,180,0.6)"
            ${animationConfig} />
        </stop>
      </linearGradient>
      <filter id="steel-metallic">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"/>
        <feSpecularLighting surfaceScale="5" specularConstant="0.8" specularExponent="20" lighting-color="white">
          <fePointLight x="50" y="50" z="200"/>
        </feSpecularLighting>
        <feComposite in="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="854" height="120" fill="url(#steel-layer)" filter="url(#steel-metallic)" opacity="0.4"/>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;200%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

module.exports = {
  createCopperMetallicGradient,
  createShineShimmerGradient,
  createNeonPulseGradient,
  createAquaFlowGradient,
  createSparkleEffectGradient,
  createChromeFlowGradient,
  createBronzeGleamGradient,
  createPlatinumSparkleGradient,
  createSteelAquaGradient
};
