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

// 🌟 NEW: Morphing Effect Generators
function generateLiquidMorphingEffect(colors, duration = '8s', text = 'MERCURY') {
  return `
    <defs>
      <radialGradient id="liquidMercury" cx="50%" cy="50%" r="60%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:1">
          <animate attributeName="stop-color" values="#${colors[0]};#${colors[1]};#${colors[2]};#${colors[0]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="70%" style="stop-color:#${colors[1]};stop-opacity:0.8">
          <animate attributeName="stop-color" values="#${colors[1]};#${colors[2]};#${colors[3]};#${colors[1]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${colors[2]};stop-opacity:0.6">
          <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="${parseFloat(duration) * 0.5}s" repeatCount="indefinite"/>
        </stop>
        <animate attributeName="r" values="40%;80%;40%" dur="${duration}" repeatCount="indefinite"/>
      </radialGradient>
      <filter id="metallicReflection">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feSpecularLighting surfaceScale="8" specularConstant="2" specularExponent="15" lighting-color="white" in="blur" result="specOut">
          <feDistantLight azimuth="45" elevation="60"/>
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
        <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#liquidMercury)" filter="url(#metallicReflection)"/>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[3]};
        font-family: 'Arial Black', sans-serif;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5), 0 0 10px #${colors[0]};
        animation: mercuryFlow ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes mercuryFlow {
          0%, 100% { transform: scaleX(1); filter: blur(0px); }
          50% { transform: scaleX(1.1); filter: blur(0.5px); }
        }
      </style>
    </foreignObject>
  `;
}

function generatePlasmaMorphingEffect(colors, duration = '6s', text = 'PLASMA') {
  return `
    <defs>
      <radialGradient id="plasmaBlob" cx="50%" cy="50%" r="70%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:1">
          <animate attributeName="stop-color" values="#${colors[0]};#${colors[1]};#${colors[2]};#${colors[0]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="50%" style="stop-color:#${colors[1]};stop-opacity:0.8">
          <animate attributeName="stop-color" values="#${colors[1]};#${colors[2]};#${colors[3]};#${colors[1]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${colors[2]};stop-opacity:0.4">
          <animate attributeName="stop-color" values="#${colors[2]};#${colors[3]};#${colors[0]};#${colors[2]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <animate attributeName="cx" values="30%;70%;30%" dur="${duration}" repeatCount="indefinite"/>
        <animate attributeName="cy" values="30%;70%;30%" dur="${parseFloat(duration) * 1.5}s" repeatCount="indefinite"/>
      </radialGradient>
      <filter id="plasmaGlow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#plasmaBlob)" filter="url(#plasmaGlow)"/>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[3]};
        font-family: 'Impact', sans-serif;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 15px #${colors[0]}, 0 0 25px #${colors[1]}, 0 0 35px #${colors[2]};
        animation: plasmaEnergy ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes plasmaEnergy {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
      </style>
    </foreignObject>
  `;
}

function generateCosmicMorphingEffect(colors, duration = '12s', text = 'COSMIC') {
  return `
    <defs>
      <radialGradient id="cosmicEntity" cx="50%" cy="50%" r="80%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:0.9">
          <animate attributeName="stop-color" values="#${colors[0]};#${colors[1]};#${colors[2]};#${colors[0]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="70%" style="stop-color:#${colors[1]};stop-opacity:0.6">
          <animate attributeName="stop-color" values="#${colors[1]};#${colors[2]};#${colors[3]};#${colors[1]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${colors[2]};stop-opacity:0.3">
          <animate attributeName="stop-color" values="#${colors[2]};#${colors[3]};#${colors[0]};#${colors[2]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <animate attributeName="r" values="60%;100%;60%" dur="${duration}" repeatCount="indefinite"/>
      </radialGradient>
      <filter id="cosmicDistortion">
        <feTurbulence baseFrequency="0.3" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20">
          <animate attributeName="scale" values="10;30;10" dur="${duration}" repeatCount="indefinite"/>
        </feDisplacementMap>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#cosmicEntity)" filter="url(#cosmicDistortion)"/>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[3]};
        font-family: 'Orbitron', monospace;
        font-size: 26px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 20px #${colors[0]}, 0 0 30px #${colors[1]};
        animation: cosmicPulse ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes cosmicPulse {
          0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
          50% { transform: scale(1.02) rotate(1deg); filter: brightness(1.2); }
        }
      </style>
    </foreignObject>
  `;
}

