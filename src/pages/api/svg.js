import { getTemplateConfig } from '../../config/gradientConfig';

export default function handler(req, res) {
  const { text = '', height = 120, template = '', gradientType = 'horizontal', duration = 6 } = req.query;
  
  // 获取模板配置
  const templateConfig = getTemplateConfig(template);
  
  // 生成 SVG
  const svg = generateSVG({
    text,
    height: parseInt(height),
    template,
    gradientType,
    duration: parseInt(duration),
    colors: templateConfig.colors
  });

  // 设置响应头
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  
  // 返回 SVG
  res.status(200).send(svg);
}

function generateSVG({ text, height, colors, gradientType, duration }) {
  const width = text.length * (height * 0.6); // 根据文本长度计算宽度
  
  // 生成渐变定义
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  let gradientDef = '';
  
  switch (gradientType) {
    case 'horizontal':
      gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">`;
      break;
    case 'vertical':
      gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="0%" y2="100%">`;
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

  // 添加动画
  const animate = `
    <animate
      attributeName="x1"
      values="0%;100%;0%"
      dur="${duration}s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="x2"
      values="100%;200%;100%"
      dur="${duration}s"
      repeatCount="indefinite"
    />
  `;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${gradientDef}
          ${stops}
          ${gradientType === 'horizontal' ? animate : ''}
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