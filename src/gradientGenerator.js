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
        
//         <filter id="smoothTransition">
//           <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
//           <feColorMatrix type="saturate" values="1.5"/>
//           <feComposite operator="over" in2="SourceGraphic"/>
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
//           calcMode="spline"
//           keyTimes="0;0.5;1"
//           keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"
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
  // 如果提供了模板，使用模板配置
  let config;
  if (template) {
    config = getTemplateConfig(template);
    colors = config.colors;
    gradientType = config.gradientType;
    duration = config.animationDuration;
  }

  const gradientDef = createGradientFromColors(colors, gradientType, duration);

  // 根据渐变类型调整滤镜效果
  const filterEffect = gradientType === 'radial' ? 'url(#radialBlur)' : 'url(#smoothTransition)';

  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      width="854" height="${height}" viewBox="0 0 854 ${height}">
      <defs>
        ${gradientDef}
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
        font-family="Arial, sans-serif"
        font-weight="bold"
        text-anchor="middle"
        alignment-baseline="middle"
        fill="#ffffff"
        filter="url(#softLight)"
      >${text}</text>
    </svg>`;
}

module.exports = generateGradientSVG;