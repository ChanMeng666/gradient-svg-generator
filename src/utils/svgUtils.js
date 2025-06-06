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
    case 'radial':
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="30%;70%;100%;70%;30%" ${animationConfig} />
          <animate attributeName="cx" values="30%;50%;70%;50%;30%" ${animationConfig} />
          <animate attributeName="cy" values="30%;50%;70%;50%;30%" ${animationConfig} />
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
      // Use multiple radial gradients to create conic effect
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;360 50 50;0 50 50" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    case 'wave':
      // Create wave effect
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = `
        <animate attributeName="x1" values="0%;50%;100%;50%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;30%;0%;-30%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;150%;200%;150%;100%" ${animationConfig} />
        <animate attributeName="y2" values="0%;30%;0%;-30%;0%" ${animationConfig} />`;
      break;

    case 'spiral':
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;360 50 50;720 50 50" dur="${animationDuration}" repeatCount="indefinite" />
          <animate attributeName="r" values="30%;70%;30%" ${animationConfig} />
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