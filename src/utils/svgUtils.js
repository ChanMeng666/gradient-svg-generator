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
  let hasClipPath = false;
  let clipPathId = null;

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

    case 'star':
      // Multiple stars as clip-path mask with proper coordinates
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="40%;80%;40%" ${animationConfig} />
        </radialGradient>
        <clipPath id="stars-clip">
          <polygon points="120,20 130,45 160,45 140,65 148,90 120,75 92,90 100,65 80,45 110,45">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 120 55;360 120 55" ${animationConfig} />
          </polygon>
          <polygon points="280,30 288,50 315,50 298,67 305,87 280,75 255,87 262,67 245,50 272,50">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 280 58;-360 280 58" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
          </polygon>
          <polygon points="440,15 450,40 480,40 460,60 468,85 440,70 412,85 420,60 400,40 430,40">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 440 50;360 440 50" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
          </polygon>
          <polygon points="600,25 608,45 635,45 618,62 625,82 600,70 575,82 582,62 565,45 592,45">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 600 53;-360 600 53" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
          </polygon>
          <polygon points="760,30 768,50 795,50 778,67 785,87 760,75 735,87 742,67 725,50 752,50">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 760 58;360 760 58" ${animationConfig} />
          </polygon>
        </clipPath>`;
      hasClipPath = true;
      clipPathId = 'stars-clip';
      break;

    case 'heart':
      // Multiple hearts as clip-path mask with improved shape and proper coordinates  
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="40%" r="60%">
          ${stops}
          <animate attributeName="r" values="40%;70%;40%" ${animationConfig} />
          <animate attributeName="cy" values="40%;45%;40%" ${animationConfig} />
        </radialGradient>
        <clipPath id="hearts-clip">
          <path d="M120,45 C120,30 105,15 85,15 C65,15 50,30 50,45 C50,30 35,15 15,15 C-5,15 -20,30 -20,45 C-20,60 50,95 50,95 C50,95 120,60 120,45 Z" transform="translate(45,15)">
            <animateTransform attributeName="transform" type="scale" 
              values="1;1.2;1" dur="${animationDuration}" repeatCount="indefinite" additive="sum" />
          </path>
          <path d="M120,45 C120,30 105,15 85,15 C65,15 50,30 50,45 C50,30 35,15 15,15 C-5,15 -20,30 -20,45 C-20,60 50,95 50,95 C50,95 120,60 120,45 Z" transform="translate(205,20)">
            <animateTransform attributeName="transform" type="scale" 
              values="1;1.1;1" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" additive="sum" />
          </path>
          <path d="M120,45 C120,30 105,15 85,15 C65,15 50,30 50,45 C50,30 35,15 15,15 C-5,15 -20,30 -20,45 C-20,60 50,95 50,95 C50,95 120,60 120,45 Z" transform="translate(365,10)">
            <animateTransform attributeName="transform" type="scale" 
              values="1;1.15;1" dur="${parseFloat(animationDuration) * 0.9}s" repeatCount="indefinite" additive="sum" />
          </path>
          <path d="M120,45 C120,30 105,15 85,15 C65,15 50,30 50,45 C50,30 35,15 15,15 C-5,15 -20,30 -20,45 C-20,60 50,95 50,95 C50,95 120,60 120,45 Z" transform="translate(525,15)">
            <animateTransform attributeName="transform" type="scale" 
              values="1;1.25;1" dur="${parseFloat(animationDuration) * 1.1}s" repeatCount="indefinite" additive="sum" />
          </path>
          <path d="M120,45 C120,30 105,15 85,15 C65,15 50,30 50,45 C50,30 35,15 15,15 C-5,15 -20,30 -20,45 C-20,60 50,95 50,95 C50,95 120,60 120,45 Z" transform="translate(685,20)">
            <animateTransform attributeName="transform" type="scale" 
              values="1;1.3;1" dur="${animationDuration}" repeatCount="indefinite" additive="sum" />
          </path>
        </clipPath>`;
      hasClipPath = true;
      clipPathId = 'hearts-clip';
      break;

    case 'lightning':
      // Improved lightning bolt shape with multiple bolts
      gradientDef = `
        <linearGradient id="gradient" x1="20%" y1="0%" x2="80%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="20%;80%;20%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="x2" values="80%;20%;80%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="y2" values="100%;0%;100%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
        </linearGradient>`;
      additionalElements = `
        <g fill="url(#gradient)" opacity="0.9">
          <polygon points="150,15 165,15 135,50 150,50 120,95 140,65 155,65 185,30 170,30 200,15 185,45 170,45">
            <animate attributeName="opacity" values="1;0.3;1" dur="${parseFloat(animationDuration) / 3}s" repeatCount="indefinite" />
          </polygon>
          <polygon points="350,20 365,20 335,55 350,55 320,100 340,70 355,70 385,35 370,35 400,20 385,50 370,50">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="${parseFloat(animationDuration) / 4}s" repeatCount="indefinite" begin="0.5s" />
          </polygon>
          <polygon points="550,10 565,10 535,45 550,45 520,90 540,60 555,60 585,25 570,25 600,10 585,40 570,40">
            <animate attributeName="opacity" values="1;0.4;1" dur="${parseFloat(animationDuration) / 2.5}s" repeatCount="indefinite" begin="1s" />
          </polygon>
          <polygon points="750,25 765,25 735,60 750,60 720,105 740,75 755,75 785,40 770,40 800,25 785,55 770,55">
            <animate attributeName="opacity" values="0.9;0.1;0.9" dur="${parseFloat(animationDuration) / 3.5}s" repeatCount="indefinite" begin="1.5s" />
          </polygon>
        </g>`;
      break;

    case 'galaxy':
      // Galaxy spiral with visible rotating arms
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
        </radialGradient>`;
      additionalElements = `
        <g opacity="0.8">
          <ellipse cx="427" cy="60" rx="200" ry="40" fill="url(#gradient)" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;360 427 60" dur="${parseFloat(animationDuration) * 2}s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="427" cy="60" rx="150" ry="25" fill="url(#gradient)" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;-360 427 60" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="427" cy="60" rx="100" ry="15" fill="url(#gradient)" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;360 427 60" ${animationConfig} />
          </ellipse>
          <circle cx="427" cy="60" r="20" fill="url(#gradient)" opacity="0.9">
            <animate attributeName="r" values="15;25;15" ${animationConfig} />
          </circle>
        </g>`;
      break;

    case 'spiral':
      // Enhanced spiral with visible rotating elements
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="r" values="30%;90%;50%;120%;30%" ${animationConfig} />
          <animate attributeName="cx" values="50%;30%;70%;20%;80%;50%" ${animationConfig} />
          <animate attributeName="cy" values="50%;70%;30%;80%;20%;50%" ${animationConfig} />
        </radialGradient>`;
      additionalElements = `
        <g opacity="0.85">
          <path d="M427,60 Q327,60 327,20 Q327,-20 427,-20 Q527,-20 527,60 Q527,140 327,140 Q127,140 127,60 Q127,-40 427,-40" 
                fill="none" stroke="url(#gradient)" stroke-width="8" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;360 427 60" ${animationConfig} />
          </path>
          <path d="M427,60 Q377,60 377,40 Q377,20 427,20 Q477,20 477,60 Q477,100 377,100 Q277,100 277,60" 
                fill="none" stroke="url(#gradient)" stroke-width="6" opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;-360 427 60" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
          </path>
          <circle cx="427" cy="60" r="30" fill="url(#gradient)" opacity="0.8">
            <animate attributeName="r" values="20;40;20" ${animationConfig} />
          </circle>
        </g>`;
      break;

    case 'conic':
      // True conic gradient with multiple rotating circles
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;90 50 50;180 50 50;270 50 50;360 50 50" ${animationConfig} />
        </radialGradient>`;
      additionalElements = `
        <g opacity="0.8">
          <circle cx="427" cy="60" r="100" fill="none" stroke="url(#gradient)" stroke-width="15" opacity="0.6" 
                  stroke-dasharray="20,10">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;360 427 60" ${animationConfig} />
          </circle>
          <circle cx="427" cy="60" r="70" fill="none" stroke="url(#gradient)" stroke-width="12" opacity="0.7" 
                  stroke-dasharray="15,8">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;-360 427 60" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
          </circle>
          <circle cx="427" cy="60" r="40" fill="none" stroke="url(#gradient)" stroke-width="8" opacity="0.8" 
                  stroke-dasharray="10,5">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;360 427 60" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
          </circle>
          <circle cx="427" cy="60" r="15" fill="url(#gradient)" opacity="0.9">
            <animate attributeName="r" values="10;20;10" ${animationConfig} />
          </circle>
        </g>`;
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

    default:
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
        </linearGradient>`;
  }

  return {
    gradientDef,
    additionalElements,
    hasClipPath,
    clipPathId
  };
}

module.exports = { createGradientFromColors };