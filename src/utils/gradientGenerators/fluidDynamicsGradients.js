/*
 * MIT License - Fluid Dynamics Gradient Generators
 * Advanced wave simulation and fluid propagation effects
 */

// Turbulent Waves - Complex fluid dynamics with foam generation
function createTurbulentWavesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;50%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;50%;0%" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
      </linearGradient>
      <filter id="waveDistortion">
        <feTurbulence baseFrequency="0.5" numOctaves="4" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30">
          <animate attributeName="scale" values="20;40;20" ${animationConfig} />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <g transform="translate(0, 300)">
        <path d="M0 0L 0 150Q 200 100 400 120T 800 140L 800 0 Z" fill="url(#gradient)" filter="url(#waveDistortion)" opacity="0.8">
          <animate attributeName="d" dur="${animationDuration}" repeatCount="indefinite"
            values="M0 0L 0 150Q 200 100 400 120T 800 140L 800 0 Z;M0 0L 0 120Q 200 160 400 100T 800 130L 800 0 Z;M0 0L 0 140Q 200 90 400 140T 800 110L 800 0 Z;M0 0L 0 150Q 200 100 400 120T 800 140L 800 0 Z"/>
        </path>
      </g>`
  };
}

// Electromagnetic Waves - Field visualization with interference patterns
function createElectromagneticWavesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
      </linearGradient>`,
    additionalElements: `
      <rect x="0" y="280" width="800" height="40" fill="url(#gradient)">
        <animate attributeName="height" values="30;50;30" ${animationConfig} />
      </rect>`
  };
}

// Aurora Streams - Atmospheric particle flow with magnetic field lines
function createAuroraWavesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        ${stops}
        <animate attributeName="y1" values="0%;30%;0%" ${animationConfig} />
      </linearGradient>
      <filter id="auroraGlow">
        <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>`,
    additionalElements: `
      <path d="M100 100 Q200 200 300 150 Q400 100 500 180 Q600 250 700 200" 
            stroke="url(#gradient)" stroke-width="20" fill="none" filter="url(#auroraGlow)">
        <animate attributeName="d" dur="${animationDuration}" repeatCount="indefinite"
          values="M100 100 Q200 200 300 150 Q400 100 500 180 Q600 250 700 200;M100 120 Q200 180 300 170 Q400 120 500 160 Q600 230 700 180;M100 100 Q200 200 300 150 Q400 100 500 180 Q600 250 700 200"/>
      </path>`
  };
}

// Sound Waves - Frequency modulation with amplitude variations
function createSoundWavesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        ${stops}
        <animate attributeName="x1" values="-20%;80%;-20%" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
        <animate attributeName="x2" values="20%;120%;20%" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
      </linearGradient>`,
    additionalElements: `
      <g transform="translate(400, 300)">
        <g stroke="url(#gradient)" fill="none" stroke-width="4">
          <path d="M-300 0 Q-250 -30 -200 0 Q-150 30 -100 0 Q-50 -30 0 0 Q50 30 100 0 Q150 -30 200 0 Q250 30 300 0">
            <animate attributeName="d" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite"
              values="M-300 0 Q-250 -30 -200 0 Q-150 30 -100 0 Q-50 -30 0 0 Q50 30 100 0 Q150 -30 200 0 Q250 30 300 0;
                      M-300 0 Q-250 30 -200 0 Q-150 -30 -100 0 Q-50 30 0 0 Q50 -30 100 0 Q150 30 200 0 Q250 -30 300 0;
                      M-300 0 Q-250 -30 -200 0 Q-150 30 -100 0 Q-50 -30 0 0 Q50 30 100 0 Q150 -30 200 0 Q250 30 300 0"/>
          </path>
          <path d="M-300 0 Q-250 -20 -200 0 Q-150 20 -100 0 Q-50 -20 0 0 Q50 20 100 0 Q150 -20 200 0 Q250 20 300 0" opacity="0.7">
            <animate attributeName="d" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite"
              values="M-300 0 Q-250 -20 -200 0 Q-150 20 -100 0 Q-50 -20 0 0 Q50 20 100 0 Q150 -20 200 0 Q250 20 300 0;
                      M-300 0 Q-250 20 -200 0 Q-150 -20 -100 0 Q-50 20 0 0 Q50 -20 100 0 Q150 20 200 0 Q250 -20 300 0;
                      M-300 0 Q-250 -20 -200 0 Q-150 20 -100 0 Q-50 -20 0 0 Q50 20 100 0 Q150 -20 200 0 Q250 20 300 0"/>
          </path>
          <path d="M-300 0 Q-250 -40 -200 0 Q-150 40 -100 0 Q-50 -40 0 0 Q50 40 100 0 Q150 -40 200 0 Q250 40 300 0" opacity="0.5">
            <animate attributeName="d" dur="${parseFloat(animationDuration) * 0.6}s" repeatCount="indefinite"
              values="M-300 0 Q-250 -40 -200 0 Q-150 40 -100 0 Q-50 -40 0 0 Q50 40 100 0 Q150 -40 200 0 Q250 40 300 0;
                      M-300 0 Q-250 40 -200 0 Q-150 -40 -100 0 Q-50 40 0 0 Q50 -40 100 0 Q150 40 200 0 Q250 -40 300 0;
                      M-300 0 Q-250 -40 -200 0 Q-150 40 -100 0 Q-50 -40 0 0 Q50 40 100 0 Q150 -40 200 0 Q250 40 300 0"/>
          </path>
        </g>
      </g>`
  };
}

