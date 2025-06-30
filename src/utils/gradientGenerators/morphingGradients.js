/*
 * MIT License - Advanced Morphing Gradient Generators
 * Inspired by fluid dynamics and organic transformation patterns
 */

// Liquid Mercury - Metallic fluid morphing with reflection effects
function createLiquidMorphingGradient(stops, animationConfig, animationDuration) {
  const morphPaths = [
    "M52.8,-67C68,-61.6,79.7,-45.6,82.5,-28.7C85.4,-11.8,79.5,6,71.4,20.8C63.2,35.5,53,47.1,40.7,53.3C28.5,59.4,14.2,60,-2.1,63C-18.5,65.9,-37,71.2,-52.3,66C-67.6,60.9,-79.7,45.4,-81.5,29C-83.2,12.7,-74.6,-4.4,-68.7,-22.2C-62.8,-40.1,-59.5,-58.7,-48.4,-65.4C-37.4,-72.2,-18.7,-67.1,0,-67.1C18.8,-67.2,37.6,-72.4,52.8,-67Z",
    "M42.3,-55.2C55.2,-48.7,66.6,-37,69.3,-23.7C72,-10.4,66,4.6,58.3,16.1C50.6,27.6,41.2,35.6,31.1,43.9C21.1,52.1,10.6,60.6,-1.3,62.5C-13.2,64.3,-26.4,59.4,-37.6,51.5C-48.8,43.6,-57.9,32.7,-61,20.5C-64.1,8.3,-61.1,-5.3,-57.9,-19.9C-54.7,-34.6,-51.3,-50.3,-41.6,-57.8C-32,-65.3,-16,-64.7,-0.7,-63.7C14.6,-62.8,29.3,-61.6,42.3,-55.2Z",
    "M59.2,-73.6C72.2,-68.3,80.1,-51.8,84.6,-34.9C89.1,-18.1,90.3,9.2,86.5,36.2C82.8,63.2,74.2,89.9,60.7,98.4C47.1,106.9,28.5,97.2,12.3,94.1C-3.9,90.9,-17.9,84.2,-31.2,75.6C-44.6,67.1,-57.4,56.6,-64.5,42.4C-71.7,28.2,-73.2,10.2,-74.7,-9.8C-76.3,-29.9,-77.9,-52,-71.8,-66.2C-65.7,-80.3,-51.8,-86.3,-37.8,-91.2C-23.7,-96.2,-11.8,-100.8,4.1,-107.5C20.1,-114.1,46.2,-79.9,59.2,-73.6Z"
  ];
  
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="r" values="40%;80%;40%" ${animationConfig} />
      </radialGradient>
      <filter id="metallicReflection">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feSpecularLighting surfaceScale="10" specularConstant="2" specularExponent="20" lighting-color="white" in="blur" result="specOut">
          <feDistantLight azimuth="45" elevation="60"/>
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
        <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
      </filter>`,
    additionalElements: `
      <g transform="translate(400, 300) scale(2, 2)">
        <path fill="url(#gradient)" filter="url(#metallicReflection)" d="${morphPaths[0]}">
          <animate attributeName="d" dur="${animationDuration}" 
            values="${morphPaths.join(';')};${morphPaths[0]}"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.33;0.66;1"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"/>
        </path>
      </g>`
  };
}

// Plasma Blob - High-energy morphing with electrical discharge
function createPlasmaMorphingGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="cx" values="30%;70%;30%" ${animationConfig} />
        <animate attributeName="cy" values="30%;70%;30%" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="plasmaGlow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="electricField">
        <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15">
          <animate attributeName="scale" values="5;25;5" ${animationConfig} />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <circle cx="400" cy="300" r="80" fill="url(#gradient)" filter="url(#plasmaGlow)" opacity="0.8">
        <animate attributeName="r" values="60;120;60" ${animationConfig} />
      </circle>
      <circle cx="400" cy="300" r="60" fill="none" stroke="url(#gradient)" stroke-width="3" filter="url(#electricField)" opacity="0.6">
        <animate attributeName="r" values="40;100;40" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
      </circle>`
  };
}

