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
      // Multiple circles as clip-path mask
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="50%;90%;70%;110%;50%" ${animationConfig} />
          <animate attributeName="cx" values="50%;30%;70%;20%;80%;50%" ${animationConfig} />
          <animate attributeName="cy" values="50%;70%;30%;80%;20%;50%" ${animationConfig} />
        </radialGradient>
        <clipPath id="circles-clip">
          <circle cx="150" cy="60" r="45">
            <animate attributeName="r" values="35;55;35" ${animationConfig} />
            <animate attributeName="cy" values="60;40;80;60" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="60" r="40">
            <animate attributeName="r" values="30;50;30" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
            <animate attributeName="cy" values="60;80;40;60" dur="${parseFloat(animationDuration) * 1.4}s" repeatCount="indefinite" />
          </circle>
          <circle cx="427" cy="60" r="50">
            <animate attributeName="r" values="40;60;40" dur="${parseFloat(animationDuration) * 1.1}s" repeatCount="indefinite" />
            <animate attributeName="cy" values="60;35;85;60" ${animationConfig} />
          </circle>
          <circle cx="554" cy="60" r="42">
            <animate attributeName="r" values="32;52;32" dur="${parseFloat(animationDuration) * 0.9}s" repeatCount="indefinite" />
            <animate attributeName="cy" values="60;75;45;60" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
          </circle>
          <circle cx="704" cy="60" r="38">
            <animate attributeName="r" values="28;48;28" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
            <animate attributeName="cy" values="60;50;70;60" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
          </circle>
        </clipPath>`;
      hasClipPath = true;
      clipPathId = 'circles-clip';
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
      // Lightning bolt shapes as clip-path mask
      gradientDef = `
        <linearGradient id="gradient" x1="20%" y1="0%" x2="80%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="20%;80%;20%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="x2" values="80%;20%;80%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
          <animate attributeName="y2" values="100%;0%;100%" dur="${parseFloat(animationDuration) / 2}s" repeatCount="indefinite" />
        </linearGradient>
        <clipPath id="lightning-clip">
          <polygon points="130,15 145,15 115,50 130,50 100,95 120,65 135,65 165,30 150,30 180,15 165,45 150,45">
            <animate attributeName="opacity" values="1;0.3;1" dur="${parseFloat(animationDuration) / 3}s" repeatCount="indefinite" />
          </polygon>
          <polygon points="280,20 295,20 265,55 280,55 250,100 270,70 285,70 315,35 300,35 330,20 315,50 300,50">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="${parseFloat(animationDuration) / 4}s" repeatCount="indefinite" begin="0.5s" />
          </polygon>
          <polygon points="450,10 465,10 435,45 450,45 420,90 440,60 455,60 485,25 470,25 500,10 485,40 470,40">
            <animate attributeName="opacity" values="1;0.4;1" dur="${parseFloat(animationDuration) / 2.5}s" repeatCount="indefinite" begin="1s" />
          </polygon>
          <polygon points="620,25 635,25 605,60 620,60 590,105 610,75 625,75 655,40 640,40 670,25 655,55 640,55">
            <animate attributeName="opacity" values="0.9;0.1;0.9" dur="${parseFloat(animationDuration) / 3.5}s" repeatCount="indefinite" begin="1.5s" />
          </polygon>
          <polygon points="770,18 785,18 755,53 770,53 740,98 760,68 775,68 805,33 790,33 820,18 805,48 790,48">
            <animate attributeName="opacity" values="1;0.2;1" dur="${parseFloat(animationDuration) / 4}s" repeatCount="indefinite" begin="2s" />
          </polygon>
        </clipPath>`;
      hasClipPath = true;
      clipPathId = 'lightning-clip';
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
      // Wave pattern as clip-path mask
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          ${stops}
          <animate attributeName="x1" values="0%;-20%;40%;-10%;60%;0%" ${animationConfig} />
          <animate attributeName="y1" values="50%;30%;70%;20%;80%;50%" ${animationConfig} />
          <animate attributeName="x2" values="100%;120%;80%;110%;60%;100%" ${animationConfig} />
          <animate attributeName="y2" values="50%;70%;30%;80%;20%;50%" ${animationConfig} />
        </linearGradient>
        <clipPath id="wave-clip">
          <path d="M0,60 Q100,20 200,60 T400,60 T600,60 T854,60 L854,90 Q600,70 400,90 T200,90 T0,90 Z">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0;-100,0;0,0" dur="${parseFloat(animationDuration) * 2}s" repeatCount="indefinite" />
          </path>
          <path d="M0,50 Q150,80 300,50 T600,50 T854,50 L854,80 Q600,60 300,80 T0,80 Z">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0;100,0;0,0" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
          </path>
        </clipPath>`;
      hasClipPath = true;
      clipPathId = 'wave-clip';
      break;

    case 'zigzag':
      // ZigZag wave pattern as clip-path mask
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;100%;0%" ${animationConfig} />
          <animate attributeName="x2" values="100%;0%;100%" ${animationConfig} />
          <animate attributeName="y2" values="100%;0%;100%" ${animationConfig} />
        </linearGradient>
        <clipPath id="zigzag-clip">
          <polygon points="0,60 50,20 100,80 150,30 200,70 250,25 300,75 350,35 400,65 450,25 500,75 550,30 600,70 650,25 700,75 750,35 800,65 854,30 854,90 800,90 750,90 700,90 650,90 600,90 550,90 500,90 450,90 400,90 350,90 300,90 250,90 200,90 150,90 100,90 50,90 0,90">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0;-50,0;0,0" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
          </polygon>
        </clipPath>`;
      hasClipPath = true;
      clipPathId = 'zigzag-clip';
      break;

    case 'ripple':
      // Ripple circles as clip-path mask
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="r" values="30%;80%;30%" ${animationConfig} />
        </radialGradient>
        <clipPath id="ripple-clip">
          <circle cx="427" cy="60" r="100">
            <animate attributeName="r" values="80;120;80" ${animationConfig} />
            <animate attributeName="opacity" values="0.8;0.3;0.8" ${animationConfig} />
          </circle>
          <circle cx="427" cy="60" r="70">
            <animate attributeName="r" values="60;90;60" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" begin="0.5s" />
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="427" cy="60" r="40">
            <animate attributeName="r" values="30;60;30" dur="${parseFloat(animationDuration) * 0.6}s" repeatCount="indefinite" begin="1s" />
            <animate attributeName="opacity" values="1;0.5;1" dur="${parseFloat(animationDuration) * 0.6}s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="427" cy="60" r="20">
            <animate attributeName="r" values="15;35;15" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" begin="1.5s" />
            <animate attributeName="opacity" values="1;0.6;1" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" begin="1.5s" />
          </circle>
        </clipPath>`;
      hasClipPath = true;
      clipPathId = 'ripple-clip';
      break;

    case 'luminance':
      // Luminous text glow effect inspired by the example project
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="100%" r="50%">
          ${stops}
          <animate attributeName="r" values="30%;70%;30%" ${animationConfig} />
        </radialGradient>`;
      additionalElements = `
        <defs>
          <style>
            .luminance-text {
              background: 50% 100%/50% 50% no-repeat radial-gradient(ellipse at bottom, #fff, rgba(255,255,255,0.8), transparent);
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              font-size: 40px;
              font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              animation: luminanceReveal ${animationDuration} ease-in-out forwards 200ms, luminanceGlow 2500ms linear infinite ${parseFloat(animationDuration) * 1000 + 500}ms;
            }
            @keyframes luminanceReveal {
              80% { letter-spacing: 8px; }
              100% { background-size: 300% 300%; }
            }
            @keyframes luminanceGlow {
              40% { text-shadow: 0 0 8px #fff; }
            }
          </style>
        </defs>`;
      break;

    case 'rainbow':
      // Multi-color rainbow wave effect
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="-20%;100%;-20%" ${animationConfig} />
          <animate attributeName="x2" values="20%;120%;20%" ${animationConfig} />
        </linearGradient>`;
      additionalElements = `
        <defs>
          <style>
            .rainbow-layer {
              font-size: 40px;
              font-weight: 600;
              text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 4px 4px 0 rgba(0, 0, 0, 0.2);
              animation: rainbowWave ${animationDuration} ease-in-out infinite;
            }
            @keyframes rainbowWave {
              0%, 100% { transform: translateY(2px); }
              50% { transform: translateY(-2px); }
            }
          </style>
        </defs>`;
      break;

    case 'textBox':
      // Animated border drawing effect
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
          <animate attributeName="x2" values="100%;200%;100%" ${animationConfig} />
        </linearGradient>`;
      additionalElements = `
        <defs>
          <style>
            .textbox-border {
              fill: transparent;
              stroke-dasharray: 140 540;
              stroke-dashoffset: -474;
              stroke-width: 8px;
              stroke: url(#gradient);
              animation: borderDraw ${animationDuration} linear forwards;
            }
            @keyframes borderDraw {
              0% {
                stroke-dasharray: 140 540;
                stroke-dashoffset: -474;
                stroke-width: 8px;
              }
              100% {
                stroke-dasharray: 760;
                stroke-dashoffset: 0;
                stroke-width: 2px;
              }
            }
          </style>
        </defs>`;
      break;

    case 'glitch':
      // Cyberpunk glitch effect with color separation
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="0%;20%;-10%;30%;0%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
          <animate attributeName="x2" values="100%;80%;110%;70%;100%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
        </linearGradient>`;
      additionalElements = `
        <defs>
          <style>
            .glitch-text {
              font-size: 40px;
              letter-spacing: 8px;
              font-family: "Lucida Console", Monaco, monospace;
              font-weight: 400;
              animation: glitch1 ${animationDuration} infinite;
            }
            .glitch-text:nth-child(2) {
              animation: glitch2 ${animationDuration} infinite;
            }
            .glitch-text:nth-child(3) {
              animation: glitch3 ${animationDuration} infinite;
            }
            @keyframes glitch1 {
              0%, 100% { transform: none; opacity: 1; }
              7% { transform: skew(-0.5deg, -0.9deg); opacity: 0.75; }
              10% { transform: none; opacity: 1; }
              30% { transform: skew(0.8deg, -0.1deg); opacity: 0.75; }
              35% { transform: none; opacity: 1; }
              55% { transform: skew(-1deg, 0.2deg); opacity: 0.75; }
              60% { transform: none; opacity: 1; }
              75% { transform: skew(0.4deg, 1deg); opacity: 0.75; }
              80% { transform: none; opacity: 1; }
            }
            @keyframes glitch2 {
              0%, 100% { transform: none; opacity: 0.25; }
              7% { transform: translate(-2px, -3px); opacity: 0.5; }
              10% { transform: none; opacity: 0.25; }
              30% { transform: translate(-5px, -2px); opacity: 0.5; }
              35% { transform: none; opacity: 0.25; }
              55% { transform: translate(-5px, -1px); opacity: 0.5; }
              60% { transform: none; opacity: 0.25; }
              75% { transform: translate(-2px, -6px); opacity: 0.5; }
              80% { transform: none; opacity: 0.25; }
            }
            @keyframes glitch3 {
              0%, 100% { transform: none; opacity: 0.25; }
              7% { transform: translate(2px, 3px); opacity: 0.5; }
              10% { transform: none; opacity: 0.25; }
              30% { transform: translate(5px, 2px); opacity: 0.5; }
              35% { transform: none; opacity: 0.25; }
              55% { transform: translate(5px, 1px); opacity: 0.5; }
              60% { transform: none; opacity: 0.25; }
              75% { transform: translate(2px, 6px); opacity: 0.5; }
              80% { transform: none; opacity: 0.25; }
            }
          </style>
        </defs>`;
      break;

    case 'typewriter':
      // Terminal-style typewriter effect
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x2" values="0%;100%" ${animationConfig} begin="0s" />
        </linearGradient>`;
      additionalElements = `
        <defs>
          <style>
            .typewriter-text {
              font-size: 40px;
              font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              border-right: 2px solid rgba(255,255,255,.75);
              white-space: nowrap;
              overflow: hidden;
              animation: typewriter ${animationDuration} steps(44) ${parseFloat(animationDuration) * 0.25}s 1 normal both,
                         blinkCursor 500ms steps(44) infinite normal;
            }
            @keyframes typewriter {
              from { width: 0; }
              to { width: 100%; }
            }
            @keyframes blinkCursor {
              from { border-right-color: rgba(255,255,255,.75); }
              to { border-right-color: transparent; }
            }
          </style>
        </defs>`;
      break;

    // Future Tech Series
    case 'hologram':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;50%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;50%;0%" ${animationConfig} />
        </linearGradient>
        <filter id="hologramGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`;
      additionalElements = `
        <animateTransform attributeName="transform" type="skewX" values="0;2;0;-2;0" ${animationConfig} />`;
      break;

    case 'quantum':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="30%;80%;30%" ${animationConfig} />
        </radialGradient>
        <filter id="quantumTurbulence">
          <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20">
            <animate attributeName="scale" values="20;40;20" ${animationConfig} />
          </feDisplacementMap>
        </filter>`;
      break;

    case 'laserGrid':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        </linearGradient>
        <pattern id="laserPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="20" x2="40" y2="20" stroke="#ff00ff" stroke-width="1" opacity="0.8"/>
          <line x1="20" y1="0" x2="20" y2="40" stroke="#00ffff" stroke-width="1" opacity="0.8"/>
          <animate attributeName="x" values="0;40;0" ${animationConfig} />
        </pattern>`;
      break;

    case 'neuralNet':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
          <animate attributeName="cy" values="30%;70%;30%" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
        </radialGradient>`;
      break;

    case 'plasma':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="30%;100%;30%" ${animationConfig} />
        </radialGradient>
        <filter id="plasmaTurbulence">
          <feTurbulence baseFrequency="0.6" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="30">
            <animate attributeName="scale" values="30;60;30" ${animationConfig} />
          </feDisplacementMap>
        </filter>`;
      break;

    case 'dataStream':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          ${stops}
          <animate attributeName="y1" values="-50%;50%" ${animationConfig} />
          <animate attributeName="y2" values="50%;150%" ${animationConfig} />
        </linearGradient>`;
      break;

    // Artistic Series
    case 'watercolor':
      gradientDef = `
        <radialGradient id="gradient" cx="40%" cy="40%" r="60%">
          ${stops}
          <animate attributeName="cx" values="40%;60%;40%" ${animationConfig} />
          <animate attributeName="cy" values="40%;60%;40%" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="watercolorBlur">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feOffset in="blur" dx="2" dy="2"/>
        </filter>`;
      break;

    case 'oilPaint':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;30%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;30%;0%" ${animationConfig} />
        </linearGradient>
        <filter id="oilPaintTexture">
          <feTurbulence baseFrequency="0.4" numOctaves="2"/>
          <feDisplacementMap scale="5"/>
        </filter>`;
      break;

    case 'inkSplash':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="40%">
          ${stops}
          <animate attributeName="r" values="20%;80%;20%" ${animationConfig} />
        </radialGradient>
        <filter id="inkSplatter">
          <feTurbulence baseFrequency="1.2" numOctaves="3"/>
          <feDisplacementMap scale="15">
            <animate attributeName="scale" values="15;30;15" ${animationConfig} />
          </feDisplacementMap>
        </filter>`;
      break;

    case 'mosaic':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
        </linearGradient>
        <pattern id="mosaicPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="15" height="15" fill="#${colorsCopy[0]}" opacity="0.8"/>
          <rect x="15" width="15" height="15" fill="#${colorsCopy[1]}" opacity="0.8"/>
          <rect y="15" width="15" height="15" fill="#${colorsCopy[2]}" opacity="0.8"/>
          <rect x="15" y="15" width="15" height="15" fill="#${colorsCopy[3] || colorsCopy[0]}" opacity="0.8"/>
          <animateTransform attributeName="patternTransform" type="rotate" values="0 15 15;360 15 15" ${animationConfig} />
        </pattern>`;
      break;

    case 'abstractGeo':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" values="0 50 50;180 50 50;360 50 50" ${animationConfig} />
        </linearGradient>`;
      break;

    case 'graffiti':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          ${stops}
          <animate attributeName="x1" values="-30%;70%;-30%" ${animationConfig} />
          <animate attributeName="x2" values="30%;130%;30%" ${animationConfig} />
        </linearGradient>
        <filter id="graffitiSpray">
          <feTurbulence baseFrequency="2" numOctaves="1"/>
          <feDisplacementMap scale="3"/>
        </filter>`;
      break;

    case 'vintage':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
        </radialGradient>
        <filter id="vintageTexture">
          <feTurbulence baseFrequency="0.8" numOctaves="2"/>
          <feColorMatrix values="0.9 0.3 0.2 0 0.1 0.3 0.8 0.1 0 0.1 0.2 0.2 0.8 0 0.1 0 0 0 1 0"/>
        </filter>`;
      break;

    // Luxury Series
    case 'goldFoil':
      gradientDef = `
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
        </filter>`;
      break;

    case 'diamond':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="40%">
          ${stops}
          <animate attributeName="r" values="30%;60%;30%" dur="${parseFloat(animationDuration) * 0.6}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="diamondSparkle">
          <feGaussianBlur stdDeviation="1"/>
          <feColorMatrix values="1.5 0 0 0 0 0 1.5 0 0 0 0 0 1.5 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'marble':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x2" values="100%;80%;120%;100%" ${animationConfig} />
          <animate attributeName="y2" values="100%;120%;80%;100%" ${animationConfig} />
        </linearGradient>
        <filter id="marbleVeins">
          <feTurbulence baseFrequency="0.3" numOctaves="4"/>
          <feDisplacementMap scale="8"/>
        </filter>`;
      break;

    case 'platinum':
      gradientDef = `
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
        </filter>`;
      break;

    case 'roseGold':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
          <animate attributeName="cy" values="30%;70%;30%" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
        </radialGradient>`;
      break;

    case 'crystal':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
          <animate attributeName="x2" values="100%;200%;100%" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="crystalPrism">
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix values="1.2 0 0 0 0 0 1.2 0 0 0 0 0 1.2 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'velvet':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="80%">
          ${stops}
          <animate attributeName="r" values="60%;100%;60%" ${animationConfig} />
        </radialGradient>
        <filter id="velvetTexture">
          <feTurbulence baseFrequency="1.5" numOctaves="2"/>
          <feDisplacementMap scale="2"/>
          <feGaussianBlur stdDeviation="0.5"/>
        </filter>`;
      break;

    // Organic Nature Series
    case 'flowingWater':
      gradientDef = `
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
        </filter>`;
      break;

    case 'flame':
      gradientDef = `
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
        </filter>`;
      break;

    case 'clouds':
      gradientDef = `
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
        </filter>`;
      break;

    case 'aurora':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;50%;100%;50%;0%" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="auroraWave">
          <feTurbulence baseFrequency="0.6" numOctaves="3"/>
          <feDisplacementMap scale="25">
            <animate attributeName="scale" values="25;40;25" ${animationConfig} />
          </feDisplacementMap>
        </filter>`;
      break;

    case 'oceanWaves':
      gradientDef = `
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
        </filter>`;
      break;

    case 'forest':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          ${stops}
          <animate attributeName="y1" values="0%;30%;0%" ${animationConfig} />
          <animate attributeName="y2" values="100%;70%;100%" ${animationConfig} />
        </linearGradient>
        <filter id="forestCanopy">
          <feTurbulence baseFrequency="0.8" numOctaves="3"/>
          <feDisplacementMap scale="5"/>
        </filter>`;
      break;

    case 'lightning':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="40%">
          ${stops}
          <animate attributeName="r" values="20%;60%;20%" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="lightningBolt">
          <feGaussianBlur stdDeviation="3"/>
          <feColorMatrix values="1.5 0 0 0 0 0 1.5 0 0 0 0 0 1.5 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'mountainMist':
      gradientDef = `
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
        </filter>`;
      break;

    // Gaming Series
    case 'pixelArt':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
        </linearGradient>
        <pattern id="pixelPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="10" height="10" fill="#${colorsCopy[0]}"/>
          <rect x="10" y="0" width="10" height="10" fill="#${colorsCopy[1]}"/>
          <rect x="0" y="10" width="10" height="10" fill="#${colorsCopy[2]}"/>
          <rect x="10" y="10" width="10" height="10" fill="#${colorsCopy[3] || colorsCopy[0]}"/>
          <animateTransform attributeName="patternTransform" type="translate" values="0,0;20,0;0,20;0,0" ${animationConfig} />
        </pattern>`;
      break;

    case 'neonArcade':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="5"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`;
      break;

    case 'energyBlast':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="30%;80%;30%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="energyWave">
          <feGaussianBlur stdDeviation="5"/>
          <feMorphology operator="dilate" radius="2"/>
        </filter>`;
      break;

    case 'speedLines':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          ${stops}
          <animate attributeName="x1" values="-50%;50%" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
          <animate attributeName="x2" values="50%;150%" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
        </linearGradient>`;
      break;

    case 'bossBattle':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="r" values="40%;80%;40%" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
          <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
        </radialGradient>
        <filter id="battleIntensity">
          <feGaussianBlur stdDeviation="3"/>
          <feColorMatrix values="1.3 0 0 0 0 0 1.3 0 0 0 0 0 1.3 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'powerUp':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="30%;70%;30%" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="powerGlow">
          <feGaussianBlur stdDeviation="4"/>
          <feColorMatrix values="1.2 0 0 0 0 0 1.2 0 0 0 0 0 1.2 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'cyberpunk':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="cyberpunkGlow">
          <feGaussianBlur stdDeviation="3"/>
          <feColorMatrix values="1.4 0 0 0 0 0 1.4 0 0 0 0 0 1.4 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'retroWave':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="0%;50%;100%;50%;0%" ${animationConfig} />
          <animate attributeName="y1" values="100%;50%;0%;50%;100%" ${animationConfig} />
        </linearGradient>
        <filter id="retroGlow">
          <feGaussianBlur stdDeviation="2"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`;
      break;

    // Cinematic Series
    case 'film-noir-shadows':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;30%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;50%;0%" ${animationConfig} />
        </linearGradient>
        <filter id="dramaticShadow">
          <feDropShadow dx="8" dy="8" stdDeviation="4" flood-opacity="0.8"/>
        </filter>`;
      break;

    case 'spotlight-glamour':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="30%" r="60%">
          ${stops}
          <animate attributeName="r" values="40%;80%;40%" ${animationConfig} />
          <animate attributeName="cx" values="50%;70%;30%;50%" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="spotlightGlow">
          <feGaussianBlur stdDeviation="6"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`;
      break;

    case 'neon-rain':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
          <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="neonRainEffect">
          <feTurbulence baseFrequency="0.8" numOctaves="2"/>
          <feDisplacementMap scale="10">
            <animate attributeName="scale" values="10;20;10" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
          </feDisplacementMap>
          <feGaussianBlur stdDeviation="3"/>
        </filter>`;
      break;

    case 'heat-waves':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        </linearGradient>
        <filter id="heatDistortion">
          <feTurbulence baseFrequency="0.5" numOctaves="3"/>
          <feDisplacementMap scale="15">
            <animate attributeName="scale" values="15;25;15" ${animationConfig} />
          </feDisplacementMap>
        </filter>`;
      break;

    case 'ice-crystals':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
        </radialGradient>
        <filter id="crystalFormation">
          <feTurbulence baseFrequency="1.2" numOctaves="4"/>
          <feDisplacementMap scale="8"/>
          <feGaussianBlur stdDeviation="1"/>
        </filter>`;
      break;

    case 'blood-moon':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="30%" r="60%">
          ${stops}
          <animate attributeName="r" values="50%;80%;50%" dur="${parseFloat(animationDuration) * 2}s" repeatCount="indefinite" />
          <animate attributeName="cy" values="30%;40%;30%" ${animationConfig} />
        </radialGradient>
        <filter id="gothicMood">
          <feGaussianBlur stdDeviation="4"/>
          <feColorMatrix values="1.2 0 0 0 0 0 0.8 0 0 0 0 0 0.8 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'soft-bokeh':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="60%;90%;60%" ${animationConfig} />
        </radialGradient>
        <filter id="bokehBlur">
          <feGaussianBlur stdDeviation="8">
            <animate attributeName="stdDeviation" values="8;12;8" ${animationConfig} />
          </feGaussianBlur>
        </filter>`;
      break;

    case 'explosion-smoke':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="30%;100%;30%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="explosionEffect">
          <feTurbulence baseFrequency="0.7" numOctaves="3"/>
          <feDisplacementMap scale="20">
            <animate attributeName="scale" values="20;40;20" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>`;
      break;

    // Cosmic Series  
    case 'galaxy-spiral':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
        </radialGradient>
        <filter id="starField">
          <feTurbulence baseFrequency="0.9" numOctaves="4"/>
          <feColorMatrix type="saturate" values="0"/>
          <feDisplacementMap scale="3"/>
        </filter>`;
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
        </g>`;
      break;

    case 'nebula-swirl':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="80%">
          ${stops}
          <animate attributeName="r" values="60%;100%;60%" ${animationConfig} />
          <animate attributeName="cx" values="50%;30%;70%;50%" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="nebulaEffect">
          <feTurbulence baseFrequency="0.4" numOctaves="5"/>
          <feDisplacementMap scale="25">
            <animate attributeName="scale" values="25;40;25" ${animationConfig} />
          </feDisplacementMap>
          <feGaussianBlur stdDeviation="3"/>
        </filter>`;
      break;

    case 'gravitational-lens':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="r" values="40%;80%;40%" ${animationConfig} />
        </radialGradient>
        <filter id="spacetimeBend">
          <feTurbulence baseFrequency="0.6" numOctaves="3"/>
          <feDisplacementMap scale="30">
            <animate attributeName="scale" values="30;50;30" ${animationConfig} />
          </feDisplacementMap>
        </filter>`;
      break;

    case 'stellar-explosion':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="20%;120%;20%" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="supernovaBlast">
          <feGaussianBlur stdDeviation="5"/>
          <feColorMatrix values="1.5 0 0 0 0 0 1.5 0 0 0 0 0 1.5 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'cosmic-aurora':
      gradientDef = `
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
        </filter>`;
      break;

    case 'quantum-fluctuation':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="r" values="40%;80%;40%" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
          <animate attributeName="cx" values="50%;30%;70%;50%" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="quantumNoise">
          <feTurbulence baseFrequency="1.2" numOctaves="4"/>
          <feDisplacementMap scale="15">
            <animate attributeName="scale" values="15;30;15" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>`;
      break;

    case 'binary-orbit':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
        </radialGradient>`;
      additionalElements = `
        <g opacity="0.9">
          <circle cx="350" cy="60" r="30" fill="#${colorsCopy[2]}" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;360 427 60" ${animationConfig} />
          </circle>
          <circle cx="500" cy="60" r="25" fill="#${colorsCopy[3]}" opacity="0.8">
            <animateTransform attributeName="transform" type="rotate" 
              values="0 427 60;-360 427 60" ${animationConfig} />
          </circle>
        </g>`;
      break;

    case 'cmb-radiation':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 3}s" repeatCount="indefinite" />
          <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 2.5}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="cosmicBackground">
          <feTurbulence baseFrequency="0.1" numOctaves="6"/>
          <feDisplacementMap scale="5"/>
        </filter>`;
      break;

    case 'spacetime-tunnel':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="r" values="30%;90%;30%" ${animationConfig} />
        </radialGradient>
        <filter id="wormholeEffect">
          <feTurbulence baseFrequency="0.8" numOctaves="3"/>
          <feDisplacementMap scale="35">
            <animate attributeName="scale" values="35;50;35" ${animationConfig} />
          </feDisplacementMap>
        </filter>`;
      break;

    // Fashion Series
    case 'silk-drape':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;30%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;50%;0%" ${animationConfig} />
        </linearGradient>
        <filter id="silkTexture">
          <feTurbulence baseFrequency="0.3" numOctaves="3"/>
          <feDisplacementMap scale="8"/>
          <feGaussianBlur stdDeviation="1"/>
        </filter>`;
      break;

    case 'runway-spotlight':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="30%" r="70%">
          ${stops}
          <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
          <animate attributeName="cx" values="50%;70%;30%;50%" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
        </radialGradient>
        <filter id="spotlightGlow">
          <feGaussianBlur stdDeviation="5"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>`;
      break;

    case 'urban-graffiti':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="graffitiSpray">
          <feTurbulence baseFrequency="0.9" numOctaves="4"/>
          <feDisplacementMap scale="12"/>
          <feGaussianBlur stdDeviation="2"/>
        </filter>`;
      break;

    case 'quilted-pearl':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
          ${stops}
          <animate attributeName="r" values="50%;80%;50%" ${animationConfig} />
        </radialGradient>
        <pattern id="quiltPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="15" fill="#${colorsCopy[3]}" opacity="0.3"/>
          <circle cx="20" cy="20" r="8" fill="#${colorsCopy[4]}" opacity="0.5"/>
        </pattern>`;
      break;

    case 'metallic-geometric':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        </linearGradient>
        <filter id="metallicSheen">
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix values="1.3 0 0 0 0 0 1.3 0 0 0 0 0 1.3 0 0 0 0 0 1 0"/>
        </filter>`;
      break;

    case 'flowing-fabric':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;50%;0%" ${animationConfig} />
          <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="fabricFlow">
          <feTurbulence baseFrequency="0.4" numOctaves="3"/>
          <feDisplacementMap scale="20">
            <animate attributeName="scale" values="20;30;20" ${animationConfig} />
          </feDisplacementMap>
        </filter>`;
      break;

    case 'natural-linen':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          ${stops}
          <animate attributeName="x1" values="0%;20%;0%" dur="${parseFloat(animationDuration) * 2}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="linenTexture">
          <feTurbulence baseFrequency="0.8" numOctaves="5"/>
          <feDisplacementMap scale="3"/>
        </filter>`;
      break;

    case 'lace-shadow':
      gradientDef = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
          ${stops}
          <animate attributeName="r" values="60%;90%;60%" ${animationConfig} />
        </radialGradient>
        <pattern id="lacePattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="15" cy="15" r="10" fill="none" stroke="#${colorsCopy[2]}" stroke-width="1" opacity="0.4"/>
          <circle cx="15" cy="15" r="5" fill="#${colorsCopy[3]}" opacity="0.2"/>
        </pattern>`;
      break;

    case 'holographic-led':
      gradientDef = `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          ${stops}
          <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
          <animate attributeName="y1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
        </linearGradient>
        <filter id="hologramGlow">
          <feGaussianBlur stdDeviation="4"/>
          <feColorMatrix values="1.5 0 0 0 0 0 1.5 0 0 0 0 0 1.5 0 0 0 0 0 1 0"/>
        </filter>`;
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