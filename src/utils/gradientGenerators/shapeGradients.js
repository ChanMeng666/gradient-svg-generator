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

// Shape-based gradient generators
function createCircularGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
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
      </clipPath>`,
    hasClipPath: true,
    clipPathId: 'circles-clip'
  };
}

function createStarGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
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
      </clipPath>`,
    hasClipPath: true,
    clipPathId: 'stars-clip'
  };
}

function createHeartGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
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
      </clipPath>`,
    hasClipPath: true,
    clipPathId: 'hearts-clip'
  };
}

function createLightningGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
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
      </clipPath>`,
    hasClipPath: true,
    clipPathId: 'lightning-clip'
  };
}

function createWaveGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
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
      </clipPath>`,
    hasClipPath: true,
    clipPathId: 'wave-clip'
  };
}

function createZigzagGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
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
      </clipPath>`,
    hasClipPath: true,
    clipPathId: 'zigzag-clip'
  };
}

function createRippleGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
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
      </clipPath>`,
    hasClipPath: true,
    clipPathId: 'ripple-clip'
  };
}

/**
 * Create layered wave gradient with depth effect
 * Inspired by capsule-render's Waving effect
 * Multiple semi-transparent waves with staggered animations
 */
function createLayeredWaveGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;-20%;40%;-10%;60%;0%" ${animationConfig} />
        <animate attributeName="y1" values="50%;30%;70%;20%;80%;50%" ${animationConfig} />
        <animate attributeName="x2" values="100%;120%;80%;110%;60%;100%" ${animationConfig} />
        <animate attributeName="y2" values="50%;70%;30%;80%;20%;50%" ${animationConfig} />
      </linearGradient>
      <filter id="waveBlur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
        <feColorMatrix type="saturate" values="1.3"/>
      </filter>
    `,
    additionalElements: `
      <g class="layered-waves">
        <!-- Background wave layer -->
        <path d="M0,70 Q213.5,30 427,60 T854,50 L854,120 L0,120 Z" fill="url(#gradient)" opacity="0.3" filter="url(#waveBlur)">
          <animate
            attributeName="d"
            dur="${parseFloat(animationDuration) * 2}s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.333;0.667;1"
            keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
            begin="0s"
            values="M0,70 Q213.5,30 427,60 T854,50 L854,120 L0,120 Z;
                    M0,60 Q213.5,40 427,50 T854,70 L854,120 L0,120 Z;
                    M0,45 Q213.5,75 427,45 T854,60 L854,120 L0,120 Z;
                    M0,70 Q213.5,30 427,60 T854,50 L854,120 L0,120 Z"
          />
        </path>

        <!-- Middle wave layer -->
        <path d="M0,65 Q213.5,25 427,55 T854,45 L854,120 L0,120 Z" fill="url(#gradient)" opacity="0.4">
          <animate
            attributeName="d"
            dur="${parseFloat(animationDuration) * 2}s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.333;0.667;1"
            keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
            begin="-${parseFloat(animationDuration) * 0.5}s"
            values="M0,65 Q213.5,25 427,55 T854,45 L854,120 L0,120 Z;
                    M0,55 Q213.5,85 427,45 T854,65 L854,120 L0,120 Z;
                    M0,50 Q213.5,30 427,60 T854,40 L854,120 L0,120 Z;
                    M0,65 Q213.5,25 427,55 T854,45 L854,120 L0,120 Z"
          />
        </path>

        <!-- Foreground wave layer -->
        <path d="M0,55 Q213.5,15 427,45 T854,35 L854,120 L0,120 Z" fill="url(#gradient)" opacity="0.5">
          <animate
            attributeName="d"
            dur="${parseFloat(animationDuration) * 2}s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.333;0.667;1"
            keySplines="0.2 0 0.2 1;0.2 0 0.2 1;0.2 0 0.2 1"
            begin="-${parseFloat(animationDuration) * 1}s"
            values="M0,55 Q213.5,15 427,45 T854,35 L854,120 L0,120 Z;
                    M0,45 Q213.5,75 427,35 T854,55 L854,120 L0,120 Z;
                    M0,60 Q213.5,20 427,50 T854,30 L854,120 L0,120 Z;
                    M0,55 Q213.5,15 427,45 T854,35 L854,120 L0,120 Z"
          />
        </path>
      </g>
    `,
    hasClipPath: false,
    clipPathId: null
  };
}

module.exports = {
  createCircularGradient,
  createStarGradient,
  createHeartGradient,
  createLightningGradient,
  createWaveGradient,
  createZigzagGradient,
  createRippleGradient,
  createLayeredWaveGradient
}; 