/*
 *
 */

/*
 *
 */

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

/*
 *
 */

// svgUtils.js
function createGradientFromColors(colors, gradientType = 'horizontal', animationDuration = '6s') {
  // Create a new copy of the colors array instead of modifying the parameter
  let colorsCopy = [...colors];
  
  // If array is empty, set default value
  if (colorsCopy.length === 0) {
    colorsCopy = ['000000'];
  }
  
  // If only one color, create a gradient version
  if (colorsCopy.length === 1) {
    const baseColor = colorsCopy[0];
    colorsCopy = [baseColor, baseColor, baseColor];
  }
  
  // Loop through color list to create gradient animation
  const extendedColors = [...colorsCopy, ...colorsCopy];
  const stops = extendedColors.map((color, index) => {
    const offset = (index / (extendedColors.length - 1)) * 100;
    return `<stop offset="${offset}%" stop-color="#${color}" />`;
  }).join('');

  const animationConfig = `dur="${animationDuration}" repeatCount="indefinite"`;
  
  let gradientAttributes;
  let gradientAnimations;
  let additionalDefs = '';

  switch (gradientType) {
    case 'horizontal':
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = `
        <animate attributeName="x1" values="-50%;50%;100%;50%;-50%" ${animationConfig} />
        <animate attributeName="x2" values="50%;150%;200%;150%;50%" ${animationConfig} />`;
      break;

    case 'vertical':
      gradientAttributes = 'x1="0%" y1="0%" x2="0%" y2="100%"';
      gradientAnimations = `
        <animate attributeName="y1" values="-50%;50%;100%;50%;-50%" ${animationConfig} />
        <animate attributeName="y2" values="50%;150%;200%;150%;50%" ${animationConfig} />`;
      break;

    case 'diagonal':
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="100%"';
      gradientAnimations = `
        <animate attributeName="x1" values="-50%;25%;100%;25%;-50%" ${animationConfig} />
        <animate attributeName="y1" values="-50%;25%;100%;25%;-50%" ${animationConfig} />
        <animate attributeName="x2" values="50%;125%;200%;125%;50%" ${animationConfig} />
        <animate attributeName="y2" values="50%;125%;200%;125%;50%" ${animationConfig} />`;
      break;

    case 'circular':
      // Circular gradient with pulsing center point
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="20%;70%;120%;70%;20%" ${animationConfig} />
          <animate attributeName="cx" values="50%;30%;70%;50%;50%" ${animationConfig} />
          <animate attributeName="cy" values="50%;30%;70%;50%;50%" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    case 'radial':
      // Traditional radial gradient with smooth expansion
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="30%;70%;100%;70%;30%" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    case 'burst':
    case 'pulse':
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="20%;80%;120%;80%;20%" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    case 'reflection':
      gradientAttributes = 'x1="0%" y1="50%" x2="100%" y2="50%"';
      gradientAnimations = `
        <animate attributeName="x1" values="0%;25%;50%;75%;100%;75%;50%;25%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;75%;50%;25%;0%;25%;50%;75%;100%" ${animationConfig} />`;
      break;

    case 'conic':
      // Conic gradient effect using sweeping linear gradient
      const conicStops = colorsCopy.map((color, index) => {
        const offset = (index / (colorsCopy.length - 1)) * 100;
        return `<stop offset="${offset}%" stop-color="#${color}" />`;
      }).join('');
      
      additionalDefs = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="objectBoundingBox">
          ${conicStops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;45 50 50;90 50 50;135 50 50;180 50 50;225 50 50;270 50 50;315 50 50;360 50 50" ${animationConfig} />
        </linearGradient>`;
      return additionalDefs;

    case 'wave':
      // Enhanced wave effect with sinusoidal movement
      gradientAttributes = 'x1="0%" y1="50%" x2="100%" y2="50%"';
      gradientAnimations = `
        <animate attributeName="x1" values="0%;25%;50%;75%;100%;75%;50%;25%;0%" ${animationConfig} />
        <animate attributeName="y1" values="50%;20%;50%;80%;50%;20%;50%;80%;50%" ${animationConfig} />
        <animate attributeName="x2" values="100%;125%;150%;175%;200%;175%;150%;125%;100%" ${animationConfig} />
        <animate attributeName="y2" values="50%;80%;50%;20%;50%;80%;50%;20%;50%" ${animationConfig} />`;
      break;

    case 'spiral':
      // Enhanced spiral effect with both rotation and radius change
      const spiralStops = colorsCopy.map((color, index) => {
        const offset = (index / (colorsCopy.length - 1)) * 100;
        return `<stop offset="${offset}%" stop-color="#${color}" />`;
      }).join('');
      
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${spiralStops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;120 50 50;240 50 50;360 50 50" ${animationConfig} />
          <animate attributeName="r" values="20%;80%;40%;100%;20%" ${animationConfig} />
          <animate attributeName="cx" values="50%;40%;60%;45%;55%;50%" ${animationConfig} />
          <animate attributeName="cy" values="50%;60%;40%;55%;45%;50%" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    case 'diamond':
      gradientAttributes = 'x1="50%" y1="0%" x2="50%" y2="100%"';
      gradientAnimations = `
        <animate attributeName="x1" values="20%;50%;80%;50%;20%" ${animationConfig} />
        <animate attributeName="y1" values="20%;0%;20%;0%;20%" ${animationConfig} />
        <animate attributeName="x2" values="80%;50%;20%;50%;80%" ${animationConfig} />
        <animate attributeName="y2" values="80%;100%;80%;100%;80%" ${animationConfig} />`;
      break;

    default:
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = '';
  }

  const isRadialGradient = ['circular', 'radial', 'conic', 'spiral', 'burst', 'pulse'].includes(gradientType);
  const gradientElement = isRadialGradient ? 'radialGradient' : 'linearGradient';

  return `
    <${gradientElement} id="gradient" ${gradientAttributes}>
      ${stops}
      ${gradientAnimations}
    </${gradientElement}>
  `;
}

module.exports = { createGradientFromColors };