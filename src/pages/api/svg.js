const generateGradientSVG = require('../../gradientGenerator');

export default function handler(req, res) {
  try {
    const { text, color = '000000', height = 120, template = '' } = req.query;
    
    if (!text) {
      // 如果没有文本参数，返回一个默认的SVG
      const defaultSvg = generateGradientSVG({ 
        text: 'Gradient SVG', 
        color: '000000', 
        height: 120 
      });
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.send(defaultSvg);
    }

    const svg = generateGradientSVG({ text, color, height, template });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error('Error generating SVG:', error);
    res.status(500).json({ error: 'Failed to generate SVG' });
  }
} 