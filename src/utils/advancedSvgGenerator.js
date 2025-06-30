/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 */

// 高级SVG生成器 - 整合两个示例项目的特色功能

// 生成Glitch效果 (来自svg-banners)
function generateGlitchEffect(text, colors, width, height) {
  const [bgColor, primaryColor, secondaryColor] = colors;
  
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .glitch-container {
            font-family: "Lucida Console", Monaco, monospace;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: #${bgColor};
          }
          .glitch-text {
            font-size: 3em;
            font-weight: 400;
            margin: 0;
            line-height: 1;
            animation: glitch1 2.5s infinite;
            color: #fff;
          }
          .glitch-text:nth-child(2) {
            color: #${primaryColor};
            animation: glitch2 2.5s infinite;
          }
          .glitch-text:nth-child(3) {
            color: #${secondaryColor};
            animation: glitch3 2.5s infinite;
          }
          @keyframes glitch1 {
            0%, 100% { transform: none; opacity: 1; }
            7% { transform: skew(-0.5deg, -0.9deg); opacity: 0.75; }
            10% { transform: none; opacity: 1; }
            30% { transform: skew(0.8deg, -0.1deg); opacity: 0.75; }
            35% { transform: none; opacity: 1; }
            55% { transform: skew(-1deg, 0.2deg); opacity: 0.75; }
            60% { transform: none; opacity: 1; }
            75% { transform: skew(0.4deg, 1deg); opacity: 0.75; }
            80% { transform: none; opacity: 1; }
          }
          @keyframes glitch2 {
            0%, 100% { transform: none; opacity: 0.25; }
            7% { transform: translate(-2px, -3px); opacity: 0.5; }
            10% { transform: none; opacity: 0.25; }
            30% { transform: translate(-5px, -2px); opacity: 0.5; }
            35% { transform: none; opacity: 0.25; }
            55% { transform: translate(-5px, -1px); opacity: 0.5; }
            60% { transform: none; opacity: 0.25; }
            75% { transform: translate(-2px, -6px); opacity: 0.5; }
            80% { transform: none; opacity: 0.25; }
          }
          @keyframes glitch3 {
            0%, 100% { transform: none; opacity: 0.25; }
            7% { transform: translate(2px, 3px); opacity: 0.5; }
            10% { transform: none; opacity: 0.25; }
            30% { transform: translate(5px, 2px); opacity: 0.5; }
            35% { transform: none; opacity: 0.25; }
            55% { transform: translate(5px, 1px); opacity: 0.5; }
            60% { transform: none; opacity: 0.25; }
            75% { transform: translate(2px, 6px); opacity: 0.5; }
            80% { transform: none; opacity: 0.25; }
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="glitch-container">
          <h1 class="glitch-text">${text}</h1>
          <h1 class="glitch-text">${text}</h1>
          <h1 class="glitch-text">${text}</h1>
        </div>
      </foreignObject>
    </svg>
  `;
}

// 生成Wave形状 (来自capsule-render)
function generateWaveShape(text, colors, width, height, waveType = 'wave') {
  const gradientId = `wave-gradient-${Date.now()}`;
  const colorStops = colors.map((color, index) => 
    `<stop offset="${(index / (colors.length - 1)) * 100}%" stop-color="#${color}"/>`
  ).join('');

  let pathData;
  switch (waveType) {
    case 'wave':
      pathData = `M0,${height * 0.7} Q${width * 0.25},${height * 0.3} ${width * 0.5},${height * 0.6} T${width},${height * 0.4} V${height} H0 Z`;
      break;
    case 'egg':
      pathData = `M${width * 0.5},0 Q${width * 0.8},${height * 0.3} ${width * 0.5},${height * 0.7} Q${width * 0.2},${height * 0.3} ${width * 0.5},0 Z`;
      break;
    case 'shark':
      pathData = `M0,${height} L${width * 0.3},${height * 0.2} L${width * 0.8},${height * 0.6} L${width},0 V${height} Z`;
      break;
    case 'slice':
      pathData = `M0,0 L${width * 0.6},0 L${width},${height * 0.4} L${width * 0.4},${height} L0,${height} Z`;
      break;
    case 'tube':
      pathData = `M${width * 0.2},0 Q${width * 0.5},${height * 0.2} ${width * 0.8},0 V${height} Q${width * 0.5},${height * 0.8} ${width * 0.2},${height} Z`;
      break;
    case 'venom':
      pathData = `M0,0 Q${width * 0.3},${height * 0.8} ${width * 0.5},${height * 0.2} Q${width * 0.7},${height * 0.9} ${width},${height * 0.1} V${height} H0 Z`;
      break;
    case 'bubble':
      pathData = `M${width * 0.1},${height * 0.3} Q${width * 0.3},0 ${width * 0.7},${height * 0.2} Q${width * 0.9},${height * 0.5} ${width * 0.6},${height * 0.8} Q${width * 0.4},${height} ${width * 0.1},${height * 0.7} Z`;
      break;
    case 'glass':
      pathData = `M0,${height * 0.2} Q${width * 0.2},0 ${width * 0.5},${height * 0.1} Q${width * 0.8},${height * 0.2} ${width},0 V${height} Q${width * 0.8},${height * 0.8} ${width * 0.5},${height * 0.9} Q${width * 0.2},${height} 0,${height * 0.8} Z`;
      break;
    default:
      pathData = `M0,${height * 0.7} Q${width * 0.25},${height * 0.3} ${width * 0.5},${height * 0.6} T${width},${height * 0.4} V${height} H0 Z`;
  }

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          ${colorStops}
        </linearGradient>
        <style>
          .wave-text {
            font-family: Arial, sans-serif;
            font-size: 3em;
            font-weight: bold;
            fill: white;
            text-anchor: middle;
            dominant-baseline: central;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          }
        </style>
      </defs>
      <path d="${pathData}" fill="url(#${gradientId})"/>
      <text x="${width/2}" y="${height/2}" class="wave-text">${text}</text>
    </svg>
  `;
}

// 生成Typewriter效果
function generateTypewriterEffect(text, colors, width, height) {
  const [bgColor, textColor] = colors;
  
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .typewriter-container {
            font-family: "Courier New", monospace;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: #${bgColor};
            color: #${textColor};
          }
          .typewriter-text {
            font-size: 2.5em;
            border-right: 3px solid #${textColor};
            animation: typewriter 4s steps(${text.length}) infinite,
                       blink 1s infinite;
            white-space: nowrap;
            overflow: hidden;
          }
          @keyframes typewriter {
            0% { width: 0; }
            50% { width: 100%; }
            100% { width: 0; }
          }
          @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #${textColor}; }
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="typewriter-container">
          <div class="typewriter-text">${text}</div>
        </div>
      </foreignObject>
    </svg>
  `;
}

// 生成Luminance发光效果
function generateLuminanceEffect(text, colors, width, height) {
  const gradientColors = colors.map(color => `#${color}`).join(', ');
  
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .luminance-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at center, ${gradientColors});
            animation: luminancePulse 3s ease-in-out infinite;
          }
          .luminance-text {
            font-size: 3em;
            font-weight: bold;
            color: white;
            text-shadow: 0 0 20px rgba(255,255,255,0.8),
                         0 0 40px rgba(255,255,255,0.6),
                         0 0 60px rgba(255,255,255,0.4);
            animation: textGlow 3s ease-in-out infinite;
          }
          @keyframes luminancePulse {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.3); }
          }
          @keyframes textGlow {
            0%, 100% { 
              text-shadow: 0 0 20px rgba(255,255,255,0.8),
                           0 0 40px rgba(255,255,255,0.6),
                           0 0 60px rgba(255,255,255,0.4);
            }
            50% { 
              text-shadow: 0 0 30px rgba(255,255,255,1),
                           0 0 60px rgba(255,255,255,0.8),
                           0 0 90px rgba(255,255,255,0.6);
            }
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="luminance-container">
          <div class="luminance-text">${text}</div>
        </div>
      </foreignObject>
    </svg>
  `;
}

// 生成TextBox效果
function generateTextBoxEffect(text, colors, width, height) {
  const [bgColor, borderColor, textColor, shadowColor] = colors;
  
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .textbox-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: #${bgColor};
          }
          .textbox-element {
            padding: 20px 40px;
            background: #${bgColor};
            border: 3px solid #${borderColor};
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            animation: popup 2s ease-out infinite;
          }
          .textbox-text {
            font-family: Arial, sans-serif;
            font-size: 2.5em;
            font-weight: bold;
            color: #${textColor};
            text-align: center;
            margin: 0;
          }
          @keyframes popup {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="textbox-container">
          <div class="textbox-element">
            <div class="textbox-text">${text}</div>
          </div>
        </div>
      </foreignObject>
    </svg>
  `;
}

