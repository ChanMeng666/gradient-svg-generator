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

// Organic nature gradient generators
function createFlowingWaterGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
      </linearGradient>
      <filter id="waterRipple">
        <feTurbulence baseFrequency="0.5" numOctaves="2"/>
        <feDisplacementMap scale="10">
          <animate attributeName="scale" values="5;15;5" ${animationConfig} />
        </feDisplacementMap>
      </filter>`
  };
}

function createFlameGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="80%" r="60%">
        ${stops}
        <animate attributeName="cy" values="80%;60%;80%" ${animationConfig} />
        <animate attributeName="r" values="60%;80%;60%" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="flameFlicker">
        <feTurbulence baseFrequency="0.9" numOctaves="4"/>
        <feDisplacementMap scale="15">
          <animate attributeName="scale" values="15;25;15" ${animationConfig} />
        </feDisplacementMap>
      </filter>`
  };
}

function createCloudsGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="40%" r="80%">
        ${stops}
        <animate attributeName="cx" values="30%;70%;30%" dur="${parseFloat(animationDuration) * 2}s" repeatCount="indefinite" />
        <animate attributeName="cy" values="40%;60%;40%" ${animationConfig} />
      </radialGradient>
      <filter id="cloudFloat">
        <feTurbulence baseFrequency="0.2" numOctaves="3"/>
        <feDisplacementMap scale="20">
          <animate attributeName="scale" values="20;30;20" ${animationConfig} />
        </feDisplacementMap>
      </filter>`
  };
}

function createAuroraGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;50%;100%;50%;0%" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
      </linearGradient>
      <filter id="auroraWave">
        <feTurbulence baseFrequency="0.6" numOctaves="3"/>
        <feDisplacementMap scale="25">
          <animate attributeName="scale" values="25;40;25" ${animationConfig} />
        </feDisplacementMap>
      </filter>`
  };
}

function createOceanWavesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="100%" r="70%">
        ${stops}
        <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
        <animate attributeName="cy" values="100%;80%;100%" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="oceanFlow">
        <feTurbulence baseFrequency="0.4" numOctaves="2"/>
        <feDisplacementMap scale="12">
          <animate attributeName="scale" values="12;20;12" ${animationConfig} />
        </feDisplacementMap>
      </filter>`
  };
}

function createForestGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        ${stops}
        <animate attributeName="y1" values="0%;30%;0%" ${animationConfig} />
        <animate attributeName="y2" values="100%;70%;100%" ${animationConfig} />
      </linearGradient>
      <filter id="forestCanopy">
        <feTurbulence baseFrequency="0.8" numOctaves="3"/>
        <feDisplacementMap scale="5"/>
      </filter>`
  };
}

function createLightningGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="40%">
        ${stops}
        <animate attributeName="r" values="20%;60%;20%" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="lightningBolt">
        <feGaussianBlur stdDeviation="3"/>
        <feColorMatrix values="1.5 0 0 0 0 0 1.5 0 0 0 0 0 1.5 0 0 0 0 0 1 0"/>
      </filter>`
  };
}

function createMountainMistGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="y1" values="100%;80%;100%" ${animationConfig} />
        <animate attributeName="y2" values="0%;20%;0%" ${animationConfig} />
      </linearGradient>
      <filter id="mistEffect">
        <feTurbulence baseFrequency="0.3" numOctaves="4"/>
        <feDisplacementMap scale="15">
          <animate attributeName="scale" values="15;25;15" ${animationConfig} />
        </feDisplacementMap>
        <feGaussianBlur stdDeviation="2"/>
      </filter>`
  };
}

module.exports = {
  createFlowingWaterGradient,
  createFlameGradient,
  createCloudsGradient,
  createAuroraGradient,
  createOceanWavesGradient,
  createForestGradient,
  createLightningGradient,
  createMountainMistGradient
}; 