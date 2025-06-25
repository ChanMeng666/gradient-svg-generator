export const templateCategories = {
  textEffects: {
    label: 'Text Effects',
    templates: [
      {
        name: 'luminance-glow',
        label: 'Luminance Glow',
        colors: ['ffffff', 'cccccc', '999999'],
        gradientType: 'luminance',
        animationDuration: '3s',
        description: 'Text with luminous glow effect that reveals gradually'
      },
      {
        name: 'rainbow-wave',
        label: 'Rainbow Wave',
        colors: ['ff0000', 'ff8000', 'ffff00', '80ff00', '00ff00', '00ff80', '00ffff', '0080ff', '0000ff', '8000ff', 'ff00ff', 'ff0080'],
        gradientType: 'rainbow',
        animationDuration: '1.5s',
        description: 'Multi-colored text with rainbow wave animation'
      },
      {
        name: 'border-draw',
        label: 'Border Draw',
        colors: ['19f6e8', '00bfff', '40e0d0'],
        gradientType: 'textBox',
        animationDuration: '1s',
        description: 'Text with animated border drawing effect'
      },
      {
        name: 'glitch-cyber',
        label: 'Glitch Cyber',
        colors: ['ffffff', '67f3da', 'f16f6f'],
        gradientType: 'glitch',
        animationDuration: '2.5s',
        description: 'Cyberpunk glitch effect with color separation'
      },
      {
        name: 'typewriter-terminal',
        label: 'Typewriter Terminal',
        colors: ['00ff00', '00cc00', '009900'],
        gradientType: 'typewriter',
        animationDuration: '4s',
        description: 'Terminal-style typewriter effect with gradient'
      },
      {
        name: 'neon-luminance',
        label: 'Neon Luminance',
        colors: ['ff00ff', '00ffff', 'ffffff'],
        gradientType: 'luminance',
        animationDuration: '2.5s',
        description: 'Neon colors with luminous glow effect'
      },
      {
        name: 'fire-luminance',
        label: 'Fire Luminance',
        colors: ['ff4500', 'ff8c00', 'ffd700', 'ffffff'],
        gradientType: 'luminance',
        animationDuration: '3.5s',
        description: 'Fire-like colors with luminous glow'
      },
      {
        name: 'ocean-rainbow',
        label: 'Ocean Rainbow',
        colors: ['0066cc', '0099ff', '00ccff', '66ffff', '99ffff', 'ccffff'],
        gradientType: 'rainbow',
        animationDuration: '2s',
        description: 'Ocean-themed rainbow wave effect'
      }
    ]
  },
  basic: {
    label: 'Basic Templates',
    templates: [
      {
        name: 'sunset-gold',
        label: 'Sunset Gold',
        colors: ['ffd700', 'ff8c00', 'ff4500'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Warm golden sunset gradient'
      },
      {
        name: 'ocean-heart',
        label: 'Ocean Heart',
        colors: ['00ffff', '0080ff', '0000ff'],
        gradientType: 'vertical',
        animationDuration: '8s',
        description: 'Deep ocean blue gradient'
      },
      {
        name: 'emerald-forest',
        label: 'Emerald Forest',
        colors: ['50c878', '228b22', '006400'],
        gradientType: 'diagonal',
        animationDuration: '7s',
        description: 'Rich emerald green gradient'
      },
      {
        name: 'violet-dream',
        label: 'Violet Dream',
        colors: ['9400d3', '8a2be2', '4b0082'],
        gradientType: 'circular',
        animationDuration: '10s',
        description: 'Mystical violet gradient'
      },
      {
        name: 'neon-city',
        label: 'Neon City',
        colors: ['ff1493', 'ff00ff', '00ffff'],
        gradientType: 'horizontal',
        animationDuration: '5s',
        description: 'Vibrant neon gradient'
      },
      {
        name: 'cyber-punk',
        label: 'Cyber Punk',
        colors: ['ff00ff', '00ffff', 'ff00cc'],
        gradientType: 'diagonal',
        animationDuration: '8s',
        description: 'Vibrant cyberpunk-inspired gradient'
      },
      {
        name: 'northern-lights',
        label: 'Northern Lights',
        colors: ['9400d3', '4b0082', '00ff00', '00ffff'],
        gradientType: 'vertical',
        animationDuration: '10s',
        description: 'Aurora borealis inspired colors'
      },
      {
        name: 'cotton-candy',
        label: 'Cotton Candy',
        colors: ['ff99cc', 'ff99ff', '99ccff'],
        gradientType: 'circular',
        animationDuration: '7s',
        description: 'Sweet pastel gradient blend'
      },
      {
        name: 'midnight-galaxy',
        label: 'Midnight Galaxy',
        colors: ['000033', '4b0082', '800080', '000066'],
        gradientType: 'radial',
        animationDuration: '12s',
        description: 'Deep space inspired colors'
      },
      {
        name: 'tropical-paradise',
        label: 'Tropical Paradise',
        colors: ['00ff99', '33ccff', '00ffcc'],
        gradientType: 'diagonal',
        animationDuration: '8s',
        description: 'Fresh tropical ocean colors'
      },
      {
        name: 'desert-dusk',
        label: 'Desert Dusk',
        colors: ['ff9966', 'ff6699', 'cc6699'],
        gradientType: 'horizontal',
        animationDuration: '9s',
        description: 'Warm desert sunset colors'
      }
    ]
  },
  nature: {
    label: 'Nature',
    templates: [
      {
        name: 'sunrise-dawn',
        label: 'Sunrise Dawn',
        colors: ['1a1a2e', '16213e', 'e94560', 'f2994a', 'f9ca24'],
        gradientType: 'horizontal',
        animationDuration: '8s',
        description: 'Peaceful morning sunrise'
      },
      {
        name: 'forest-mist',
        label: 'Forest Mist',
        colors: ['134e5e', '71b280', 'a8e6cf', 'c8e6c9'],
        gradientType: 'radial',
        animationDuration: '10s',
        description: 'Misty forest morning'
      },
      {
        name: 'ocean-depths',
        label: 'Ocean Depths',
        colors: ['0c3547', '277ea5', '365f75', '92cdcf'],
        gradientType: 'vertical',
        animationDuration: '12s',
        description: 'Deep ocean mysteries'
      },
      {
        name: 'mountain-peaks',
        label: 'Mountain Peaks',
        colors: ['4b79a1', '6c7b7f', 'a8a8a8', 'e8e8e8'],
        gradientType: 'diagonal',
        animationDuration: '9s',
        description: 'Majestic mountain ranges'
      },
      {
        name: 'autumn-leaves',
        label: 'Autumn Leaves',
        colors: ['8b4513', 'd2691e', 'ff6347', 'ffd700', 'ff8c00'],
        gradientType: 'circular',
        animationDuration: '7s',
        description: 'Colorful autumn foliage'
      },
      {
        name: 'cherry-blossom',
        label: 'Cherry Blossom',
        colors: ['ffc0cb', 'ff69b4', 'ffb6c1', 'f0f8ff'],
        gradientType: 'wave',
        animationDuration: '6s',
        description: 'Gentle cherry blossom petals'
      },
      {
        name: 'thunderstorm',
        label: 'Thunderstorm',
        colors: ['2c3e50', '34495e', '5d6d7e', '85929e', 'bdc3c7'],
        gradientType: 'burst',
        animationDuration: '4s',
        description: 'Dramatic storm clouds'
      },
      {
        name: 'northern-aurora',
        label: 'Northern Aurora',
        colors: ['00ff87', '60efff', '0078ff', '9d00ff', 'ff006e'],
        gradientType: 'wave',
        animationDuration: '15s',
        description: 'Dancing northern lights'
      },
      {
        name: 'desert-mirage',
        label: 'Desert Mirage',
        colors: ['f7dc6f', 'f8c471', 'eb984e', 'd68910', 'a04000'],
        gradientType: 'pulse',
        animationDuration: '8s',
        description: 'Shimmering desert heat'
      },
      {
        name: 'coral-reef',
        label: 'Coral Reef',
        colors: ['ff6b6b', 'feca57', '48dbfb', '0abde3', 'ee5a24'],
        gradientType: 'circular',
        animationDuration: '9s',
        description: 'Vibrant coral reef colors'
      },
      {
        name: 'moonlit-night',
        label: 'Moonlit Night',
        colors: ['0f3460', '16537e', '1e6091', 'c8d6e5', 'ddd'],
        gradientType: 'radial',
        animationDuration: '12s',
        description: 'Serene moonlit evening'
      },
      {
        name: 'volcano-fire',
        label: 'Volcano Fire',
        colors: ['8b0000', 'dc143c', 'ff4500', 'ff6347', 'ffd700'],
        gradientType: 'burst',
        animationDuration: '5s',
        description: 'Volcanic eruption energy'
      }
    ]
  },
  tech: {
    label: 'Technology',
    templates: [
      {
        name: 'neural-network',
        label: 'Neural Network',
        colors: ['1e3c72', '2a5298', '00b4db', '0083b0'],
        gradientType: 'spiral',
        animationDuration: '10s',
        description: 'AI neural network patterns'
      },
      {
        name: 'quantum-field',
        label: 'Quantum Field',
        colors: ['667eea', '764ba2', 'f093fb', 'f5576c'],
        gradientType: 'pulse',
        animationDuration: '6s',
        description: 'Quantum energy field'
      },
      {
        name: 'cyber-matrix',
        label: 'Cyber Matrix',
        colors: ['000000', '0f4c75', '3282b8', '00ff41'],
        gradientType: 'conic',
        animationDuration: '8s',
        description: 'Digital matrix code flow'
      },
      {
        name: 'hologram-blue',
        label: 'Hologram Blue',
        colors: ['74b9ff', '0984e3', '6c5ce7', 'a29bfe'],
        gradientType: 'diamond',
        animationDuration: '7s',
        description: 'Futuristic hologram effect'
      },
      {
        name: 'laser-beam',
        label: 'Laser Beam',
        colors: ['ff0844', 'ffb199', '00ff88', '00a8ff'],
        gradientType: 'burst',
        animationDuration: '4s',
        description: 'High-energy laser beam'
      },
      {
        name: 'data-stream',
        label: 'Data Stream',
        colors: ['1dd1a1', '55efc4', '00b894', '00cec9'],
        gradientType: 'wave',
        animationDuration: '9s',
        description: 'Flowing data streams'
      },
      {
        name: 'circuit-board',
        label: 'Circuit Board',
        colors: ['2d3436', '636e72', '00b894', '00cec9', '81ecec'],
        gradientType: 'horizontal',
        animationDuration: '8s',
        description: 'Electronic circuit patterns'
      },
      {
        name: 'plasma-field',
        label: 'Plasma Field',
        colors: ['6c5ce7', 'a29bfe', 'fd79a8', 'fdcb6e'],
        gradientType: 'radial',
        animationDuration: '6s',
        description: 'Energetic plasma discharge'
      },
      {
        name: 'space-station',
        label: 'Space Station',
        colors: ['2c3e50', '3498db', '9b59b6', 'e74c3c'],
        gradientType: 'diagonal',
        animationDuration: '12s',
        description: 'Orbital space station'
      },
      {
        name: 'synthetic-dream',
        label: 'Synthetic Dream',
        colors: ['ee5a52', 'f39c12', 'f1c40f', '2ecc71', '3498db'],
        gradientType: 'spiral',
        animationDuration: '11s',
        description: 'AI-generated dreams'
      },
      {
        name: 'digital-rain',
        label: 'Digital Rain',
        colors: ['000000', '003d00', '00ff00', '66ff66'],
        gradientType: 'vertical',
        animationDuration: '5s',
        description: 'Cascading digital code'
      },
      {
        name: 'cyber-glow',
        label: 'Cyber Glow',
        colors: ['ff006e', 'ff6d00', 'ffb700', '8338ec'],
        gradientType: 'pulse',
        animationDuration: '7s',
        description: 'Cyberpunk neon glow'
      }
    ]
  },
  art: {
    label: 'Art Styles',
    templates: [
      {
        name: 'van-gogh-starry',
        label: 'Van Gogh Starry',
        colors: ['191970', '4169e1', 'ffd700', 'ff6347', '9370db'],
        gradientType: 'spiral',
        animationDuration: '14s',
        description: 'Van Gogh starry night inspired'
      },
      {
        name: 'monet-water-lily',
        label: 'Monet Water Lily',
        colors: ['b0e0e6', '98fb98', 'dda0dd', 'f0e68c'],
        gradientType: 'reflection',
        animationDuration: '12s',
        description: 'Monet water lily impressions'
      },
      {
        name: 'picasso-blue',
        label: 'Picasso Blue',
        colors: ['191970', '4682b4', '87ceeb', 'e6e6fa'],
        gradientType: 'diamond',
        animationDuration: '9s',
        description: 'Picasso blue period palette'
      },
      {
        name: 'rothko-red',
        label: 'Rothko Red',
        colors: ['8b0000', 'dc143c', 'ff6b6b', 'ffa07a'],
        gradientType: 'horizontal',
        animationDuration: '16s',
        description: 'Rothko color field painting'
      },
      {
        name: 'kandinsky-abstract',
        label: 'Kandinsky Abstract',
        colors: ['ff1744', 'ff9800', 'ffeb3b', '4caf50', '2196f3'],
        gradientType: 'burst',
        animationDuration: '8s',
        description: 'Kandinsky abstract expressionism'
      },
      {
        name: 'da-vinci-renaissance',
        label: 'Da Vinci Renaissance',
        colors: ['8b4513', 'cd853f', 'daa520', 'f4a460', 'ffe4b5'],
        gradientType: 'radial',
        animationDuration: '10s',
        description: 'Renaissance master palette'
      },
      {
        name: 'hokusai-wave',
        label: 'Hokusai Wave',
        colors: ['1e3a8a', '3b82f6', '60a5fa', 'dbeafe', 'ffffff'],
        gradientType: 'wave',
        animationDuration: '11s',
        description: 'Great wave ukiyo-e style'
      },
      {
        name: 'pollock-splash',
        label: 'Pollock Splash',
        colors: ['000000', 'ff0000', 'ffff00', '0000ff', 'ffffff'],
        gradientType: 'burst',
        animationDuration: '5s',
        description: 'Action painting energy'
      },
      {
        name: 'matisse-cutout',
        label: 'Matisse Cutout',
        colors: ['ff6b35', 'f7931e', 'ffd23f', '06ffa5', '118ab2'],
        gradientType: 'conic',
        animationDuration: '7s',
        description: 'Paper cutout fauvism'
      },
      {
        name: 'dali-surreal',
        label: 'Dali Surreal',
        colors: ['8b008b', 'ff00ff', 'ff69b4', 'ffd700', 'orange'],
        gradientType: 'spiral',
        animationDuration: '13s',
        description: 'Surrealist dreamscape'
      },
      {
        name: 'basquiat-street',
        label: 'Basquiat Street',
        colors: ['000000', 'ff0000', 'ffff00', '00ff00', 'ffffff'],
        gradientType: 'diamond',
        animationDuration: '6s',
        description: 'Street art neo-expressionism'
      },
      {
        name: 'warhol-pop',
        label: 'Warhol Pop',
        colors: ['ff1493', '00ffff', 'ffff00', 'ff6347', '9370db'],
        gradientType: 'pulse',
        animationDuration: '4s',
        description: 'Pop art vibrant colors'
      }
    ]
  },
  emotions: {
    label: 'Emotions',
    templates: [
      {
        name: 'joy-happiness',
        label: 'Joy & Happiness',
        colors: ['ffdd59', 'ff9f43', 'ff6b6b', 'ff9ff3'],
        gradientType: 'burst',
        animationDuration: '5s',
        description: 'Pure joy and happiness'
      },
      {
        name: 'calm-serenity',
        label: 'Calm & Serenity',
        colors: ['a8e6cf', '88d8c0', '7fcdcd', '68b3c0'],
        gradientType: 'radial',
        animationDuration: '12s',
        description: 'Peaceful and calming'
      },
      {
        name: 'passion-fire',
        label: 'Passion & Fire',
        colors: ['ff0844', 'ff6b6b', 'ff8e53', 'ff6348'],
        gradientType: 'pulse',
        animationDuration: '4s',
        description: 'Passionate and intense'
      },
      {
        name: 'melancholy-blue',
        label: 'Melancholy Blue',
        colors: ['2c3e50', '34495e', '5d6d7e', '85929e'],
        gradientType: 'vertical',
        animationDuration: '15s',
        description: 'Contemplative melancholy'
      },
      {
        name: 'hope-dawn',
        label: 'Hope & Dawn',
        colors: ['ffecd2', 'fcb69f', 'ee9ca7', 'ffdde1'],
        gradientType: 'horizontal',
        animationDuration: '10s',
        description: 'New hope and beginnings'
      },
      {
        name: 'mystery-dark',
        label: 'Mystery & Dark',
        colors: ['2c2c54', '40407a', '706fd3', '474787'],
        gradientType: 'spiral',
        animationDuration: '11s',
        description: 'Dark and mysterious'
      },
      {
        name: 'love-romance',
        label: 'Love & Romance',
        colors: ['ff9a9e', 'fecfef', 'fecfef', 'ff9a9e'],
        gradientType: 'reflection',
        animationDuration: '8s',
        description: 'Romantic and loving'
      },
      {
        name: 'energy-power',
        label: 'Energy & Power',
        colors: ['f39800', 'ff6b35', 'f7931e', 'ffcc02'],
        gradientType: 'diamond',
        animationDuration: '6s',
        description: 'High energy and power'
      },
      {
        name: 'dreams-fantasy',
        label: 'Dreams & Fantasy',
        colors: ['a8edea', 'fed6e3', 'd299c2', 'fef9d7'],
        gradientType: 'wave',
        animationDuration: '14s',
        description: 'Dreamy and fantastical'
      },
      {
        name: 'wisdom-depth',
        label: 'Wisdom & Depth',
        colors: ['667eea', '764ba2', '667eea', '764ba2'],
        gradientType: 'diagonal',
        animationDuration: '13s',
        description: 'Deep wisdom and insight'
      },
      {
        name: 'anxiety-stress',
        label: 'Anxiety & Stress',
        colors: ['ff5722', 'ff7043', 'ff8a65', 'ffab91'],
        gradientType: 'burst',
        animationDuration: '3s',
        description: 'Anxious and stressful feelings'
      },
      {
        name: 'peace-harmony',
        label: 'Peace & Harmony',
        colors: ['c3f0ca', 'b8e6c1', 'a8ddb5', '98d1a9'],
        gradientType: 'circular',
        animationDuration: '16s',
        description: 'Perfect peace and harmony'
      }
    ]
  },
  materials: {
    label: 'Materials',
    templates: [
      {
        name: 'gold-luxury',
        label: 'Gold Luxury',
        colors: ['ffd700', 'ffb347', 'daa520', 'b8860b'],
        gradientType: 'diagonal',
        animationDuration: '8s',
        description: 'Luxurious gold metallic'
      },
      {
        name: 'silver-chrome',
        label: 'Silver Chrome',
        colors: ['c0c0c0', 'dcdcdc', 'a9a9a9', '696969'],
        gradientType: 'reflection',
        animationDuration: '7s',
        description: 'Shiny chrome finish'
      },
      {
        name: 'copper-bronze',
        label: 'Copper Bronze',
        colors: ['cd7f32', 'b87333', 'a0522d', '8b4513'],
        gradientType: 'radial',
        animationDuration: '9s',
        description: 'Warm copper bronze'
      },
      {
        name: 'diamond-crystal',
        label: 'Diamond Crystal',
        colors: ['ffffff', 'f0f8ff', 'e6e6fa', 'dcdcdc'],
        gradientType: 'burst',
        animationDuration: '6s',
        description: 'Brilliant diamond sparkle'
      },
      {
        name: 'emerald-gem',
        label: 'Emerald Gem',
        colors: ['50c878', '228b22', '00ff7f', '32cd32'],
        gradientType: 'circular',
        animationDuration: '10s',
        description: 'Precious emerald green'
      },
      {
        name: 'ruby-red',
        label: 'Ruby Red',
        colors: ['e0115f', 'dc143c', 'b22222', '8b0000'],
        gradientType: 'pulse',
        animationDuration: '5s',
        description: 'Deep ruby red gemstone'
      },
      {
        name: 'sapphire-blue',
        label: 'Sapphire Blue',
        colors: ['0f52ba', '4169e1', '1e90ff', '87ceeb'],
        gradientType: 'wave',
        animationDuration: '11s',
        description: 'Royal sapphire blue'
      },
      {
        name: 'marble-white',
        label: 'Marble White',
        colors: ['ffffff', 'f5f5f5', 'dcdcdc', 'c0c0c0'],
        gradientType: 'diamond',
        animationDuration: '12s',
        description: 'Elegant marble texture'
      },
      {
        name: 'obsidian-black',
        label: 'Obsidian Black',
        colors: ['000000', '2f2f2f', '1c1c1c', '0d0d0d'],
        gradientType: 'spiral',
        animationDuration: '8s',
        description: 'Volcanic obsidian glass'
      },
      {
        name: 'titanium-steel',
        label: 'Titanium Steel',
        colors: ['708090', '778899', '2f4f4f', '696969'],
        gradientType: 'horizontal',
        animationDuration: '9s',
        description: 'Industrial titanium steel'
      },
      {
        name: 'pearl-luster',
        label: 'Pearl Luster',
        colors: ['faf0e6', 'fff8dc', 'f5f5dc', 'fffacd'],
        gradientType: 'radial',
        animationDuration: '13s',
        description: 'Lustrous pearl surface'
      },
      {
        name: 'opal-iridescent',
        label: 'Opal Iridescent',
        colors: ['ff69b4', '00ffff', 'ffff00', 'ff1493', '9370db'],
        gradientType: 'conic',
        animationDuration: '7s',
        description: 'Iridescent opal colors'
      }
    ]
  },
  pride: {
    label: 'Pride Templates',
    templates: [
      {
        name: 'pride-rainbow',
        label: 'Pride Rainbow',
        colors: ['ff0000', 'ff8c00', 'ffff00', '008000', '0000ff', '4b0082'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Traditional pride rainbow flag'
      },
      {
        name: 'trans-pride',
        label: 'Trans Pride',
        colors: ['55cdfc', 'f7a8b8', 'ffffff', 'f7a8b8', '55cdfc'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Trans pride flag colors'
      },
      {
        name: 'bi-pride',
        label: 'Bi Pride',
        colors: ['d60270', '9b4f96', '0038a8'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Bi pride flag colors'
      },
      {
        name: 'pan-pride',
        label: 'Pan Pride',
        colors: ['ff1b8d', 'ffd800', '00b5ff'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Pan pride flag colors'
      },
      {
        name: 'nonbinary-pride',
        label: 'Nonbinary Pride',
        colors: ['fcf434', 'ffffff', '9c59d1', '2c2c2c'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Nonbinary pride flag colors'
      },
      {
        name: 'lesbian-pride',
        label: 'Lesbian Pride',
        colors: ['d62900', 'ff9b55', 'ffffff', 'd461a6', 'a50062'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Modern lesbian pride flag colors'
      },
      {
        name: 'genderqueer-pride',
        label: 'Genderqueer Pride',
        colors: ['b57edc', 'ffffff', '4a8123'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Genderqueer pride flag colors'
      },
      {
        name: 'genderfluid-pride',
        label: 'Genderfluid Pride',
        colors: ['ff75a2', 'ffffff', 'be18d6', '000000', '333ebd'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Genderfluid pride flag colors'
      },
      {
        name: 'ace-pride',
        label: 'Ace Pride',
        colors: ['000000', 'a3a3a3', 'ffffff', '800080'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Asexual pride flag colors'
      },
      {
        name: 'aro-pride',
        label: 'Aromantic Pride',
        colors: ['3da542', 'a7d379', 'ffffff', 'a9a9a9', '000000'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Aromantic pride flag colors'
      },
      {
        name: 'intersex-pride',
        label: 'Intersex Pride',
        colors: ['ffd800', '7902aa'],
        gradientType: 'circular',
        animationDuration: '6s',
        description: 'Intersex pride flag colors with unique circular gradient'
      },
      {
        name: 'agender-pride',
        label: 'Agender Pride',
        colors: ['000000', 'b9b9b9', 'ffffff', 'b8f483', 'ffffff', 'b9b9b9', '000000'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Agender pride flag colors'
      },
      {
        name: 'poly-pride',
        label: 'Polyamory Pride',
        colors: ['0000ff', 'ff0000', '000000'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Polyamory pride flag colors'
      },
      {
        name: 'demiboy-pride',
        label: 'Demiboy Pride',
        colors: ['7f7f7f', 'c4c4c4', '9ad9eb', 'ffffff'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Demiboy pride flag colors'
      },
      {
        name: 'demigirl-pride',
        label: 'Demigirl Pride',
        colors: ['7f7f7f', 'c4c4c4', 'ffaec9', 'ffffff'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Demigirl pride flag colors'
      },
      {
        name: 'omnisexual-pride',
        label: 'Omnisexual Pride',
        colors: ['ff9ccd', 'ff53bd', '2c2c2c', '6760ff', '9cb9ff'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Omnisexual pride flag colors'
      },
      {
        name: 'progress-pride',
        label: 'Progress Pride',
        colors: ['000000', '784F17', 'ff0000', 'ff8c00', 'ffff00', '008000', '0000ff', '4b0082'],
        gradientType: 'diagonal',
        animationDuration: '8s',
        description: 'Progress pride flag with inclusive colors'
      },
      {
        name: 'demiromantic-pride',
        label: 'Demiromantic Pride',
        colors: ['ffffff', '3da542', '000000', 'a9a9a9'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Demiromantic pride flag colors'
      },
      {
        name: 'demisexual-pride',
        label: 'Demisexual Pride',
        colors: ['ffffff', '6e0070', 'd2d2d2', '000000'],
        gradientType: 'horizontal',
        animationDuration: '6s',
        description: 'Demisexual pride flag colors'
      },
      {
        name: 'queer-pride',
        label: 'Queer Pride',
        colors: ['b57edc', 'ffffff', '4a8123', '000000'],
        gradientType: 'vertical',
        animationDuration: '7s',
        description: 'Queer pride flag colors'
      }
    ]
  }
}; 