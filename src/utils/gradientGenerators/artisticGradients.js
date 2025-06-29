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

// Artistic gradient generators
function createWatercolorGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="40%" cy="40%" r="60%">
        ${stops}
        <animate attributeName="cx" values="40%;60%;40%" ${animationConfig} />
        <animate attributeName="cy" values="40%;60%;40%" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="watercolorBlur">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feOffset in="blur" dx="2" dy="2"/>
      </filter>`
  };
}

function createOilPaintGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;30%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;30%;0%" ${animationConfig} />
      </linearGradient>
      <filter id="oilPaintTexture">
        <feTurbulence baseFrequency="0.4" numOctaves="2"/>
        <feDisplacementMap scale="5"/>
      </filter>`
  };
}

function createInkSplashGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="40%">
        ${stops}
        <animate attributeName="r" values="20%;80%;20%" ${animationConfig} />
      </radialGradient>
      <filter id="inkSplatter">
        <feTurbulence baseFrequency="1.2" numOctaves="3"/>
        <feDisplacementMap scale="15">
          <animate attributeName="scale" values="15;30;15" ${animationConfig} />
        </feDisplacementMap>
      </filter>`
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
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="-30%;70%;-30%" ${animationConfig} />
        <animate attributeName="x2" values="30%;130%;30%" ${animationConfig} />
      </linearGradient>
      <filter id="graffitiSpray">
        <feTurbulence baseFrequency="2" numOctaves="1"/>
        <feDisplacementMap scale="3"/>
      </filter>`
  };
}

function createVintageGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
      </radialGradient>
      <filter id="vintageTexture">
        <feTurbulence baseFrequency="0.8" numOctaves="2"/>
        <feColorMatrix values="0.9 0.3 0.2 0 0.1 0.3 0.8 0.1 0 0.1 0.2 0.2 0.8 0 0.1 0 0 0 1 0"/>
      </filter>`
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