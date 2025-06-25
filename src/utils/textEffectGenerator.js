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

const { createGradientFromColors } = require('./svgUtils');

function generateTextEffectSVG({ 
  text, 
  colors = ['ffffff'], 
  height = 120, 
  gradientType = 'luminance',
  duration = '3s',
  template = '' 
}) {
  const gradientResult = createGradientFromColors(colors, gradientType, duration);
  
  switch (gradientType) {
    case 'luminance':
      return generateLuminanceEffect(text, colors, height, duration, gradientResult);
    case 'rainbow':
      return generateRainbowEffect(text, colors, height, duration, gradientResult);
    case 'textBox':
      return generateTextBoxEffect(text, colors, height, duration, gradientResult);
    case 'glitch':
      return generateGlitchEffect(text, colors, height, duration, gradientResult);
    case 'typewriter':
      return generateTypewriterEffect(text, colors, height, duration, gradientResult);
    default:
      return generateLuminanceEffect(text, colors, height, duration, gradientResult);
  }
}

function generateLuminanceEffect(text, colors, height, duration, gradientResult) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientResult.gradientDef}
        <style>
          .container {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            width: 100%;
            height: ${height}px;
            background: #333641;
            border-radius: 10px;
            color: white;
            text-align: center;
          }
          
          .luminance {
            background: 50% 100%/50% 50% no-repeat radial-gradient(ellipse at bottom, #fff, transparent, transparent);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-size: 48px;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-weight: bold;
            animation: reveal ${parseFloat(duration) * 0.8}s ease-in-out forwards 200ms, 
                       glow ${parseFloat(duration) * 0.6}s linear infinite ${parseFloat(duration) * 1000 + 200}ms;
          }
          
          @keyframes reveal {
            80% { letter-spacing: 8px; }
            100% { background-size: 300% 300%; }
          }
          
          @keyframes glow {
            40% { text-shadow: 0 0 8px #fff; }
          }
        </style>
      </defs>
      
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <div class="container">
            <div class="luminance">${text}</div>
          </div>
        </div>
      </foreignObject>
    </svg>`;
}

function generateRainbowEffect(text, colors, height, duration, gradientResult) {
  const rainbowColors = ['#DEBF40', '#5ACB3C', '#44A3F7', '#CF52EB', '#D14B3D', '#D49C3D', '#ffffff'];
  const delay = 10;
  
  let rainbowLayers = '';
  rainbowColors.forEach((color, index) => {
    const animationDelay = (index + 1) / delay;
    const marginLeft = 36 - (index * 6);
    rainbowLayers += `<li class="c-rainbow__layer" style="color: ${color}; animation-delay: ${animationDelay}s; margin-left: ${marginLeft}px;">${text}</li>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientResult.gradientDef}
        <style>
          .container {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            width: 100%;
            height: ${height}px;
            background-color: #31037D;
            border-radius: 10px;
            color: rgba(255,255,255,.75);
            text-align: center;
            font-size: 24px;
          }
          
          .c-rainbow {
            counter-reset: rainbow;
            position: relative;
            display: block;
            list-style: none;
            padding: 0;
            margin: 0;
            line-height: 2px;
          }
          
          .c-rainbow__layer {
            counter-increment: rainbow;
            font-size: 48px;
            font-weight: 600;
            text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 4px 4px 0 rgba(0, 0, 0, 0.2);
            animation: rainbow ${duration} ease-in-out infinite;
          }
          
          @keyframes rainbow {
            0%, 100% { transform: translatey(1rem); }
            50% { transform: translatey(-1rem); }
          }
        </style>
      </defs>
      
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <div class="container">
            <ul class="c-rainbow">
              ${rainbowLayers}
            </ul>
          </div>
        </div>
      </foreignObject>
    </svg>`;
}

function generateTextBoxEffect(text, colors, height, duration, gradientResult) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientResult.gradientDef}
        <style>
          .container {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            width: 100%;
            height: ${height}px;
            background: #333;
            border-radius: 10px;
            text-align: center;
          }

          .svg-wrapper {
            height: 60px;
            margin: 0 auto;
            position: relative;
            width: 320px;
          }

          .shape {
            fill: transparent;
            stroke-dasharray: 140 540;
            stroke-dashoffset: -474;
            stroke-width: 8px;
            stroke: #19f6e8;
            animation: draw ${duration} linear forwards;
          }

          .text {
            color: #fff;
            font-family: 'Roboto Condensed', sans-serif;
            font-size: 22px;
            letter-spacing: 8px;
            line-height: 32px;
            position: relative;
            top: -48px;
          }

          @keyframes draw {
            0% {
              stroke-dasharray: 140 540;
              stroke-dashoffset: -474;
              stroke-width: 8px;
            }
            100% {
              stroke-dasharray: 760;
              stroke-dashoffset: 0;
              stroke-width: 2px;
            }
          }
        </style>
      </defs>
      
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <div class="container">
            <div class="svg-wrapper">
              <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                <rect class="shape" height="60" width="320" />
              </svg>
              <div class="text">${text}</div>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>`;
}

function generateGlitchEffect(text, colors, height, duration, gradientResult) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientResult.gradientDef}
        <style>
          .container {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            width: 100%;
            height: ${height}px;
            background: #333;
            border-radius: 10px;
            text-align: center;
          }

          h1 {
            text-align: center;
            color: #fff;
            font-size: 48px;
            letter-spacing: 8px;
            font-family: "Lucida Console", Monaco, monospace;	
            font-weight: 400;
            margin: 0;
            line-height: 0;
            animation: glitch1 ${duration} infinite;
          }

          h1:nth-child(2) {
            color: #67f3da;
            animation: glitch2 ${duration} infinite;
          }

          h1:nth-child(3) {
            color: #f16f6f;
            animation: glitch3 ${duration} infinite;
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
        <div xmlns="http://www.w3.org/1999/xhtml">
          <div class="container">
            <h1>${text}</h1>
            <h1>${text}</h1>
            <h1>${text}</h1>
          </div>
        </div>
      </foreignObject>
    </svg>`;
}

function generateTypewriterEffect(text, colors, height, duration, gradientResult) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientResult.gradientDef}
        <style>
          .container {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            width: 100%;
            height: ${height}px;
            background-color: rgb(25,25,25);  
            border-radius: 10px;
            color: rgba(255,255,255,.75);
            text-align: center;
          }

          .type-writer {
            display: inline-block;
          }

          .line-1 {
            width: 100%;
            margin: 0 auto;
            border-right: 2px solid rgba(255,255,255,.75);
            font-size: 48px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            transform: translateY(-50%);    
            animation: typewriter ${duration} steps(44) 1s 1 normal both,
                       blinkTextCursor 500ms steps(44) infinite normal;
          }

          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes blinkTextCursor {
            from { border-right-color: rgba(255,255,255,.75); }
            to { border-right-color: transparent; }
          }
        </style>
      </defs>
      
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <div class="container">
            <div class="type-writer">
              <p class="line-1">${text}</p>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>`;
}

module.exports = { generateTextEffectSVG }; 