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

const basicTemplates = {
  'sunset-gold': {
    colors: ['ffd700', 'ff8c00', 'ff4500'],
    gradientType: 'horizontal',
    animationDuration: '6s'
  },
  'ocean-heart': {
    colors: ['00ffff', '0080ff', '0000ff'],
    gradientType: 'vertical',
    animationDuration: '8s'
  },
  'emerald-forest': {
    colors: ['50c878', '228b22', '006400'],
    gradientType: 'diagonal',
    animationDuration: '7s'
  },
  'violet-dream': {
    colors: ['9400d3', '8a2be2', '4b0082'],
    gradientType: 'circular',
    animationDuration: '10s'
  },
  'neon-city': {
    colors: ['ff1493', 'ff00ff', '00ffff'],
    gradientType: 'horizontal',
    animationDuration: '5s'
  },
  'midnight-ocean': {
    colors: ['000046', '1CB5E0', '000046'],
    gradientType: 'vertical',
    animationDuration: '8s'
  },
  'morning-light': {
    colors: ['FFF3B0', 'FFA9A9', 'DAE2FF'],
    gradientType: 'diagonal',
    animationDuration: '10s'
  },
  'forest-mist': {
    colors: ['2AF598', '009EFD'],
    gradientType: 'radial',
    animationDuration: '12s'
  }
};

const prideTemplates = {
  'pride-rainbow': {
    colors: ['ff0000', 'ff8c00', 'ffff00', '008000', '0000ff', '4b0082'],
    gradientType: 'horizontal',
    animationDuration: '6s'
  },
  'trans-pride': {
    colors: ['55cdfc', 'f7a8b8', 'ffffff', 'f7a8b8', '55cdfc'],
    gradientType: 'horizontal',
    animationDuration: '6s'
  },
  'bi-pride': {
    colors: ['d60270', '9b4f96', '0038a8'],
    gradientType: 'horizontal',
    animationDuration: '6s'
  },
  'pan-pride': {
    colors: ['ff1b8d', 'ffd800', '00b5ff'],
    gradientType: 'horizontal',
    animationDuration: '6s'
  }
};

const natureTemplates = {
  'spring-bloom': {
    colors: ['FF96F9', '96FFC1', 'FFFF96'],
    gradientType: 'conic',
    animationDuration: '8s'
  },
  'autumn-leaves': {
    colors: ['FFB75E', 'ED8F03', 'B83603'],
    gradientType: 'diagonal',
    animationDuration: '10s'
  },
  'winter-frost': {
    colors: ['E3FDF5', 'FFE6FA', 'E3FDF5'],
    gradientType: 'radial',
    animationDuration: '15s'
  }
};

const neonTemplates = {
  'cyber-punk': {
    colors: ['FF00FF', '00FFFF', 'FF00FF'],
    gradientType: 'diagonal',
    animationDuration: '4s'
  },
  'retro-wave': {
    colors: ['FF0080', '7928CA', '4A148C'],
    gradientType: 'horizontal',
    animationDuration: '6s'
  },
  'neon-glow': {
    colors: ['00FF00', 'FFFF00', '00FF00'],
    gradientType: 'radial',
    animationDuration: '3s'
  }
};

const galaxyTemplates = {
  'nebula': {
    colors: ['8E2DE2', '4A00E0', '8E2DE2'],
    gradientType: 'conic',
    animationDuration: '20s'
  },
  'aurora': {
    colors: ['00FF9D', '00F0FF', '4A00E0'],
    gradientType: 'vertical',
    animationDuration: '15s'
  },
  'milky-way': {
    colors: ['000000', '434343', '000000'],
    gradientType: 'radial',
    animationDuration: '25s'
  }
};

const allTemplates = {
  ...basicTemplates,
  ...prideTemplates,
  ...natureTemplates,
  ...neonTemplates,
  ...galaxyTemplates
};

function getTemplateConfig(templateName, baseColor) {
  if (!templateName) {
    return {
      colors: [baseColor, baseColor],
      gradientType: 'horizontal',
      animationDuration: '6s'
    };
  }

  const template = allTemplates[templateName];
  if (!template) {
    console.warn(`Template "${templateName}" not found, using default configuration`);
    return {
      colors: [baseColor, baseColor],
      gradientType: 'horizontal',
      animationDuration: '6s'
    };
  }

  return template;
}

module.exports = {
  getTemplateConfig,
  basicTemplates,
  prideTemplates,
  natureTemplates,
  neonTemplates,
  galaxyTemplates
};