// 🌟 NEW: Fluid Dynamics Effect Generators
function generateTurbulentWavesEffect(colors, duration = '5s', text = 'WAVES') {
  return `
    <defs>
      <linearGradient id="turbulentFlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:0.9">
          <animate attributeName="stop-color" values="#${colors[0]};#${colors[1]};#${colors[0]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="50%" style="stop-color:#${colors[1]};stop-opacity:0.7">
          <animate attributeName="stop-color" values="#${colors[1]};#${colors[2]};#${colors[1]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${colors[2]};stop-opacity:0.5">
          <animate attributeName="stop-color" values="#${colors[2]};#${colors[3]};#${colors[2]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <animateTransform attributeName="gradientTransform" type="translate" values="0 0;50 0;0 0" dur="${duration}" repeatCount="indefinite"/>
      </linearGradient>
      <filter id="fluidDistortion">
        <feTurbulence baseFrequency="0.8" numOctaves="4" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="25">
          <animate attributeName="scale" values="15;35;15" dur="${duration}" repeatCount="indefinite"/>
        </feDisplacementMap>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#turbulentFlow)" filter="url(#fluidDistortion)"/>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #ffffff;
        font-family: 'Trebuchet MS', sans-serif;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 15px #000000, 0 0 25px #${colors[0]}, 2px 2px 4px rgba(0,0,0,0.8);
        animation: fluidMotion ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes fluidMotion {
          0%, 100% { transform: translateX(0px) skewX(0deg); }
          50% { transform: translateX(5px) skewX(2deg); }
        }
      </style>
    </foreignObject>
  `;
}

