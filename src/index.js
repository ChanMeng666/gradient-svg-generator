const generateGradientSVG = require('./gradientGenerator');

module.exports = (req, res) => {
  const { text, color = '000000', height = 120, template = '' } = req.query;
  
  const svg = generateGradientSVG({ text, color, height, template });
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
};