/*
 * MIT License - Merged Specialty Templates
 *
 * Grab-bag of misc categories that didn't fit the plan's major buckets
 * (art/nature/tech/fluids). Union of four previously-separate sources:
 *   - "capsuleShape" (24 unique entries after ocean-depths drop --
 *                     blob/wave/blur/shape-background effects)
 *   - "textEffects"  (11 entries -- rainbow, luminance, glitch,
 *                     typewriter, border-draw)
 *   - "morphing"     (6 entries -- liquid-mercury, plasma-blob,
 *                     cosmic-entity, bio-organism, quantum-foam,
 *                     molten-lava)
 *   - "consciousness"(9 entries -- thought-waves, memory-fragments,
 *                     dream-logic, etc.)
 *
 * Collision handled: capsuleShape's 'ocean-depths' collided with
 * nature/templates.js:ocean-depths. Nature wins the lookup order, so
 * capsuleShape's ocean-depths was already shadowed; dropped here.
 *
 * Most effects consumed by these templates are registered by the
 * grab-bag features/advanced/effect.js manifest (morphing, consciousness)
 * or by features/effects/ (luminance, textBox, glitch, typewriter) --
 * no new effect manifest is created for specialty.
 *
 * Copyright (c) 2025 ChanMeng666
 */

module.exports = {
  // 🌟 Blob Morphing Templates (inspired by Venom effect)
  'liquid-venom': {
    name: 'liquid-venom',
    label: 'Liquid Venom',
    colors: ['8871e5', 'b678c4'],
    gradientType: 'blobMorph',
    animationDuration: '10s',
    description: 'Organic liquid blob morphing - inspired by Venom',
  },

  'mercury-flow': {
    name: 'mercury-flow',
    label: 'Mercury Flow',
    colors: ['C0C0C0', 'A8A8A8', 'D3D3D3'],
    gradientType: 'liquidBlob',
    animationDuration: '12s',
    description: 'Multi-layer liquid blob with metallic sheen',
  },

  'organic-plasma': {
    name: 'organic-plasma',
    label: 'Organic Plasma',
    colors: ['FF6B6B', 'FFA07A', 'FF69B4'],
    gradientType: 'organicBlob',
    animationDuration: '15s',
    description: 'Radial blob with organic glow effect',
  },

  // 🌟 Layered Wave Templates (inspired by Waving effect)
  // Note: 'ocean-depths' dropped -- already shadowed by nature/templates.js
  'aurora-waves': {
    name: 'aurora-waves',
    label: 'Aurora Waves',
    colors: ['00FF87', '60EFFF', 'B967FF'],
    gradientType: 'layeredWaves',
    animationDuration: '15s',
    description: 'Northern lights wave layers',
  },

  // 🌟 Blur Motion Templates (inspired by Blur effect)
  'dreamy-sunset': {
    name: 'dreamy-sunset',
    label: 'Dreamy Sunset',
    colors: ['FF6B6B', 'FFB347', 'FFA07A'],
    gradientType: 'blurMotion',
    animationDuration: '12s',
    description: 'Soft floating circles with sunset colors',
  },

  'pastel-dream': {
    name: 'pastel-dream',
    label: 'Pastel Dream',
    colors: ['FFB6C1', 'E0BBE4', 'C3E5AE'],
    gradientType: 'dreamyCircles',
    animationDuration: '15s',
    description: 'Multiple dreamy pastel circles',
  },

  'abstract-night': {
    name: 'abstract-night',
    label: 'Abstract Night',
    colors: ['2C3E50', '34495E', '1ABC9C'],
    gradientType: 'abstractBlur',
    animationDuration: '20s',
    description: 'Minimalist abstract blur effect',
  },

  'ethereal-mist': {
    name: 'ethereal-mist',
    label: 'Ethereal Mist',
    colors: ['DDA0DD', 'E6E6FA', 'B0C4DE'],
    gradientType: 'blurMotion',
    animationDuration: '18s',
    description: 'Soft misty atmosphere with blur',
  },

  // 🌟 Combined Effects
  'morphing-ocean': {
    name: 'morphing-ocean',
    label: 'Morphing Ocean',
    colors: ['0088CC', '00BFFF', '87CEEB'],
    gradientType: 'liquidBlob',
    animationDuration: '14s',
    description: 'Ocean-themed liquid morphing',
  },

  'sunset-blob': {
    name: 'sunset-blob',
    label: 'Sunset Blob',
    colors: ['FF4500', 'FF6347', 'FFD700'],
    gradientType: 'organicBlob',
    animationDuration: '16s',
    description: 'Warm sunset colors with organic morphing',
  },

  'neon-pulse': {
    name: 'neon-pulse',
    label: 'Neon Pulse',
    colors: ['FF00FF', '00FFFF', 'FFFF00'],
    gradientType: 'blobMorph',
    animationDuration: '8s',
    description: 'Vibrant neon blob morphing',
  },

  'cosmic-waves': {
    name: 'cosmic-waves',
    label: 'Cosmic Waves',
    colors: ['4B0082', '8A2BE2', 'DA70D6'],
    gradientType: 'layeredWaves',
    animationDuration: '18s',
    description: 'Deep space wave layers',
  },

  'soft-lavender': {
    name: 'soft-lavender',
    label: 'Soft Lavender',
    colors: ['E6E6FA', 'D8BFD8', 'DDA0DD'],
    gradientType: 'dreamyCircles',
    animationDuration: '16s',
    description: 'Gentle lavender blur circles',
  },

  'fire-morph': {
    name: 'fire-morph',
    label: 'Fire Morph',
    colors: ['FF4500', 'FF6347', 'FFA500'],
    gradientType: 'liquidBlob',
    animationDuration: '10s',
    description: 'Fiery liquid morphing effect',
  },

  // 🌟 NEW: Shape Background Templates (inspired by capsule-render shape types)
  'capsule-tech': {
    name: 'capsule-tech',
    label: 'Capsule Tech',
    colors: ['00D9FF', '00B8D4', '0097A7'],
    gradientType: 'cylinder',
    animationDuration: '8s',
    description: 'Tech-themed cylinder/capsule shape',
  },

  'soft-modern': {
    name: 'soft-modern',
    label: 'Soft Modern',
    colors: ['E0BBE4', 'D5AAD6', 'C399C8'],
    gradientType: 'softRounded',
    animationDuration: '10s',
    description: 'Modern soft rounded corners',
  },

  'organic-egg': {
    name: 'organic-egg',
    label: 'Organic Egg',
    colors: ['FFF8E1', 'FFECB3', 'FFE082'],
    gradientType: 'eggShape',
    animationDuration: '12s',
    description: 'Organic egg/oval shape',
  },

  'dynamic-slice': {
    name: 'dynamic-slice',
    label: 'Dynamic Slice',
    colors: ['FF6B6B', 'FF8E53', 'FFB84D'],
    gradientType: 'sliceShape',
    animationDuration: '6s',
    description: 'Angular diagonal slice design',
  },

  'chat-bubble': {
    name: 'chat-bubble',
    label: 'Chat Bubble',
    colors: ['4CAF50', '66BB6A', '81C784'],
    gradientType: 'speechBubble',
    animationDuration: '10s',
    description: 'Speech/chat bubble with tail',
  },

  'energy-teeth': {
    name: 'energy-teeth',
    label: 'Energy Teeth',
    colors: ['9C27B0', 'BA68C8', 'CE93D8'],
    gradientType: 'sharkTeeth',
    animationDuration: '8s',
    description: 'Sharp shark teeth zigzag bottom',
  },

  'bold-rounded': {
    name: 'bold-rounded',
    label: 'Bold Rounded',
    colors: ['2196F3', '42A5F5', '64B5F6'],
    gradientType: 'largeRounded',
    animationDuration: '10s',
    description: 'Bold large rounded corners',
  },

  'cyber-capsule': {
    name: 'cyber-capsule',
    label: 'Cyber Capsule',
    colors: ['00FFFF', '00E5FF', '00B8D4'],
    gradientType: 'cylinder',
    animationDuration: '6s',
    description: 'Cyberpunk capsule design',
  },

  'golden-egg': {
    name: 'golden-egg',
    label: 'Golden Egg',
    colors: ['FFD700', 'FFC107', 'FFB300'],
    gradientType: 'eggShape',
    animationDuration: '14s',
    description: 'Luxurious golden egg shape',
  },

  'message-box': {
    name: 'message-box',
    label: 'Message Box',
    colors: ['2979FF', '448AFF', '82B1FF'],
    gradientType: 'speechBubble',
    animationDuration: '12s',
    description: 'Messenger-style bubble box',
  },

  // --- formerly textEffectTemplates -----------------------------------------
  'rainbow-layer': {
    name: 'rainbow-layer',
    label: 'Rainbow Layer',
    colors: ['DEBF40', '5ACB3C', '44A3F7', 'CF52EB', 'D14B3D', 'D49C3D', 'ffffff'],
    gradientType: 'rainbowLayer',
    animationDuration: '1.5s',
    description: 'Multi-layered rainbow text with wave animation - inspired by svg-banners',
  },
  'luminance-glow': {
    name: 'luminance-glow',
    label: 'Luminance Glow',
    colors: ['ffffff', 'cccccc', '999999'],
    gradientType: 'luminance',
    animationDuration: '3s',
    description: 'Text with luminous glow effect that reveals gradually',
  },
  'rainbow-wave': {
    name: 'rainbow-wave',
    label: 'Rainbow Wave',
    colors: [
      'ff0000',
      'ff8000',
      'ffff00',
      '80ff00',
      '00ff00',
      '00ff80',
      '00ffff',
      '0080ff',
      '0000ff',
      '8000ff',
      'ff00ff',
      'ff0080',
    ],
    gradientType: 'rainbow',
    animationDuration: '1.5s',
    description: 'Multi-colored text with rainbow wave animation',
  },
  'border-draw': {
    name: 'border-draw',
    label: 'Border Draw',
    colors: ['19f6e8', '00bfff', '40e0d0'],
    gradientType: 'textBox',
    animationDuration: '1s',
    description: 'Text with animated border drawing effect',
  },
  'glitch-cyber': {
    name: 'glitch-cyber',
    label: 'Glitch Cyber',
    colors: ['ffffff', '67f3da', 'f16f6f'],
    gradientType: 'glitch',
    animationDuration: '2.5s',
    description: 'Cyberpunk glitch effect with color separation',
  },
  'typewriter-terminal': {
    name: 'typewriter-terminal',
    label: 'Typewriter Terminal',
    colors: ['00ff00', '00cc00', '009900'],
    gradientType: 'typewriter',
    animationDuration: '4s',
    description: 'Terminal-style typewriter effect with gradient',
  },
  'neon-luminance': {
    name: 'neon-luminance',
    label: 'Neon Luminance',
    colors: ['ff00ff', '00ffff', 'ffffff'],
    gradientType: 'luminance',
    animationDuration: '2.5s',
    description: 'Neon colors with luminous glow effect',
  },
  'fire-luminance': {
    name: 'fire-luminance',
    label: 'Fire Luminance',
    colors: ['ff4500', 'ff8c00', 'ffd700', 'ffffff'],
    gradientType: 'luminance',
    animationDuration: '3.5s',
    description: 'Fire-like colors with luminous glow',
  },
  'ocean-rainbow': {
    name: 'ocean-rainbow',
    label: 'Ocean Rainbow',
    colors: ['0066cc', '0099ff', '00ccff', '66ffff', '99ffff', 'ccffff'],
    gradientType: 'rainbow',
    animationDuration: '2s',
    description: 'Ocean-themed rainbow wave effect',
  },
  'luminance-reveal': {
    name: 'luminance-reveal',
    label: 'Luminance Reveal',
    colors: ['ffd700', 'ffff00', 'ffa500', 'ffffff'],
    gradientType: 'luminanceEnhanced',
    animationDuration: '4s',
    description: 'Luminance with background-clip text reveal and letter-spacing animation',
  },
  'aurora-luminance': {
    name: 'aurora-luminance',
    label: 'Aurora Luminance',
    colors: ['00ffaa', '00ffff', '66ccff', '9966ff', 'ffffff'],
    gradientType: 'luminanceEnhanced',
    animationDuration: '4s',
    description: 'Aurora borealis-inspired luminance reveal with gradient text',
  },

  // --- formerly morphingTemplates -------------------------------------------
  'liquid-mercury': {
    name: 'liquid-mercury',
    label: 'Liquid Mercury',
    colors: ['c0c0c0', 'e8e8e8', 'a0a0a0', 'f0f0f0'],
    gradientType: 'liquidMorphing',
    animationDuration: '8s',
    description: 'Liquid mercury droplet with organic morphing and metallic reflections',
  },
  'plasma-blob': {
    name: 'plasma-blob',
    label: 'Plasma Blob',
    colors: ['ff00ff', 'ff0080', '8000ff', 'ff4080'],
    gradientType: 'plasmaMorphing',
    animationDuration: '6s',
    description: 'Electric plasma blob with high-energy morphing and neon glow effects',
  },
  'cosmic-entity': {
    name: 'cosmic-entity',
    label: 'Cosmic Entity',
    colors: ['000033', '000066', '330066', '660099'],
    gradientType: 'cosmicMorphing',
    animationDuration: '12s',
    description: 'Cosmic entity transformation with deep space colors and stellar morphing',
  },
  'bio-organism': {
    name: 'bio-organism',
    label: 'Bio Organism',
    colors: ['00ff80', '40ff40', '80ff80', '00ff00'],
    gradientType: 'bioMorphing',
    animationDuration: '10s',
    description: 'Living organism simulation with biological growth patterns and cellular division',
  },
  'quantum-foam': {
    name: 'quantum-foam',
    label: 'Quantum Foam',
    colors: ['ffffff', 'e0e0ff', 'c0c0ff', 'a0a0ff'],
    gradientType: 'quantumMorphing',
    animationDuration: '4s',
    description:
      'Quantum foam visualization with probability cloud morphing and uncertainty principle',
  },
  'molten-lava': {
    name: 'molten-lava',
    label: 'Molten Lava',
    colors: ['ff4500', 'ff6600', 'ff8800', 'ffaa00'],
    gradientType: 'lavaMorphing',
    animationDuration: '7s',
    description: 'Molten lava flow with volcanic heat distortion and magma bubble formation',
  },

  // --- formerly consciousnessStreamTemplates --------------------------------
  'thought-waves': {
    name: 'thought-waves',
    label: 'Thought Waves',
    colors: ['e6e6fa', 'dda0dd', 'da70d6', 'ba55d3'],
    gradientType: 'thoughtWaves',
    animationDuration: '6s',
    description: 'Flowing thought patterns with cognitive wave interference and mental resonance',
  },
  'memory-fragments': {
    name: 'memory-fragments',
    label: 'Memory Fragments',
    colors: ['f0e6ff', 'e6ccff', 'dab3ff', 'cc99ff'],
    gradientType: 'memoryFragments',
    animationDuration: '8s',
    description: 'Fragmented memories floating through consciousness with temporal distortion',
  },
  'dream-logic': {
    name: 'dream-logic',
    label: 'Dream Logic',
    colors: ['f5f0ff', 'ebe0ff', 'e0ccff', 'd6b3ff'],
    gradientType: 'dreamLogic',
    animationDuration: '12s',
    description: 'Surreal dream logic with non-linear narrative flow and symbolic transformation',
  },
  'emotional-spectrum': {
    name: 'emotional-spectrum',
    label: 'Emotional Spectrum',
    colors: ['faf0ff', 'f0e0ff', 'e6d0ff', 'dcc0ff'],
    gradientType: 'emotionalSpectrum',
    animationDuration: '5s',
    description: 'Full emotional spectrum with mood transitions and affective resonance',
  },
  'meditative-calm': {
    name: 'meditative-calm',
    label: 'Meditative Calm',
    colors: ['fdf5ff', 'f8ebff', 'f2e0ff', 'edd6ff'],
    gradientType: 'meditativeCalm',
    animationDuration: '15s',
    description: 'Deep meditative state with inner peace and transcendent stillness',
  },
  'anxiety-spiral': {
    name: 'anxiety-spiral',
    label: 'Anxiety Spiral',
    colors: ['e8ccff', 'dab3ff', 'cc99ff', 'bd80ff'],
    gradientType: 'anxietySpiral',
    animationDuration: '3s',
    description: 'Anxious thought patterns with spiraling worry cycles and mental tension',
  },
  'ego-dissolution': {
    name: 'ego-dissolution',
    label: 'Ego Dissolution',
    colors: ['f0ccff', 'e6b3ff', 'dda0ff', 'd088ff'],
    gradientType: 'egoDissolution',
    animationDuration: '20s',
    description: 'Dissolution of ego boundaries with unity consciousness and self-transcendence',
  },
  'psychedelic-insight': {
    name: 'psychedelic-insight',
    label: 'Psychedelic Insight',
    colors: ['e0b3ff', 'd6a0ff', 'cc88ff', 'c270ff'],
    gradientType: 'psychedelicInsight',
    animationDuration: '9s',
    description: 'Expanded consciousness with psychedelic revelations and perceptual enhancement',
  },
  'collective-unconscious': {
    name: 'collective-unconscious',
    label: 'Collective Unconscious',
    colors: ['d6a0ff', 'cc88ff', 'c270ff', 'b857ff'],
    gradientType: 'collectiveUnconscious',
    animationDuration: '25s',
    description: 'Jungian collective unconscious with archetypal symbols and universal patterns',
  },
};