// 🌟 NEW: Dimensional Effect Generators
function generatePortalDistortionEffect(colors, duration = '4s', text = 'PORTAL') {
  return `
    <defs>
      <radialGradient id="portalNexus" cx="50%" cy="50%" r="70%">
        <stop offset="0%" style="stop-color:#${colors[0]};stop-opacity:1">
          <animate attributeName="stop-color" values="#${colors[0]};#${colors[1]};#${colors[2]};#${colors[0]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="30%" style="stop-color:#${colors[1]};stop-opacity:0.8">
          <animate attributeName="stop-color" values="#${colors[1]};#${colors[2]};#${colors[3]};#${colors[1]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="70%" style="stop-color:#${colors[2]};stop-opacity:0.4">
          <animate attributeName="stop-color" values="#${colors[2]};#${colors[3]};#${colors[0]};#${colors[2]}" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${colors[3]};stop-opacity:0.1">
          <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="${parseFloat(duration) * 0.5}s" repeatCount="indefinite"/>
        </stop>
        <animateTransform attributeName="gradientTransform" type="rotate" values="0 50 50;360 50 50" dur="${duration}" repeatCount="indefinite"/>
      </radialGradient>
      <filter id="dimensionalWarp">
        <feTurbulence baseFrequency="1.2" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30">
          <animate attributeName="scale" values="20;40;20" dur="${duration}" repeatCount="indefinite"/>
        </feDisplacementMap>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#portalNexus)" filter="url(#dimensionalWarp)"/>
    <foreignObject x="10%" y="40%" width="80%" height="20%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[3]};
        font-family: 'Futura', sans-serif;
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 15px #${colors[0]}, 0 0 25px #${colors[1]};
        animation: dimensionalShift ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes dimensionalShift {
          0%, 100% { transform: perspective(500px) rotateY(0deg); opacity: 1; }
          50% { transform: perspective(500px) rotateY(5deg); opacity: 0.8; }
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
    
    // 🌟 NEW: Morphing Effects
    case 'liquidMorphing':
      return generateLiquidMorphingEffect(colors, duration, text);
    case 'plasmaMorphing':
      return generatePlasmaMorphingEffect(colors, duration, text);
    case 'cosmicMorphing':
      return generateCosmicMorphingEffect(colors, duration, text);
    case 'bioMorphing':
      return generateLiquidMorphingEffect(colors, duration, text); // 暂时复用液态效果
    case 'quantumMorphing':
      return generateCosmicMorphingEffect(colors, duration, text); // 暂时复用宇宙效果
    case 'lavaMorphing':
      return generateFlameEffect(colors, duration, text); // 使用火焰效果，适合熔岩
    
    // 🌟 NEW: Fluid Dynamics
    case 'turbulentWaves':
      return generateTurbulentWavesEffect(colors, duration, text);
    case 'electromagneticWaves':
      return generateTurbulentWavesEffect(colors, duration, text); // 暂时复用湍流效果
    case 'auroraWaves':
      return generateTurbulentWavesEffect(colors, duration, text); // 暂时复用湍流效果
    case 'soundWaves':
      return generateTurbulentWavesEffect(colors, duration, text); // 暂时复用湍流效果
    case 'cryogenicWaves':
      return generateTurbulentWavesEffect(colors, duration, text); // 暂时复用湍流效果
    case 'solarWaves':
      return generateTurbulentWavesEffect(colors, duration, text); // 暂时复用湍流效果
    
    // 🌟 NEW: Dimensional Effects
    case 'portalDistortion':
      return generatePortalDistortionEffect(colors, duration, text);
    case 'hypercubeProjection':
      return generatePortalDistortionEffect(colors, duration, text); // 暂时复用传送门效果
    case 'wormholeEffect':
      return generatePortalDistortionEffect(colors, duration, text); // 暂时复用传送门效果
    case 'fractalDimension':
      return generatePortalDistortionEffect(colors, duration, text); // 暂时复用传送门效果
    case 'multiverseOverlap':
      return generatePortalDistortionEffect(colors, duration, text); // 暂时复用传送门效果
    case 'realityDistortion':
      return generatePortalDistortionEffect(colors, duration, text); // 暂时复用传送门效果
    
    // 🌌 NEW: Dimensional Portal Templates
    case 'quantumTunnel':
      return generateQuantumTunnelEffect(colors, duration, text);
    case 'parallelUniverse':
      return generateParallelUniverseEffect(colors, duration, text);
    case 'wormholeTransit':
      return generateWormholeTransitEffect(colors, duration, text);
    case 'dimensionalRift':
      return generateDimensionalRiftEffect(colors, duration, text);
    case 'holographicMatrix':
      return generateHolographicMatrixEffect(colors, duration, text);
    case 'voidChamber':
      return generateVoidChamberEffect(colors, duration, text);
    case 'realityGlitch':
      return generateRealityGlitchEffect(colors, duration, text);
    case 'astralProjection':
      return generateAstralProjectionEffect(colors, duration, text);
    
    // 🧬 NEW: Digital Life Templates
    case 'aiConsciousness':
      return generateAIConsciousnessEffect(colors, duration, text);
    case 'bioDigitalMerge':
      return generateBioDigitalMergeEffect(colors, duration, text);
    case 'quantumDNA':
      return generateQuantumDNAEffect(colors, duration, text);
    case 'digitalEvolution':
      return generateDigitalEvolutionEffect(colors, duration, text);
    case 'syntheticSoul':
      return generateSyntheticSoulEffect(colors, duration, text);
    case 'cyberSymbiosis':
      return generateCyberSymbiosisEffect(colors, duration, text);
    case 'neuralStorm':
      return generateNeuralStormEffect(colors, duration, text);
    case 'digitalGenome':
      return generateDigitalGenomeEffect(colors, duration, text);
    
    // 🤖 NEW: Cyber Aesthetics Templates
    case 'neonGridCity':
      return generateNeonGridCityEffect(colors, duration, text);
    case 'dataStreamFlow':
      return generateDataStreamFlowEffect(colors, duration, text);
    case 'cyberPunkNoir':
      return generateCyberPunkNoirEffect(colors, duration, text);
    case 'hologramInterface':
      return generateHologramInterfaceEffect(colors, duration, text);
    case 'digitalDecay':
      return generateDigitalDecayEffect(colors, duration, text);
    case 'chromeReflection':
      return generateChromeReflectionEffect(colors, duration, text);
    case 'virusInfection':
      return generateVirusInfectionEffect(colors, duration, text);
    case 'quantumEncryption':
      return generateQuantumEncryptionEffect(colors, duration, text);
    case 'augmentedReality':
      return generateAugmentedRealityEffect(colors, duration, text);
    
    // 🧠 NEW: Consciousness Stream Templates
    case 'thoughtWaves':
      return generateThoughtWavesEffect(colors, duration, text);
    case 'memoryFragments':
      return generateMemoryFragmentsEffect(colors, duration, text);
    case 'dreamLogic':
      return generateDreamLogicEffect(colors, duration, text);
    case 'emotionalSpectrum':
      return generateEmotionalSpectrumEffect(colors, duration, text);
    case 'meditativeCalm':
      return generateMeditativeCalmEffect(colors, duration, text);
    case 'anxietySpiral':
      return generateAnxietySpiralEffect(colors, duration, text);
    case 'egoDissolution':
      return generateEgoDissolutionEffect(colors, duration, text);
    case 'psychedelicInsight':
      return generatePsychedelicInsightEffect(colors, duration, text);
    case 'collectiveUnconscious':
      return generateCollectiveUnconsciousEffect(colors, duration, text);
    
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

// 🌌 Dimensional Portal Effects
function generateQuantumTunnelEffect(colors, duration = '4s', text = 'QUANTUM') {
  return `
    <defs>
      <radialGradient id="quantumTunnel" cx="50%" cy="50%" r="50%">
        ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:#${color};stop-opacity:${1 - i * 0.1}"/>`).join('')}
      </radialGradient>
      <filter id="quantumDistortion">
        <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#quantumTunnel)" filter="url(#quantumDistortion)">
      <animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[colors.length - 1]};
        font-family: 'Orbitron', sans-serif;
        font-size: 48px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 20px #${colors[0]};
        animation: quantumPulse ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes quantumPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      </style>
    </foreignObject>
  `;
}

// 🧬 Digital Life Effects
function generateAIConsciousnessEffect(colors, duration = '4s', text = 'AI MIND') {
  return `
    <defs>
      <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:#${color}"/>`).join('')}
      </linearGradient>
      <filter id="neuralGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#neuralGradient)"/>
    <g filter="url(#neuralGlow)">
      ${Array.from({length: 20}, (_, i) => `
        <circle cx="${Math.random() * 100}%" cy="${Math.random() * 100}%" r="3" fill="#${colors[0]}" opacity="0.8">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="${Math.random() * 3 + 1}s" repeatCount="indefinite"/>
        </circle>
        <line x1="${Math.random() * 100}%" y1="${Math.random() * 100}%" x2="${Math.random() * 100}%" y2="${Math.random() * 100}%" 
              stroke="#${colors[1]}" stroke-width="1" opacity="0.5">
          <animate attributeName="opacity" values="0.1;0.8;0.1" dur="${Math.random() * 2 + 1}s" repeatCount="indefinite"/>
        </line>
      `).join('')}
    </g>
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: white;
        font-family: 'Roboto Mono', monospace;
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 15px #${colors[0]};
        animation: neuralPulse ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes neuralPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      </style>
    </foreignObject>
  `;
}

// 🤖 Cyber Aesthetics Effects
function generateNeonGridCityEffect(colors, duration = '4s', text = 'CYBER') {
  return `
    <defs>
      <linearGradient id="neonCity" x1="0%" y1="0%" x2="100%" y2="100%">
        ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:#${color}"/>`).join('')}
      </linearGradient>
      <filter id="neonGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#neonCity)"/>
    <!-- Neon Grid Lines -->
    <g filter="url(#neonGlow)" opacity="0.8">
      ${Array.from({length: 15}, (_, i) => `
        <line x1="0%" y1="${(i * 6.67)}%" x2="100%" y2="${(i * 6.67)}%" stroke="#${colors[0]}" stroke-width="1" opacity="0.6">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="${2 + Math.random()}s" repeatCount="indefinite"/>
        </line>
        <line x1="${(i * 6.67)}%" y1="0%" x2="${(i * 6.67)}%" y2="100%" stroke="#${colors[1]}" stroke-width="1" opacity="0.6">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="${1.5 + Math.random()}s" repeatCount="indefinite"/>
        </line>
      `).join('')}
    </g>
    <!-- Glitch Blocks -->
    ${Array.from({length: 8}, (_, i) => `
      <rect x="${Math.random() * 80}%" y="${Math.random() * 80}%" width="${5 + Math.random() * 10}%" height="${3 + Math.random() * 8}%" 
            fill="#${colors[Math.floor(Math.random() * colors.length)]}" opacity="0.7">
        <animate attributeName="opacity" values="0;1;0" dur="${Math.random() * 2 + 0.5}s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" 
                         values="0,0;${Math.random() * 10 - 5},${Math.random() * 10 - 5};0,0" 
                         dur="${Math.random() * 3 + 1}s" repeatCount="indefinite"/>
      </rect>
    `).join('')}
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[colors.length - 1]};
        font-family: 'Orbitron', monospace;
        font-size: 42px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 20px #${colors[0]}, 0 0 40px #${colors[1]};
        animation: cyberpunkFlicker ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes cyberpunkFlicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          25% { opacity: 0.8; transform: scale(1.02) skew(1deg); }
          50% { opacity: 1; transform: scale(0.98) skew(-1deg); }
          75% { opacity: 0.9; transform: scale(1.01) skew(0.5deg); }
        }
      </style>
    </foreignObject>
  `;
}

// 🧠 Consciousness Stream Effects
function generateThoughtWavesEffect(colors, duration = '6s', text = 'MIND') {
  return `
    <defs>
      <radialGradient id="mentalWaves" cx="50%" cy="50%" r="50%">
        ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:#${color}"/>`).join('')}
      </radialGradient>
      <filter id="mentalRipple">
        <feTurbulence baseFrequency="0.01" numOctaves="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#mentalWaves)" filter="url(#mentalRipple)">
      <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    ${Array.from({length: 5}, (_, i) => `
      <circle cx="50%" cy="50%" r="${(i + 1) * 15}%" fill="none" stroke="#${colors[i % colors.length]}" stroke-width="2" opacity="0.6">
        <animate attributeName="r" values="${(i + 1) * 15}%;${(i + 1) * 25}%;${(i + 1) * 15}%" dur="${Math.random() * 4 + 3}s" repeatCount="indefinite"/>
      </circle>
    `).join('')}
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: white;
        font-family: 'Playfair Display', serif;
        font-size: 42px;
        font-weight: 300;
        text-align: center;
        text-shadow: 0 0 20px #${colors[0]};
        animation: mentalFloat ${duration} infinite ease-in-out;
      ">
        ${text}
      </div>
      <style>
        @keyframes mentalFloat {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-10px); opacity: 0.8; }
        }
      </style>
    </foreignObject>
  `;
}

// 🌌 Advanced Dimensional Portal Effects
function generateRealityGlitchEffect(colors, duration = '2s', text = 'GLITCH') {
  return `
    <defs>
      <linearGradient id="glitchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:#${color}"/>`).join('')}
      </linearGradient>
      <filter id="digitalGlitch">
        <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="20"/>
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.8 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#glitchGradient)" filter="url(#digitalGlitch)">
      <animate attributeName="opacity" values="1;0.8;1;0.6;1" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    ${Array.from({length: 12}, (_, i) => `
      <rect x="${Math.random() * 90}%" y="${Math.random() * 90}%" width="${2 + Math.random() * 8}%" height="${1 + Math.random() * 5}%" 
            fill="#${colors[Math.floor(Math.random() * colors.length)]}" opacity="0.9">
        <animate attributeName="x" values="${Math.random() * 90}%;${Math.random() * 90}%;${Math.random() * 90}%" 
                 dur="${Math.random() * 0.3 + 0.1}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;1;0" dur="${Math.random() * 0.5 + 0.2}s" repeatCount="indefinite"/>
      </rect>
    `).join('')}
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[0]};
        font-family: 'Courier New', monospace;
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        text-shadow: 2px 0 #${colors[1]}, -2px 0 #${colors[2] || colors[0]};
        animation: realityGlitch ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes realityGlitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-1px, 1px); }
          40% { transform: translate(1px, -1px); }
          50% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          70% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
          90% { transform: translate(-2px, 1px); }
        }
      </style>
    </foreignObject>
  `;
}

