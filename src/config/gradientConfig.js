const basicTemplates = require('../templates/basicTemplates');
const prideTemplates = require('../templates/prideTemplates');

const templates = { ...basicTemplates, ...prideTemplates };

function getTemplateConfig(template, defaultColor) {
  return templates[template] || {
    colors: [defaultColor, `${defaultColor}88`],
    gradientType: 'horizontal',
    animationDuration: '6s'
  };
}

module.exports = { getTemplateConfig };