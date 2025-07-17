// Import all template files
import basicTemplates from '../templates/basicTemplates';
import prideTemplates from '../templates/prideTemplates';
import natureTemplates from '../templates/natureTemplates';
import techTemplates from '../templates/techTemplates';
import artTemplates from '../templates/artTemplates';
import emotionTemplates from '../templates/emotionTemplates';
import materialTemplates from '../templates/materialTemplates';
import textEffectTemplates from '../templates/textEffectTemplates';
import futureTechTemplates from '../templates/futureTechTemplates';
import artisticTemplates from '../templates/artisticTemplates';
import luxuryTemplates from '../templates/luxuryTemplates';
import organicTemplates from '../templates/organicTemplates';
import gamingTemplates from '../templates/gamingTemplates';
import shapeTemplates from '../templates/shapeTemplates';
import animationTemplates from '../templates/animationTemplates';
import morphingTemplates from '../templates/morphingTemplates';
import fluidDynamicsTemplates from '../templates/fluidDynamicsTemplates';
import dimensionalTemplates from '../templates/dimensionalTemplates';
import dimensionalPortalTemplates from '../templates/dimensionalPortalTemplates';
import digitalLifeTemplates from '../templates/digitalLifeTemplates';
import cyberAestheticsTemplates from '../templates/cyberAestheticsTemplates';
import consciousnessStreamTemplates from '../templates/consciousnessStreamTemplates';

// Legacy support - import template categories if it exists
let templateCategories = [];
try {
  const categories = require('../data/templateCategories');
  templateCategories = categories.default || categories;
} catch (e) {
  // File doesn't exist, use new system
}

// Combine all templates
const allTemplateGroups = [
  basicTemplates,
  prideTemplates,
  natureTemplates,
  techTemplates,
  artTemplates,
  emotionTemplates,
  materialTemplates,
  textEffectTemplates,
  futureTechTemplates,
  artisticTemplates,
  luxuryTemplates,
  organicTemplates,
  gamingTemplates,
  shapeTemplates,
  animationTemplates,
  morphingTemplates,
  fluidDynamicsTemplates,
  dimensionalTemplates,
  dimensionalPortalTemplates,
  digitalLifeTemplates,
  cyberAestheticsTemplates,
  consciousnessStreamTemplates,
];

// Get all templates as a flat array
export function getAllTemplates() {
  return allTemplateGroups.flat().map(template => ({
    ...template,
    displayName: template.label || template.displayName || template.name,
    category: template.category || 'basic'
  }));
}

// Legacy function - Create a flat map of all templates
const getAllTemplatesMap = () => {
  const allTemplates = {};
  
  // Use new template system
  getAllTemplates().forEach(template => {
    if (template && template.name) {
      allTemplates[template.name] = template;
    }
  });
  
  // Legacy support
  if (templateCategories && Array.isArray(templateCategories)) {
    templateCategories.forEach(category => {
      if (category && category.templates && Array.isArray(category.templates)) {
        category.templates.forEach(template => {
          if (template && template.name) {
            allTemplates[template.name] = template;
          }
        });
      }
    });
  }
  
  return allTemplates;
};

// Get templates by category
export function getTemplatesByCategory(category) {
  return getAllTemplates().filter(template => template.category === category);
}