// Cosmic Entity - Deep space morphing with stellar effects
function createCosmicMorphingGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="80%">
        ${stops}
        <animate attributeName="r" values="60%;100%;60%" ${animationConfig} />
      </radialGradient>
      <radialGradient id="starField" cx="50%" cy="50%" r="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
        <stop offset="50%" stop-color="#6600cc" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#000033" stop-opacity="0.1"/>
      </radialGradient>
      <filter id="cosmicDistortion">
        <feTurbulence baseFrequency="0.3" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20">
          <animate attributeName="scale" values="10;30;10" ${animationConfig} />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <ellipse cx="400" cy="300" rx="150" ry="100" fill="url(#gradient)" filter="url(#cosmicDistortion)" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="${animationDuration}" repeatCount="indefinite"/>
      </ellipse>
      <circle cx="400" cy="300" r="200" fill="url(#starField)" opacity="0.3">
        <animate attributeName="r" values="180;220;180" dur="${parseFloat(animationDuration) * 2}s" repeatCount="indefinite" />
      </circle>`
  };
}

// Bio Organism - Organic growth patterns with cellular division
function createBioMorphingGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="cx" values="50%;45%;55%;50%" ${animationConfig} />
        <animate attributeName="cy" values="50%;55%;45%;50%" ${animationConfig} />
      </radialGradient>
      <filter id="organicTexture">
        <feTurbulence baseFrequency="1.5" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8">
          <animate attributeName="scale" values="5;12;5" ${animationConfig} />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <g transform="translate(400, 300)">
        <ellipse rx="80" ry="60" fill="url(#gradient)" filter="url(#organicTexture)" opacity="0.8">
          <animate attributeName="rx" values="60;100;60" ${animationConfig} />
          <animate attributeName="ry" values="40;80;40" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
        </ellipse>
        <ellipse rx="40" ry="30" fill="url(#gradient)" opacity="0.6" transform="translate(60, 40)">
          <animate attributeName="rx" values="30;50;30" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
        </ellipse>
        <ellipse rx="35" ry="25" fill="url(#gradient)" opacity="0.6" transform="translate(-50, -30)">
          <animate attributeName="ry" values="20;35;20" dur="${parseFloat(animationDuration) * 1.1}s" repeatCount="indefinite" />
        </ellipse>
      </g>`
  };
}

// Quantum Foam - Probability cloud morphing
function createQuantumMorphingGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="r" values="50%;90%;50%" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite" />
      </radialGradient>
      <filter id="quantumUncertainty">
        <feTurbulence baseFrequency="2.5" numOctaves="1" result="noise">
          <animate attributeName="baseFrequency" values="1.5;3.5;1.5" ${animationConfig} />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="12">
          <animate attributeName="scale" values="8;16;8" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <g opacity="0.7">
        <circle cx="400" cy="300" r="50" fill="url(#gradient)" filter="url(#quantumUncertainty)">
          <animate attributeName="r" values="30;70;30" dur="${parseFloat(animationDuration) * 0.6}s" repeatCount="indefinite" />
        </circle>
        <circle cx="450" cy="280" r="30" fill="url(#gradient)" filter="url(#quantumUncertainty)" opacity="0.6">
          <animate attributeName="r" values="20;40;20" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="320" r="25" fill="url(#gradient)" filter="url(#quantumUncertainty)" opacity="0.6">
          <animate attributeName="r" values="15;35;15" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
        </circle>
      </g>`
  };
}

// Molten Lava - Volcanic heat distortion with magma bubbles
function createLavaMorphingGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
        ${stops}
        <animate attributeName="y1" values="100%;80%;100%" ${animationConfig} />
      </linearGradient>
      <filter id="heatDistortion">
        <feTurbulence baseFrequency="0.8" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="25">
          <animate attributeName="scale" values="15;35;15" ${animationConfig} />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <rect x="0" y="400" width="800" height="200" fill="url(#gradient)" filter="url(#heatDistortion)">
        <animate attributeName="height" values="180;220;180" ${animationConfig} />
      </rect>
      <circle cx="200" cy="450" r="20" fill="url(#gradient)" opacity="0.8">
        <animate attributeName="cy" values="450;350;450" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
        <animate attributeName="r" values="15;25;15" dur="${parseFloat(animationDuration) * 0.6}s" repeatCount="indefinite" />
      </circle>
      <circle cx="400" cy="480" r="25" fill="url(#gradient)" opacity="0.9">
        <animate attributeName="cy" values="480;320;480" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
      </circle>
      <circle cx="600" cy="460" r="18" fill="url(#gradient)" opacity="0.7">
        <animate attributeName="cy" values="460;340;460" dur="${parseFloat(animationDuration) * 0.9}s" repeatCount="indefinite" />
      </circle>`
  };
}

module.exports = {
  createLiquidMorphingGradient,
  createPlasmaMorphingGradient,
  createCosmicMorphingGradient,
  createBioMorphingGradient,
  createQuantumMorphingGradient,
  createLavaMorphingGradient
}; 