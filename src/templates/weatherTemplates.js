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

// 🌦️ WEATHER SERIES - Atmospheric phenomena and weather effects
const weatherTemplates = {
  thunderstormLightning: {
    name: 'thunderstorm-lightning',
    label: 'Thunderstorm Lightning',
    description: 'Dramatic thunderstorm with electric lightning bolts and dark clouds',
    colors: ['1a1a2e', '16213e', '0f0f23', '4a4a4a', 'ffffff'],
    gradientType: 'lightning-flash',
    animationDuration: '8s'
  },

  rainbowAfterStorm: {
    name: 'rainbow-after-storm',
    label: 'Rainbow After Storm',
    description: 'Peaceful rainbow emerging through clearing storm clouds',
    colors: ['4682b4', '87ceeb', 'ff0000', 'ffa500', '9acd32'],
    gradientType: 'rainbow-emerge',
    animationDuration: '15s'
  },

  blizzardWhiteout: {
    name: 'blizzard-whiteout',
    label: 'Blizzard Whiteout',
    description: 'Intense snowstorm with swirling snow and reduced visibility',
    colors: ['f0f8ff', 'e6e6fa', 'dcdcdc', 'c0c0c0', 'a9a9a9'],
    gradientType: 'snow-swirl',
    animationDuration: '12s'
  },

  hurricaneEye: {
    name: 'hurricane-eye',
    label: 'Hurricane Eye',
    description: 'Calm eye of hurricane surrounded by spiraling storm clouds',
    colors: ['2f4f4f', '708090', '87ceeb', 'b0c4de', 'ffffff'],
    gradientType: 'hurricane-spiral',
    animationDuration: '20s'
  },

  tornadoFunnel: {
    name: 'tornado-funnel',
    label: 'Tornado Funnel',
    description: 'Powerful tornado with debris-filled funnel cloud',
    colors: ['2c2c2c', '4a4a4a', '696969', '8b7355', 'cd853f'],
    gradientType: 'tornado-spin',
    animationDuration: '10s'
  },

  foggyMist: {
    name: 'foggy-mist',
    label: 'Foggy Mist',
    description: 'Dense fog rolling through landscape with ethereal mist',
    colors: ['f5f5f5', 'e8e8e8', 'd3d3d3', 'c0c0c0', 'a9a9a9'],
    gradientType: 'mist-flow',
    animationDuration: '18s'
  },

  desertSandstorm: {
    name: 'desert-sandstorm',
    label: 'Desert Sandstorm',
    description: 'Massive sandstorm with swirling dust and desert winds',
    colors: ['daa520', 'cd853f', 'f4a460', 'ffe4b5', 'ffd700'],
    gradientType: 'sand-whirl',
    animationDuration: '14s'
  },

  hailstormIce: {
    name: 'hailstorm-ice',
    label: 'Hailstorm Ice',
    description: 'Violent hailstorm with ice pellets and storm clouds',
    colors: ['2f4f4f', '4682b4', '87ceeb', 'b0e0e6', 'ffffff'],
    gradientType: 'hail-fall',
    animationDuration: '11s'
  },

  sunshowerPhenomena: {
    name: 'sunshower-phenomena',
    label: 'Sunshower Phenomena',
    description: 'Rare sunshower with rain falling while sun shines brightly',
    colors: ['ffd700', 'ffff00', 'ffa500', '87ceeb', '4682b4'],
    gradientType: 'sun-rain',
    animationDuration: '16s'
  },

  mammatusUndulatus: {
    name: 'mammatus-undulatus',
    label: 'Mammatus Undulatus',
    description: 'Rare mammatus clouds with pouch-like formations',
    colors: ['2c2c2c', '4a4a4a', '708090', '87ceeb', 'f0f8ff'],
    gradientType: 'cloud-pouches',
    animationDuration: '22s'
  }
};

module.exports = weatherTemplates; 