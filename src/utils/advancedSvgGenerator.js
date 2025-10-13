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

// Enhanced Glitch Effect - Improved chromatic aberration and timing
function generateEnhancedGlitchEffect(text, colors, width, height) {
  const [bgColor, cyColor, magColor] = colors.length >= 3
    ? colors
    : [colors[0] || '1a1a2e', '67f3da', 'f16f6f'];

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .glitch-enhanced-container {
            font-family: "Courier New", "Lucida Console", Monaco, monospace;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: #${bgColor};
            position: relative;
          }
          .glitch-layer-wrapper {
            position: relative;
            display: inline-block;
          }
          .glitch-enhanced-text {
            font-size: 3.5em;
            font-weight: 700;
            letter-spacing: 0.05em;
            margin: 0;
            line-height: 1;
            position: absolute;
            top: 0;
            left: 0;
            color: #fff;
            animation: glitchMain 3s infinite;
          }
          .glitch-enhanced-text:nth-child(2) {
            color: #${cyColor};
            animation: glitchCyan 3s infinite;
            z-index: -1;
          }
          .glitch-enhanced-text:nth-child(3) {
            color: #${magColor};
            animation: glitchMagenta 3s infinite;
            z-index: -2;
          }

          @keyframes glitchMain {
            0%, 100% {
              transform: translate(0, 0) skew(0deg);
              opacity: 1;
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
            5% {
              transform: translate(-3px, 2px) skew(0.5deg);
              opacity: 0.85;
            }
            10% {
              transform: translate(0, 0) skew(0deg);
              opacity: 1;
            }
            15% {
              clip-path: polygon(0 20%, 100% 20%, 100% 25%, 0 25%);
            }
            20% {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }
            35% {
              transform: translate(2px, -1px) skew(-0.8deg);
              opacity: 0.8;
            }
            40% {
              transform: translate(0, 0) skew(0deg);
              opacity: 1;
            }
            60% {
              transform: translate(-1px, 1px) skew(0.3deg);
              opacity: 0.9;
            }
            65% {
              clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
            }
            70% {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
              transform: translate(0, 0) skew(0deg);
            }
            85% {
              transform: translate(3px, -2px) skew(-1deg);
              opacity: 0.75;
            }
            90% {
              transform: translate(0, 0) skew(0deg);
              opacity: 1;
            }
          }

          @keyframes glitchCyan {
            0%, 100% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            5% {
              transform: translate(-8px, -4px);
              opacity: 0.7;
            }
            10% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            35% {
              transform: translate(-6px, 3px);
              opacity: 0.65;
            }
            40% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            60% {
              transform: translate(-4px, -2px);
              opacity: 0.6;
            }
            65% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            85% {
              transform: translate(-7px, 4px);
              opacity: 0.7;
            }
            90% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
          }

          @keyframes glitchMagenta {
            0%, 100% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            5% {
              transform: translate(8px, 4px);
              opacity: 0.7;
            }
            10% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            35% {
              transform: translate(6px, -3px);
              opacity: 0.65;
            }
            40% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            60% {
              transform: translate(4px, 2px);
              opacity: 0.6;
            }
            65% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
            85% {
              transform: translate(7px, -4px);
              opacity: 0.7;
            }
            90% {
              transform: translate(0, 0);
              opacity: 0.3;
            }
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="glitch-enhanced-container">
          <div class="glitch-layer-wrapper">
            <h1 class="glitch-enhanced-text">${text}</h1>
            <h1 class="glitch-enhanced-text">${text}</h1>
            <h1 class="glitch-enhanced-text">${text}</h1>
          </div>
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

// Enhanced Luminance Effect - Background-clip with reveal animation
function generateEnhancedLuminanceEffect(text, colors, width, height) {
  const gradientColors = colors.map(color => `#${color}`).join(', ');

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @keyframes reveal {
            0% {
              background-size: 50% 50%;
              letter-spacing: 0;
            }
            80% {
              letter-spacing: 8px;
            }
            100% {
              background-size: 300% 300%;
              letter-spacing: 8px;
            }
          }

          @keyframes glow {
            0%, 100% {
              text-shadow: 0 0 10px rgba(255,255,255,0.3),
                           0 0 20px rgba(255,255,255,0.2);
            }
            40% {
              text-shadow: 0 0 20px rgba(255,255,255,0.8),
                           0 0 40px rgba(255,255,255,0.6),
                           0 0 60px rgba(255,255,255,0.4);
            }
          }

          @keyframes backgroundPulse {
            0%, 100% {
              filter: brightness(1);
            }
            50% {
              filter: brightness(1.2);
            }
          }

          .luminance-enhanced-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at center, ${gradientColors});
            animation: backgroundPulse 4s ease-in-out infinite;
          }

          .luminance-enhanced-text {
            font-size: 3.5em;
            font-weight: bold;
            background: radial-gradient(ellipse at bottom, #fff, transparent, transparent) 50% 100% / 50% 50% no-repeat;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: reveal 4s ease-in-out forwards 0.2s,
                       glow 3s linear infinite 3s;
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="luminance-enhanced-container">
          <div class="luminance-enhanced-text">${text}</div>
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

// Border Drawing Animation - Animated stroke-dasharray reveal
function generateBorderDrawingEffect(text, colors, width, height) {
  const [bgColor, borderColor, textColor] = colors.length >= 3
    ? colors
    : [colors[0] || '1a1a2e', colors[1] || '19f6e8', colors[2] || 'ffffff'];

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .border-draw-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: #${bgColor};
          }

          .border-draw-wrapper {
            position: relative;
            display: inline-block;
          }

          .border-rect {
            fill: transparent;
            stroke: #${borderColor};
            stroke-width: 3px;
            stroke-dasharray: 800;
            stroke-dashoffset: 800;
            animation: drawBorder 2.5s ease-in-out forwards,
                       glowBorder 2s ease-in-out infinite 2.5s;
          }

          .border-text {
            font-family: 'Arial', sans-serif;
            font-size: 2.5em;
            font-weight: bold;
            fill: #${textColor};
            text-anchor: middle;
            dominant-baseline: central;
            opacity: 0.3;
            animation: fadeInText 0.8s ease-in forwards 0.5s;
          }

          @keyframes drawBorder {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes glowBorder {
            0%, 100% {
              filter: drop-shadow(0 0 2px #${borderColor});
            }
            50% {
              filter: drop-shadow(0 0 8px #${borderColor})
                      drop-shadow(0 0 12px #${borderColor});
            }
          }

          @keyframes fadeInText {
            from {
              opacity: 0.3;
            }
            to {
              opacity: 1;
            }
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="border-draw-container">
          <svg width="${width * 0.8}" height="${height * 0.6}" class="border-draw-wrapper">
            <rect x="5" y="5"
                  width="${width * 0.8 - 10}"
                  height="${height * 0.6 - 10}"
                  rx="8"
                  class="border-rect"/>
            <text x="${(width * 0.8) / 2}"
                  y="${(height * 0.6) / 2}"
                  class="border-text">${text}</text>
          </svg>
        </div>
      </foreignObject>
    </svg>
  `;
}

// Layered Wave Motion - Multiple colored layers with vertical wave
function generateLayeredWaveEffect(text, colors, width, height) {
  const waveColors = colors.length >= 7
    ? colors
    : ['DEBF40', '5ACB3C', '44A3F7', 'CF52EB', 'D14B3D', 'D49C3D', 'FFFFFF'];

  const colorClasses = ['yellow', 'green', 'blue', 'violet', 'red', 'orange', 'white'];

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .wave-layers-container {
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #31037D, #1a0548);
          }

          .wave-layers-list {
            list-style: none;
            padding: 0;
            margin: 0;
            position: relative;
            line-height: 0.5;
          }

          .wave-layer-item {
            font-size: 3em;
            font-weight: 600;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000,
                         -1px 1px 0 #000, 1px 1px 0 #000,
                         4px 4px 0 rgba(0, 0, 0, 0.2);
            animation: waveMotion 1.5s ease-in-out infinite;
            display: block;
          }

          ${waveColors.map((color, index) => `
          .wave-layer-${colorClasses[index]} {
            color: #${color};
            animation-delay: ${(index + 1) / 10}s;
            margin-left: ${(7 - index) * 6}px;
          }`).join('\n')}

          @keyframes waveMotion {
            0%, 100% {
              transform: translateY(1rem);
            }
            50% {
              transform: translateY(-1rem);
            }
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="wave-layers-container">
          <ul class="wave-layers-list">
            ${waveColors.map((_, index) => `
              <li class="wave-layer-item wave-layer-${colorClasses[index]}">${text}</li>
            `).join('')}
          </ul>
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

// Enhanced Typewriter Effect - Smoother typing with glowing cursor
function generateEnhancedTypewriterEffect(text, colors, width, height) {
  const [bgColor, textColor, cursorColor] = colors.length >= 3
    ? colors
    : [colors[0] || '191919', colors[1] || '00ff00', colors[2] || '00ff00'];

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .typewriter-enhanced-container {
            font-family: "Courier New", "Consolas", monospace;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: #${bgColor};
            color: #${textColor};
          }

          .typewriter-enhanced-wrapper {
            position: relative;
            display: inline-block;
          }

          .typewriter-enhanced-text {
            font-size: 2.8em;
            font-weight: 500;
            letter-spacing: 0.05em;
            white-space: nowrap;
            overflow: hidden;
            border-right: 4px solid #${cursorColor};
            padding-right: 4px;
            animation: typing 4s steps(${text.length}) 0.5s forwards,
                       cursorBlink 0.75s step-end infinite;
            width: 0;
            box-shadow: 0 0 10px rgba(${parseInt(cursorColor.slice(0,2), 16)},
                                       ${parseInt(cursorColor.slice(2,4), 16)},
                                       ${parseInt(cursorColor.slice(4,6), 16)}, 0.5);
          }

          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes cursorBlink {
            from, to {
              border-color: #${cursorColor};
              box-shadow: 0 0 15px rgba(${parseInt(cursorColor.slice(0,2), 16)},
                                         ${parseInt(cursorColor.slice(2,4), 16)},
                                         ${parseInt(cursorColor.slice(4,6), 16)}, 0.8);
            }
            50% {
              border-color: transparent;
              box-shadow: none;
            }
          }
        </style>
      </defs>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" class="typewriter-enhanced-container">
          <div class="typewriter-enhanced-wrapper">
            <div class="typewriter-enhanced-text">${text}</div>
          </div>
        </div>
      </foreignObject>
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
    // Enhanced Effects
    case 'glitchEnhanced':
      return generateEnhancedGlitchEffect(text, colors, width, height);
    case 'luminanceEnhanced':
      return generateEnhancedLuminanceEffect(text, colors, width, height);
    case 'borderDrawing':
      return generateBorderDrawingEffect(text, colors, width, height);
    case 'layeredWave':
      return generateLayeredWaveEffect(text, colors, width, height);
    case 'typewriterEnhanced':
      return generateEnhancedTypewriterEffect(text, colors, width, height);
    case 'liquidMorphing':
    case 'plasmaMorphing':
    case 'cosmicMorphing':
    case 'bioMorphing':
    case 'quantumMorphing':
    case 'lavaMorphing':
    case 'turbulentWaves':
    case 'electromagneticWaves':
    case 'auroraWaves':
    case 'soundWaves':
    case 'cryogenicWaves':
    case 'solarWaves':
    case 'portalDistortion':
    case 'hypercubeProjection':
    case 'wormholeEffect':
    case 'fractalDimension':
    case 'multiverseOverlap':
    case 'realityDistortion':
      const { generateTextEffectSVG } = require('./textEffectGenerator');
      return generateTextEffectSVG({
        text,
        colors,
        height,
        gradientType: type,
        duration: options.duration || '6s'
      });
    // 🌟 NEW: Dimensional Portal Effects
    case 'quantumTunnel':
    case 'parallelUniverse':
    case 'wormholeTransit':
    case 'dimensionalRift':
    case 'holographicMatrix':
    case 'voidChamber':
    case 'realityGlitch':
    case 'astralProjection':
    // 🧬 NEW: Digital Life Effects
    case 'aiConsciousness':
    case 'bioDigitalMerge':
    case 'quantumDNA':
    case 'digitalEvolution':
    case 'syntheticSoul':
    case 'cyberSymbiosis':
    case 'neuralStorm':
    case 'digitalGenome':
    // 🤖 NEW: Cyber Aesthetics Effects
    case 'neonGridCity':
    case 'dataStreamFlow':
    case 'cyberPunkNoir':
    case 'hologramInterface':
    case 'digitalDecay':
    case 'chromeReflection':
    case 'virusInfection':
    case 'quantumEncryption':
    case 'augmentedReality':
    // 🧠 NEW: Consciousness Stream Effects
    case 'thoughtWaves':
    case 'memoryFragments':
    case 'dreamLogic':
    case 'emotionalSpectrum':
    case 'meditativeCalm':
    case 'anxietySpiral':
    case 'egoDissolution':
    case 'psychedelicInsight':
    case 'collectiveUnconscious':
      // Use the advanced effect generator for complex animations
      const { generateAdvancedEffect } = require('./advancedEffectGenerator');
      return `<?xml version="1.0" encoding="UTF-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
          ${generateAdvancedEffect(type, colors, options.duration || '6s', text)}
        </svg>`;
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
  generateRainbowEffect,
  // Enhanced Effects
  generateEnhancedGlitchEffect,
  generateEnhancedLuminanceEffect,
  generateBorderDrawingEffect,
  generateLayeredWaveEffect,
  generateEnhancedTypewriterEffect
}; 