// svg.js
// Try to use new unified generator, fallback to legacy if needed
let generateGradientSVG;
try {
  const unified = require('../../core/UnifiedGradientGenerator');
  generateGradientSVG = unified.generateGradientSVG;
  console.log('✅ Using new Unified Gradient Generator');
} catch (error) {
  console.warn('⚠️  Falling back to legacy gradient generator:', error.message);
  generateGradientSVG = require('../../gradientGenerator');
}

export default function handler(req, res) {
  try {
    console.log('🚀 API: SVG generation request received', {
      query: req.query,
      url: req.url,
      timestamp: new Date().toISOString()
    });

    // Get basic parameters
    const {
      text,
      height = 120,
      template = '',
      gradientType, // Don't default - let template config provide it
      duration = '6s',
      animation = 'none',
      stroke = null,
      strokeWidth = 0,
      textBg = null,
      rotate = 0
    } = req.query;

    // Only use 'horizontal' as default if no template is provided
    const finalGradientType = gradientType || (template ? undefined : 'horizontal');

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

    // Parse numeric parameters
    const parsedStrokeWidth = parseFloat(strokeWidth) || 0;
    const parsedRotate = parseFloat(rotate) || 0;

    console.log('🚀 API: Parsed parameters', {
      text,
      height,
      template,
      gradientType: finalGradientType,
      duration,
      animation,
      stroke,
      strokeWidth: parsedStrokeWidth,
      textBg,
      rotate: parsedRotate,
      colors,
      hasTemplate: !!template
    });

    if (!text) {
      // If no text parameter, return a default SVG
      const defaultSvg = generateGradientSVG({
        text: 'Gradient SVG',
        colors: ['000000'],
        height: 120,
        gradientType: 'horizontal',
        duration: '6s',
        animation: 'none',
        stroke: null,
        strokeWidth: 0,
        textBg: null,
        rotate: 0
      });
      // Set AI-friendly headers for default SVG
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('X-API-Usage', 'free-unlimited-usage');
      res.setHeader('X-Documentation', 'https://gradient-svg-generator.vercel.app/api-docs');
      res.setHeader('X-Template-Gallery', 'https://gradient-svg-generator.vercel.app/templates');
      res.setHeader('X-Creator-Tool', 'https://gradient-svg-generator.vercel.app/create');
      
      return res.send(defaultSvg);
    }

    const svg = generateGradientSVG({
      text,
      colors,
      height,
      gradientType: finalGradientType,
      duration,
      template,
      animation,
      stroke,
      strokeWidth: parsedStrokeWidth,
      textBg,
      rotate: parsedRotate
    });

    // Set AI-friendly headers
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-API-Usage', 'free-unlimited-usage');
    res.setHeader('X-Documentation', 'https://gradient-svg-generator.vercel.app/api-docs');
    res.setHeader('X-Template-Gallery', 'https://gradient-svg-generator.vercel.app/templates');
    res.setHeader('X-Creator-Tool', 'https://gradient-svg-generator.vercel.app/create');
    
    res.send(svg);
  } catch (error) {
    console.error('Error generating SVG:', error);
    res.status(500).json({ error: 'Failed to generate SVG' });
  }
}