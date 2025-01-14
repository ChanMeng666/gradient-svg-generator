// const generateGradientSVG = require('../../gradientGenerator');

// export default function handler(req, res) {
//   try {
//     const { text, color = '000000', height = 120, template = '' } = req.query;
    
//     if (!text) {
//       // 如果没有文本参数，返回一个默认的SVG
//       const defaultSvg = generateGradientSVG({ 
//         text: 'Gradient SVG', 
//         color: '000000', 
//         height: 120 
//       });
//       res.setHeader('Content-Type', 'image/svg+xml');
//       return res.send(defaultSvg);
//     }

//     const svg = generateGradientSVG({ text, color, height, template });
//     res.setHeader('Content-Type', 'image/svg+xml');
//     res.send(svg);
//   } catch (error) {
//     console.error('Error generating SVG:', error);
//     res.status(500).json({ error: 'Failed to generate SVG' });
//   }
// } 




// svg.js
const generateGradientSVG = require('../../gradientGenerator');

export default function handler(req, res) {
  try {
    // 获取基本参数
    const {
      text,
      height = 120,
      template = '',
      gradientType = 'horizontal',
      duration = '6s'
    } = req.query;

    // 处理多个颜色参数
    const colors = [];
    for (let i = 0; ; i++) {
      const color = req.query[`color${i}`];
      if (!color) break;
      colors.push(color);
    }

    // 如果没有颜色参数，使用默认颜色
    if (colors.length === 0) {
      colors.push('000000');
    }

    if (!text) {
      // 如果没有文本参数，返回一个默认的SVG
      const defaultSvg = generateGradientSVG({
        text: 'Gradient SVG',
        colors: ['000000'],
        height: 120,
        gradientType: 'horizontal',
        duration: '6s'
      });
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.send(defaultSvg);
    }

    const svg = generateGradientSVG({
      text,
      colors,
      height,
      gradientType,
      duration,
      template
    });

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error('Error generating SVG:', error);
    res.status(500).json({ error: 'Failed to generate SVG' });
  }
}