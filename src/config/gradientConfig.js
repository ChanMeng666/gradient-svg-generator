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

const TEMPLATES = {
  basic: [
    { 
      value: 'sunset-gold', 
      label: 'Sunset Gold',
      colors: ['ffd700', 'ffa500', 'ff8c00'],
      gradientType: 'horizontal',
      animationDuration: 6
    },
    { 
      value: 'ocean-heart', 
      label: 'Ocean Heart',
      colors: ['00ffff', '0000ff', '000080'],
      gradientType: 'horizontal',
      animationDuration: 6
    }
    // ... 其他基础模板
  ],
  pride: [
    {
      value: 'progress-pride',
      label: 'Progress Pride',
      colors: ['ff0000', 'ff8c00', 'ffef00', '008e45', '004dff', '760089'],
      gradientType: 'horizontal',
      animationDuration: 6
    }
    // ... 其他pride模板
  ]
};

export function getTemplateConfig(templateName, defaultColor = '000000') {
  // 在所有类别中查找模板
  for (const category of Object.values(TEMPLATES)) {
    const template = category.find(t => t.value === templateName);
    if (template) {
      return {
        colors: template.colors,
        gradientType: template.gradientType || 'horizontal',
        animationDuration: template.animationDuration || 6
      };
    }
  }

  // 如果没有找到模板，返回默认配置
  return {
    colors: [defaultColor],
    gradientType: 'horizontal',
    animationDuration: 6
  };
}

export default TEMPLATES;