import { templateCategories } from '../data/templateCategories';

// Create a flat map of all templates
const getAllTemplates = () => {
  const allTemplates = {};
  
  Object.values(templateCategories).forEach(category => {
    category.templates.forEach(template => {
      allTemplates[template.name] = template;
    });
  });
  
  return allTemplates;
};

// Get template configuration by name
export const getTemplateConfig = (templateName) => {
  const allTemplates = getAllTemplates();
  
  if (!templateName || !allTemplates[templateName]) {
    return null;
  }
  
  const template = allTemplates[templateName];
  
  return template; // Return the original template object for UI consistency
};

// Get template category by template name
export const getTemplateCategoryByName = (templateName) => {
  for (const [categoryKey, category] of Object.entries(templateCategories)) {
    const templateExists = category.templates.some(template => template.name === templateName);
    if (templateExists) {
      return categoryKey;
    }
  }
  return 'basic'; // Default category
};

// Get URL search parameters
export const getUrlParams = () => {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};
  
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  
  return params;
};

// Apply URL parameters to config
export const applyUrlParamsToConfig = (urlParams) => {
  const config = {};
  
  // Apply text parameter
  if (urlParams.text) {
    config.text = urlParams.text;
  }
  
  // Apply template parameter and its associated configuration
  if (urlParams.template) {
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