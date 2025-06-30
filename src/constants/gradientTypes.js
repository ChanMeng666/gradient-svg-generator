export const GRADIENT_TYPES = [
  // 基础渐变类型
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'vertical', label: 'Vertical' },
  { value: 'diagonal', label: 'Diagonal' },
  { value: 'circular', label: 'Circular' },
  { value: 'radial', label: 'Radial' },
  { value: 'conic', label: 'Conic' },
  { value: 'wave', label: 'Wave' },
  { value: 'spiral', label: 'Spiral' },
  { value: 'diamond', label: 'Diamond' },
  { value: 'burst', label: 'Burst' },
  { value: 'reflection', label: 'Reflection' },
  { value: 'pulse', label: 'Pulse' },
  { value: 'star', label: 'Star' },
  { value: 'heart', label: 'Heart' },
  { value: 'zigzag', label: 'ZigZag' },
  { value: 'ripple', label: 'Ripple' },
  { value: 'galaxy', label: 'Galaxy' },
  { value: 'lightning', label: 'Lightning' },
  // 新增形状类型 - 来自 capsule-render
  { value: 'ellipse', label: 'Ellipse' },
  { value: 'square', label: 'Square' },
  // 新增动画效果类型 - 来自 svg-banners
  { value: 'glitch', label: 'Glitch Effect' },
  { value: 'typewriter', label: 'Typewriter' },
  { value: 'luminance', label: 'Luminance Glow' },
  { value: 'rainbow', label: 'Rainbow Wave' },
  { value: 'textBox', label: 'Text Box' },
  { value: 'rainbowLayer', label: 'Rainbow Layer' },

  // Future Tech gradients
  { value: 'hologram', label: 'Hologram' },
  { value: 'quantum', label: 'Quantum' },
  { value: 'laserGrid', label: 'Laser Grid' },
  { value: 'neuralNet', label: 'Neural Net' },
  { value: 'plasma', label: 'Plasma' },
  { value: 'dataStream', label: 'Data Stream' },

  // Artistic gradients
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'oilPaint', label: 'Oil Paint' },
  { value: 'inkSplash', label: 'Ink Splash' },
  { value: 'mosaic', label: 'Mosaic' },
  { value: 'abstractGeo', label: 'Abstract Geo' },
  { value: 'graffiti', label: 'Graffiti' },
  { value: 'vintage', label: 'Vintage' },

  // Luxury gradients
  { value: 'goldFoil', label: 'Gold Foil' },
  { value: 'marble', label: 'Marble' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'roseGold', label: 'Rose Gold' },
  { value: 'crystal', label: 'Crystal' },
  { value: 'velvet', label: 'Velvet' },

  // Organic gradients
  { value: 'flowingWater', label: 'Flowing Water' },
  { value: 'flame', label: 'Flame' },
  { value: 'clouds', label: 'Clouds' },
  { value: 'aurora', label: 'Aurora' },
  { value: 'oceanWaves', label: 'Ocean Waves' },
  { value: 'forest', label: 'Forest' },
  { value: 'mountainMist', label: 'Mountain Mist' },

  // Gaming gradients
  { value: 'pixelArt', label: 'Pixel Art' },
  { value: 'neonArcade', label: 'Neon Arcade' },
  { value: 'energyBlast', label: 'Energy Blast' },
  { value: 'speedLines', label: 'Speed Lines' },
  { value: 'bossBattle', label: 'Boss Battle' },
  { value: 'powerUp', label: 'Power Up' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'retroWave', label: 'Retro Wave' },

  // Morphing gradients
  { value: 'liquidMorphing', label: 'Liquid Morphing' },
  { value: 'plasmaMorphing', label: 'Plasma Morphing' },
  { value: 'cosmicMorphing', label: 'Cosmic Morphing' },
  { value: 'bioMorphing', label: 'Bio Morphing' },
  { value: 'quantumMorphing', label: 'Quantum Morphing' },
  { value: 'lavaMorphing', label: 'Lava Morphing' },

  // Fluid dynamics gradients
  { value: 'turbulentWaves', label: 'Turbulent Waves' },
  { value: 'electromagneticWaves', label: 'Electromagnetic Waves' },
  { value: 'auroraWaves', label: 'Aurora Waves' },
  { value: 'soundWaves', label: 'Sound Waves' },
  { value: 'cryogenicWaves', label: 'Cryogenic Waves' },
  { value: 'solarWaves', label: 'Solar Waves' },

  // Dimensional gradients
  { value: 'portalDistortion', label: 'Portal Distortion' },
  { value: 'hypercubeProjection', label: 'Hypercube Projection' },
  { value: 'wormholeEffect', label: 'Wormhole Effect' },
  { value: 'fractalDimension', label: 'Fractal Dimension' },
  { value: 'multiverseOverlap', label: 'Multiverse Overlap' },
  { value: 'realityDistortion', label: 'Reality Distortion' },

  // Dimensional Portal gradients
  { value: 'quantumTunnel', label: 'Quantum Tunnel' },
  { value: 'parallelDimension', label: 'Parallel Dimension' },
  { value: 'wormholePortal', label: 'Wormhole Portal' },
  { value: 'dimensionalTear', label: 'Dimensional Tear' },
  { value: 'holographicGrid', label: 'Holographic Grid' },
  { value: 'voidDistortion', label: 'Void Distortion' },
  { value: 'realityGlitch', label: 'Reality Glitch' },
  { value: 'astralPlane', label: 'Astral Plane' },

  // Digital Life gradients
  { value: 'aiConsciousness', label: 'AI Consciousness' },
  { value: 'bioDigitalMerge', label: 'Bio Digital Merge' },
  { value: 'quantumDNA', label: 'Quantum DNA' },
  { value: 'digitalEvolution', label: 'Digital Evolution' },
  { value: 'syntheticSoul', label: 'Synthetic Soul' },
  { value: 'cyberSymbiosis', label: 'Cyber Symbiosis' },
  { value: 'neuralStorm', label: 'Neural Storm' },
  { value: 'digitalGenome', label: 'Digital Genome' },

  // Cyber Aesthetics gradients
  { value: 'neonCityscape', label: 'Neon Cityscape' },
  { value: 'dataMatrix', label: 'Data Matrix' },
  { value: 'cyberpunkShadow', label: 'Cyberpunk Shadow' },
  { value: 'holographicUI', label: 'Holographic UI' },
  { value: 'pixelCorruption', label: 'Pixel Corruption' },
  { value: 'chromeFinish', label: 'Chrome Finish' },
  { value: 'viralSpread', label: 'Viral Spread' },
  { value: 'encryptionField', label: 'Encryption Field' },
  { value: 'arOverlay', label: 'AR Overlay' },

  // Consciousness Stream gradients
  { value: 'thoughtWaves', label: 'Thought Waves' },
  { value: 'memoryFragments', label: 'Memory Fragments' },
  { value: 'dreamLogic', label: 'Dream Logic' },
  { value: 'emotionalSpectrum', label: 'Emotional Spectrum' },
  { value: 'meditativeCalm', label: 'Meditative Calm' },
  { value: 'anxietySpiral', label: 'Anxiety Spiral' },
  { value: 'egoDissolution', label: 'Ego Dissolution' },
  { value: 'psychedelicInsight', label: 'Psychedelic Insight' },
  { value: 'collectiveUnconscious', label: 'Collective Unconscious' }
]; 