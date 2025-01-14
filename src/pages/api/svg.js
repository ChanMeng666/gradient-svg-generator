import TEMPLATES, { getTemplateConfig } from '../../config/gradientConfig';

export default function handler(req, res) {
  try {
    const { text = '', height = 120, template = '', gradientType = 'horizontal', duration = 6, color = '000000' } = req.query;
    
    // 获取模板配置
    const templateConfig = getTemplateConfig(template, color);
    
    // 生成 SVG
    const svg = generateSVG({
      text,
      height: parseInt(height),
      colors: templateConfig.colors,
      gradientType: templateConfig.gradientType,
      duration: parseInt(duration)
    });

    // 设置响应头
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    // 返回 SVG
    res.status(200).send(svg);
  } catch (error) {
    console.error('SVG generation error:', error);
    res.status(500).json({ error: 'Failed to generate SVG' });
  }
}

function generateSVG({ text, height, colors, gradientType, duration }) {
  const width = Math.max(text.length * (height * 0.6), height * 2); // 确保最小宽度
  
  // 生成渐变定义
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  let gradientDef = '';
  let animateElements = '';
  
  switch (gradientType) {
    case 'horizontal':
      gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">`;
      animateElements = `
        <animate attributeName="x1" values="0%;100%;0%" dur="${duration}s" repeatCount="indefinite" />
        <animate attributeName="x2" values="100%;200%;100%" dur="${duration}s" repeatCount="indefinite" />
      `;
      break;
    case 'vertical':
      gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">`;
      animateElements = `
        <animate attributeName="y1" values="0%;100%;0%" dur="${duration}s" repeatCount="indefinite" />
        <animate attributeName="y2" values="100%;200%;100%" dur="${duration}s" repeatCount="indefinite" />
      `;
      break;
    case 'diagonal':
      gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">`;
      break;
    case 'circular':
      gradientDef = `<radialGradient id="${gradientId}" cx="50%" cy="50%" r="50%">`;
      break;
    default:
      gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">`;
  }

  // 添加渐变色标
  const stops = colors.map((color, index) => {
    const offset = (index / (colors.length - 1)) * 100;
    return `<stop offset="${offset}%" style="stop-color:#${color}"/>`;
  }).join('');

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${gradientDef}
          ${stops}
          ${animateElements}
        ${gradientType === 'circular' ? '</radialGradient>' : '</linearGradient>'}
      </defs>
      
      <rect width="100%" height="100%" fill="url(#${gradientId})"/>
      
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="white"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${height * 0.4}px"
        font-weight="bold"
        style="text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
      >
        ${text}
      </text>
    </svg>
  `.trim();
} 