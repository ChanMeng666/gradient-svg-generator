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

// Future Tech Effect Generators
function generateHologramEffect(colors, duration = '3s', text = 'HOLOGRAM') {
  return `
    <defs>
      <linearGradient id="hologramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:0.8">
          <animate attributeName="stop-opacity" values="0.8;0.3;0.8" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="50%" style="stop-color:#${colors[1]};stop-opacity:0.6">
          <animate attributeName="stop-opacity" values="0.6;1;0.6" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${colors[2]};stop-opacity:0.4">
          <animate attributeName="stop-opacity" values="0.4;0.8;0.4" dur="${duration}" repeatCount="indefinite"/>
        </stop>
      </linearGradient>
      <filter id="hologramGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#hologramGrad)" filter="url(#hologramGlow)">
      <animateTransform attributeName="transform" type="skewX" values="0;2;0;-2;0" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[0]};
        font-family: 'Courier New', monospace;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 10px #${colors[1]};
        animation: hologramFlicker ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes hologramFlicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
          75% { opacity: 0.9; }
        }
      </style>
    </foreignObject>
  `;
}

function generateQuantumEffect(colors, duration = '4s', text = 'QUANTUM') {
  return `
    <defs>
      <radialGradient id="quantumField" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:1">
          <animate attributeName="stop-color" values="#${colors[0]};#${colors[1]};#${colors[2]};#${colors[0]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="70%" style="stop-color:#${colors[1]};stop-opacity:0.7">
          <animate attributeName="stop-color" values="#${colors[1]};#${colors[2]};#${colors[3]};#${colors[1]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${colors[2]};stop-opacity:0.3">
          <animate attributeName="stop-color" values="#${colors[2]};#${colors[3]};#${colors[0]};#${colors[2]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
      </radialGradient>
      <filter id="quantumTurbulence">
        <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20">
          <animate attributeName="scale" values="20;40;20" dur="${duration}" repeatCount="indefinite"/>
        </feDisplacementMap>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#quantumField)" filter="url(#quantumTurbulence)"/>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[3]};
        font-family: 'Arial', sans-serif;
        font-size: 26px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 15px #${colors[0]}, 0 0 25px #${colors[1]};
        animation: quantumPulse ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes quantumPulse {
          0%, 100% { transform: scale(1); filter: blur(0px); }
          50% { transform: scale(1.1); filter: blur(1px); }
        }
      </style>
    </foreignObject>
  `;
}

// Artistic Effect Generators
function generateWatercolorEffect(colors, duration = '6s', text = 'WATERCOLOR') {
  return `
    <defs>
      <radialGradient id="watercolorBleed1" cx="30%" cy="30%" r="40%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#${colors[1]};stop-opacity:0.3"/>
      </radialGradient>
      <radialGradient id="watercolorBleed2" cx="70%" cy="70%" r="45%">
        <stop offset="0%" style="stop-color:#${colors[2]};stop-opacity:0.7"/>
        <stop offset="100%" style="stop-color:#${colors[3]};stop-opacity:0.2"/>
      </radialGradient>
      <filter id="watercolorBlur">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feOffset in="blur" dx="2" dy="2" result="offset"/>
        <feMerge>
          <feMergeNode in="offset"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#watercolorBleed1)" filter="url(#watercolorBlur)">
      <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    <rect width="100%" height="100%" fill="url(#watercolorBleed2)" filter="url(#watercolorBlur)" opacity="0.8">
      <animateTransform attributeName="transform" type="scale" values="1.1;1;1.1" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[0]};
        font-family: 'Georgia', serif;
        font-size: 28px;
        font-weight: 300;
        text-align: center;
        filter: blur(0.5px);
        animation: watercolorFlow ${duration} infinite ease-in-out;
      ">
        ${text}
      </div>
      <style>
        @keyframes watercolorFlow {
          0%, 100% { opacity: 0.9; transform: translateY(0px); }
          50% { opacity: 0.7; transform: translateY(-5px); }
        }
      </style>
    </foreignObject>
  `;
}

// Luxury Effect Generators
function generateGoldFoilEffect(colors, duration = '4s', text = 'GOLDEN') {
  return `
    <defs>
      <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:1"/>
        <stop offset="30%" style="stop-color:#${colors[1]};stop-opacity:0.9"/>
        <stop offset="70%" style="stop-color:#${colors[2]};stop-opacity:0.8"/>
        <stop offset="100%" style="stop-color:#${colors[3]};stop-opacity:1"/>
        <animateTransform attributeName="gradientTransform" type="rotate" values="0 50 50;360 50 50" dur="${duration}" repeatCount="indefinite"/>
      </linearGradient>
      <filter id="goldGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#goldShine)" filter="url(#goldGlow)"/>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[3]};
        font-family: 'Playfair Display', serif;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        animation: goldShimmer ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes goldShimmer {
          0%, 100% { text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
          50% { text-shadow: 0 0 20px #${colors[0]}, 2px 2px 4px rgba(0,0,0,0.3); }
        }
      </style>
    </foreignObject>
  `;
}