// 生成Rainbow彩虹效果
function generateRainbowEffect(text, colors, width, height) {
  const gradientId = `rainbow-gradient-${Date.now()}`;
  
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
          ${colors.map((color, index) => 
            `<stop offset="${(index / (colors.length - 1)) * 100}%" stop-color="#${color}"/>`
          ).join('')}
        </linearGradient>
        <filter id="rainbowAnimation">
          <feColorMatrix type="hueRotate" values="0">
            <animate attributeName="values" 
                     values="0;360;0" 
                     dur="6s" 
                     repeatCount="indefinite"/>
          </feColorMatrix>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#${gradientId})" opacity="0.8"/>
      
      <!-- Animated rainbow text -->
      <text x="${width/2}" y="${height/2}" 
            text-anchor="middle" 
            dominant-baseline="central"
            font-family="Arial, sans-serif" 
            font-size="3em" 
            font-weight="bold" 
            fill="url(#${gradientId})"
            filter="url(#rainbowAnimation)"
            stroke="#ffffff" 
            stroke-width="1"
            opacity="0.9">
        ${text}
      </text>
      
      <!-- Text glow effect -->
      <text x="${width/2}" y="${height/2}" 
            text-anchor="middle" 
            dominant-baseline="central"
            font-family="Arial, sans-serif" 
            font-size="3em" 
            font-weight="bold" 
            fill="none"
            stroke="url(#${gradientId})" 
            stroke-width="3"
            opacity="0.6"
            filter="url(#rainbowAnimation)">
        ${text}
      </text>
    </svg>
  `;
}

// 生成椭圆形状
function generateEllipseShape(text, colors, width, height) {
  const gradientId = `ellipse-gradient-${Date.now()}`;
  const colorStops = colors.map((color, index) => 
    `<stop offset="${(index / (colors.length - 1)) * 100}%" stop-color="#${color}"/>`
  ).join('');

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${gradientId}" cx="50%" cy="50%" r="50%">
          ${colorStops}
        </radialGradient>
        <style>
          .ellipse-text {
            font-family: Arial, sans-serif;
            font-size: 3em;
            font-weight: bold;
            fill: white;
            text-anchor: middle;
            dominant-baseline: central;
          }
        </style>
      </defs>
      <ellipse cx="${width/2}" cy="${height/2}" rx="${width*0.4}" ry="${height*0.3}" fill="url(#${gradientId})"/>
      <text x="${width/2}" y="${height/2}" class="ellipse-text">${text}</text>
    </svg>
  `;
}

