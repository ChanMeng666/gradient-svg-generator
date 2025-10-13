/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 */

// 借鉴自 svg-banners 项目的动画效果模板
module.exports = {
  'glitch-matrix': {
    name: 'glitch-matrix',
    label: 'Glitch Matrix',
    colors: ['000000', '67f3da', 'f16f6f', '333333'],
    gradientType: 'glitch',
    animationDuration: '2.5s',
    description: 'Digital glitch effect with matrix-style distortion'
  },
  'typewriter-code': {
    name: 'typewriter-code',
    label: 'Typewriter Code',
    colors: ['000000', '00ff00', '008000', '333333'],
    gradientType: 'typewriter',
    animationDuration: '4s',
    description: 'Retro typewriter effect with code-like animation'
  },
  'luminance-glow': {
    name: 'luminance-glow',
    label: 'Luminance Glow',
    colors: ['ffd700', 'ffff00', 'ffa500', 'ff6347'],
    gradientType: 'luminance',
    animationDuration: '3s',
    description: 'Pulsating luminance with warm glow effect'
  },
  'rainbow-wave': {
    name: 'rainbow-wave',
    label: 'Rainbow Wave',
    colors: ['ff0000', 'ff8000', 'ffff00', '00ff00', '0080ff', '8000ff'],
    gradientType: 'rainbow',
    animationDuration: '6s',
    description: 'Dancing rainbow colors in wave motion'
  },
  'text-box-popup': {
    name: 'text-box-popup',
    label: 'Text Box Popup',
    colors: ['ffffff', 'f0f0f0', '333333', '666666'],
    gradientType: 'textBox',
    animationDuration: '2s',
    description: 'Clean text box with popup animation'
  },
  'origin-fade': {
    name: 'origin-fade',
    label: 'Origin Fade',
    colors: ['667eea', '764ba2', 'f093fb', 'f5576c'],
    gradientType: 'radial',
    animationDuration: '5s',
    description: 'Subtle origin fade effect with smooth transitions'
  },
  'cyber-scan': {
    name: 'cyber-scan',
    label: 'Cyber Scan',
    colors: ['00ffff', '0080ff', '8000ff', '000080'],
    gradientType: 'horizontal',
    animationDuration: '3s',
    description: 'Futuristic cyber scanning animation'
  },
  'retro-terminal': {
    name: 'retro-terminal',
    label: 'Retro Terminal',
    colors: ['000000', '00ff00', '008000', '004000'],
    gradientType: 'vertical',
    animationDuration: '4s',
    description: 'Classic retro terminal green-on-black effect'
  },
  'neon-pulse': {
    name: 'neon-pulse',
    label: 'Neon Pulse',
    colors: ['ff00ff', '00ffff', 'ff0080', '8000ff'],
    gradientType: 'pulse',
    animationDuration: '2s',
    description: 'Vibrant neon colors with pulsing animation'
  },
  'hologram-flicker': {
    name: 'hologram-flicker',
    label: 'Hologram Flicker',
    colors: ['00bfff', '87ceeb', '40e0d0', '0000ff'],
    gradientType: 'diamond',
    animationDuration: '3.5s',
    description: 'Holographic flicker effect with blue tones'
  },
  'data-corruption': {
    name: 'data-corruption',
    label: 'Data Corruption',
    colors: ['ff0000', '800000', '400000', '000000'],
    gradientType: 'glitch',
    animationDuration: '2s',
    description: 'Data corruption glitch with red error tones'
  },
  'spectrum-analyzer': {
    name: 'spectrum-analyzer',
    label: 'Spectrum Analyzer',
    colors: ['ff0000', 'ff8000', 'ffff00', '00ff00', '0080ff', '8000ff'],
    gradientType: 'vertical',
    animationDuration: '1.5s',
    description: 'Audio spectrum analyzer visualization'
  },
  // Enhanced Effects - Inspired by svg-banners example project
  'cyber-glitch-enhanced': {
    name: 'cyber-glitch-enhanced',
    label: 'Cyber Glitch Enhanced',
    colors: ['1a1a2e', '67f3da', 'f16f6f', '333333'],
    gradientType: 'glitchEnhanced',
    animationDuration: '3s',
    description: 'Enhanced glitch with chromatic aberration and clip-path effects'
  },
  'data-corruption-pro': {
    name: 'data-corruption-pro',
    label: 'Data Corruption Pro',
    colors: ['0a0a0f', 'ff006e', '00d9ff', '1a1a2e'],
    gradientType: 'glitchEnhanced',
    animationDuration: '3s',
    description: 'Advanced data corruption with sophisticated RGB offset'
  },
  'border-reveal': {
    name: 'border-reveal',
    label: 'Border Reveal',
    colors: ['0f0f1e', '19f6e8', 'ffffff', '00d9ff'],
    gradientType: 'borderDrawing',
    animationDuration: '2.5s',
    description: 'Animated border drawing with stroke-dasharray reveal'
  },
  'terminal-frame': {
    name: 'terminal-frame',
    label: 'Terminal Frame',
    colors: ['000000', '00ff00', 'ffffff', '008000'],
    gradientType: 'borderDrawing',
    animationDuration: '2.5s',
    description: 'Terminal-style frame with drawing animation'
  },
  'rainbow-wave-cascade': {
    name: 'rainbow-wave-cascade',
    label: 'Rainbow Wave Cascade',
    colors: ['DEBF40', '5ACB3C', '44A3F7', 'CF52EB', 'D14B3D', 'D49C3D', 'FFFFFF'],
    gradientType: 'layeredWave',
    animationDuration: '1.5s',
    description: 'Multi-layered rainbow with cascading wave motion'
  },
  'hacker-terminal-pro': {
    name: 'hacker-terminal-pro',
    label: 'Hacker Terminal Pro',
    colors: ['191919', '00ff00', '00ff00', '004400'],
    gradientType: 'typewriterEnhanced',
    animationDuration: '4s',
    description: 'Enhanced terminal typewriter with glowing cursor'
  }
}; 