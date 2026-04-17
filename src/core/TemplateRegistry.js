/**
 * TemplateRegistry - Template Loading System
 *
 * This module provides template loading for SVG gradient generation.
 * Uses static imports to ensure proper Webpack bundling.
 */

// Static imports for all template modules
const basicTemplates = require('../features/basic/templates');
const prideTemplates = require('../features/pride/templates');
const natureTemplates = require('../features/nature/templates');
const techTemplates = require('../features/tech/templates');
const artTemplates = require('../features/art/templates');
const emotionTemplates = require('../features/emotion/templates');
const materialTemplates = require('../features/material/templates');
const textEffectTemplates = require('../templates/textEffectTemplates');
const luxuryTemplates = require('../features/luxury/templates');
const gamingTemplates = require('../features/gaming/templates');
const shapeTemplates = require('../features/shape/templates');
const animationTemplates = require('../features/animation/templates');
const morphingTemplates = require('../templates/morphingTemplates');
const fluidsTemplates = require('../features/fluids/templates');
const consciousnessStreamTemplates = require('../templates/consciousnessStreamTemplates');
const lightShadowTemplates = require('../features/lightShadow/templates');
const culinaryLiquidTemplates = require('../features/culinaryLiquid/templates');
const patternTemplates = require('../features/pattern/templates');
const metallicTemplates = require('../features/metallic/templates');
const pathTextTemplates = require('../features/pathText/templates');
const capsuleShapeTemplates = require('../templates/capsuleShapeTemplates');
const githubProfileTemplates = require('../features/githubProfile/templates');

// Category metadata with pre-loaded modules
const CATEGORY_REGISTRY = {
  basic: { name: 'Basic', icon: '🎨', templates: basicTemplates },
  pride: { name: 'Pride', icon: '🏳️‍🌈', templates: prideTemplates },
  nature: { name: 'Nature', icon: '🌿', templates: natureTemplates },
  tech: { name: 'Tech', icon: '⚡', templates: techTemplates },
  art: { name: 'Art', icon: '🎭', templates: artTemplates },
  emotion: { name: 'Emotion', icon: '💫', templates: emotionTemplates },
  material: { name: 'Material', icon: '💎', templates: materialTemplates },
  textEffects: { name: 'Text Effects', icon: '✨', templates: textEffectTemplates },
  luxury: { name: 'Luxury', icon: '👑', templates: luxuryTemplates },
  gaming: { name: 'Gaming', icon: '🎮', templates: gamingTemplates },
  shape: { name: 'Shape', icon: '⚫', templates: shapeTemplates },
  animation: { name: 'Animation', icon: '🎬', templates: animationTemplates },
  morphing: { name: 'Morphing', icon: '🌊', templates: morphingTemplates },
  fluids: { name: 'Fluids', icon: '💧', templates: fluidsTemplates },
  consciousness: { name: 'Consciousness', icon: '🧠', templates: consciousnessStreamTemplates },
  lightShadow: { name: 'Light & Shadow', icon: '💡', templates: lightShadowTemplates },
  culinaryLiquid: { name: 'Culinary', icon: '☕', templates: culinaryLiquidTemplates },
  pattern: { name: 'Pattern', icon: '🔷', templates: patternTemplates },
  metallic: { name: 'Metallic', icon: '✨', templates: metallicTemplates },
  pathText: { name: 'Path Animation', icon: '✍️', templates: pathTextTemplates },
  capsuleShape: { name: 'Capsule Effects', icon: '💊', templates: capsuleShapeTemplates },
  githubProfile: { name: 'GitHub Profile', icon: '🏷️', templates: githubProfileTemplates },
};

// Cache for loaded templates
const templateCache = new Map();
const categoryTemplatesCache = new Map();

/**
 * Load templates for a specific category
 * @param {string} categoryId - The category identifier
 * @returns {Array} Array of templates for the category
 */
