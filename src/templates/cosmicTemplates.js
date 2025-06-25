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

// 🌌 COSMIC SERIES - Universe, galaxies, and stellar phenomena
const cosmicTemplates = {
  milkyWayGalaxy: {
    name: 'milky-way-galaxy',
    label: 'Milky Way Galaxy',
    description: 'Spiral galaxy with rotating star fields and cosmic dust',
    colors: ['0a0a0a', '1a1a2e', '16213e', '533483', 'e94560'],
    gradientType: 'galaxy-spiral',
    animationDuration: '20s'
  },

  nebulaStarbirth: {
    name: 'nebula-starbirth',
    label: 'Nebula Starbirth',
    description: 'Colorful nebula cloud with emerging stars and cosmic winds',
    colors: ['0f0f23', '6a0572', 'ab2754', 'ff5722', 'ffb74d'],
    gradientType: 'nebula-swirl',
    animationDuration: '18s'
  },

  blackHoleEvent: {
    name: 'black-hole-event',
    label: 'Black Hole Event',
    description: 'Event horizon with light bending and gravitational lensing',
    colors: ['000000', '0d1421', '2c3e50', '3498db', 'ffffff'],
    gradientType: 'gravitational-lens',
    animationDuration: '16s'
  },

  supernovaExplosion: {
    name: 'supernova-explosion',
    label: 'Supernova Explosion',
    description: 'Stellar explosion with shockwaves and energy bursts',
    colors: ['1a1a1a', '8b0000', 'ff4500', 'ffd700', 'ffffff'],
    gradientType: 'stellar-explosion',
    animationDuration: '12s'
  },

  auroraCosmicRays: {
    name: 'aurora-cosmic-rays',
    label: 'Aurora Cosmic Rays',
    description: 'Planetary aurora caused by cosmic ray interactions',
    colors: ['001122', '003366', '00ff7f', '32cd32', '7fff00'],
    gradientType: 'cosmic-aurora',
    animationDuration: '14s'
  },

  quantumVacuum: {
    name: 'quantum-vacuum',
    label: 'Quantum Vacuum',
    description: 'Quantum field fluctuations in deep space vacuum',
    colors: ['050511', '1a1a2e', '16213e', '533483', 'e94560'],
    gradientType: 'quantum-fluctuation',
    animationDuration: '22s'
  },

  binaryStarDance: {
    name: 'binary-star-dance',
    label: 'Binary Star Dance',
    description: 'Two stars orbiting each other with gravitational waves',
    colors: ['000033', '003366', 'ff6b35', 'f7931e', 'ffeb3b'],
    gradientType: 'binary-orbit',
    animationDuration: '24s'
  },

  cosmicMicrowave: {
    name: 'cosmic-microwave',
    label: 'Cosmic Microwave',
    description: 'Cosmic microwave background radiation visualization',
    colors: ['0a0a0a', '2c1810', '8b4513', 'cd853f', 'f0e68c'],
    gradientType: 'cmb-radiation',
    animationDuration: '30s'
  },

  wormholePortal: {
    name: 'wormhole-portal',
    label: 'Wormhole Portal',
    description: 'Spacetime tunnel connecting distant regions of universe',
    colors: ['000033', '1a0033', '660099', '9966cc', 'ccccff'],
    gradientType: 'spacetime-tunnel',
    animationDuration: '15s'
  }
};

module.exports = cosmicTemplates; 