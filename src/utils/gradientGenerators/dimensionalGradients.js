/*
 * MIT License - Dimensional Gradient Generators
 * Multi-dimensional space distortion and portal effects
 */

// Portal Nexus - Interdimensional portal with space-time distortion
function createPortalDistortionGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="r" values="40%;80%;40%" ${animationConfig} />
      </radialGradient>
      <filter id="portalDistortion">
        <feTurbulence baseFrequency="1.0" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20">
          <animate attributeName="scale" values="10;30;10" ${animationConfig} />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <g transform="translate(400, 300)">
        <circle r="100" fill="url(#gradient)" filter="url(#portalDistortion)" opacity="0.9">
          <animate attributeName="r" values="80;120;80" ${animationConfig} />
        </circle>
        <circle r="60" fill="none" stroke="url(#gradient)" stroke-width="4" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite"/>
        </circle>
        <circle r="40" fill="none" stroke="url(#gradient)" stroke-width="2" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" values="360;0" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite"/>
        </circle>
      </g>`
  };
}

// Tesseract Projection - 4D hypercube with dimensional rotation
function createHypercubeProjectionGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animateTransform attributeName="gradientTransform" type="rotate" values="0 50 50;360 50 50" ${animationConfig} />
      </linearGradient>`,
    additionalElements: `
      <g transform="translate(400, 300)" stroke="url(#gradient)" stroke-width="2" fill="none" opacity="0.8">
        <rect x="-80" y="-80" width="160" height="160">
          <animateTransform attributeName="transform" type="rotate" values="0;45;0" ${animationConfig} />
        </rect>
        <rect x="-60" y="-60" width="120" height="120">
          <animateTransform attributeName="transform" type="rotate" values="45;0;45" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
        </rect>
        <rect x="-40" y="-40" width="80" height="80">
          <animateTransform attributeName="transform" type="rotate" values="0;90;0" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
        </rect>
      </g>`
  };
}

// Wormhole Effect - Gravitational lensing with spacetime curvature
function createWormholeEffectGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
      </radialGradient>
      <filter id="gravitationalLensing">
        <feTurbulence baseFrequency="0.4" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="40">
          <animate attributeName="scale" values="20;60;20" ${animationConfig} />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <g transform="translate(400, 300)">
        <ellipse rx="150" ry="50" fill="url(#gradient)" filter="url(#gravitationalLensing)" opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${animationDuration}" repeatCount="indefinite"/>
        </ellipse>
        <ellipse rx="100" ry="30" fill="url(#gradient)" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="180;540" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite"/>
        </ellipse>
      </g>`
  };
}

// Fractal Dimension - Infinite recursive patterns
function createFractalDimensionGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animateTransform attributeName="gradientTransform" type="scale" values="1;1.5;1" ${animationConfig} />
      </linearGradient>`,
    additionalElements: `
      <g transform="translate(400, 300)" opacity="0.8">
        <rect x="-100" y="-100" width="200" height="200" fill="url(#gradient)" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${animationDuration}" repeatCount="indefinite"/>
        </rect>
        <rect x="-70" y="-70" width="140" height="140" fill="url(#gradient)" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" values="360;0" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite"/>
        </rect>
        <rect x="-50" y="-50" width="100" height="100" fill="url(#gradient)" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${parseFloat(animationDuration) * 0.5}s" repeatCount="indefinite"/>
        </rect>
      </g>`
  };
}

// Multiverse Overlap - Parallel universe intersection
function createMultiverseOverlapGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="r" values="40%;80%;40%" ${animationConfig} />
      </radialGradient>
      <filter id="multiverseGlitch">
        <feTurbulence baseFrequency="0.7" numOctaves="4" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15">
          <animate attributeName="scale" values="5;25;5" dur="${parseFloat(animationDuration) * 0.3}s" repeatCount="indefinite" />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <g>
        <ellipse cx="300" cy="300" rx="120" ry="80" fill="url(#gradient)" filter="url(#multiverseGlitch)" opacity="0.7">
          <animate attributeName="rx" values="100;140;100" ${animationConfig} />
        </ellipse>
        <ellipse cx="500" cy="300" rx="100" ry="90" fill="url(#gradient)" filter="url(#multiverseGlitch)" opacity="0.6">
          <animate attributeName="rx" values="80;120;80" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="400" cy="200" rx="90" ry="70" fill="url(#gradient)" filter="url(#multiverseGlitch)" opacity="0.5">
          <animate attributeName="ry" values="50;90;50" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
        </ellipse>
      </g>`
  };
}

// Reality Glitch - Digital artifacts and matrix errors
function createRealityDistortionGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" dur="${parseFloat(animationDuration) * 0.2}s" repeatCount="indefinite" />
      </linearGradient>
      <filter id="digitalGlitch">
        <feTurbulence baseFrequency="3.0" numOctaves="1" result="noise">
          <animate attributeName="baseFrequency" values="2;4;2" dur="${parseFloat(animationDuration) * 0.1}s" repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20">
          <animate attributeName="scale" values="10;30;10" dur="${parseFloat(animationDuration) * 0.15}s" repeatCount="indefinite" />
        </feDisplacementMap>
      </filter>`,
    additionalElements: `
      <g>
        <rect x="0" y="0" width="800" height="100" fill="url(#gradient)" filter="url(#digitalGlitch)" opacity="0.8">
          <animate attributeName="y" values="0;500;0" ${animationConfig} />
        </rect>
        <rect x="0" y="150" width="800" height="50" fill="url(#gradient)" filter="url(#digitalGlitch)" opacity="0.6">
          <animate attributeName="y" values="150;450;150" dur="${parseFloat(animationDuration) * 0.7}s" repeatCount="indefinite" />
        </rect>
        <rect x="0" y="250" width="800" height="75" fill="url(#gradient)" filter="url(#digitalGlitch)" opacity="0.7">
          <animate attributeName="y" values="250;350;250" dur="${parseFloat(animationDuration) * 1.2}s" repeatCount="indefinite" />
        </rect>
      </g>`
  };
}

module.exports = {
  createPortalDistortionGradient,
  createHypercubeProjectionGradient,
  createWormholeEffectGradient,
  createFractalDimensionGradient,
  createMultiverseOverlapGradient,
  createRealityDistortionGradient
}; 