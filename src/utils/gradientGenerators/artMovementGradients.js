/*
 * MIT License - Art Movement Gradient Generators
 * Historical artistic styles and movements
 *
 * Copyright (c) 2025 ChanMeng666
 */

// Art Nouveau Flow - Organic curving lines with floral motifs
function createArtNouveauFlowGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;20%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;30%;0%" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
      </linearGradient>`,
    additionalElements: `
      <g opacity="0.9">
        <path d="M 200 100 Q 250 150, 300 100 T 400 100 Q 450 150, 500 200 T 600 300"
              stroke="url(#gradient)" stroke-width="15" fill="none" opacity="0.8">
          <animate attributeName="d"
                   values="M 200 100 Q 250 150, 300 100 T 400 100 Q 450 150, 500 200 T 600 300;
                           M 200 120 Q 250 170, 300 120 T 400 120 Q 450 170, 500 220 T 600 320;
                           M 200 100 Q 250 150, 300 100 T 400 100 Q 450 150, 500 200 T 600 300"
                   ${animationConfig} />
        </path>
        <path d="M 150 200 Q 200 300, 250 200 T 350 200 Q 400 300, 450 400"
              stroke="url(#gradient)" stroke-width="12" fill="none" opacity="0.7">
          <animate attributeName="d"
                   values="M 150 200 Q 200 300, 250 200 T 350 200 Q 400 300, 450 400;
                           M 150 220 Q 200 320, 250 220 T 350 220 Q 400 320, 450 420;
                           M 150 200 Q 200 300, 250 200 T 350 200 Q 400 300, 450 400"
                   dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
        </path>
        <ellipse cx="500" cy="250" rx="40" ry="60" fill="url(#gradient)" opacity="0.6">
          <animate attributeName="ry" values="50;70;50" ${animationConfig} />
        </ellipse>
      </g>`
  };
}

// Art Deco Luxury - Geometric symmetry with gold and black
function createArtDecoLuxuryGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
        ${stops}
      </linearGradient>
      <pattern id="decoPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="50" height="100" fill="url(#gradient)" opacity="0.9"/>
        <rect x="50" y="0" width="50" height="100" fill="url(#gradient)" opacity="0.6"/>
        <polygon points="25,20 40,40 25,60 10,40" fill="url(#gradient)" opacity="0.8"/>
        <polygon points="75,40 90,60 75,80 60,60" fill="url(#gradient)" opacity="0.7"/>
        <animateTransform attributeName="patternTransform" type="translate"
                          values="0,0; 0,100; 0,0" ${animationConfig} />
      </pattern>`,
    additionalElements: `
      <g>
        <polygon points="400,150 500,250 400,350 300,250" fill="url(#gradient)" opacity="0.9" stroke="url(#gradient)" stroke-width="3">
          <animateTransform attributeName="transform" type="rotate" values="0 400 250;5 400 250;0 400 250" ${animationConfig} />
        </polygon>
        <polygon points="350,200 450,200 450,300 350,300" fill="url(#gradient)" opacity="0.7">
          <animateTransform attributeName="transform" type="scale" values="1 1;1.05 1.05;1 1"
                            additive="sum" ${animationConfig} />
          <animateTransform attributeName="transform" type="translate" values="0 0" additive="sum"/>
        </polygon>
      </g>`
  };
}

// Bauhaus Minimal - Primary colors with simple geometric forms
function createBauhausMinimalGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x2" values="100%;120%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements: `
      <g>
        <rect x="150" y="150" width="150" height="150" fill="url(#gradient)" opacity="0.9">
          <animate attributeName="x" values="150;170;150" ${animationConfig} />
        </rect>
        <circle cx="500" cy="250" r="80" fill="url(#gradient)" opacity="0.8">
          <animate attributeName="r" values="75;85;75" ${animationConfig} />
        </circle>
        <polygon points="400,350 450,450 350,450" fill="url(#gradient)" opacity="0.85">
          <animateTransform attributeName="transform" type="rotate" values="0 400 400;3 400 400;0 400 400" ${animationConfig} />
        </polygon>
        <line x1="200" y1="400" x2="600" y2="400" stroke="url(#gradient)" stroke-width="15" opacity="0.7">
          <animate attributeName="stroke-width" values="12;18;12" ${animationConfig} />
        </line>
      </g>`
  };
}

