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

module.exports = {
  // 🌈 NEW: Rainbow Layer Effect - 借鉴自 example-1/rainbow.js
  'rainbow-layer': {
    name: 'rainbow-layer',
    label: 'Rainbow Layer',
    colors: ['DEBF40', '5ACB3C', '44A3F7', 'CF52EB', 'D14B3D', 'D49C3D', 'ffffff'],
    gradientType: 'rainbowLayer',
    animationDuration: '1.5s',
    description: 'Multi-layered rainbow text with wave animation - inspired by svg-banners'
  },
  
  // High Priority Effects
  'luminance-glow': {
    name: 'luminance-glow',
    label: 'Luminance Glow',
    colors: ['ffffff', 'cccccc', '999999'],
    gradientType: 'luminance',
    animationDuration: '3s',
    description: 'Text with luminous glow effect that reveals gradually'
  },
  'rainbow-wave': {
    name: 'rainbow-wave',
    label: 'Rainbow Wave',
    colors: ['ff0000', 'ff8000', 'ffff00', '80ff00', '00ff00', '00ff80', '00ffff', '0080ff', '0000ff', '8000ff', 'ff00ff', 'ff0080'],
    gradientType: 'rainbow',
    animationDuration: '1.5s',
    description: 'Multi-colored text with rainbow wave animation'
  },
  'border-draw': {
    name: 'border-draw',
    label: 'Border Draw',
    colors: ['19f6e8', '00bfff', '40e0d0'],
    gradientType: 'textBox',
    animationDuration: '1s',
    description: 'Text with animated border drawing effect'
  },
  
  // Medium Priority Effects  
  'glitch-cyber': {
    name: 'glitch-cyber',
    label: 'Glitch Cyber',
    colors: ['ffffff', '67f3da', 'f16f6f'],
    gradientType: 'glitch',
    animationDuration: '2.5s',
    description: 'Cyberpunk glitch effect with color separation'
  },
  'typewriter-terminal': {
    name: 'typewriter-terminal',
    label: 'Typewriter Terminal',
    colors: ['00ff00', '00cc00', '009900'],
    gradientType: 'typewriter',
    animationDuration: '4s',
    description: 'Terminal-style typewriter effect with gradient'
  },
  
  // Enhanced versions of existing gradients
  'neon-luminance': {
    name: 'neon-luminance',
    label: 'Neon Luminance',
    colors: ['ff00ff', '00ffff', 'ffffff'],
    gradientType: 'luminance',
    animationDuration: '2.5s',
    description: 'Neon colors with luminous glow effect'
  },
  'fire-luminance': {
    name: 'fire-luminance',
    label: 'Fire Luminance',
    colors: ['ff4500', 'ff8c00', 'ffd700', 'ffffff'],
    gradientType: 'luminance',
    animationDuration: '3.5s',
    description: 'Fire-like colors with luminous glow'
  },
  'ocean-rainbow': {
    name: 'ocean-rainbow',
    label: 'Ocean Rainbow',
    colors: ['0066cc', '0099ff', '00ccff', '66ffff', '99ffff', 'ccffff'],
    gradientType: 'rainbow',
    animationDuration: '2s',
    description: 'Ocean-themed rainbow wave effect'
  },
  // Enhanced Luminance Effects - Inspired by svg-banners example
  'luminance-reveal': {
    name: 'luminance-reveal',
    label: 'Luminance Reveal',
    colors: ['ffd700', 'ffff00', 'ffa500', 'ffffff'],
    gradientType: 'luminanceEnhanced',
    animationDuration: '4s',
    description: 'Luminance with background-clip text reveal and letter-spacing animation'
  },
  'aurora-luminance': {
    name: 'aurora-luminance',
    label: 'Aurora Luminance',
    colors: ['00ffaa', '00ffff', '66ccff', '9966ff', 'ffffff'],
    gradientType: 'luminanceEnhanced',
    animationDuration: '4s',
    description: 'Aurora borealis-inspired luminance reveal with gradient text'
  }
}; 