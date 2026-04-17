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
const prideTemplates = require('../templates/prideTemplates');
const natureTemplates = require('../templates/natureTemplates');
const techTemplates = require('../templates/techTemplates');
const artTemplates = require('../templates/artTemplates');
const emotionTemplates = require('../templates/emotionTemplates');
const materialTemplates = require('../templates/materialTemplates');
const textEffectTemplates = require('../templates/textEffectTemplates');
const futureTechTemplates = require('../features/futureTech/templates');
const artisticTemplates = require('../features/artistic/templates');
const luxuryTemplates = require('../features/luxury/templates');
const organicTemplates = require('../features/organic/templates');
const gamingTemplates = require('../features/gaming/templates');
// 新增模板类别 - 来自示例项目整合
const shapeTemplates = require('../features/shape/templates');
const animationTemplates = require('../templates/animationTemplates');
const morphingTemplates = require('../templates/morphingTemplates');
const fluidDynamicsTemplates = require('../templates/fluidDynamicsTemplates');
const dimensionalTemplates = require('../templates/dimensionalTemplates');
// 🌟 NEW: Advanced Futuristic Template Categories
const dimensionalPortalTemplates = require('../templates/dimensionalPortalTemplates');
const digitalLifeTemplates = require('../templates/digitalLifeTemplates');
const cyberAestheticsTemplates = require('../templates/cyberAestheticsTemplates');
const consciousnessStreamTemplates = require('../templates/consciousnessStreamTemplates');
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
    id: 'text-effects',
    name: 'Text Effects',
    icon: '✨',
    description: 'Advanced text animations with special visual effects',
    templates: Object.values(textEffectTemplates),
  },
  {
    id: 'future-tech',
    name: 'Future Tech',
    icon: '🚀',
    description: 'Cutting-edge sci-fi and futuristic visual effects',
    templates: Object.values(futureTechTemplates),
  },
  {
    id: 'artistic',
    name: 'Artistic',
    icon: '🎨',
    description: 'Creative art styles from watercolor to graffiti',
    templates: Object.values(artisticTemplates),
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: '👑',
    description: 'Premium materials with gold, diamond, and marble effects',
    templates: Object.values(luxuryTemplates),
  },
  {
    id: 'organic-nature',
    name: 'Organic Nature',
    icon: '🌊',
    description: 'Dynamic natural phenomena like fire, water, and aurora',
    templates: Object.values(organicTemplates),
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
    id: 'morphing',
    name: 'Morphing Effects',
    icon: '🌊',
    description: 'Advanced morphing animations with fluid transformations',
    templates: Object.values(morphingTemplates),
  },
  {
    id: 'fluid-dynamics',
    name: 'Fluid Dynamics',
    icon: '��',
    description: 'Complex fluid simulation and wave propagation effects',
    templates: Object.values(fluidDynamicsTemplates),
  },
  {
    id: 'dimensional',
    name: 'Dimensional Effects',
    icon: '🌌',
    description: 'Multi-dimensional space distortion and portal effects',
    templates: Object.values(dimensionalTemplates),
  },
  // 🌟 NEW: Advanced Futuristic Categories - 前卫未来主义设计
  {
    id: 'dimensional-portal',
    name: 'Dimensional Portal',
    icon: '🌀',
    description: '次元穿越美学 - 探索多维空间的视觉奇迹与量子隧道效应',
    templates: Object.values(dimensionalPortalTemplates),
  },
  {
    id: 'digital-life',
    name: 'Digital Life',
    icon: '🧬',
    description: '数字生命美学 - AI意识、生物科技与数字进化的前沿探索',
    templates: Object.values(digitalLifeTemplates),
  },
  {
    id: 'cyber-aesthetics',
    name: 'Cyber Aesthetics',
    icon: '🤖',
    description: '赛博美学 - 未来主义数字艺术与赛博朋克视觉革命',
    templates: Object.values(cyberAestheticsTemplates),
  },
  {
    id: 'consciousness-stream',
    name: 'Consciousness Stream',
    icon: '🧠',
    description: '意识流美学 - 心理学、哲学与精神维度的视觉化表达',
    templates: Object.values(consciousnessStreamTemplates),
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
