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
const basicTemplates = require('../features/basic/templates');
const prideTemplates = require('../features/pride/templates');
const natureTemplates = require('../features/nature/templates');
const techTemplates = require('../features/tech/templates');
const artTemplates = require('../features/art/templates');
const emotionTemplates = require('../features/emotion/templates');
const materialTemplates = require('../features/material/templates');
const specialtyTemplates = require('../features/specialty/templates');
const luxuryTemplates = require('../features/luxury/templates');
const gamingTemplates = require('../features/gaming/templates');
// 新增模板类别 - 来自示例项目整合
const shapeTemplates = require('../features/shape/templates');
const animationTemplates = require('../features/animation/templates');
const fluidsTemplates = require('../features/fluids/templates');
// 🌟 NEW: Pattern & Metallic Templates (inspired by example project)
const patternTemplates = require('../features/pattern/templates');
const metallicTemplates = require('../features/metallic/templates');
// 🏷️ NEW: GitHub Profile Templates (badges, banners, terminals, cards)
const githubProfileTemplates = require('../features/githubProfile/templates');

// Template categories configuration
const templateCategories = [
  {
    id: 'basic',
    name: 'Basic',
    icon: '🎨',
    description: 'Essential gradient templates for everyday use',
    templates: Object.values(basicTemplates),
  },
  {
    id: 'pride',
    name: 'Pride',
    icon: '🏳️‍🌈',
    description: 'Celebrate diversity with pride flag gradients',
    templates: Object.values(prideTemplates),
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    description: 'Natural color palettes inspired by earth and sky',
    templates: Object.values(natureTemplates),
  },
  {
    id: 'tech',
    name: 'Tech',
    icon: '⚡',
    description: 'Modern digital and technological aesthetics',
    templates: Object.values(techTemplates),
  },
  {
    id: 'art',
    name: 'Art',
    icon: '🎭',
    description: 'Artistic and creative color combinations',
    templates: Object.values(artTemplates),
  },
  {
    id: 'emotion',
    name: 'Emotion',
    icon: '💫',
    description: 'Expressive gradients that convey feelings and moods',
    templates: Object.values(emotionTemplates),
  },
  {
    id: 'material',
    name: 'Material',
    icon: '💎',
    description: 'Texture-inspired gradients mimicking real materials',
    templates: Object.values(materialTemplates),
  },
  {
    id: 'specialty',
    name: 'Specialty',
    icon: '🎯',
    description:
      'Grab-bag of misc effects: text, capsules, morphing blobs, and consciousness-stream visualizations',
    templates: Object.values(specialtyTemplates),
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: '👑',
    description: 'Premium materials with gold, diamond, and marble effects',
    templates: Object.values(luxuryTemplates),
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    description: 'Gaming aesthetics from retro pixel art to cyberpunk',
    templates: Object.values(gamingTemplates),
  },
  // 新增分类 - 来自示例项目的整合
  {
    id: 'shape',
    name: 'Shape',
    icon: '⚫',
    description: 'Geometric shapes and forms inspired by capsule-render',
    templates: Object.values(shapeTemplates),
  },
  {
    id: 'animation',
    name: 'Animation',
    icon: '🎬',
    description: 'Special animation and dynamic effects from svg-banners',
    templates: Object.values(animationTemplates),
  },
  {
    id: 'fluids',
    name: 'Fluids',
    icon: '💧',
    description:
      'Fluid dynamics, dimensional portals, and multiverse visualizations in one unified category',
    templates: Object.values(fluidsTemplates),
  },
  // 🌟 NEW: Pattern & Metallic Categories (inspired by example project)
  {
    id: 'pattern',
    name: 'Pattern',
    icon: '🔷',
    description:
      'Geometric patterns with dynamic animations - stripes, zigzags, diamonds, and more',
    templates: Object.values(patternTemplates),
  },
  {
    id: 'metallic',
    name: 'Metallic',
    icon: '✨',
    description: 'Luxurious metallic effects with shimmer, shine, and glow animations',
    templates: Object.values(metallicTemplates),
  },
  {
    id: 'github-profile',
    name: 'GitHub Profile',
    icon: '🏷️',
    description: 'Badges, banners, terminals, and cards for GitHub profile READMEs',
    templates: Object.values(githubProfileTemplates),
  },
];

module.exports = templateCategories;