// 生成正方形形状
function generateSquareShape(text, colors, width, height) {
  const gradientId = `square-gradient-${Date.now()}`;
  const colorStops = colors.map((color, index) => 
    `<stop offset="${(index / (colors.length - 1)) * 100}%" stop-color="#${color}"/>`
  ).join('');

  const squareSize = Math.min(width, height) * 0.8;
  const x = (width - squareSize) / 2;
  const y = (height - squareSize) / 2;

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          ${colorStops}
        </linearGradient>
        <style>
          .square-text {
            font-family: Arial, sans-serif;
            font-size: 3em;
            font-weight: bold;
            fill: white;
            text-anchor: middle;
            dominant-baseline: central;
          }
        </style>
      </defs>
      <rect x="${x}" y="${y}" width="${squareSize}" height="${squareSize}" rx="10" fill="url(#${gradientId})"/>
      <text x="${width/2}" y="${height/2}" class="square-text">${text}</text>
    </svg>
  `;
}

// 主生成函数
function generateAdvancedSVG(type, text, colors, width = 800, height = 400, options = {}) {
  switch (type) {
    case 'glitch':
      return generateGlitchEffect(text, colors, width, height);
    case 'wave':
    case 'egg':
    case 'shark':
    case 'slice':
    case 'tube':
    case 'venom':
    case 'bubble':
    case 'glass':
      return generateWaveShape(text, colors, width, height, type);
    case 'ellipse':
      return generateEllipseShape(text, colors, width, height);
    case 'square':
      return generateSquareShape(text, colors, width, height);
    case 'typewriter':
      return generateTypewriterEffect(text, colors, width, height);
    case 'luminance':
      return generateLuminanceEffect(text, colors, width, height);
    case 'rainbow':
      return generateRainbowEffect(text, colors, width, height);
    case 'textBox':
      return generateTextBoxEffect(text, colors, width, height);
    default:
      return generateWaveShape(text, colors, width, height, 'wave');
  }
}

module.exports = {
  generateAdvancedSVG,
  generateGlitchEffect,
  generateWaveShape,
  generateEllipseShape,
  generateSquareShape,
  generateTypewriterEffect,
  generateLuminanceEffect,
  generateTextBoxEffect,
  generateRainbowEffect
}; 