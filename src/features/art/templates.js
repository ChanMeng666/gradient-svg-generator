/*
 * MIT License - Merged Art Templates
 *
 * Union of the three previously-separate art categories:
 *   - "classic art" (van-gogh-starry, monet-water-lily, ... 16 entries)
 *     uses generic gradientTypes (spiral, reflection, wave, ...)
 *   - "artistic"    (watercolor-dream, oil-painting, ... 7 entries)
 *     uses art-specific generators (watercolor, oilPaint, inkSplash, ...)
 *   - "artMovement" (art-nouveau-flow, bauhaus-minimal, ... 12 entries)
 *     uses art-movement generators
 *
 * Every template `name` is the public contract and unchanged.
 *
 * Copyright (c) 2025 ChanMeng666
 */

module.exports = {
  'van-gogh-starry': {
    name: 'van-gogh-starry',
    label: 'Van Gogh Starry',
    colors: ['191970', '4169e1', 'ffd700', 'ff6347', '9370db'],
    gradientType: 'spiral',
    animationDuration: '14s',
    description: 'Van Gogh starry night inspired',
  },
  'monet-water-lily': {
    name: 'monet-water-lily',
    label: 'Monet Water Lily',
    colors: ['b0e0e6', '98fb98', 'dda0dd', 'f0e68c'],
    gradientType: 'reflection',
    animationDuration: '12s',
    description: 'Monet water lily impressions',
  },
  'picasso-blue': {
    name: 'picasso-blue',
    label: 'Picasso Blue',
    colors: ['191970', '4682b4', '87ceeb', 'e6e6fa'],
    gradientType: 'diamond',
    animationDuration: '9s',
    description: 'Picasso blue period palette',
  },
  'rothko-red': {
    name: 'rothko-red',
    label: 'Rothko Red',
    colors: ['8b0000', 'dc143c', 'ff6b6b', 'ffa07a'],
    gradientType: 'horizontal',
    animationDuration: '16s',
    description: 'Rothko color field painting',
  },
  'kandinsky-abstract': {
    name: 'kandinsky-abstract',
    label: 'Kandinsky Abstract',
    colors: ['ff1744', 'ff9800', 'ffeb3b', '4caf50', '2196f3'],
    gradientType: 'burst',
    animationDuration: '8s',
    description: 'Kandinsky abstract expressionism',
  },
  'da-vinci-renaissance': {
    name: 'da-vinci-renaissance',
    label: 'Da Vinci Renaissance',
    colors: ['8b4513', 'cd853f', 'daa520', 'f4a460', 'ffe4b5'],
    gradientType: 'radial',
    animationDuration: '10s',
    description: 'Renaissance master palette',
  },
  'hokusai-wave': {
    name: 'hokusai-wave',
    label: 'Hokusai Wave',
    colors: ['1e3a8a', '3b82f6', '60a5fa', 'dbeafe', 'ffffff'],
    gradientType: 'wave',
    animationDuration: '11s',
    description: 'Great wave ukiyo-e style',
  },
  'pollock-splash': {
    name: 'pollock-splash',
    label: 'Pollock Splash',
    colors: ['000000', 'ff0000', 'ffff00', '0000ff', 'ffffff'],
    gradientType: 'burst',
    animationDuration: '5s',
    description: 'Action painting energy',
  },
  'matisse-cutout': {
    name: 'matisse-cutout',
    label: 'Matisse Cutout',
    colors: ['ff6b35', 'f7931e', 'ffd23f', '06ffa5', '118ab2'],
    gradientType: 'conic',
    animationDuration: '7s',
    description: 'Paper cutout fauvism',
  },
  'dali-surreal': {
    name: 'dali-surreal',
    label: 'Dali Surreal',
    colors: ['8b008b', 'ff00ff', 'ff69b4', 'ffd700', 'orange'],
    gradientType: 'spiral',
    animationDuration: '13s',
    description: 'Surrealist dreamscape',
  },
  'basquiat-street': {
    name: 'basquiat-street',
    label: 'Basquiat Street',
    colors: ['000000', 'ff0000', 'ffff00', '00ff00', 'ffffff'],
    gradientType: 'diamond',
    animationDuration: '6s',
    description: 'Street art neo-expressionism',
  },
  'warhol-pop': {
    name: 'warhol-pop',
    label: 'Warhol Pop',
    colors: ['ff1493', '00ffff', 'ffff00', 'ff6347', '9370db'],
    gradientType: 'pulse',
    animationDuration: '4s',
    description: 'Pop art vibrant colors',
  },
  'starry-nights': {
    name: 'starry-nights',
    label: 'Starry Nights',
    colors: ['000033', '191970', 'ffd700', 'ffffff'],
    gradientType: 'star',
    animationDuration: '8s',
    description: 'Twinkling starry night sky',
  },
  'love-potion': {
    name: 'love-potion',
    label: 'Love Potion',
    colors: ['ff1493', 'ff69b4', 'ff6347', 'dc143c'],
    gradientType: 'heart',
    animationDuration: '6s',
    description: 'Romantic heart-shaped gradient',
  },
  'cosmic-voyage': {
    name: 'cosmic-voyage',
    label: 'Cosmic Voyage',
    colors: ['2c3e50', '8e44ad', 'e74c3c', 'f39c12'],
    gradientType: 'galaxy',
    animationDuration: '12s',
    description: 'Deep space galaxy swirl',
  },
  'electric-storm': {
    name: 'electric-storm',
    label: 'Electric Storm',
    colors: ['1a1a2e', '16213e', '0f3460', 'ffffff'],
    gradientType: 'lightning',
    animationDuration: '3s',
    description: 'Lightning bolt energy',
  },

  // --- formerly artistic/ templates -----------------------------------------
  'watercolor-dream': {
    name: 'watercolor-dream',
    label: 'Watercolor Dream',
    colors: ['ff9999', 'ffcc99', '99ccff', 'cc99ff'],
    gradientType: 'watercolor',
    animationDuration: '6s',
    description:
      'Soft watercolor painting effect with organic color bleeding and fluid transitions',
  },
  'oil-painting': {
    name: 'oil-painting',
    label: 'Oil Painting',
    colors: ['8B4513', 'CD853F', 'DEB887', 'F5DEB3'],
    gradientType: 'oilPaint',
    animationDuration: '8s',
    description: 'Classic oil painting texture with rich brushstrokes and impasto techniques',
  },
  'ink-splash': {
    name: 'ink-splash',
    label: 'Ink Splash',
    colors: ['000000', '333333', '666666', '999999'],
    gradientType: 'inkSplash',
    animationDuration: '3s',
    description: 'Dynamic ink splash effect with organic splatters and fluid motion',
  },
  'mosaic-tiles': {
    name: 'mosaic-tiles',
    label: 'Mosaic Tiles',
    colors: ['FFD700', 'FF6347', '4169E1', '32CD32'],
    gradientType: 'mosaic',
    animationDuration: '4s',
    description: 'Byzantine mosaic tile pattern with golden accents and geometric precision',
  },
  'abstract-geometry': {
    name: 'abstract-geometry',
    label: 'Abstract Geometry',
    colors: ['FF1744', '2196F3', 'FFEB3B', '9C27B0'],
    gradientType: 'abstractGeo',
    animationDuration: '5s',
    description: 'Modern abstract geometric composition with Bauhaus-inspired color blocking',
  },
  'graffiti-street': {
    name: 'graffiti-street',
    label: 'Graffiti Street',
    colors: ['FF5722', '795548', 'FFC107', '607D8B'],
    gradientType: 'graffiti',
    animationDuration: '3.5s',
    description: 'Urban street art graffiti style with spray paint textures and bold colors',
  },
  'vintage-poster': {
    name: 'vintage-poster',
    label: 'Vintage Poster',
    colors: ['D32F2F', 'F57C00', 'FBC02D', '689F38'],
    gradientType: 'vintage',
    animationDuration: '7s',
    description: 'Retro vintage poster aesthetic with aged paper texture and classic typography',
  },

  // --- formerly artMovement/ templates --------------------------------------
  'art-nouveau-flow': {
    name: 'art-nouveau-flow',
    label: 'Art Nouveau Flow',
    colors: ['2e4057', '048a81', '54c6eb', '8fc93a', 'e4dfda'],
    gradientType: 'artNouveauFlow',
    animationDuration: '12s',
    description:
      'Organic flowing lines with natural curves inspired by Art Nouveau movement and floral motifs',
  },
  'art-deco-luxury': {
    name: 'art-deco-luxury',
    label: 'Art Deco Luxury',
    colors: ['000000', 'ffd700', 'c0c0c0', '1a1a1a', 'b8860b'],
    gradientType: 'artDecoLuxury',
    animationDuration: '10s',
    description:
      'Geometric symmetry with gold and black Art Deco elegance and luxury design patterns',
  },
  'bauhaus-minimal': {
    name: 'bauhaus-minimal',
    label: 'Bauhaus Minimal',
    colors: ['ff0000', 'ffff00', '0000ff', '000000', 'ffffff'],
    gradientType: 'bauhausMinimal',
    animationDuration: '8s',
    description:
      'Primary colors with simple geometric forms following Bauhaus principles of functional design',
  },
  'impressionist-dots': {
    name: 'impressionist-dots',
    label: 'Impressionist Dots',
    colors: ['4169e1', 'ffd700', 'ff6347', '9370db', '00fa9a'],
    gradientType: 'impressionistDots',
    animationDuration: '15s',
    description: 'Pointillist technique with optical color mixing inspired by French Impressionism',
  },
  'cubist-fragments': {
    name: 'cubist-fragments',
    label: 'Cubist Fragments',
    colors: ['8b4513', 'd2691e', 'daa520', 'cd853f', 'f4a460'],
    gradientType: 'cubistFragments',
    animationDuration: '9s',
    description: 'Geometric plane fragmentation with angular shifts inspired by Picasso and Braque',
  },
  'surrealist-melt': {
    name: 'surrealist-melt',
    label: 'Surrealist Melt',
    colors: ['2e4057', '5c7c8a', '8bafc4', 'b5d3e7', 'e8f4f8'],
    gradientType: 'surrealistMelt',
    animationDuration: '14s',
    description: 'Dreamlike melting transformations inspired by Dalí with fluid reality distortion',
  },
  'pop-art-halftone': {
    name: 'pop-art-halftone',
    label: 'Pop Art Halftone',
    colors: ['ff1493', 'ff6347', 'ffd700', '00ffff', 'ff00ff'],
    gradientType: 'popArtHalftone',
    animationDuration: '6s',
    description: 'Ben-Day dots with bold CMYK colors inspired by Warhol and Lichtenstein',
  },
  'expressionist-emotion': {
    name: 'expressionist-emotion',
    label: 'Expressionist Emotion',
    colors: ['8b0000', 'dc143c', 'ff4500', 'ff8c00', 'ffd700'],
    gradientType: 'artNouveauFlow',
    animationDuration: '7s',
    description: 'Bold emotional strokes with intense color expression and psychological depth',
  },
  'constructivist-structure': {
    name: 'constructivist-structure',
    label: 'Constructivist Structure',
    colors: ['000000', 'ff0000', 'ffffff', 'ffff00'],
    gradientType: 'bauhausMinimal',
    animationDuration: '8s',
    description: 'Russian Constructivist industrial design with bold geometric composition',
  },
  'minimalist-zen': {
    name: 'minimalist-zen',
    label: 'Minimalist Zen',
    colors: ['f5f5f5', 'e0e0e0', 'cccccc', 'b3b3b3'],
    gradientType: 'bauhausMinimal',
    animationDuration: '18s',
    description: 'Extreme simplicity with subtle gradation and meditative calm aesthetic',
  },
  'futurism-speed': {
    name: 'futurism-speed',
    label: 'Futurism Speed',
    colors: ['ff6b35', 'f7931e', 'fdc02f', 'f3f6f4'],
    gradientType: 'cubistFragments',
    animationDuration: '4s',
    description: 'Dynamic motion and velocity inspired by Italian Futurism movement',
  },
  'abstract-expressionism': {
    name: 'abstract-expressionism',
    label: 'Abstract Expressionism',
    colors: ['2e4057', '5c7c8a', 'dc143c', 'ffd700', '4169e1'],
    gradientType: 'surrealistMelt',
    animationDuration: '11s',
    description:
      'Spontaneous gestural abstraction with emotional intensity and color field painting',
  },
};
