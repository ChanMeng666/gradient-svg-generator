/*
 * MIT License - Merged Fluids Templates
 *
 * Union of the three previously-separate fluids-adjacent categories:
 *   - "fluidDynamics"    (6 entries: turbulent-waves, electromagnetic-field,
 *                         aurora-streams, sound-visualization, liquid-nitrogen,
 *                         solar-wind)
 *   - "dimensional"      (6 entries: portal-nexus, tesseract-projection,
 *                         wormhole-transit, fractal-dimension,
 *                         parallel-universe, reality-glitch)
 *   - "dimensionalPortal"(5 unique entries after collision drop:
 *                         quantum-tunnel, dimensional-rift,
 *                         holographic-matrix, void-chamber,
 *                         astral-projection)
 *
 * Three collisions existed between dimensional and dimensionalPortal:
 * 'parallel-universe', 'reality-glitch', 'wormhole-transit'. The
 * "dimensional" category won in registry lookup order, so
 * dimensionalPortal's versions of those three were already shadowed
 * and have been dropped here to preserve the public contract.
 *
 * The corresponding EFFECT manifests still live in
 * features/advanced/effect.js (categories 'fluidDynamics',
 * 'dimensional', 'dimensionalPortal'). Splitting that 56-effect
 * grab-bag is separate work; this merge is template-layer only.
 *
 * Copyright (c) 2025 ChanMeng666
 */

const palettes = require('../_shared/palettes');

module.exports = {
  // --- formerly fluidDynamicsTemplates --------------------------------------
  'turbulent-waves': {
    name: 'turbulent-waves',
    label: 'Turbulent Waves',
    colors: ['0066cc', '0080ff', '00aaff', '00ccff'],
    gradientType: 'turbulentWaves',
    animationDuration: '5s',
    description: 'Turbulent ocean waves with complex fluid dynamics and foam generation',
  },
  'electromagnetic-field': {
    name: 'electromagnetic-field',
    label: 'Electromagnetic Field',
    colors: ['ff00ff', 'ff0080', '8000ff', '0080ff'],
    gradientType: 'electromagneticWaves',
    animationDuration: '3s',
    description:
      'Electromagnetic field visualization with wave interference and energy propagation',
  },
  'aurora-streams': {
    name: 'aurora-streams',
    label: 'Aurora Streams',
    colors: ['00ff80', '80ff00', '00ff40', '40ff80'],
    gradientType: 'auroraWaves',
    animationDuration: '9s',
    description: 'Aurora borealis streams with atmospheric particle flow and magnetic field lines',
  },
  'sound-visualization': {
    name: 'sound-visualization',
    label: 'Sound Visualization',
    colors: palettes.amberFlow,
    gradientType: 'soundWaves',
    animationDuration: '2s',
    description: 'Sound wave visualization with frequency modulation and amplitude variations',
  },
  'liquid-nitrogen': {
    name: 'liquid-nitrogen',
    label: 'Liquid Nitrogen',
    colors: ['e0e0ff', 'f0f0ff', 'ffffff', 'f8f8ff'],
    gradientType: 'cryogenicWaves',
    animationDuration: '6s',
    description: 'Liquid nitrogen flow with cryogenic vapor trails and sublimation effects',
  },
  'solar-wind': {
    name: 'solar-wind',
    label: 'Solar Wind',
    colors: ['ffff00', 'ffcc00', 'ff9900', 'ff6600'],
    gradientType: 'solarWaves',
    animationDuration: '8s',
    description: 'Solar wind particle streams with coronal mass ejection patterns',
  },

  // --- formerly dimensionalTemplates ----------------------------------------
  'portal-nexus': {
    name: 'portal-nexus',
    label: 'Portal Nexus',
    colors: ['4400ff', '6600ff', '8800ff', 'aa00ff'],
    gradientType: 'portalDistortion',
    animationDuration: '4s',
    description: 'Interdimensional portal with space-time distortion and energy vortex',
  },
  'tesseract-projection': {
    name: 'tesseract-projection',
    label: 'Tesseract Projection',
    colors: ['ff0040', 'ff0080', 'ff00c0', 'ff00ff'],
    gradientType: 'hypercubeProjection',
    animationDuration: '15s',
    description: '4D tesseract projection with hyperdimensional rotation and geometric complexity',
  },
  'wormhole-transit': {
    name: 'wormhole-transit',
    label: 'Wormhole Transit',
    colors: ['000000', '330033', '660066', '990099'],
    gradientType: 'wormholeEffect',
    animationDuration: '10s',
    description: 'Wormhole travel simulation with gravitational lensing and spacetime curvature',
  },
  'fractal-dimension': {
    name: 'fractal-dimension',
    label: 'Fractal Dimension',
    colors: ['00ffff', '00ccff', '0099ff', '0066ff'],
    gradientType: 'fractalDimension',
    animationDuration: '20s',
    description:
      'Fractal dimensional space with infinite recursive patterns and mathematical beauty',
  },
  'parallel-universe': {
    name: 'parallel-universe',
    label: 'Parallel Universe',
    colors: palettes.amberFlow,
    gradientType: 'multiverseOverlap',
    animationDuration: '12s',
    description: 'Parallel universe intersection with reality distortion and dimensional bleeding',
  },
  'reality-glitch': {
    name: 'reality-glitch',
    label: 'Reality Glitch',
    colors: ['ff0000', 'ff0040', 'ff0080', 'ff00c0'],
    gradientType: 'realityDistortion',
    animationDuration: '3s',
    description: 'Reality glitch effect with digital artifacts and matrix-like system errors',
  },

  // --- formerly dimensionalPortalTemplates ----------------------------------
  // Note: parallel-universe, reality-glitch, wormhole-transit dropped here
  // -- the dimensional-category versions above already won in registry
  // lookup and are preserved.
  'quantum-tunnel': {
    name: 'quantum-tunnel',
    label: 'Quantum Tunnel',
    colors: ['000000', '1a0033', '330066', '4d0099', '6600cc', '7f00ff'],
    gradientType: 'quantumTunnel',
    animationDuration: '4s',
    description:
      'Quantum tunneling effect -- particles breaching energy barriers through spacetime warping',
  },
  'dimensional-rift': {
    name: 'dimensional-rift',
    label: 'Dimensional Rift',
    colors: ['ff00ff', 'ff0080', '8000ff', '4000ff', '0040ff', '0080ff'],
    gradientType: 'dimensionalTear',
    animationDuration: '3s',
    description: 'Dimensional rift -- tearing and restructuring of reality',
  },
  'holographic-matrix': {
    name: 'holographic-matrix',
    label: 'Holographic Matrix',
    colors: ['00ffff', '40ffbf', '80ff80', 'bfff40', 'ffff00', 'ffbf00'],
    gradientType: 'holographicGrid',
    animationDuration: '5s',
    description: 'Holographic matrix -- multi-dimensional grid of woven information',
  },
  'void-chamber': {
    name: 'void-chamber',
    label: 'Void Chamber',
    colors: ['000000', '0d0d0d', '1a1a1a', '262626', '333333', '404040'],
    gradientType: 'voidDistortion',
    animationDuration: '10s',
    description: 'Void chamber -- mysterious abyss of absolute-zero space',
  },
  'astral-projection': {
    name: 'astral-projection',
    label: 'Astral Projection',
    colors: ['e6e6fa', 'dda0dd', 'da70d6', 'ba55d3', '9370db', '8a2be2'],
    gradientType: 'astralPlane',
    animationDuration: '7s',
    description: 'Astral projection -- consciousness traveling beyond the physical body',
  },
};
