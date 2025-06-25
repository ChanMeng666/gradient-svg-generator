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

// 🎵 MUSIC SERIES - Audio visualization, rhythms, and sound waves
const musicTemplates = {
  synthwaveRetro: {
    name: 'synthwave-retro',
    label: 'Synthwave Retro',
    description: '80s synthwave with neon grids and retro-futuristic aesthetics',
    colors: ['1a0033', '330066', 'ff00ff', '00ffff', 'ffff00'],
    gradientType: 'synthwave-grid',
    animationDuration: '12s'
  },

  classicalViolin: {
    name: 'classical-violin',
    label: 'Classical Violin',
    description: 'Elegant violin strings with golden concert hall ambiance',
    colors: ['2c1810', '8b4513', 'cd853f', 'daa520', 'ffd700'],
    gradientType: 'violin-strings',
    animationDuration: '18s'
  },

  jazzSmokyClub: {
    name: 'jazz-smoky-club',
    label: 'Jazz Smoky Club',
    description: 'Smoky jazz club atmosphere with saxophone and dim lights',
    colors: ['1a1a1a', '2c1810', '8b4513', 'b8860b', 'ffd700'],
    gradientType: 'jazz-smoke',
    animationDuration: '20s'
  },

  electronicBeat: {
    name: 'electronic-beat',
    label: 'Electronic Beat',
    description: 'Pulsing electronic music with digital waveforms and bass drops',
    colors: ['000033', '0066cc', '00ccff', '00ff00', 'ffff00'],
    gradientType: 'digital-waveform',
    animationDuration: '8s'
  },

  rockConcertStage: {
    name: 'rock-concert-stage',
    label: 'Rock Concert Stage',
    description: 'High-energy rock concert with stage lights and crowd energy',
    colors: ['1a1a1a', '660000', 'ff0000', 'ffa500', 'ffffff'],
    gradientType: 'stage-lights',
    animationDuration: '10s'
  },

  operaGrandHall: {
    name: 'opera-grand-hall',
    label: 'Opera Grand Hall',
    description: 'Majestic opera house with red velvet and golden acoustics',
    colors: ['8b0000', 'dc143c', 'b8860b', 'daa520', 'ffd700'],
    gradientType: 'opera-acoustics',
    animationDuration: '22s'
  },

  ambientSoundscape: {
    name: 'ambient-soundscape',
    label: 'Ambient Soundscape',
    description: 'Ethereal ambient music with floating sound particles',
    colors: ['2e2e54', '5c5c8a', '8a8ac7', 'b8b8d6', 'e6e6f2'],
    gradientType: 'sound-particles',
    animationDuration: '25s'
  },

  orchestralSymphony: {
    name: 'orchestral-symphony',
    label: 'Orchestral Symphony',
    description: 'Full orchestra with dynamic conductor movements and harmony',
    colors: ['000000', '2c2c2c', '8b4513', 'cd853f', 'ffd700'],
    gradientType: 'conductor-waves',
    animationDuration: '30s'
  },

  dubstepDrop: {
    name: 'dubstep-drop',
    label: 'Dubstep Drop',
    description: 'Intense dubstep with bass wobbles and frequency modulation',
    colors: ['0a0a0a', '1a0033', '8b00ff', '00ff00', 'ffff00'],
    gradientType: 'bass-wobble',
    animationDuration: '6s'
  },

  pianoElegant: {
    name: 'piano-elegant',
    label: 'Piano Elegant',
    description: 'Solo piano with black and white keys creating harmonic waves',
    colors: ['000000', '2c2c2c', 'ffffff', 'f5f5f5', 'e8e8e8'],
    gradientType: 'piano-keys',
    animationDuration: '16s'
  },

  choirCelestial: {
    name: 'choir-celestial',
    label: 'Choir Celestial',
    description: 'Heavenly choir with ascending harmonies and divine light',
    colors: ['f0f8ff', 'e6e6fa', 'dda0dd', 'da70d6', 'ffd700'],
    gradientType: 'choir-harmony',
    animationDuration: '24s'
  }
};

module.exports = musicTemplates; 