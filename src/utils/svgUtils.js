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
  
  let gradientDef = '';
  let additionalElements = '';

  switch (gradientType) {
    case 'horizontal':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="-50%;50%;100%;50%;-50%" ${animationConfig} />
          <animate attributeName="x2" values="50%;150%;200%;150%;50%" ${animationConfig} />
        </linearGradient>`;
      break;

    case 'vertical':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          ${stops}
          <animate attributeName="y1" values="-50%;50%;100%;50%;-50%" ${animationConfig} />
          <animate attributeName="y2" values="50%;150%;200%;150%;50%" ${animationConfig} />
        </linearGradient>`;
      break;

    case 'diagonal':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="-50%;25%;100%;25%;-50%" ${animationConfig} />
          <animate attributeName="y1" values="-50%;25%;100%;25%;-50%" ${animationConfig} />
          <animate attributeName="x2" values="50%;125%;200%;125%;50%" ${animationConfig} />
          <animate attributeName="y2" values="50%;125%;200%;125%;50%" ${animationConfig} />
        </linearGradient>`;
      break;

    case 'circular':
      // Circular gradient with dynamic center movement and pulsing
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="30%;90%;130%;70%;30%" ${animationConfig} />
          <animate attributeName="cx" values="50%;20%;80%;35%;65%;50%" ${animationConfig} />
          <animate attributeName="cy" values="50%;20%;80%;65%;35%;50%" ${animationConfig} />
        </radialGradient>`;
      break;

    case 'radial':
      // Traditional radial gradient with smooth expansion from center
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="20%;70%;100%;70%;20%" ${animationConfig} />
        </radialGradient>`;
      break;

    case 'burst':
      // Burst effect with rapid expansion and multiple focal points
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="r" values="10%;120%;40%;150%;10%" ${animationConfig} />
          <animate attributeName="cx" values="50%;30%;70%;40%;60%;50%" ${animationConfig} />
          <animate attributeName="cy" values="50%;70%;30%;60%;40%;50%" ${animationConfig} />
        </radialGradient>`;
      break;

    case 'pulse':
      // Pulsing effect with synchronized size and opacity changes
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="15%;75%;25%;100%;15%" ${animationConfig} />
        </radialGradient>`;
      break;

    case 'reflection':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          ${stops}
          <animate attributeName="x1" values="0%;25%;50%;75%;100%;75%;50%;25%;0%" ${animationConfig} />
          <animate attributeName="x2" values="100%;75%;50%;25%;0%;25%;50%;75%;100%" ${animationConfig} />
        </linearGradient>`;
      break;

    case 'conic':
      // True conic gradient using rotating radial gradient
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;90 50 50;180 50 50;270 50 50;360 50 50" ${animationConfig} />
        </radialGradient>`;
      additionalElements = `
        <circle cx="427" cy="60" r="80" fill="none" stroke="url(#gradient)" stroke-width="20" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 427 60;-360 427 60" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
        </circle>
        <circle cx="427" cy="60" r="40" fill="none" stroke="url(#gradient)" stroke-width="10" opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 427 60;360 427 60" ${animationConfig} />
        </circle>`;
      break;

    case 'wave':
      // Enhanced wave effect with multiple wave layers
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          ${stops}
          <animate attributeName="x1" values="0%;-20%;40%;-10%;60%;0%" ${animationConfig} />
          <animate attributeName="y1" values="50%;30%;70%;20%;80%;50%" ${animationConfig} />
          <animate attributeName="x2" values="100%;120%;80%;110%;60%;100%" ${animationConfig} />
          <animate attributeName="y2" values="50%;70%;30%;80%;20%;50%" ${animationConfig} />
        </linearGradient>`;
      break;

    case 'spiral':
      // Enhanced spiral with complex rotation and movement
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;180 50 50;360 50 50" ${animationConfig} />
          <animate attributeName="r" values="30%;90%;50%;120%;30%" ${animationConfig} />
          <animate attributeName="cx" values="50%;30%;70%;20%;80%;50%" ${animationConfig} />
          <animate attributeName="cy" values="50%;70%;30%;80%;20%;50%" ${animationConfig} />
        </radialGradient>`;
      break;

    case 'diamond':
      gradientDef = `
        <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="20%;50%;80%;50%;20%" ${animationConfig} />
          <animate attributeName="y1" values="20%;0%;20%;0%;20%" ${animationConfig} />
          <animate attributeName="x2" values="80%;50%;20%;50%;80%" ${animationConfig} />
          <animate attributeName="y2" values="80%;100%;80%;100%;80%" ${animationConfig} />
        </linearGradient>`;
      break;

    case 'star':
      // Star-shaped gradient using clip path
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="40%;80%;40%" ${animationConfig} />
        </radialGradient>
        <clipPath id="star-clip">
          <polygon points="50,5 61,35 95,35 69,57 79,91 50,70 21,91 31,57 5,35 39,35">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 50 50;360 50 50" dur="${animationDuration}" repeatCount="indefinite" />
          </polygon>
        </clipPath>`;
      break;

    case 'heart':
      // Heart-shaped gradient using clip path
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="40%" r="60%">
          ${stops}
          <animate attributeName="r" values="40%;70%;40%" ${animationConfig} />
          <animate attributeName="cy" values="40%;45%;40%" ${animationConfig} />
        </radialGradient>
        <clipPath id="heart-clip">
          <path d="M50,85 C50,85 85,50 85,35 C85,20 70,20 50,35 C30,20 15,20 15,35 C15,50 50,85 50,85 Z">
            <animateTransform attributeName="transform" type="scale" 
              values="1;1.1;1" ${animationConfig} />
          </path>
        </clipPath>`;
      break;

    case 'zigzag':
      // ZigZag pattern gradient
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;100%;0%" ${animationConfig} />
          <animate attributeName="x2" values="100%;0%;100%" ${animationConfig} />
          <animate attributeName="y2" values="100%;0%;100%" ${animationConfig} />
        </linearGradient>`;
      break;

    case 'ripple':
      // Ripple effect with multiple concentric circles
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="30%">
          ${stops}
          <animate attributeName="r" values="10%;50%;80%;10%" ${animationConfig} />
        </radialGradient>`;
      additionalElements = `
        <circle cx="427" cy="60" r="20" fill="none" stroke="url(#gradient)" stroke-width="2" opacity="0.3">
          <animate attributeName="r" values="10;50;80;10" ${animationConfig} />
          <animate attributeName="opacity" values="0.8;0.3;0;0.8" ${animationConfig} />
        </circle>
        <circle cx="427" cy="60" r="30" fill="none" stroke="url(#gradient)" stroke-width="1" opacity="0.2">
          <animate attributeName="r" values="20;60;90;20" ${animationConfig} begin="1s" />
          <animate attributeName="opacity" values="0.6;0.2;0;0.6" ${animationConfig} begin="1s" />
        </circle>`;
      break;

    case 'galaxy':
      // Galaxy spiral effect
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;360 50 50" dur="${parseFloat(animationDuration) * 2}s" repeatCount="indefinite" />
          <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
        </radialGradient>`;
      additionalElements = `
        <ellipse cx="427" cy="60" rx="100" ry="30" fill="url(#gradient)" opacity="0.3">
          <animateTransform attributeName="transform" type="rotate" 
            values="0 427 60;360 427 60" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
        </ellipse>`;
      break;

    case 'lightning':
      // Lightning effect with sharp angles
      gradientDef = `
        <linearGradient id="gradient" x1="20%" y1="0%" x2="80%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="20%;80%;20%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="x2" values="80%;20%;80%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="y2" values="100%;0%;100%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
        </linearGradient>
        <clipPath id="lightning-clip">
          <polygon points="45,5 55,5 25,40 35,40 15,80 25,50 35,50 65,15 55,15 85,5 75,35 65,35">
            <animate attributeName="opacity" values="1;0.5;1" dur="${parseFloat(animationDuration) / 3}s" repeatCount="indefinite" />
          </polygon>
        </clipPath>`;
      break;

    default:
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
        </linearGradient>`;
  }

  return {
    gradientDef,
    additionalElements,
    hasClipPath: ['star', 'heart', 'lightning'].includes(gradientType),
    clipPathId: gradientType === 'star' ? 'star-clip' : 
                gradientType === 'heart' ? 'heart-clip' : 
                gradientType === 'lightning' ? 'lightning-clip' : null
  };
}

module.exports = { createGradientFromColors };