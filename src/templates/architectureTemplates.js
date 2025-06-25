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

// 🏛️ ARCHITECTURE SERIES - Architectural styles and structural design aesthetics
const architectureTemplates = {
  gothicCathedral: {
    name: 'gothic-cathedral',
    label: 'Gothic Cathedral',
    description: 'Medieval Gothic architecture with flying buttresses and stained glass',
    colors: ['2c2c2c', '4a4a4a', '8b4513', 'cd853f', 'daa520'],
    gradientType: 'gothic-arches',
    animationDuration: '15s'
  },

  modernBauhaus: {
    name: 'modern-bauhaus',
    label: 'Modern Bauhaus',
    description: 'Clean modernist design with geometric forms and primary colors',
    colors: ['000000', 'ffffff', 'ff0000', '0000ff', 'ffff00'],
    gradientType: 'bauhaus-geometry',
    animationDuration: '10s'
  },

  artDecoSkyscraper: {
    name: 'art-deco-skyscraper',
    label: 'Art Deco Skyscraper',
    description: '1920s Art Deco with golden accents and vertical lines',
    colors: ['1a1a1a', '2c2c2c', 'b8860b', 'daa520', 'ffd700'],
    gradientType: 'vertical-deco',
    animationDuration: '12s'
  },

  brutalismConcrete: {
    name: 'brutalism-concrete',
    label: 'Brutalism Concrete',
    description: 'Raw concrete brutalist architecture with bold geometric forms',
    colors: ['3c3c3c', '5a5a5a', '787878', '969696', 'b4b4b4'],
    gradientType: 'concrete-texture',
    animationDuration: '14s'
  },

  organicBiomorphic: {
    name: 'organic-biomorphic',
    label: 'Organic Biomorphic',
    description: 'Flowing organic architecture inspired by natural forms',
    colors: ['2e8b57', '3cb371', '90ee90', 'f0e68c', 'daa520'],
    gradientType: 'organic-flow',
    animationDuration: '18s'
  },

  japaneseMinimalism: {
    name: 'japanese-minimalism',
    label: 'Japanese Minimalism',
    description: 'Zen-inspired minimalist design with natural materials',
    colors: ['f5f5dc', 'f0e68c', 'd2b48c', 'bc8f8f', '8b7355'],
    gradientType: 'zen-balance',
    animationDuration: '20s'
  },

  parametricDigital: {
    name: 'parametric-digital',
    label: 'Parametric Digital',
    description: 'Contemporary parametric design with algorithmic patterns',
    colors: ['0a0a0a', '1e1e1e', '00ffff', '0080ff', 'ffffff'],
    gradientType: 'parametric-mesh',
    animationDuration: '11s'
  },

  classicalRoman: {
    name: 'classical-roman',
    label: 'Classical Roman',
    description: 'Classical Roman architecture with marble columns and proportions',
    colors: ['f5f5dc', 'fffacd', 'deb887', 'bc8f8f', '8b7355'],
    gradientType: 'marble-columns',
    animationDuration: '16s'
  },

  deconstructivist: {
    name: 'deconstructivist',
    label: 'Deconstructivist',
    description: 'Fragmented deconstructivist architecture with angular forms',
    colors: ['1a1a1a', '333333', 'ff6b35', 'f7931e', 'ffd700'],
    gradientType: 'fragmented-angles',
    animationDuration: '9s'
  },

  islamicGeometry: {
    name: 'islamic-geometry',
    label: 'Islamic Geometry',
    description: 'Traditional Islamic patterns with intricate geometric tessellations',
    colors: ['000080', '0000cd', '4169e1', '87ceeb', 'ffd700'],
    gradientType: 'islamic-tessellation',
    animationDuration: '22s'
  }
};

module.exports = architectureTemplates; 