/*
 * MIT License - Merged Nature Templates
 *
 * Union of the three previously-separate nature categories:
 *   - "classic nature" (sunrise-dawn, forest-mist, ... 13 entries)
 *     uses generic gradientTypes (horizontal, radial, wave, ...)
 *   - "organic"        (flowing-water, burning-flame, ... 8 entries)
 *     uses organic generators (flowingWater, flame, aurora, ...)
 *   - "weather"        (fog-rolling, monsoon-rain, ... 11 entries)
 *     uses weather generators (fogRolling, monsoonRain, ...)
 *
 * Weather originally had an "electric-storm" key that collided with
 * art/templates.js:electric-storm. The art version already won in the
 * TemplateRegistry lookup order, so weather's was effectively dead.
 * It has been dropped in this merge to preserve the public contract.
 *
 * Copyright (c) 2025 ChanMeng666
 */

const palettes = require('../_shared/palettes');

module.exports = {
  'sunrise-dawn': {
    name: 'sunrise-dawn',
    label: 'Sunrise Dawn',
    colors: ['1a1a2e', '16213e', 'e94560', 'f2994a', 'f9ca24'],
    gradientType: 'horizontal',
    animationDuration: '8s',
    description: 'Peaceful morning sunrise',
  },
  'forest-mist': {
    name: 'forest-mist',
    label: 'Forest Mist',
    colors: ['134e5e', '71b280', 'a8e6cf', 'c8e6c9'],
    gradientType: 'radial',
    animationDuration: '10s',
    description: 'Misty forest morning',
  },
  'ocean-depths': {
    name: 'ocean-depths',
    label: 'Ocean Depths',
    colors: ['0c3547', '277ea5', '365f75', '92cdcf'],
    gradientType: 'vertical',
    animationDuration: '12s',
    description: 'Deep ocean mysteries',
  },
  'mountain-peaks': {
    name: 'mountain-peaks',
    label: 'Mountain Peaks',
    colors: ['4b79a1', '6c7b7f', 'a8a8a8', 'e8e8e8'],
    gradientType: 'diagonal',
    animationDuration: '9s',
    description: 'Majestic mountain ranges',
  },
  'autumn-leaves': {
    name: 'autumn-leaves',
    label: 'Autumn Leaves',
    colors: ['8b4513', 'd2691e', 'ff6347', 'ffd700', 'ff8c00'],
    gradientType: 'circular',
    animationDuration: '7s',
    description: 'Colorful autumn foliage',
  },
  'cherry-blossom': {
    name: 'cherry-blossom',
    label: 'Cherry Blossom',
    colors: ['ffc0cb', 'ff69b4', 'ffb6c1', 'f0f8ff'],
    gradientType: 'wave',
    animationDuration: '6s',
    description: 'Gentle cherry blossom petals',
  },
  thunderstorm: {
    name: 'thunderstorm',
    label: 'Thunderstorm',
    colors: ['2c3e50', '34495e', '5d6d7e', '85929e', 'bdc3c7'],
    gradientType: 'burst',
    animationDuration: '4s',
    description: 'Dramatic storm clouds',
  },
  'northern-aurora': {
    name: 'northern-aurora',
    label: 'Northern Aurora',
    colors: ['00ff87', '60efff', '0078ff', '9d00ff', 'ff006e'],
    gradientType: 'wave',
    animationDuration: '15s',
    description: 'Dancing northern lights',
  },
  'desert-mirage': {
    name: 'desert-mirage',
    label: 'Desert Mirage',
    colors: ['f7dc6f', 'f8c471', 'eb984e', 'd68910', 'a04000'],
    gradientType: 'pulse',
    animationDuration: '8s',
    description: 'Shimmering desert heat',
  },
  'coral-reef': {
    name: 'coral-reef',
    label: 'Coral Reef',
    colors: ['ff6b6b', 'feca57', '48dbfb', '0abde3', 'ee5a24'],
    gradientType: 'circular',
    animationDuration: '9s',
    description: 'Vibrant coral reef colors',
  },
  'moonlit-night': {
    name: 'moonlit-night',
    label: 'Moonlit Night',
    colors: ['0f3460', '16537e', '1e6091', 'c8d6e5', 'ddd'],
    gradientType: 'radial',
    animationDuration: '12s',
    description: 'Serene moonlit evening',
  },
  'volcano-fire': {
    name: 'volcano-fire',
    label: 'Volcano Fire',
    colors: ['8b0000', 'dc143c', 'ff4500', 'ff6347', 'ffd700'],
    gradientType: 'burst',
    animationDuration: '5s',
    description: 'Volcanic eruption energy',
  },
  // Enhanced Wave Effect - Inspired by svg-banners example
  'ocean-layers': {
    name: 'ocean-layers',
    label: 'Ocean Layers',
    colors: ['005f73', '0a9396', '94d2bd', 'e9d8a6', 'ee9b00', 'ca6702', 'bb3e03'],
    gradientType: 'layeredWave',
    animationDuration: '1.5s',
    description: 'Multi-layered ocean waves with cascading motion',
  },

  // --- formerly organic/ templates ------------------------------------------
  'flowing-water': {
    name: 'flowing-water',
    label: 'Flowing Water',
    colors: ['87CEEB', '4682B4', '1E90FF', '0000CD'],
    gradientType: 'flowingWater',
    animationDuration: '5s',
    description: 'Serene flowing water with gentle ripples and aquatic transparency',
  },
  'burning-flame': {
    name: 'burning-flame',
    label: 'Burning Flame',
    colors: ['FF4500', 'FF6347', 'FFD700', 'FFA500'],
    gradientType: 'flame',
    animationDuration: '3s',
    description: 'Dynamic fire flames with flickering motion and intense heat energy',
  },
  'cloud-drift': {
    name: 'cloud-drift',
    label: 'Cloud Drift',
    colors: ['F0F8FF', 'E0E6FF', 'C0C5C8', 'A0A5A8'],
    gradientType: 'clouds',
    animationDuration: '8s',
    description: 'Soft drifting clouds with atmospheric depth and ethereal movement',
  },
  'aurora-borealis': {
    name: 'aurora-borealis',
    label: 'Aurora Borealis',
    colors: ['00FF7F', '00CED1', '9370DB', 'FF1493'],
    gradientType: 'aurora',
    animationDuration: '6s',
    description: 'Mesmerizing northern lights with celestial color waves and cosmic beauty',
  },
  'ocean-waves': {
    name: 'ocean-waves',
    label: 'Ocean Waves',
    colors: ['006994', '0077be', '008fd5', '41b6e6'],
    gradientType: 'oceanWaves',
    animationDuration: '4s',
    description: 'Rolling ocean waves with deep blue depths and foaming whitecaps',
  },
  'forest-canopy': {
    name: 'forest-canopy',
    label: 'Forest Canopy',
    colors: ['228B22', '32CD32', '90EE90', 'ADFF2F'],
    gradientType: 'forest',
    animationDuration: '7s',
    description: 'Lush forest canopy with dappled sunlight and organic green variations',
  },
  'lightning-storm': {
    name: 'lightning-storm',
    label: 'Lightning Storm',
    colors: ['191970', '4B0082', '8A2BE2', 'FFFFFF'],
    gradientType: 'lightning',
    animationDuration: '2s',
    description: 'Electric lightning storm with dramatic bolts and thunderous energy',
  },
  'mountain-mist': {
    name: 'mountain-mist',
    label: 'Mountain Mist',
    colors: ['696969', '708090', 'B0C4DE', 'F5F5F5'],
    gradientType: 'mountainMist',
    animationDuration: '9s',
    description: 'Mystical mountain mist with layered fog and ethereal atmosphere',
  },

  // --- formerly weather/ templates ------------------------------------------
  // Note: weather's "electric-storm" was dropped -- it collided with
  // art/templates.js:electric-storm which already won in the registry
  // lookup order, so weather's version was effectively unreachable.
  'fog-rolling': {
    name: 'fog-rolling',
    label: 'Fog Rolling',
    colors: ['d3d3d3', 'a9a9a9', 'c0c0c0', 'e8e8e8'],
    gradientType: 'fogRolling',
    animationDuration: '12s',
    description:
      'Layered fog banks rolling with slow atmospheric movement and soft opacity transitions',
  },
  'monsoon-rain': {
    name: 'monsoon-rain',
    label: 'Monsoon Rain',
    colors: ['4682b4', '5f9ea0', '708090', 'b0c4de'],
    gradientType: 'monsoonRain',
    animationDuration: '4s',
    description:
      'Heavy diagonal rain streaks with varying speeds and natural precipitation patterns',
  },
  'snowfall-drift': {
    name: 'snowfall-drift',
    label: 'Snowfall Drift',
    colors: ['ffffff', 'f0f8ff', 'e6f2ff', 'dce9f5'],
    gradientType: 'snowfallDrift',
    animationDuration: '10s',
    description: 'Gentle floating snowflakes drifting with natural wind patterns and soft glow',
  },
  'sandstorm-swirl': {
    name: 'sandstorm-swirl',
    label: 'Sandstorm Swirl',
    colors: ['c19a6b', 'd2b48c', 'daa520', 'f4a460'],
    gradientType: 'sandstormSwirl',
    animationDuration: '5s',
    description: 'Turbulent desert sandstorm with aggressive particle movement and displacement',
  },
  'tornado-vortex': {
    name: 'tornado-vortex',
    label: 'Tornado Vortex',
    colors: ['2f4f4f', '556b2f', '696969', '808080'],
    gradientType: 'tornadoVortex',
    animationDuration: '3s',
    description: 'Aggressive spiral tornado with rotating funnel and turbulent distortion effects',
  },
  'lightning-web': {
    name: 'lightning-web',
    label: 'Lightning Web',
    colors: ['ffffff', 'e0ffff', 'add8e6', '87ceeb'],
    gradientType: 'lightningWeb',
    animationDuration: '6s',
    description:
      'Branching electrical lightning patterns with sharp opacity flashes and electrical glow',
  },
  'prism-refraction': {
    name: 'prism-refraction',
    label: 'Prism Refraction',
    colors: palettes.rainbow7,
    gradientType: 'prismRefraction',
    animationDuration: '8s',
    description:
      'Spectral light separation through prism with chromatic aberration and rainbow effects',
  },
  'morning-mist': {
    name: 'morning-mist',
    label: 'Morning Mist',
    colors: ['f0f8ff', 'e6f2ff', 'd3e5f0', 'c9dae8'],
    gradientType: 'fogRolling',
    animationDuration: '15s',
    description: 'Gentle morning mist with soft blue tones and peaceful atmospheric layers',
  },
  'storm-clouds': {
    name: 'storm-clouds',
    label: 'Storm Clouds',
    colors: ['2c3e50', '34495e', '5d6d7e', '7f8c8d'],
    gradientType: 'sandstormSwirl',
    animationDuration: '7s',
    description: 'Dark storm clouds with turbulent movement and dramatic atmospheric pressure',
  },
  'blizzard-fury': {
    name: 'blizzard-fury',
    label: 'Blizzard Fury',
    colors: ['f0f8ff', 'e0f0ff', 'd0e8ff', 'ffffff'],
    gradientType: 'snowfallDrift',
    animationDuration: '4s',
    description: 'Intense blizzard conditions with rapid snowfall and strong wind patterns',
  },
  'heat-shimmer': {
    name: 'heat-shimmer',
    label: 'Heat Shimmer',
    colors: ['ffd700', 'ffa500', 'ff8c00', 'ff6347'],
    gradientType: 'sandstormSwirl',
    animationDuration: '6s',
    description: 'Desert heat waves with shimmering atmospheric distortion and mirage effects',
  },
};