// Get unique categories with metadata
export function getCategories() {
  const categoryMap = {
    basic: { id: 'basic', name: 'Basic', icon: '🎨' },
    pride: { id: 'pride', name: 'Pride', icon: '🏳️‍🌈' },
    nature: { id: 'nature', name: 'Nature', icon: '🌿' },
    tech: { id: 'tech', name: 'Tech', icon: '⚡' },
    art: { id: 'art', name: 'Art', icon: '🎭' },
    emotion: { id: 'emotion', name: 'Emotion', icon: '💫' },
    material: { id: 'material', name: 'Material', icon: '💎' },
    textEffects: { id: 'textEffects', name: 'Text Effects', icon: '✨' },
    futureTech: { id: 'futureTech', name: 'Future Tech', icon: '🚀' },
    artistic: { id: 'artistic', name: 'Artistic', icon: '🎨' },
    luxury: { id: 'luxury', name: 'Luxury', icon: '👑' },
    organicNature: { id: 'organicNature', name: 'Organic', icon: '🌊' },
    gaming: { id: 'gaming', name: 'Gaming', icon: '🎮' },
    shape: { id: 'shape', name: 'Shape', icon: '⚫' },
    animation: { id: 'animation', name: 'Animation', icon: '🎬' },
    morphing: { id: 'morphing', name: 'Morphing', icon: '🌊' },
    fluidDynamics: { id: 'fluidDynamics', name: 'Fluid', icon: '💧' },
    dimensional: { id: 'dimensional', name: 'Dimensional', icon: '🌌' },
    dimensionalPortal: { id: 'dimensionalPortal', name: 'Portal', icon: '🌀' },
    digitalLife: { id: 'digitalLife', name: 'Digital Life', icon: '🧬' },
    cyberAesthetics: { id: 'cyberAesthetics', name: 'Cyber', icon: '🤖' },
    consciousness: { id: 'consciousness', name: 'Consciousness', icon: '🧠' },
  };

  // Get unique categories from templates
  const uniqueCategories = [...new Set(getAllTemplates().map(t => t.category))];
  
  return uniqueCategories
    .map(cat => categoryMap[cat] || { id: cat, name: cat, icon: '📦' })
    .filter(Boolean);
}

// Search templates
export function searchTemplates(query) {
  const lowercaseQuery = query.toLowerCase();
  return getAllTemplates().filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.displayName.toLowerCase().includes(lowercaseQuery) ||
    template.category.toLowerCase().includes(lowercaseQuery)
  );
}

// Get template by name
export function getTemplateByName(name) {
  const template = allTemplateGroups.flat().find(t => t.name === name);
  if (template) {
    return {
      ...template,
      displayName: template.label || template.displayName || template.name,
      category: template.category || 'basic'
    };
  }
  return null;
}

// Legacy function - Get template configuration by name
export const getTemplateConfig = (templateName) => {
  if (!templateName || typeof templateName !== 'string') {
    return null;
  }
  
  const allTemplates = getAllTemplatesMap();
  
  if (!allTemplates[templateName]) {
    console.warn(`templateUtils: Template '${templateName}' not found`);
    return null;
  }
  
  return allTemplates[templateName];
};

// Legacy function - Get template category by template name
export const getTemplateCategoryByName = (templateName) => {
  if (!templateName || typeof templateName !== 'string') {
    return 'basic';
  }
  
  const template = getTemplateByName(templateName);
  return template ? template.category : 'basic';
};

// Get featured templates
export function getFeaturedTemplates() {
  const featured = [
    'hologram-matrix',
    'quantum-field',
    'neon-arcade',
    'burning-flame',
    'sunset-gold',
    'ocean-heart',
    'crystal-prism',
    'rainbow-wave',
  ];
  
  return featured
    .map(name => getTemplateByName(name))
    .filter(Boolean);
}

// Get popular templates (mock data for now)
export function getPopularTemplates() {
  const popular = [
    'wave-flow',          // replaced gradient-wave
    'aurora-borealis',    // replaced aurora-flow
    'plasma-field',       // exists
    'cosmic-voyage',      // replaced cosmic-dust
    'neon-pulse',         // exists
    'matrix-code',        // replaced data-stream to avoid duplicate
  ];
  
  return popular
    .map(name => getTemplateByName(name))
    .filter(Boolean)
    .map((template, index) => ({
      ...template,
      uses: Math.floor(Math.random() * 2000) + 500
    }));
}

// Legacy function - Get URL search parameters
export const getUrlParams = () => {
  if (typeof window === 'undefined') return {};
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    
    return params;
  } catch (error) {
    console.error('templateUtils: Error parsing URL params', error);
    return {};
  }
};

// Legacy function - Apply URL parameters to config
export const applyUrlParamsToConfig = (urlParams) => {
  const config = {};
  
  if (!urlParams || typeof urlParams !== 'object') {
    return config;
  }
  
  if (urlParams.text && typeof urlParams.text === 'string') {
    config.text = urlParams.text;
  }
  
  if (urlParams.template && typeof urlParams.template === 'string') {
    const templateConfig = getTemplateConfig(urlParams.template);
    if (templateConfig) {
      config.template = templateConfig.name;
      config.colors = templateConfig.colors || ['000000'];
      config.gradientType = templateConfig.gradientType || 'horizontal';
      config.animationDuration = parseInt(templateConfig.animationDuration) || 6;
    }
  }
  
  return config;
};