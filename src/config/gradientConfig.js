/*
 *
 */

/*
 *
 */

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

/*
 *
 */

// gradientConfig.js
const basicTemplates = require('../templates/basicTemplates');
const prideTemplates = require('../templates/prideTemplates');
const natureTemplates = require('../templates/natureTemplates');
const techTemplates = require('../templates/techTemplates');
const artTemplates = require('../templates/artTemplates');
const emotionTemplates = require('../templates/emotionTemplates');
const materialTemplates = require('../templates/materialTemplates');

const templates = { 
  ...basicTemplates, 
  ...prideTemplates,
  ...natureTemplates,
  ...techTemplates,
  ...artTemplates,
  ...emotionTemplates,
  ...materialTemplates
};

function getTemplateConfig(template, defaultColor = '000000') {
  if (!template || !templates[template]) {
    return {
      colors: [defaultColor, `${defaultColor}88`],
      gradientType: 'horizontal',
      animationDuration: '6s'
    };
  }

  const selectedTemplate = templates[template];
  
  return {
    colors: selectedTemplate.colors || [defaultColor, `${defaultColor}88`],
    gradientType: selectedTemplate.gradientType || 'horizontal',
    animationDuration: selectedTemplate.animationDuration || '6s',
    name: selectedTemplate.name,
    label: selectedTemplate.label,
    description: selectedTemplate.description
  };
}

// 添加一个辅助函数来验证和规范化配置
function validateConfig(config) {
  const defaultConfig = {
    colors: ['000000'],
    gradientType: 'horizontal',
    animationDuration: '6s'
  };

  // 验证颜色
  if (!Array.isArray(config.colors) || config.colors.length === 0) {
    config.colors = defaultConfig.colors;
  }

  // 验证渐变类型
  const validGradientTypes = ['horizontal', 'vertical', 'diagonal', 'circular', 'radial', 'conic', 'wave', 'spiral', 'diamond', 'burst', 'reflection', 'pulse'];
  if (!validGradientTypes.includes(config.gradientType)) {
    config.gradientType = defaultConfig.gradientType;
  }

  // 验证动画持续时间
  const duration = parseInt(config.animationDuration);
  if (isNaN(duration) || duration < 1 || duration > 20) {
    config.animationDuration = defaultConfig.animationDuration;
  } else {
    config.animationDuration = `${duration}s`;
  }

  return config;
}

module.exports = { 
  getTemplateConfig,
  validateConfig
};