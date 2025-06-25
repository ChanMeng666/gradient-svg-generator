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

// 🎨 ABSTRACT SERIES - Conceptual, experimental, and avant-garde designs
const abstractTemplates = {
  kandinskyComposition: {
    name: 'kandinsky-composition',
    label: 'Kandinsky Composition',
    description: 'Abstract expressionism with geometric forms and bold color theory',
    colors: ['000000', 'ff0000', '0000ff', 'ffff00', 'ffffff'],
    gradientType: 'abstract-forms',
    animationDuration: '20s'
  },

  mondriancubism: {
    name: 'mondrian-cubism',
    label: 'Mondrian Cubism',
    description: 'Neo-plasticism with primary colors and geometric grid patterns',
    colors: ['000000', 'ffffff', 'ff0000', '0000ff', 'ffff00'],
    gradientType: 'grid-composition',
    animationDuration: '15s'
  },

  pollockDrip: {
    name: 'pollock-drip',
    label: 'Pollock Drip',
    description: 'Action painting with chaotic drips and spontaneous color splashes',
    colors: ['1a1a1a', '8b4513', 'ff4500', 'ffd700', 'ffffff'],
    gradientType: 'drip-painting',
    animationDuration: '12s'
  },

  rothkoColorField: {
    name: 'rothko-color-field',
    label: 'Rothko Color Field',
    description: 'Meditative color field painting with soft atmospheric boundaries',
    colors: ['8b0000', 'dc143c', 'ff6347', 'ffa500', 'ffd700'],
    gradientType: 'color-field',
    animationDuration: '25s'
  },

  fractalMandelbrot: {
    name: 'fractal-mandelbrot',
    label: 'Fractal Mandelbrot',
    description: 'Mathematical beauty with infinite fractal patterns and iterations',
    colors: ['000033', '4b0082', '8b00ff', 'ff00ff', '00ffff'],
    gradientType: 'fractal-zoom',
    animationDuration: '18s'
  },

  suprematistMalevich: {
    name: 'suprematist-malevich',
    label: 'Suprematist Malevich',
    description: 'Pure geometric suprematism with floating forms in space',
    colors: ['000000', 'ffffff', 'ff0000', '808080', 'c0c0c0'],
    gradientType: 'floating-forms',
    animationDuration: '22s'
  },

  minimalistAgnes: {
    name: 'minimalist-agnes',
    label: 'Minimalist Agnes',
    description: 'Minimal color gradients with subtle chromatic progressions',
    colors: ['e6e6fa', 'd8bfd8', 'dda0dd', 'da70d6', 'ba55d3'],
    gradientType: 'chromatic-progression',
    animationDuration: '30s'
  },

  constructivistRodchenko: {
    name: 'constructivist-rodchenko',
    label: 'Constructivist Rodchenko',
    description: 'Revolutionary constructivism with dynamic diagonal compositions',
    colors: ['000000', 'ff0000', 'ffffff', '808080', 'ffff00'],
    gradientType: 'diagonal-construction',
    animationDuration: '14s'
  },

  opArtVasarely: {
    name: 'op-art-vasarely',
    label: 'Op Art Vasarely',
    description: 'Optical illusions with kinetic patterns and visual vibrations',
    colors: ['000000', 'ffffff', '808080', 'c0c0c0', 'a9a9a9'],
    gradientType: 'optical-illusion',
    animationDuration: '8s'
  },

  dadaistTzara: {
    name: 'dadaist-tzara',
    label: 'Dadaist Tzara',
    description: 'Anti-art dadaism with random collage and chance operations',
    colors: ['2c2c2c', '8b4513', 'ff6347', '32cd32', '4169e1'],
    gradientType: 'random-collage',
    animationDuration: '16s'
  },

  conceptualKosuth: {
    name: 'conceptual-kosuth',
    label: 'Conceptual Kosuth',
    description: 'Conceptual art exploring ideas and language as visual medium',
    colors: ['f5f5f5', 'e8e8e8', 'd3d3d3', '696969', '000000'],
    gradientType: 'concept-text',
    animationDuration: '35s'
  },

  fluxusNam: {
    name: 'fluxus-nam',
    label: 'Fluxus Nam',
    description: 'Experimental fluxus with intermedia and performance elements',
    colors: ['ff1493', '00ff7f', 'ffd700', '9400d3', '00ced1'],
    gradientType: 'intermedia-flux',
    animationDuration: '11s'
  }
};

module.exports = abstractTemplates; 