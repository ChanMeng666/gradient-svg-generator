import templateCategories from '../data/templateCategories';

// Create a flat map of all templates
const getAllTemplates = () => {
  const allTemplates = {};
  
  // 安全检查：确保模板分类数据存在且是数组
  if (!templateCategories || !Array.isArray(templateCategories)) {
    console.error('templateUtils: templateCategories is not available or not an array');
    return allTemplates;
  }
  
  templateCategories.forEach(category => {
    // 安全检查：确保分类有模板数据
    if (category && category.templates && Array.isArray(category.templates)) {
      category.templates.forEach(template => {
        // 安全检查：确保模板有名称
        if (template && template.name) {
          allTemplates[template.name] = template;
        }
      });
    }
  });
  
  return allTemplates;
};

// Get template configuration by name
export const getTemplateConfig = (templateName) => {
  // 安全检查：确保模板名称存在
  if (!templateName || typeof templateName !== 'string') {
    return null;
  }
  
  const allTemplates = getAllTemplates();
  
  if (!allTemplates[templateName]) {
    console.warn(`templateUtils: Template '${templateName}' not found`);
    return null;
  }
  
  const template = allTemplates[templateName];
  
  return template; // Return the original template object for UI consistency
};

// Get template category by template name
export const getTemplateCategoryByName = (templateName) => {
  // 安全检查：确保模板分类数据存在且是数组
  if (!templateCategories || !Array.isArray(templateCategories)) {
    console.error('templateUtils: templateCategories is not available or not an array');
    return 'basic'; // Default category
  }
  
  // 安全检查：确保模板名称存在
  if (!templateName || typeof templateName !== 'string') {
    return 'basic'; // Default category
  }
  
  for (const category of templateCategories) {
    // 安全检查：确保分类有ID和模板数据
    if (category && category.id && category.templates && Array.isArray(category.templates)) {
      const templateExists = category.templates.some(template => 
        template && template.name === templateName
      );
      if (templateExists) {
        return category.id;
      }
    }
  }
  return 'basic'; // Default category
};

// Get URL search parameters
export const getUrlParams = () => {
  // 服务器端渲染时返回空对象
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

// Apply URL parameters to config
export const applyUrlParamsToConfig = (urlParams) => {
  const config = {};
  
  // 安全检查：确保urlParams存在
  if (!urlParams || typeof urlParams !== 'object') {
    return config;
  }
  
  // Apply text parameter
  if (urlParams.text && typeof urlParams.text === 'string') {
    config.text = urlParams.text;
  }
  
  // Apply template parameter and its associated configuration
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