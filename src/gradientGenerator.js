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

// const { createGradientFromColors } = require('./utils/svgUtils');
// const { getTemplateConfig } = require('./config/gradientConfig');

// function generateGradientSVG({ text, color = '000000', height = 120, template = '' }) {
//   const config = getTemplateConfig(template, color);
//   const gradientDef = createGradientFromColors(config.colors, config.gradientType, config.animationDuration);

//   return `<?xml version="1.0" encoding="UTF-8"?>
//     <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
//       width="854" height="${height}" viewBox="0 0 854 ${height}">
//       <defs>
//         ${gradientDef}
//         <filter id="softLight">
//           <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
//           <feColorMatrix in="blur" type="saturate" values="1.2" result="saturated"/>
//           <feMerge>
//             <feMergeNode in="saturated"/>
//             <feMergeNode in="SourceGraphic"/>
//           </feMerge>
//         </filter>
//       </defs>
      
//       <rect 
//         width="854" 
//         height="${height}" 
//         fill="url(#gradient)"
//         filter="url(#smoothTransition)"
//       >
//         <animate
//           attributeName="opacity"
//           values="0.95;1;0.95"
//           dur="3s"
//           repeatCount="indefinite"
//         />
//       </rect>
      
//       <text 
//         x="427" 
//         y="${height/2}"
//         font-size="40"
//         font-family="Arial, sans-serif"
//         font-weight="bold"
//         text-anchor="middle"
//         alignment-baseline="middle"
//         fill="#ffffff"
//         filter="url(#softLight)"
//       >${text}</text>
//     </svg>`;
// }

// module.exports = generateGradientSVG;



const { createGradientFromColors } = require('./utils/svgUtils');
const { getTemplateConfig } = require('./config/gradientConfig');

function generateGradientSVG({ text, color = '000000', height = 120, template = '' }) {
  const config = getTemplateConfig(template, color);
  
  let gradientDef;
  let gradientTransform = '';
  
  switch (config.gradientType) {
    case 'vertical':
      gradientTransform = 'rotate(90)';
      break;
    case 'diagonal':
      gradientTransform = 'rotate(45)';
      break;
    case 'radial':
      return generateRadialGradient(text, config.colors, height, config.animationDuration);
    case 'conic':
      return generateConicGradient(text, config.colors, height, config.animationDuration);
    default:
      gradientTransform = '';
  }

  gradientDef = createGradientFromColors(config.colors, gradientTransform, config.animationDuration);

  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientDef}
      </defs>
      <rect 
        width="854" 
        height="${height}" 
        fill="url(#gradient)"
      />
      <text 
        x="427" 
        y="${height/2}"
        font-size="40"
        font-family="Arial, sans-serif"
        font-weight="bold"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="#ffffff"
      >${text}</text>
    </svg>`;
}

function generateRadialGradient(text, colors, height, duration) {
  const stops = colors.map((color, i) => 
    `<stop offset="${(i * 100) / (colors.length - 1)}%" stop-color="#${color}" />`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="0.4;0.8;0.4" dur="${duration}" repeatCount="indefinite" />
        </radialGradient>
      </defs>
      <rect width="854" height="${height}" fill="url(#gradient)" />
      <text 
        x="427" 
        y="${height/2}"
        font-size="40"
        font-family="Arial, sans-serif"
        font-weight="bold"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="#ffffff"
      >${text}</text>
    </svg>`;
}

function generateConicGradient(text, colors, height, duration) {
  const stops = colors.map((color, i) => 
    `<stop offset="${(i * 100) / (colors.length - 1)}%" stop-color="#${color}" />`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(0)">
          ${stops}
        </linearGradient>
      </defs>
      <rect width="854" height="${height}" fill="url(#gradient)">
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 427 ${height/2}"
          to="360 427 ${height/2}"
          dur="${duration}"
          repeatCount="indefinite"
        />
      </rect>
      <text 
        x="427" 
        y="${height/2}"
        font-size="40"
        font-family="Arial, sans-serif"
        font-weight="bold"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="#ffffff"
      >${text}</text>
    </svg>`;
}

module.exports = generateGradientSVG;