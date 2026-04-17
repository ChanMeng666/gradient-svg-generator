/*
 * MIT License - Merged Tech Templates
 *
 * Union of the four previously-separate tech-adjacent categories:
 *   - "classic tech"       (neural-network, quantum-field, cyber-matrix, ...
 *                           12 entries, generic gradientTypes)
 *   - "futureTech"         (hologram-matrix, laser-grid, plasma-core,
 *                           data-stream -- 3 entries after collision drop;
 *                           uses hologram/laserGrid/plasma generators)
 *   - "cyberAesthetics"    (neon-grid-city, data-stream-flow, ...
 *                           9 entries, cyber-punk-noir aesthetic)
 *   - "digitalLife"        (ai-consciousness, bio-digital-merge, ...
 *                           8 entries, bio-digital/neural visualization)
 *
 * Three collisions existed between classic tech and futureTech -- the
 * keys 'data-stream', 'neural-network', 'quantum-field' appear in both.
 * Today the "tech" category wins (earlier position in CATEGORY_REGISTRY).
 * The futureTech versions have been dropped from this merge to preserve
 * the public contract -- /api/svg?template=<name> continues to return
 * the previously-winning variant unchanged.
 *
 * Copyright (c) 2025 ChanMeng666
 */

module.exports = {
  // --- formerly techTemplates (classic tech) --------------------------------
  'neural-network': {
    name: 'neural-network',
    label: 'Neural Network',
    colors: ['1e3c72', '2a5298', '00b4db', '0083b0'],
    gradientType: 'spiral',
    animationDuration: '10s',
    description: 'AI neural network patterns',
  },
  'quantum-field': {
    name: 'quantum-field',
    label: 'Quantum Field',
    colors: ['667eea', '764ba2', 'f093fb', 'f5576c'],
    gradientType: 'pulse',
    animationDuration: '6s',
    description: 'Quantum energy field',
  },
  'cyber-matrix': {
    name: 'cyber-matrix',
    label: 'Cyber Matrix',
    colors: ['000000', '0f4c75', '3282b8', '00ff41'],
    gradientType: 'conic',
    animationDuration: '8s',
    description: 'Digital matrix code flow',
  },
  'hologram-blue': {
    name: 'hologram-blue',
    label: 'Hologram Blue',
    colors: ['74b9ff', '0984e3', '6c5ce7', 'a29bfe'],
    gradientType: 'diamond',
    animationDuration: '7s',
    description: 'Futuristic hologram effect',
  },
  'laser-beam': {
    name: 'laser-beam',
    label: 'Laser Beam',
    colors: ['ff0844', 'ffb199', '00ff88', '00a8ff'],
    gradientType: 'burst',
    animationDuration: '4s',
    description: 'High-energy laser beam',
  },
  'data-stream': {
    name: 'data-stream',
    label: 'Data Stream',
    colors: ['1dd1a1', '55efc4', '00b894', '00cec9'],
    gradientType: 'wave',
    animationDuration: '9s',
    description: 'Flowing data streams',
  },
  'circuit-board': {
    name: 'circuit-board',
    label: 'Circuit Board',
    colors: ['2d3436', '636e72', '00b894', '00cec9', '81ecec'],
    gradientType: 'horizontal',
    animationDuration: '8s',
    description: 'Electronic circuit patterns',
  },
  'plasma-field': {
    name: 'plasma-field',
    label: 'Plasma Field',
    colors: ['6c5ce7', 'a29bfe', 'fd79a8', 'fdcb6e'],
    gradientType: 'radial',
    animationDuration: '6s',
    description: 'Energetic plasma discharge',
  },
  'space-station': {
    name: 'space-station',
    label: 'Space Station',
    colors: ['2c3e50', '3498db', '9b59b6', 'e74c3c'],
    gradientType: 'diagonal',
    animationDuration: '12s',
    description: 'Orbital space station',
  },
  'synthetic-dream': {
    name: 'synthetic-dream',
    label: 'Synthetic Dream',
    colors: ['ee5a52', 'f39c12', 'f1c40f', '2ecc71', '3498db'],
    gradientType: 'spiral',
    animationDuration: '11s',
    description: 'AI-generated dreams',
  },
  'digital-rain': {
    name: 'digital-rain',
    label: 'Digital Rain',
    colors: ['000000', '003d00', '00ff00', '66ff66'],
    gradientType: 'vertical',
    animationDuration: '5s',
    description: 'Cascading digital code',
  },
  'cyber-glow': {
    name: 'cyber-glow',
    label: 'Cyber Glow',
    colors: ['ff006e', 'ff6d00', 'ffb700', '8338ec'],
    gradientType: 'pulse',
    animationDuration: '7s',
    description: 'Cyberpunk neon glow',
  },

  // --- formerly futureTech/templates.js -------------------------------------
  // Note: data-stream, neural-network, quantum-field dropped -- the classic
  // tech versions above already won in registry lookup and are preserved.
  'hologram-matrix': {
    name: 'hologram-matrix',
    label: 'Hologram Matrix',
    colors: ['00ffff', '0080ff', '4040ff', '8000ff'],
    gradientType: 'hologram',
    animationDuration: '3s',
    description: 'Futuristic holographic projection effect with matrix-like data streams',
  },
  'laser-grid': {
    name: 'laser-grid',
    label: 'Laser Grid',
    colors: ['ff0080', 'ff00ff', '8000ff', '0080ff'],
    gradientType: 'laserGrid',
    animationDuration: '2.5s',
    description: 'Cyberpunk laser grid with scanning beams and neon intersections',
  },
  'plasma-core': {
    name: 'plasma-core',
    label: 'Plasma Core',
    colors: ['ff4080', 'ff0040', 'ff8040', 'ffff80'],
    gradientType: 'plasma',
    animationDuration: '3.5s',
    description: 'High-energy plasma core with electromagnetic field distortions',
  },

  // --- formerly cyberAestheticsTemplates ------------------------------------
  'neon-grid-city': {
    name: 'neon-grid-city',
    label: 'Neon Grid City',
    colors: ['ff0080', '00ff80', '8000ff', 'ff8000', '0080ff', 'ff0040'],
    gradientType: 'neonCityscape',
    animationDuration: '4s',
    description: 'Neon grid city -- cyberpunk urban light maze',
  },
  'data-stream-flow': {
    name: 'data-stream-flow',
    label: 'Data Stream Flow',
    colors: ['00ff00', '00cc00', '009900', '006600', '003300', '001100'],
    gradientType: 'dataMatrix',
    animationDuration: '2s',
    description: 'Data stream waterfall -- information flood visualization',
  },
  'cyber-punk-noir': {
    name: 'cyber-punk-noir',
    label: 'Cyber Punk Noir',
    colors: ['000000', '330033', '660066', '990099', 'cc00cc', 'ff00ff'],
    gradientType: 'cyberpunkShadow',
    animationDuration: '6s',
    description: 'Cyberpunk noir -- dark aesthetic of future cities',
  },
  'hologram-interface': {
    name: 'hologram-interface',
    label: 'Hologram Interface',
    colors: ['00ffff', '40e0d0', '87ceeb', 'add8e6', 'b0e0e6', 'f0f8ff'],
    gradientType: 'holographicUI',
    animationDuration: '3s',
    description: 'Hologram interface -- transparent display interaction',
  },
  'digital-decay': {
    name: 'digital-decay',
    label: 'Digital Decay',
    colors: ['ff0000', 'cc0000', '990000', '660000', '330000', '000000'],
    gradientType: 'pixelCorruption',
    animationDuration: '5s',
    description: 'Digital decay -- entropy and corruption in virtual worlds',
  },
  'chrome-reflection': {
    name: 'chrome-reflection',
    label: 'Chrome Reflection',
    colors: ['ffffff', 'e6e6e6', 'cccccc', 'b3b3b3', '999999', '808080'],
    gradientType: 'chromeFinish',
    animationDuration: '8s',
    description: 'Chrome reflection -- metallic future-industrial aesthetic',
  },
  'virus-infection': {
    name: 'virus-infection',
    label: 'Virus Infection',
    colors: ['ff4000', 'ff6600', 'ff9900', 'ffcc00', 'ffff00', 'ccff00'],
    gradientType: 'viralSpread',
    animationDuration: '2.5s',
    description: 'Virus infection -- malicious code propagation and mutation',
  },
  'quantum-encryption': {
    name: 'quantum-encryption',
    label: 'Quantum Encryption',
    colors: ['0000ff', '4000ff', '8000ff', 'bf00ff', 'ff00ff', 'ff00bf'],
    gradientType: 'encryptionField',
    animationDuration: '7s',
    description: 'Quantum encryption -- unbreakable information protection layer',
  },
  'augmented-reality': {
    name: 'augmented-reality',
    label: 'Augmented Reality',
    colors: ['ff8000', 'ffaa00', 'ffcc00', 'ffff00', 'ccff00', '99ff00'],
    gradientType: 'arOverlay',
    animationDuration: '4.5s',
    description: 'Augmented reality -- virtual and real perception fusion',
  },

  // --- formerly digitalLifeTemplates ----------------------------------------
  'ai-consciousness': {
    name: 'ai-consciousness',
    label: 'AI Consciousness',
    colors: ['00ff80', '40ff40', '80ff80', '00ff00'],
    gradientType: 'aiConsciousness',
    animationDuration: '8s',
    description: 'Artificial intelligence awakening with neural network consciousness patterns',
  },
  'bio-digital-merge': {
    name: 'bio-digital-merge',
    label: 'Bio Digital Merge',
    colors: ['00ff40', '40ff60', '60ff80', '80ffa0'],
    gradientType: 'bioDigitalMerge',
    animationDuration: '6s',
    description: 'Biological and digital life forms merging into hybrid existence',
  },
  'quantum-dna': {
    name: 'quantum-dna',
    label: 'Quantum DNA',
    colors: ['20ff60', '40ff80', '60ffa0', '80ffc0'],
    gradientType: 'quantumDNA',
    animationDuration: '12s',
    description: 'Quantum-enhanced DNA helixes with probability wave functions',
  },
  'digital-evolution': {
    name: 'digital-evolution',
    label: 'Digital Evolution',
    colors: ['40ff80', '60ffa0', '80ffc0', 'a0ffe0'],
    gradientType: 'digitalEvolution',
    animationDuration: '10s',
    description: 'Evolutionary algorithms creating adaptive digital organisms',
  },
  'synthetic-soul': {
    name: 'synthetic-soul',
    label: 'Synthetic Soul',
    colors: ['60ffa0', '80ffc0', 'a0ffe0', 'c0fff0'],
    gradientType: 'syntheticSoul',
    animationDuration: '9s',
    description: 'Artificially generated consciousness with emotional authenticity',
  },
  'cyber-symbiosis': {
    name: 'cyber-symbiosis',
    label: 'Cyber Symbiosis',
    colors: ['80ffc0', 'a0ffe0', 'c0fff0', 'e0fff8'],
    gradientType: 'cyberSymbiosis',
    animationDuration: '7s',
    description: 'Symbiotic relationship between human and digital consciousness',
  },
  'neural-storm': {
    name: 'neural-storm',
    label: 'Neural Storm',
    colors: ['a0ffe0', 'c0fff0', 'e0fff8', 'f0fffc'],
    gradientType: 'neuralStorm',
    animationDuration: '4s',
    description: 'Intense neural network activity with synaptic lightning storms',
  },
  'digital-genome': {
    name: 'digital-genome',
    label: 'Digital Genome',
    colors: ['c0fff0', 'e0fff8', 'f0fffc', 'ffffff'],
    gradientType: 'digitalGenome',
    animationDuration: '11s',
    description: 'Complete digital genetic code with information-based heredity',
  },
};
