/*
 *
 */

/*
 *
 */

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

/*
 *
 */

// gradientGenerator.js
const { createGradientFromColors } = require('./utils/svgUtils');
const { getTemplateConfig } = require('./config/gradientConfig');

function generateGradientSVG({ 
  text, 
  colors = ['000000'], 
  height = 120, 
  gradientType = 'horizontal',
  duration = '6s',
  template = '' 
}) {
  // If template is provided, use template configuration
  let config;
  if (template) {
    config = getTemplateConfig(template);
    colors = config.colors;
    gradientType = config.gradientType;
    duration = config.animationDuration;
  }

  const gradientDef = createGradientFromColors(colors, gradientType, duration);

  // Choose appropriate filter effects based on gradient type
  let filterEffect = 'url(#smoothTransition)';
  let additionalFilters = '';

  switch (gradientType) {
    case 'radial':
    case 'circular':
      filterEffect = 'url(#radialBlur)';
      break;
    case 'burst':
    case 'pulse':
      filterEffect = 'url(#energyEffect)';
      break;
    case 'spiral':
    case 'conic':
      filterEffect = 'url(#spiralEffect)';
      break;
    case 'wave':
      filterEffect = 'url(#waveEffect)';
      break;
    case 'diamond':
      filterEffect = 'url(#crystalEffect)';
      break;
    case 'reflection':
      filterEffect = 'url(#reflectionEffect)';
      break;
    default:
      filterEffect = 'url(#smoothTransition)';
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientDef}
        
        <!-- Enhanced Filter Effects -->
        <filter id="softLight">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feColorMatrix in="blur" type="saturate" values="1.2" result="saturated"/>
          <feMerge>
            <feMergeNode in="saturated"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="smoothTransition">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="1.5"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="radialBlur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
          <feColorMatrix type="saturate" values="1.3"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="energyEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"/>
          <feColorMatrix type="saturate" values="1.8"/>
          <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="spiralEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="1.6"/>
          <feTurbulence baseFrequency="0.01" numOctaves="2" result="spiral"/>
          <feDisplacementMap in="SourceGraphic" in2="spiral" scale="3"/>
        </filter>

        <filter id="waveEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
          <feColorMatrix type="saturate" values="1.4"/>
          <feTurbulence baseFrequency="0.03 0.01" numOctaves="2" result="wave"/>
          <feDisplacementMap in="SourceGraphic" in2="wave" scale="1.5"/>
        </filter>

        <filter id="crystalEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
          <feColorMatrix type="saturate" values="1.7"/>
          <feSpecularLighting in="SourceGraphic" specularConstant="1.5" specularExponent="20" lighting-color="white">
            <fePointLight x="427" y="${height/4}" z="100"/>
          </feSpecularLighting>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>

        <filter id="reflectionEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          <feColorMatrix type="saturate" values="1.3"/>
          <feOffset in="SourceGraphic" dx="0" dy="2" result="offset"/>
          <feFlood flood-color="rgba(255,255,255,0.3)" result="white"/>
          <feComposite in="white" in2="offset" operator="in" result="reflection"/>
          <feMerge>
            <feMergeNode in="SourceGraphic"/>
            <feMergeNode in="reflection"/>
          </feMerge>
        </filter>

        <!-- Text Shadow Effect -->
        <filter id="textShadow">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.5"/>
          <feColorMatrix type="saturate" values="1.2"/>
        </filter>
      </defs>
      
      <rect 
        width="854" 
        height="${height}" 
        fill="url(#gradient)"
        filter="${filterEffect}"
      >
        <animate
          attributeName="opacity"
          values="0.95;1;0.95"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"
        />
      </rect>
      
      <text 
        x="427" 
        y="${height/2}"
        font-size="40"
        font-family="'Arial Black', Arial, sans-serif"
        font-weight="bold"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="#ffffff"
        filter="url(#textShadow)"
      >
        ${text}
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.5;1"
          keySplines="0.3 0.0 0.2 1; 0.3 0.0 0.2 1"
        />
      </text>
    </svg>`;
}

module.exports = generateGradientSVG;