function loadCategoryTemplates(categoryId) {
  if (categoryTemplatesCache.has(categoryId)) {
    return categoryTemplatesCache.get(categoryId);
  }

  const category = CATEGORY_REGISTRY[categoryId];
  if (!category) {
    console.warn(`TemplateRegistry: Unknown category '${categoryId}'`);
    return [];
  }

  // Use pre-loaded templates from static imports
  const templateModule = category.templates;
  const templates = normalizeTemplateModule(templateModule, categoryId);

  // Cache the results
  categoryTemplatesCache.set(categoryId, templates);

  // Also cache individual templates by name
  templates.forEach((template) => {
    if (template.name) {
      templateCache.set(template.name, template);
    }
  });

  return templates;
}

/**
 * Normalize template module to consistent array format
 * @param {Object|Array} module - The loaded template module
 * @param {string} categoryId - The category identifier
 * @returns {Array} Normalized array of templates
 */
function normalizeTemplateModule(module, categoryId) {
  const templates = [];

  if (Array.isArray(module)) {
    module.forEach((template) => {
      if (template && template.name) {
        templates.push({
          ...template,
          displayName: template.label || template.displayName || template.name,
          category: template.category || categoryId,
        });
      }
    });
  } else if (typeof module === 'object' && module !== null) {
    // Handle default export
    const data = module.default || module;

    if (Array.isArray(data)) {
      return normalizeTemplateModule(data, categoryId);
    }

    Object.values(data).forEach((template) => {
      if (template && typeof template === 'object' && template.name) {
        templates.push({
          ...template,
          displayName: template.label || template.displayName || template.name,
          category: template.category || categoryId,
        });
      }
    });
  }

  return templates;
}

/**
 * Get a specific template by name (lazy loads category if needed)
 * @param {string} templateName - The template name
 * @returns {Object|null} The template or null if not found
 */
function getTemplate(templateName) {
  // Check cache first
  if (templateCache.has(templateName)) {
    return templateCache.get(templateName);
  }

  // Search through all categories (loading them as needed)
  for (const categoryId of Object.keys(CATEGORY_REGISTRY)) {
    const templates = loadCategoryTemplates(categoryId);
    const found = templates.find((t) => t.name === templateName);
    if (found) {
      return found;
    }
  }

  return null;
}

/**
 * Get all templates (loads all categories)
 * Note: Use sparingly - prefer getTemplatesByCategory for lazy loading
 * @returns {Array} All templates
 */
function getAllTemplates() {
  const allTemplates = [];
  const seenNames = new Set();

  for (const categoryId of Object.keys(CATEGORY_REGISTRY)) {
    const templates = loadCategoryTemplates(categoryId);
    templates.forEach((template) => {
      if (!seenNames.has(template.name)) {
        seenNames.add(template.name);
        allTemplates.push(template);
      }
    });
  }

  return allTemplates;
}

/**
 * Get templates by category (lazy loads only the requested category)
 * @param {string} categoryId - The category identifier
 * @returns {Array} Templates for the category
 */
function getTemplatesByCategory(categoryId) {
  return loadCategoryTemplates(categoryId);
}

/**
 * Get all category metadata (does not load templates)
 * @returns {Array} Array of category objects
 */
function getCategories() {
  return Object.entries(CATEGORY_REGISTRY).map(([id, meta]) => ({
    id,
    name: meta.name,
    icon: meta.icon,
  }));
}

/**
 * Get category IDs that have been loaded
 * @returns {Array} Array of loaded category IDs
 */
function getLoadedCategories() {
  return Array.from(categoryTemplatesCache.keys());
}

/**
 * Preload specific categories (useful for SSR or predictive loading)
 * @param {Array} categoryIds - Categories to preload
 */
function preloadCategories(categoryIds) {
  categoryIds.forEach((id) => loadCategoryTemplates(id));
}

/**
 * Clear the template cache (useful for hot reloading in development)
 */
function clearCache() {
  templateCache.clear();
  categoryTemplatesCache.clear();
}

/**
 * Get cache statistics
 * @returns {Object} Cache stats
 */
function getCacheStats() {
  return {
    templatesLoaded: templateCache.size,
    categoriesLoaded: categoryTemplatesCache.size,
    totalCategories: Object.keys(CATEGORY_REGISTRY).length,
  };
}

module.exports = {
  getTemplate,
  getAllTemplates,
  getTemplatesByCategory,
  getCategories,
  getLoadedCategories,
  preloadCategories,
  clearCache,
  getCacheStats,
  CATEGORY_REGISTRY,
};
