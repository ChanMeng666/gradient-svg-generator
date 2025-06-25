/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// 👗 FASHION SERIES - Haute couture, street fashion, and designer aesthetics
const fashionTemplates = {
  parisiancouture: {
    name: 'parisian-couture',
    label: 'Parisian Couture',
    description: 'Elegant haute couture with French sophistication and silk textures',
    colors: ['1a1a1a', '2c2c2c', 'c0c0c0', 'f5f5dc', 'fff8dc'],
    gradientType: 'silk-drape',
    animationDuration: '12s'
  },

  milanRunway: {
    name: 'milan-runway',
    label: 'Milan Runway',
    description: 'High fashion runway with dramatic lighting and bold contrasts',
    colors: ['000000', 'ffffff', 'ff0000', 'ffd700', 'c0c0c0'],
    gradientType: 'runway-spotlight',
    animationDuration: '8s'
  },

  streetwearUrban: {
    name: 'streetwear-urban',
    label: 'Streetwear Urban',
    description: 'Contemporary street fashion with graffiti and neon accents',
    colors: ['1a1a1a', '333333', '00ff00', 'ff00ff', 'ffff00'],
    gradientType: 'urban-graffiti',
    animationDuration: '10s'
  },

  vintageChanel: {
    name: 'vintage-chanel',
    label: 'Vintage Chanel',
    description: 'Classic Chanel elegance with pearls and quilted patterns',
    colors: ['000000', '2c2c2c', 'ffffff', 'f8f8ff', 'fffacd'],
    gradientType: 'quilted-pearl',
    animationDuration: '14s'
  },

  avantGardeFuture: {
    name: 'avant-garde-future',
    label: 'Avant-Garde Future',
    description: 'Experimental fashion with metallic textures and geometric forms',
    colors: ['0a0a0a', '4a4a4a', '808080', 'c0c0c0', 'ffffff'],
    gradientType: 'metallic-geometric',
    animationDuration: '11s'
  },

  bohemianChic: {
    name: 'bohemian-chic',
    label: 'Bohemian Chic',
    description: 'Free-spirited bohemian style with flowing fabrics and earth tones',
    colors: ['8b4513', 'cd853f', 'daa520', 'f0e68c', 'fff8dc'],
    gradientType: 'flowing-fabric',
    animationDuration: '16s'
  },

  minimalistScandinavian: {
    name: 'minimalist-scandinavian',
    label: 'Minimalist Scandinavian',
    description: 'Clean Scandinavian design with natural textures and muted colors',
    colors: ['f5f5f5', 'e8e8e8', 'd3d3d3', 'a9a9a9', '696969'],
    gradientType: 'natural-linen',
    animationDuration: '18s'
  },

  goth3darkness: {
    name: 'gothic-darkness',
    label: 'Gothic Darkness',
    description: 'Dark romantic fashion with lace patterns and mysterious shadows',
    colors: ['000000', '1a1a1a', '4b0082', '800080', '8b008b'],
    gradientType: 'lace-shadow',
    animationDuration: '13s'
  },

  neonCyberpunk: {
    name: 'neon-cyberpunk',
    label: 'Neon Cyberpunk',
    description: 'Futuristic cyberpunk fashion with holographic effects and LED accents',
    colors: ['0a0a0a', '1a0033', '00ffff', 'ff00ff', 'ffff00'],
    gradientType: 'holographic-led',
    animationDuration: '9s'
  }
};

module.exports = fashionTemplates; 