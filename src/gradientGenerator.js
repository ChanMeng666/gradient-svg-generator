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
  const gradientDef = createGradientFromColors(config.colors, config.gradientType, config.animationDuration);

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
      </defs>
      
      <rect 
        width="854" 
        height="${height}" 
        fill="url(#gradient)"
        filter="url(#smoothTransition)"
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