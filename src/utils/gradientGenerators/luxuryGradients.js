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

// Luxury gradient generators
function createGoldFoilGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animateTransform attributeName="gradientTransform" type="rotate" values="0 50 50;360 50 50" ${animationConfig} />
      </linearGradient>
      <filter id="goldGlow">
        <feGaussianBlur stdDeviation="2"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>`
  };
}

function createDiamondGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="40%">
        ${stops}
        <animate attributeName="r" values="30%;60%;30%" dur="${parseFloat(animationDuration) * 0.6}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="diamondSparkle">
        <feGaussianBlur stdDeviation="1"/>
        <feColorMatrix values="1.5 0 0 0 0 0 1.5 0 0 0 0 0 1.5 0 0 0 0 0 1 0"/>
      </filter>`
  };
}

function createMarbleGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x2" values="100%;80%;120%;100%" ${animationConfig} />
        <animate attributeName="y2" values="100%;120%;80%;100%" ${animationConfig} />
      </linearGradient>
      <filter id="marbleVeins">
        <feTurbulence baseFrequency="0.3" numOctaves="4"/>
        <feDisplacementMap scale="8"/>
      </filter>`
  };
}

function createPlatinumGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;20%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;80%;100%" ${animationConfig} />
      </linearGradient>
      <filter id="platinumShine">
        <feGaussianBlur stdDeviation="1"/>
        <feSpecularLighting surfaceScale="2" specularConstant="1.5" specularExponent="20" lighting-color="white">
          <fePointLight x="50" y="50" z="200"/>
        </feSpecularLighting>
      </filter>`
  };
}

function createRoseGoldGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
        <animate attributeName="cy" values="30%;70%;30%" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
      </radialGradient>`
  };
}

function createCrystalGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
        <animate attributeName="x2" values="100%;200%;100%" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
      </linearGradient>
      <filter id="crystalPrism">
        <feGaussianBlur stdDeviation="2"/>
        <feColorMatrix values="1.2 0 0 0 0 0 1.2 0 0 0 0 0 1.2 0 0 0 0 0 1 0"/>
      </filter>`
  };
}

function createVelvetGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="80%">
        ${stops}
        <animate attributeName="r" values="60%;100%;60%" ${animationConfig} />
      </radialGradient>
      <filter id="velvetTexture">
        <feTurbulence baseFrequency="1.5" numOctaves="2"/>
        <feDisplacementMap scale="2"/>
        <feGaussianBlur stdDeviation="0.5"/>
      </filter>`
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