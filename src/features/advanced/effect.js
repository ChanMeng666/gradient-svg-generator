/**
 * Advanced complex effects (morphing, fluid dynamics, dimensional,
 * dimensional portal, digital life, cyber aesthetics, consciousness).
 *
 * These effects don't have individual generator functions -- they all share
 * a wrapper that signals `useAdvancedEffect: true`, which routes through
 * advancedEffectGenerator in the SVG rendering pipeline.
 *
 * @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest
 */

/**
 * Factory that produces the shared wrapper generator for any advanced effect.
 * The wrapper returns a signal object that UnifiedGradientGenerator routes
 * to the advanced effect pipeline.
 *
 * @param {string} effectType
 */
function wrappedGenerator(effectType) {
  return function advancedEffectWrapper() {
    return { useAdvancedEffect: true, effectType };
  };
}

const ADVANCED_EFFECTS = [
  // Morphing
  {
    name: 'liquidMorphing',
    category: 'morphing',
    description: 'Liquid mercury morphing',
    templates: ['liquid-mercury'],
  },
  {
    name: 'plasmaMorphing',
    category: 'morphing',
    description: 'Plasma blob morphing',
    templates: ['plasma-blob'],
  },
  {
    name: 'cosmicMorphing',
    category: 'morphing',
    description: 'Cosmic entity morphing',
    templates: ['cosmic-entity'],
  },
  {
    name: 'bioMorphing',
    category: 'morphing',
    description: 'Biological morphing',
    templates: ['bio-organism'],
  },
  {
    name: 'quantumMorphing',
    category: 'morphing',
    description: 'Quantum foam morphing',
    templates: ['quantum-foam'],
  },
  {
    name: 'lavaMorphing',
    category: 'morphing',
    description: 'Molten lava morphing',
    templates: ['molten-lava'],
  },

  // Fluid Dynamics
  {
    name: 'turbulentWaves',
    category: 'fluidDynamics',
    description: 'Turbulent wave motion',
    templates: ['turbulent-waves'],
  },
  {
    name: 'electromagneticWaves',
    category: 'fluidDynamics',
    description: 'Electromagnetic field waves',
    templates: ['electromagnetic-field'],
  },
  {
    name: 'auroraWaves',
    category: 'fluidDynamics',
    description: 'Aurora wave streams',
    templates: ['aurora-streams'],
  },
  {
    name: 'soundWaves',
    category: 'fluidDynamics',
    description: 'Sound wave visualization',
    templates: ['sound-visualization'],
  },
  {
    name: 'cryogenicWaves',
    category: 'fluidDynamics',
    description: 'Cryogenic wave effect',
    templates: ['liquid-nitrogen'],
  },
  {
    name: 'solarWaves',
    category: 'fluidDynamics',
    description: 'Solar wind waves',
    templates: ['solar-wind'],
  },

  // Dimensional
  {
    name: 'portalDistortion',
    category: 'dimensional',
    description: 'Portal distortion effect',
    templates: ['portal-nexus'],
  },
  {
    name: 'hypercubeProjection',
    category: 'dimensional',
    description: 'Hypercube 4D projection',
    templates: ['tesseract-projection'],
  },
  {
    name: 'wormholeEffect',
    category: 'dimensional',
    description: 'Wormhole space-time effect',
    templates: ['wormhole-transit'],
  },
  {
    name: 'fractalDimension',
    category: 'dimensional',
    description: 'Fractal dimension visualization',
    templates: ['fractal-dimension'],
  },
  {
    name: 'multiverseOverlap',
    category: 'dimensional',
    description: 'Parallel universe overlap',
    templates: ['parallel-universe'],
  },
  {
    name: 'realityDistortion',
    category: 'dimensional',
    description: 'Reality distortion glitch',
    templates: ['reality-glitch'],
  },

  // Dimensional Portal
  {
    name: 'quantumTunnel',
    category: 'dimensionalPortal',
    description: 'Quantum tunnel passage',
    templates: ['quantum-tunnel'],
  },
  {
    name: 'parallelUniverse',
    category: 'dimensionalPortal',
    description: 'Parallel universe portal',
    templates: ['parallel-universe'],
  },
  {
    name: 'wormholeTransit',
    category: 'dimensionalPortal',
    description: 'Wormhole transit animation',
    templates: ['wormhole-transit'],
  },
  {
    name: 'dimensionalRift',
    category: 'dimensionalPortal',
    description: 'Dimensional rift opening',
    templates: ['dimensional-rift'],
  },
  {
    name: 'holographicMatrix',
    category: 'dimensionalPortal',
    description: 'Holographic matrix grid',
    templates: ['holographic-matrix'],
  },
  {
    name: 'voidChamber',
    category: 'dimensionalPortal',
    description: 'Void chamber darkness',
    templates: ['void-chamber'],
  },
  {
    name: 'realityGlitch',
    category: 'dimensionalPortal',
    description: 'Reality glitch effect',
    templates: ['reality-glitch'],
  },
  {
    name: 'astralProjection',
    category: 'dimensionalPortal',
    description: 'Astral projection effect',
    templates: ['astral-projection'],
  },

  // Digital Life
  {
    name: 'aiConsciousness',
    category: 'digitalLife',
    description: 'AI consciousness visualization',
    templates: ['ai-consciousness'],
  },
  {
    name: 'bioDigitalMerge',
    category: 'digitalLife',
    description: 'Bio-digital fusion effect',
    templates: ['bio-digital-merge'],
  },
  {
    name: 'quantumDNA',
    category: 'digitalLife',
    description: 'Quantum DNA helix',
    templates: ['quantum-dna'],
  },
  {
    name: 'digitalEvolution',
    category: 'digitalLife',
    description: 'Digital evolution process',
    templates: ['digital-evolution'],
  },
  {
    name: 'syntheticSoul',
    category: 'digitalLife',
    description: 'Synthetic soul visualization',
    templates: ['synthetic-soul'],
  },
  {
    name: 'cyberSymbiosis',
    category: 'digitalLife',
    description: 'Cyber symbiosis effect',
    templates: ['cyber-symbiosis'],
  },
  {
    name: 'neuralStorm',
    category: 'digitalLife',
    description: 'Neural storm activity',
    templates: ['neural-storm'],
  },
  {
    name: 'digitalGenome',
    category: 'digitalLife',
    description: 'Digital genome sequence',
    templates: ['digital-genome'],
  },

  // Cyber Aesthetics
  {
    name: 'neonGridCity',
    category: 'cyberAesthetics',
    description: 'Neon grid cityscape',
    templates: ['neon-grid-city'],
  },
  {
    name: 'dataStreamFlow',
    category: 'cyberAesthetics',
    description: 'Data stream matrix flow',
    templates: ['data-stream-flow'],
  },
  {
    name: 'cyberPunkNoir',
    category: 'cyberAesthetics',
    description: 'Cyberpunk noir atmosphere',
    templates: ['cyber-punk-noir'],
  },
  {
    name: 'hologramInterface',
    category: 'cyberAesthetics',
    description: 'Hologram UI interface',
    templates: ['hologram-interface'],
  },
  {
    name: 'digitalDecay',
    category: 'cyberAesthetics',
    description: 'Digital decay corruption',
    templates: ['digital-decay'],
  },
  {
    name: 'chromeReflection',
    category: 'cyberAesthetics',
    description: 'Chrome reflection finish',
    templates: ['chrome-reflection'],
  },
  {
    name: 'virusInfection',
    category: 'cyberAesthetics',
    description: 'Virus infection spread',
    templates: ['virus-infection'],
  },
  {
    name: 'quantumEncryption',
    category: 'cyberAesthetics',
    description: 'Quantum encryption field',
    templates: ['quantum-encryption'],
  },
  {
    name: 'augmentedReality',
    category: 'cyberAesthetics',
    description: 'Augmented reality overlay',
    templates: ['augmented-reality'],
  },

  // Consciousness Stream
  {
    name: 'thoughtWaves',
    category: 'consciousness',
    description: 'Thought wave patterns',
    templates: ['thought-waves'],
  },
  {
    name: 'memoryFragments',
    category: 'consciousness',
    description: 'Memory fragment visualization',
    templates: ['memory-fragments'],
  },
  {
    name: 'dreamLogic',
    category: 'consciousness',
    description: 'Dream logic surrealism',
    templates: ['dream-logic'],
  },
  {
    name: 'emotionalSpectrum',
    category: 'consciousness',
    description: 'Emotional spectrum colors',
    templates: ['emotional-spectrum'],
  },
  {
    name: 'meditativeCalm',
    category: 'consciousness',
    description: 'Meditative calm state',
    templates: ['meditative-calm'],
  },
  {
    name: 'anxietySpiral',
    category: 'consciousness',
    description: 'Anxiety spiral pattern',
    templates: ['anxiety-spiral'],
  },
  {
    name: 'egoDissolution',
    category: 'consciousness',
    description: 'Ego dissolution effect',
    templates: ['ego-dissolution'],
  },
  {
    name: 'psychedelicInsight',
    category: 'consciousness',
    description: 'Psychedelic insight visualization',
    templates: ['psychedelic-insight'],
  },
  {
    name: 'collectiveUnconscious',
    category: 'consciousness',
    description: 'Collective unconscious patterns',
    templates: ['collective-unconscious'],
  },
];

/** @type {EffectManifest} */
const manifest = {
  id: 'advanced',
  category: 'advanced',
  effects: ADVANCED_EFFECTS.map((e) => ({
    ...e,
    generator: wrappedGenerator(e.name),
    outputType: 'complete',
  })),
};

module.exports = { manifest };
