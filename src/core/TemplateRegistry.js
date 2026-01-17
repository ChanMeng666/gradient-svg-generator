/**
 * TemplateRegistry - Lazy Template Loading System
 *
 * This module provides on-demand template loading to reduce initial bundle size
 * and improve startup performance. Templates are loaded by category only when accessed.
 */

// Category metadata with module paths
const CATEGORY_REGISTRY = {
  basic: { name: 'Basic', icon: '🎨', module: '../templates/basicTemplates' },
  pride: { name: 'Pride', icon: '🏳️‍🌈', module: '../templates/prideTemplates' },
  nature: { name: 'Nature', icon: '🌿', module: '../templates/natureTemplates' },
  tech: { name: 'Tech', icon: '⚡', module: '../templates/techTemplates' },
  art: { name: 'Art', icon: '🎭', module: '../templates/artTemplates' },
  emotion: { name: 'Emotion', icon: '💫', module: '../templates/emotionTemplates' },
  material: { name: 'Material', icon: '💎', module: '../templates/materialTemplates' },
  textEffects: { name: 'Text Effects', icon: '✨', module: '../templates/textEffectTemplates' },
  futureTech: { name: 'Future Tech', icon: '🚀', module: '../templates/futureTechTemplates' },
  artistic: { name: 'Artistic', icon: '🎨', module: '../templates/artisticTemplates' },
  luxury: { name: 'Luxury', icon: '👑', module: '../templates/luxuryTemplates' },
  organicNature: { name: 'Organic', icon: '🌊', module: '../templates/organicTemplates' },
  gaming: { name: 'Gaming', icon: '🎮', module: '../templates/gamingTemplates' },
  shape: { name: 'Shape', icon: '⚫', module: '../templates/shapeTemplates' },
  animation: { name: 'Animation', icon: '🎬', module: '../templates/animationTemplates' },
  morphing: { name: 'Morphing', icon: '🌊', module: '../templates/morphingTemplates' },
  fluidDynamics: { name: 'Fluid', icon: '💧', module: '../templates/fluidDynamicsTemplates' },
  dimensional: { name: 'Dimensional', icon: '🌌', module: '../templates/dimensionalTemplates' },
  dimensionalPortal: { name: 'Portal', icon: '🌀', module: '../templates/dimensionalPortalTemplates' },
  digitalLife: { name: 'Digital Life', icon: '🧬', module: '../templates/digitalLifeTemplates' },
  cyberAesthetics: { name: 'Cyber', icon: '🤖', module: '../templates/cyberAestheticsTemplates' },
  consciousness: { name: 'Consciousness', icon: '🧠', module: '../templates/consciousnessStreamTemplates' },
  weather: { name: 'Weather', icon: '🌦️', module: '../templates/weatherTemplates' },
  lightShadow: { name: 'Light & Shadow', icon: '💡', module: '../templates/lightShadowTemplates' },
  artMovement: { name: 'Art Movement', icon: '🎭', module: '../templates/artMovementTemplates' },
  culinaryLiquid: { name: 'Culinary', icon: '☕', module: '../templates/culinaryLiquidTemplates' },
  pattern: { name: 'Pattern', icon: '🔷', module: '../templates/patternTemplates' },
  metallic: { name: 'Metallic', icon: '✨', module: '../templates/metallicTemplates' },
  pathText: { name: 'Path Animation', icon: '✍️', module: '../templates/pathTextTemplates' },
  capsuleShape: { name: 'Capsule Effects', icon: '💊', module: '../templates/capsuleShapeTemplates' },
};

// Cache for loaded templates
const templateCache = new Map();
const categoryTemplatesCache = new Map();

/**
 * Load templates for a specific category (lazy)
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

  try {
    // Dynamic require for server-side (Node.js)
    const templateModule = require(category.module);
    const templates = normalizeTemplateModule(templateModule, categoryId);

    // Cache the results
    categoryTemplatesCache.set(categoryId, templates);

    // Also cache individual templates by name
    templates.forEach(template => {
      if (template.name) {
        templateCache.set(template.name, template);
      }
    });

    return templates;
  } catch (error) {
    console.error(`TemplateRegistry: Failed to load category '${categoryId}':`, error.message);
    return [];
  }
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
    module.forEach(template => {
      if (template && template.name) {
        templates.push({
          ...template,
          displayName: template.label || template.displayName || template.name,
          category: template.category || categoryId
        });
      }
    });
  } else if (typeof module === 'object' && module !== null) {
    // Handle default export
    const data = module.default || module;

    if (Array.isArray(data)) {
      return normalizeTemplateModule(data, categoryId);
    }

    Object.values(data).forEach(template => {
      if (template && typeof template === 'object' && template.name) {
        templates.push({
          ...template,
          displayName: template.label || template.displayName || template.name,
          category: template.category || categoryId
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
    const found = templates.find(t => t.name === templateName);
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
    templates.forEach(template => {
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
    icon: meta.icon
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
  categoryIds.forEach(id => loadCategoryTemplates(id));
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
    totalCategories: Object.keys(CATEGORY_REGISTRY).length
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
  CATEGORY_REGISTRY
};
