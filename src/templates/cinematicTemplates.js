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

// 🎬 CINEMATIC SERIES - Movie and theatrical visual styles
const cinematicTemplates = {
  filmNoir: {
    name: 'film-noir',
    label: 'Film Noir',
    description: 'Classic black and white cinema with dramatic shadows',
    colors: ['000000', '1a1a1a', '333333', '666666', 'cccccc', 'ffffff'],
    gradientType: 'film-noir-shadows',
    animationDuration: '8s'
  },

  hollywoodGlamour: {
    name: 'hollywood-glamour',
    label: 'Hollywood Glamour',
    description: 'Golden age Hollywood with spotlights and red carpet elegance',
    colors: ['8b0000', 'b8860b', 'ffd700', 'fff8dc', 'ffffff'],
    gradientType: 'spotlight-glamour',
    animationDuration: '10s'
  },

  cyberpunkBlade: {
    name: 'cyberpunk-blade',
    label: 'Cyberpunk Blade',
    description: 'Neon-soaked cyberpunk cityscape with rain effects',
    colors: ['0a0a0a', '1a0033', '660099', '00ffff', 'ff0080'],
    gradientType: 'neon-rain',
    animationDuration: '12s'
  },

  westernSunset: {
    name: 'western-sunset',
    label: 'Western Sunset',
    description: 'Epic western film sunset with dust and heat waves',
    colors: ['2c1810', '8b4513', 'cd853f', 'ffa500', 'ff4500'],
    gradientType: 'heat-waves',
    animationDuration: '15s'
  },

  scienceFictionCryogenic: {
    name: 'sci-fi-cryogenic',
    label: 'Sci-Fi Cryogenic',
    description: 'Futuristic cryogenic chamber with ice crystals and mist',
    colors: ['001122', '003366', '0066cc', '33ccff', 'ffffff'],
    gradientType: 'ice-crystals',
    animationDuration: '9s'
  },

  horrorBloodMoon: {
    name: 'horror-blood-moon',
    label: 'Horror Blood Moon',
    description: 'Gothic horror atmosphere with blood moon and shadows',
    colors: ['0d0d0d', '330000', '660000', '990000', 'cc3333'],
    gradientType: 'blood-moon',
    animationDuration: '14s'
  },

  romanticsoftFocus: {
    name: 'romantic-soft-focus',
    label: 'Romantic Soft Focus',
    description: 'Dreamy romantic film with soft bokeh and warm tones',
    colors: ['fff0f5', 'ffe4e1', 'ffc0cb', 'ff69b4', 'ff1493'],
    gradientType: 'soft-bokeh',
    animationDuration: '11s'
  },

  actionExplosion: {
    name: 'action-explosion',
    label: 'Action Explosion',
    description: 'High-octane action with explosive fire and smoke effects',
    colors: ['1a1a1a', '333333', 'ff4500', 'ffa500', 'ffff00'],
    gradientType: 'explosion-smoke',
    animationDuration: '7s'
  }
};

module.exports = cinematicTemplates; 