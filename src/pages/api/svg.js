// svg.js
const generateGradientSVG = require('../../gradientGenerator');

export default function handler(req, res) {
  try {
    // Get basic parameters
    const {
      text,
      height = 120,
      template = '',
      gradientType = 'horizontal',
      duration = '6s'
    } = req.query;

    // Handle multiple color parameters
    const colors = [];
    for (let i = 0; ; i++) {
      const color = req.query[`color${i}`];
      if (!color) break;
      colors.push(color);
    }

    // If no color parameters, use default colors
    if (colors.length === 0) {
      colors.push('000000');
    }

    if (!text) {
      // If no text parameter, return a default SVG
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