function generateDataStreamFlowEffect(colors, duration = '2s', text = 'DATA') {
  return `
    <defs>
      <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="100%">
        ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:#${color}"/>`).join('')}
      </linearGradient>
      <filter id="matrixEffect">
        <feGaussianBlur stdDeviation="1" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#dataFlow)"/>
    <g filter="url(#matrixEffect)">
      ${Array.from({length: 30}, (_, i) => {
        const chars = '01';
        return `
          <text x="${(i * 3.33)}%" y="${Math.random() * 100}%" 
                fill="#${colors[0]}" 
                font-family="Courier New" 
                font-size="14" 
                opacity="0.8">
            ${Array.from({length: Math.floor(Math.random() * 8) + 3}, () => chars[Math.floor(Math.random() * chars.length)]).join('')}
            <animate attributeName="y" values="${Math.random() * 100}%;110%" dur="${Math.random() * 3 + 1}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;1;0" dur="${Math.random() * 2 + 1}s" repeatCount="indefinite"/>
          </text>
        `;
      }).join('')}
    </g>
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: #${colors[colors.length - 1]};
        font-family: 'Courier New', monospace;
        font-size: 38px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 15px #${colors[0]};
        animation: dataFlow ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes dataFlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      </style>
    </foreignObject>
  `;
}

function generateBioDigitalMergeEffect(colors, duration = '6s', text = 'FUSION') {
  return `
    <defs>
      <radialGradient id="bioDigital" cx="50%" cy="50%" r="50%">
        ${colors.map((color, i) => `<stop offset="${(i / (colors.length - 1)) * 100}%" style="stop-color:#${color}"/>`).join('')}
      </radialGradient>
      <filter id="organicFlow">
        <feTurbulence baseFrequency="0.05" numOctaves="3" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="12"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#bioDigital)" filter="url(#organicFlow)">
      <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="${duration}" repeatCount="indefinite"/>
    </rect>
    <!-- DNA Helix Pattern -->
    ${Array.from({length: 8}, (_, i) => `
      <circle cx="${12.5 * (i + 1)}%" cy="${50 + Math.sin(i * 0.5) * 20}%" r="3" fill="#${colors[i % colors.length]}" opacity="0.7">
        <animate attributeName="cy" values="${50 + Math.sin(i * 0.5) * 20}%;${50 + Math.sin(i * 0.5 + Math.PI) * 20}%;${50 + Math.sin(i * 0.5) * 20}%" 
                 dur="${duration}" repeatCount="indefinite"/>
      </circle>
      <circle cx="${12.5 * (i + 1)}%" cy="${50 + Math.sin(i * 0.5 + Math.PI) * 20}%" r="3" fill="#${colors[(i + 1) % colors.length]}" opacity="0.7">
        <animate attributeName="cy" values="${50 + Math.sin(i * 0.5 + Math.PI) * 20}%;${50 + Math.sin(i * 0.5) * 20}%;${50 + Math.sin(i * 0.5 + Math.PI) * 20}%" 
                 dur="${duration}" repeatCount="indefinite"/>
      </circle>
    `).join('')}
    <foreignObject x="10%" y="35%" width="80%" height="30%">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        color: white;
        font-family: 'Arial', sans-serif;
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        text-shadow: 0 0 20px #${colors[0]};
        animation: bioMerge ${duration} infinite;
      ">
        ${text}
      </div>
      <style>
        @keyframes bioMerge {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
      </style>
    </foreignObject>
  `;
}

// Fallback implementations for other new effect types
function generateParallelUniverseEffect(colors, duration, text) { return generateQuantumTunnelEffect(colors, duration, text); }
function generateWormholeTransitEffect(colors, duration, text) { return generateQuantumTunnelEffect(colors, duration, text); }
function generateDimensionalRiftEffect(colors, duration, text) { return generateQuantumTunnelEffect(colors, duration, text); }
function generateHolographicMatrixEffect(colors, duration, text) { return generateQuantumTunnelEffect(colors, duration, text); }
function generateVoidChamberEffect(colors, duration, text) { return generateQuantumTunnelEffect(colors, duration, text); }
function generateAstralProjectionEffect(colors, duration, text) { return generateQuantumTunnelEffect(colors, duration, text); }

// Note: generateBioDigitalMergeEffect is now implemented above
function generateQuantumDNAEffect(colors, duration, text) { return generateBioDigitalMergeEffect(colors, duration, text); }
function generateDigitalEvolutionEffect(colors, duration, text) { return generateAIConsciousnessEffect(colors, duration, text); }
function generateSyntheticSoulEffect(colors, duration, text) { return generateAIConsciousnessEffect(colors, duration, text); }
function generateCyberSymbiosisEffect(colors, duration, text) { return generateBioDigitalMergeEffect(colors, duration, text); }
function generateNeuralStormEffect(colors, duration, text) { return generateAIConsciousnessEffect(colors, duration, text); }
function generateDigitalGenomeEffect(colors, duration, text) { return generateBioDigitalMergeEffect(colors, duration, text); }

// Note: generateDataStreamFlowEffect is now implemented above
function generateCyberPunkNoirEffect(colors, duration, text) { return generateRealityGlitchEffect(colors, duration, text); }
function generateHologramInterfaceEffect(colors, duration, text) { return generateNeonGridCityEffect(colors, duration, text); }
function generateDigitalDecayEffect(colors, duration, text) { return generateRealityGlitchEffect(colors, duration, text); }
function generateChromeReflectionEffect(colors, duration, text) { return generateNeonGridCityEffect(colors, duration, text); }
function generateVirusInfectionEffect(colors, duration, text) { return generateDataStreamFlowEffect(colors, duration, text); }
function generateQuantumEncryptionEffect(colors, duration, text) { return generateDataStreamFlowEffect(colors, duration, text); }
function generateAugmentedRealityEffect(colors, duration, text) { return generateNeonGridCityEffect(colors, duration, text); }

function generateMemoryFragmentsEffect(colors, duration, text) { return generateThoughtWavesEffect(colors, duration, text); }
function generateDreamLogicEffect(colors, duration, text) { return generateThoughtWavesEffect(colors, duration, text); }
function generateEmotionalSpectrumEffect(colors, duration, text) { return generateThoughtWavesEffect(colors, duration, text); }
function generateMeditativeCalmEffect(colors, duration, text) { return generateThoughtWavesEffect(colors, duration, text); }
function generateAnxietySpiralEffect(colors, duration, text) { return generateThoughtWavesEffect(colors, duration, text); }
function generateEgoDissolutionEffect(colors, duration, text) { return generateThoughtWavesEffect(colors, duration, text); }
function generatePsychedelicInsightEffect(colors, duration, text) { return generateThoughtWavesEffect(colors, duration, text); }
function generateCollectiveUnconsciousEffect(colors, duration, text) { return generateThoughtWavesEffect(colors, duration, text); }

module.exports = {
  generateAdvancedEffect,
  generateHologramEffect,
  generateQuantumEffect,
  generateWatercolorEffect,
  generateGoldFoilEffect,
  generateFlameEffect,
  generatePixelArtEffect,
  generateEnergyBlastEffect,
  // 🌟 NEW: Morphing Effects
  generateLiquidMorphingEffect,
  generatePlasmaMorphingEffect,
  generateCosmicMorphingEffect,
  // 🌟 NEW: Fluid Dynamics Effects
  generateTurbulentWavesEffect,
  // 🌟 NEW: Dimensional Effects
  generatePortalDistortionEffect,
  // 🌌 NEW: Dimensional Portal Effects
  generateQuantumTunnelEffect,
  generateRealityGlitchEffect,
  generateParallelUniverseEffect,
  generateWormholeTransitEffect,
  generateDimensionalRiftEffect,
  generateHolographicMatrixEffect,
  generateVoidChamberEffect,
  generateAstralProjectionEffect,
  // 🧬 NEW: Digital Life Effects
  generateAIConsciousnessEffect,
  generateBioDigitalMergeEffect,
  generateQuantumDNAEffect,
  generateDigitalEvolutionEffect,
  generateSyntheticSoulEffect,
  generateCyberSymbiosisEffect,
  generateNeuralStormEffect,
  generateDigitalGenomeEffect,
  // 🤖 NEW: Cyber Aesthetics Effects
  generateNeonGridCityEffect,
  generateDataStreamFlowEffect,
  generateCyberPunkNoirEffect,
  generateHologramInterfaceEffect,
  generateDigitalDecayEffect,
  generateChromeReflectionEffect,
  generateVirusInfectionEffect,
  generateQuantumEncryptionEffect,
  generateAugmentedRealityEffect,
  // 🧠 NEW: Consciousness Stream Effects
  generateThoughtWavesEffect,
  generateMemoryFragmentsEffect,
  generateDreamLogicEffect,
  generateEmotionalSpectrumEffect,
  generateMeditativeCalmEffect,
  generateAnxietySpiralEffect,
  generateEgoDissolutionEffect,
  generatePsychedelicInsightEffect,
  generateCollectiveUnconsciousEffect
}; 