// Impressionist Dots - Pointillist optical color mixing
function createImpressionistDotsGradient(stops, animationConfig, animationDuration, colorsCopy) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
      </radialGradient>
      <pattern id="pointillistPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        ${Array.from({length: 4}, (_, i) => `
          <circle cx="${5 + (i % 2) * 10}" cy="${5 + Math.floor(i / 2) * 10}" r="3"
                  fill="#${colorsCopy[i % colorsCopy.length]}" opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${2 + i * 0.5}s" repeatCount="indefinite" />
          </circle>
        `).join('')}
      </pattern>`,
    additionalElements: `
      <g>
        ${Array.from({length: 50}, (_, i) => {
          const x = 100 + (i * 137.5) % 600;
          const y = 100 + ((i * 97) % 400);
          const r = 3 + (i % 3);
          return `
            <circle cx="${x}" cy="${y}" r="${r}" fill="url(#gradient)" opacity="0.7">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="${3 + (i % 4)}s" repeatCount="indefinite" />
            </circle>
          `;
        }).join('')}
      </g>`
  };
}

// Cubist Fragments - Geometric plane fragmentation
function createCubistFragmentsGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animateTransform attributeName="gradientTransform" type="rotate" values="0 50 50;10 50 50;0 50 50" ${animationConfig} />
      </linearGradient>`,
    additionalElements: `
      <g>
        <polygon points="200,150 350,180 320,300 180,280" fill="url(#gradient)" opacity="0.85">
          <animateTransform attributeName="transform" type="skewX" values="0;3;0" ${animationConfig} />
        </polygon>
        <polygon points="350,180 500,200 480,320 320,300" fill="url(#gradient)" opacity="0.75">
          <animateTransform attributeName="transform" type="skewY" values="0;-2;0" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
        </polygon>
        <polygon points="500,200 600,250 550,380 480,320" fill="url(#gradient)" opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" values="0 550 290;2 550 290;0 550 290" ${animationConfig} />
        </polygon>
        <polygon points="180,280 320,300 300,450 150,420" fill="url(#gradient)" opacity="0.7">
          <animateTransform attributeName="transform" type="skewX" values="0;-3;0" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
        </polygon>
        <polygon points="320,300 480,320 450,480 300,450" fill="url(#gradient)" opacity="0.75">
          <animateTransform attributeName="transform" type="rotate" values="0 375 390;-2 375 390;0 375 390" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
        </polygon>
      </g>`
  };
}

// Surrealist Melt - Dreamlike melting transformations
function createSurrealistMeltGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
        ${stops}
        <animate attributeName="y1" values="0%;-20%;0%" ${animationConfig} />
        <animate attributeName="y2" values="100%;120%;100%" ${animationConfig} />
      </linearGradient>
      <filter id="meltDistortion">
        <feTurbulence baseFrequency="0.05" numOctaves="2" result="noise">
          <animate attributeName="baseFrequency" values="0.03;0.07;0.03" ${animationConfig} />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20">
          <animate attributeName="scale" values="15;25;15" ${animationConfig} />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <g filter="url(#meltDistortion)">
        <ellipse cx="400" cy="250" rx="120" ry="100" fill="url(#gradient)" opacity="0.9">
          <animate attributeName="ry" values="100;150;100" ${animationConfig} />
          <animate attributeName="cy" values="250;280;250" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
        </ellipse>
        <rect x="300" y="350" width="200" height="100" fill="url(#gradient)" opacity="0.8">
          <animate attributeName="height" values="100;130;100" ${animationConfig} />
        </rect>
      </g>`
  };
}

// Pop Art Halftone - Ben-Day dots with bold CMYK colors
function createPopArtHalftoneGradient(stops, animationConfig, animationDuration, colorsCopy) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
      </radialGradient>
      <pattern id="halftonePattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
        <circle cx="7.5" cy="7.5" r="5" fill="#${colorsCopy[0] || '000000'}" opacity="0.8">
          <animate attributeName="r" values="4;6;4" ${animationConfig} />
        </circle>
      </pattern>`,
    additionalElements: `
      <g>
        ${Array.from({length: 30}, (_, i) => {
          const x = 150 + (i % 6) * 100;
          const y = 150 + Math.floor(i / 6) * 80;
          const size = 40 + (i % 3) * 15;
          return `
            <circle cx="${x}" cy="${y}" r="${size/2}" fill="url(#gradient)" opacity="0.85" stroke="#000" stroke-width="3">
              <animate attributeName="r" values="${size/2};${size/2 + 5};${size/2}" dur="${2 + (i % 3)}s" repeatCount="indefinite" />
            </circle>
          `;
        }).join('')}
      </g>`
  };
}

module.exports = {
  createArtNouveauFlowGradient,
  createArtDecoLuxuryGradient,
  createBauhausMinimalGradient,
  createImpressionistDotsGradient,
  createCubistFragmentsGradient,
  createSurrealistMeltGradient,
  createPopArtHalftoneGradient
};
