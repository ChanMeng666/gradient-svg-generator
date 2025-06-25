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

// Import all template categories
const basicTemplates = require('../templates/basicTemplates');
const prideTemplates = require('../templates/prideTemplates');
const natureTemplates = require('../templates/natureTemplates');
const techTemplates = require('../templates/techTemplates');
const artTemplates = require('../templates/artTemplates');
const emotionTemplates = require('../templates/emotionTemplates');
const materialTemplates = require('../templates/materialTemplates');
const textEffectTemplates = require('../templates/textEffectTemplates');
const futureTechTemplates = require('../templates/futureTechTemplates');
const artisticTemplates = require('../templates/artisticTemplates');
const luxuryTemplates = require('../templates/luxuryTemplates');
const organicTemplates = require('../templates/organicTemplates');
const gamingTemplates = require('../templates/gamingTemplates');

// Template categories configuration
const templateCategories = [
  {
    id: 'basic',
    name: 'Basic',
    icon: '🎨',
    description: 'Essential gradient templates for everyday use',
    templates: Object.values(basicTemplates)
  },
  {
    id: 'pride',
    name: 'Pride',
    icon: '🏳️‍🌈',
    description: 'Celebrate diversity with pride flag gradients',
    templates: Object.values(prideTemplates)
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    description: 'Natural color palettes inspired by earth and sky',
    templates: Object.values(natureTemplates)
  },
  {
    id: 'tech',
    name: 'Tech',
    icon: '⚡',
    description: 'Modern digital and technological aesthetics',
    templates: Object.values(techTemplates)
  },
  {
    id: 'art',
    name: 'Art',
    icon: '🎭',
    description: 'Artistic and creative color combinations',
    templates: Object.values(artTemplates)
  },
  {
    id: 'emotion',
    name: 'Emotion',
    icon: '💫',
    description: 'Expressive gradients that convey feelings and moods',
    templates: Object.values(emotionTemplates)
  },
  {
    id: 'material',
    name: 'Material',
    icon: '💎',
    description: 'Texture-inspired gradients mimicking real materials',
    templates: Object.values(materialTemplates)
  },
  {
    id: 'text-effects',
    name: 'Text Effects',
    icon: '✨',
    description: 'Advanced text animations with special visual effects',
    templates: Object.values(textEffectTemplates)
  },
  {
    id: 'future-tech',
    name: 'Future Tech',
    icon: '🚀',
    description: 'Cutting-edge sci-fi and futuristic visual effects',
    templates: Object.values(futureTechTemplates)
  },
  {
    id: 'artistic',
    name: 'Artistic',
    icon: '🎨',
    description: 'Creative art styles from watercolor to graffiti',
    templates: Object.values(artisticTemplates)
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: '👑',
    description: 'Premium materials with gold, diamond, and marble effects',
    templates: Object.values(luxuryTemplates)
  },
  {
    id: 'organic-nature',
    name: 'Organic Nature',
    icon: '🌊',
    description: 'Dynamic natural phenomena like fire, water, and aurora',
    templates: Object.values(organicTemplates)
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    description: 'Gaming aesthetics from retro pixel art to cyberpunk',
    templates: Object.values(gamingTemplates)
  }
];

module.exports = templateCategories; 