// Organic Nature Effect Generators
function generateFlameEffect(colors, duration = '3s', text = 'FLAME') {
  return `
    <defs>
      <radialGradient id="flameCore" cx="50%" cy="80%" r="60%">
        <stop offset="0%" style="stop-color:#${colors[3]};stop-opacity:1"/>
        <stop offset="40%" style="stop-color:#${colors[2]};stop-opacity:0.8"/>
        <stop offset="70%" style="stop-color:#${colors[1]};stop-opacity:0.5"/>
        <stop offset="100%" style="stop-color:#${colors[0]};stop-opacity:0.2"/>
      </radialGradient>
      <filter id="flameFlicker">
        <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15">
          <animate attributeName="scale" values="15;25;15" dur="${duration}" repeatCount="indefinite"/>
        </feDisplacementMap>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#flameCore)" filter="url(#flameFlicker)">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    <foreignObject x="10%" y="30%" width="80%" height="40%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[3]};
        font-family: 'Impact', sans-serif;
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 10px #${colors[1]}, 0 0 20px #${colors[0]};
        animation: flameFlicker ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes flameFlicker {
          0%, 100% { transform: translateY(0px) scaleY(1); }
          25% { transform: translateY(-3px) scaleY(1.05); }
          50% { transform: translateY(-1px) scaleY(0.98); }
          75% { transform: translateY(-2px) scaleY(1.02); }
        }
      </style>
    </foreignObject>
  `;
}

// Gaming Effect Generators
function generatePixelArtEffect(colors, duration = '4s', text = 'PIXEL') {
  return `
    <defs>
      <pattern id="pixelPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="10" height="10" fill="#${colors[0]}"/>
        <rect x="10" y="0" width="10" height="10" fill="#${colors[1]}"/>
        <rect x="0" y="10" width="10" height="10" fill="#${colors[2]}"/>
        <rect x="10" y="10" width="10" height="10" fill="#${colors[3]}"/>
        <animateTransform attributeName="patternTransform" type="translate" values="0,0;20,0;0,20;0,0" dur="${duration}" repeatCount="indefinite"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pixelPattern)"/>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #FFFFFF;
        font-family: 'Courier New', monospace;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        text-shadow: 2px 2px 0px #000000;
        animation: pixelGlow ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes pixelGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
        }
      </style>
    </foreignObject>
  `;
}

function generateEnergyBlastEffect(colors, duration = '1.5s', text = 'BLAST') {
  return `
    <defs>
      <radialGradient id="energyBlast" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:1">
          <animate attributeName="stop-opacity" values="1;0.3;1" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="50%" style="stop-color:#${colors[1]};stop-opacity:0.8">
          <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${colors[2]};stop-opacity:0.2">
          <animate attributeName="stop-opacity" values="0.2;0.8;0.2" dur="${duration}" repeatCount="indefinite"/>
        </stop>
      </radialGradient>
      <filter id="energyWave">
        <feGaussianBlur stdDeviation="5" result="blur"/>
        <feMorphology operator="dilate" radius="2" result="dilate"/>
        <feMerge>
          <feMergeNode in="dilate"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#energyBlast)" filter="url(#energyWave)">
      <animateTransform attributeName="transform" type="scale" values="1;1.5;1" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[3]};
        font-family: 'Arial Black', sans-serif;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 15px #${colors[0]}, 0 0 25px #${colors[1]};
        animation: energyPulse ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes energyPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }
      </style>
    </foreignObject>
  `;
}

// Main generator function
function generateAdvancedEffect(gradientType, colors, duration, text) {
  switch (gradientType) {
    // Future Tech Series
    case 'hologram':
      return generateHologramEffect(colors, duration, text);
    case 'quantum':
      return generateQuantumEffect(colors, duration, text);
    
    // Artistic Series
    case 'watercolor':
      return generateWatercolorEffect(colors, duration, text);
    
    // Luxury Series
    case 'goldFoil':
      return generateGoldFoilEffect(colors, duration, text);
    
    // Organic Nature Series
    case 'flame':
      return generateFlameEffect(colors, duration, text);
    
    // Gaming Series
    case 'pixelArt':
      return generatePixelArtEffect(colors, duration, text);
    case 'energyBlast':
      return generateEnergyBlastEffect(colors, duration, text);
    
    default:
      // Return a basic gradient for unsupported types
      return `
        <defs>
          <linearGradient id="basicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#${colors[0]}"/>
            <stop offset="100%" style="stop-color:#${colors[colors.length - 1]}"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#basicGradient)"/>
        <foreignObject x="10%" y="40%" width="80%" height="20%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="
            color: white;
            font-family: Arial, sans-serif;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
          ">
            ${text}
          </div>
        </foreignObject>
      `;
  }
}

module.exports = {
  generateAdvancedEffect,
  generateHologramEffect,
  generateQuantumEffect,
  generateWatercolorEffect,
  generateGoldFoilEffect,
  generateFlameEffect,
  generatePixelArtEffect,
  generateEnergyBlastEffect
}; 