// Cryogenic Waves - Liquid nitrogen with sublimation effects
function createCryogenicWavesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="80%" r="60%">
        ${stops}
        <animate attributeName="cy" values="80%;60%;80%" ${animationConfig} />
        <animate attributeName="r" values="50%;70%;50%" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="cryogenicVapor">
        <feTurbulence baseFrequency="0.6" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20">
          <animate attributeName="scale" values="10;30;10" ${animationConfig} />
        </feDisplacementMap>
        <feGaussianBlur stdDeviation="4"/>
      </filter>`,
    additionalElements: `
      <g>
        <ellipse cx="400" cy="500" rx="200" ry="80" fill="url(#gradient)" opacity="0.9">
          <animate attributeName="ry" values="60;100;60" ${animationConfig} />
        </ellipse>
        <g opacity="0.6">
          <circle cx="300" cy="450" r="15" fill="url(#gradient)" filter="url(#cryogenicVapor)">
            <animate attributeName="cy" values="450;200;450" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
            <animate attributeName="r" values="10;25;10" dur="${parseFloat(animationDuration) * 0.6}s" repeatCount="indefinite" />
          </circle>
          <circle cx="400" cy="470" r="20" fill="url(#gradient)" filter="url(#cryogenicVapor)">
            <animate attributeName="cy" values="470;150;470" dur="${parseFloat(animationDuration) * 1.1}s" repeatCount="indefinite" />
            <animate attributeName="r" values="15;30;15" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="460" r="18" fill="url(#gradient)" filter="url(#cryogenicVapor)">
            <animate attributeName="cy" values="460;180;460" dur="${parseFloat(animationDuration) * 0.9}s" repeatCount="indefinite" />
            <animate attributeName="r" values="12;28;12" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>`
  };
}

// Solar Wind - Particle streams with coronal mass ejection patterns
function createSolarWavesGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="20%" cy="20%" r="80%">
        ${stops}
        <animate attributeName="cx" values="20%;40%;20%" ${animationConfig} />
        <animate attributeName="cy" values="20%;40%;20%" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="solarFlare">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>`,
    additionalElements: `
      <g>
        <circle cx="100" cy="100" r="60" fill="url(#gradient)" filter="url(#solarFlare)">
          <animate attributeName="r" values="50;80;50" ${animationConfig} />
        </circle>
        <g stroke="url(#gradient)" fill="none" stroke-width="8" opacity="0.8">
          <path d="M160 100 Q300 80 450 120 Q600 160 750 140">
            <animate attributeName="d" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite"
              values="M160 100 Q300 80 450 120 Q600 160 750 140;
                      M160 100 Q300 120 450 80 Q600 120 750 100;
                      M160 100 Q300 60 450 140 Q600 200 750 180;
                      M160 100 Q300 80 450 120 Q600 160 750 140"/>
          </path>
          <path d="M140 130 Q280 200 420 180 Q560 160 700 200" stroke-width="6" opacity="0.6">
            <animate attributeName="d" dur="${parseFloat(animationDuration) * 0.9}s" repeatCount="indefinite"
              values="M140 130 Q280 200 420 180 Q560 160 700 200;
                      M140 130 Q280 160 420 220 Q560 200 700 160;
                      M140 130 Q280 240 420 140 Q560 120 700 240;
                      M140 130 Q280 200 420 180 Q560 160 700 200"/>
          </path>
          <path d="M150 70 Q290 40 430 80 Q570 120 710 100" stroke-width="6" opacity="0.6">
            <animate attributeName="d" dur="${parseFloat(animationDuration) * 1.1}s" repeatCount="indefinite"
              values="M150 70 Q290 40 430 80 Q570 120 710 100;
                      M150 70 Q290 80 430 40 Q570 80 710 60;
                      M150 70 Q290 20 430 100 Q570 140 710 120;
                      M150 70 Q290 40 430 80 Q570 120 710 100"/>
          </path>
        </g>
      </g>`
  };
}

module.exports = {
  createTurbulentWavesGradient,
  createElectromagneticWavesGradient,
  createAuroraWavesGradient,
  createSoundWavesGradient,
  createCryogenicWavesGradient,
  createSolarWavesGradient
}; 