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

// function createGradientFromColors(colors, gradientType = 'horizontal', animationDuration = '6s') {
//   const colorList = [...colors, colors[0]];
//   const stops = colorList.map((color, index) => {
//     const offset = (index / (colorList.length - 1)) * 100;
//     return `<stop offset="${offset}%" style="stop-color:#${color}">
//       <animate 
//         attributeName="stop-color" 
//         values="#${color};#${colorList[(index + 1) % colorList.length]};#${color}"
//         dur="${animationDuration}"
//         repeatCount="indefinite"
//       />
//     </stop>`;
//   }).join('');

//   let gradientAttributes, gradientAnimations;
//   switch (gradientType) {
//     case 'horizontal':
//       gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
//       gradientAnimations = `
//         <animate 
//           attributeName="x1" 
//           values="-100%;0%;100%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />
//         <animate 
//           attributeName="x2" 
//           values="0%;100%;200%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />`;
//       break;
//     case 'vertical':
//       gradientAttributes = 'x1="0%" y1="0%" x2="0%" y2="100%"';
//       gradientAnimations = `
//         <animate 
//           attributeName="y1" 
//           values="-100%;0%;100%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />
//         <animate 
//           attributeName="y2" 
//           values="0%;100%;200%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />`;
//       break;
//     case 'diagonal':
//       gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="100%"';
//       gradientAnimations = `
//         <animate 
//           attributeName="x1" 
//           values="-100%;0%;100%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />
//         <animate 
//           attributeName="y1" 
//           values="-100%;0%;100%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />
//         <animate 
//           attributeName="x2" 
//           values="0%;100%;200%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />
//         <animate 
//           attributeName="y2" 
//           values="0%;100%;200%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />`;
//       break;
//     case 'circular':
//       gradientAttributes = 'cx="50%" cy="50%" r="50%"';
//       gradientAnimations = `
//         <animate 
//           attributeName="r" 
//           values="45%;55%;45%"
//           dur="${animationDuration}"
//           repeatCount="indefinite"
//         />`;
//       break;
//     default:
//       gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
//       gradientAnimations = '';
//   }

//   return `
//     <${gradientType === 'circular' ? 'radialGradient' : 'linearGradient'} id="gradient" ${gradientAttributes}>
//       ${stops}
//       ${gradientAnimations}
//     </${gradientType === 'circular' ? 'radialGradient' : 'linearGradient'}>
//   `;
// }

// module.exports = { createGradientFromColors };



// function createGradientFromColors(colors, gradientType = 'horizontal', animationDuration = '6s') {
//   const colorList = [...colors, colors[0]];
//   const stops = colorList.map((color, index) => {
//     const offset = (index / (colorList.length - 1)) * 100;
//     const nextColor = colorList[(index + 1) % colorList.length];
//     return `<stop offset="${offset}%" style="stop-color:#${color}">
//       <animate 
//         attributeName="stop-color" 
//         values="#${color};#${nextColor};#${color}"
//         dur="${animationDuration}"
//         repeatCount="indefinite"
//         calcMode="spline"
//         keyTimes="0;0.5;1"
//         keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"
//       />
//     </stop>`;
//   }).join('');

//   let gradientAttributes, gradientAnimations;
//   const animationConfig = `dur="${animationDuration}" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"`;

//   switch (gradientType) {
//     case 'horizontal':
//       gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
//       gradientAnimations = `
//         <animate attributeName="x1" values="-100%;0%;100%" ${animationConfig} />
//         <animate attributeName="x2" values="0%;100%;200%" ${animationConfig} />`;
//       break;
//     case 'vertical':
//       gradientAttributes = 'x1="0%" y1="0%" x2="0%" y2="100%"';
//       gradientAnimations = `
//         <animate attributeName="y1" values="-100%;0%;100%" ${animationConfig} />
//         <animate attributeName="y2" values="0%;100%;200%" ${animationConfig} />`;
//       break;
//     case 'diagonal':
//       gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="100%"';
//       gradientAnimations = `
//         <animate attributeName="x1" values="-100%;0%;100%" ${animationConfig} />
//         <animate attributeName="y1" values="-100%;0%;100%" ${animationConfig} />
//         <animate attributeName="x2" values="0%;100%;200%" ${animationConfig} />
//         <animate attributeName="y2" values="0%;100%;200%" ${animationConfig} />`;
//       break;
//     case 'circular':
//       gradientAttributes = 'cx="50%" cy="50%" r="50%"';
//       gradientAnimations = `
//         <animate attributeName="r" values="45%;55%;45%" ${animationConfig} />`;
//       break;
//     default:
//       gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
//       gradientAnimations = '';
//   }

//   return `
//     <${gradientType === 'circular' ? 'radialGradient' : 'linearGradient'} id="gradient" ${gradientAttributes}>
//       ${stops}
//       ${gradientAnimations}
//     </${gradientType === 'circular' ? 'radialGradient' : 'linearGradient'}>
//   `;
// }

// module.exports = { createGradientFromColors };





// svgUtils.js
function createGradientFromColors(colors, gradientType = 'horizontal', animationDuration = '6s') {
  // 创建一个新的颜色数组副本，而不是修改参数
  let colorArray = Array.isArray(colors) ? [...colors] : ['000000'];
  
  // 如果数组为空，设置默认值
  if (colorArray.length === 0) {
    colorArray = ['000000'];
  }

  // 如果只有一个颜色，创建一个渐变版本
  if (colorArray.length === 1) {
    colorArray = [colorArray[0], `${colorArray[0]}88`];
  }

  // 循环颜色列表以创建渐变动画
  const colorList = [...colorArray, colorArray[0]];
  
  const stops = colorList.map((color, index) => {
    const offset = (index / (colorList.length - 1)) * 100;
    const nextColor = colorList[(index + 1) % colorList.length];
    return `<stop offset="${offset}%" style="stop-color:#${color}">
      <animate 
        attributeName="stop-color" 
        values="#${color};#${nextColor};#${color}"
        dur="${animationDuration}"
        repeatCount="indefinite"
        calcMode="spline"
        keyTimes="0;0.5;1"
        keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"
      />
    </stop>`;
  }).join('');

  let gradientAttributes, gradientAnimations;
  const animationConfig = `dur="${animationDuration}" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0.0 0.2 1; 0.4 0.0 0.2 1"`;

  switch (gradientType) {
    case 'horizontal':
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = `
        <animate attributeName="x1" values="-100%;0%;100%" ${animationConfig} />
        <animate attributeName="x2" values="0%;100%;200%" ${animationConfig} />`;
      break;

    case 'vertical':
      gradientAttributes = 'x1="0%" y1="0%" x2="0%" y2="100%"';
      gradientAnimations = `
        <animate attributeName="y1" values="-100%;0%;100%" ${animationConfig} />
        <animate attributeName="y2" values="0%;100%;200%" ${animationConfig} />`;
      break;

    case 'diagonal':
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="100%"';
      gradientAnimations = `
        <animate attributeName="x1" values="-100%;0%;100%" ${animationConfig} />
        <animate attributeName="y1" values="-100%;0%;100%" ${animationConfig} />
        <animate attributeName="x2" values="0%;100%;200%" ${animationConfig} />
        <animate attributeName="y2" values="0%;100%;200%" ${animationConfig} />`;
      break;

    case 'circular':
      gradientAttributes = 'cx="50%" cy="50%" r="50%"';
      gradientAnimations = `
        <animate attributeName="r" values="45%;55%;45%" ${animationConfig} />`;
      break;

    case 'radial':
      gradientAttributes = 'cx="50%" cy="50%" r="70%"';
      gradientAnimations = `
        <animate attributeName="r" values="65%;75%;65%" ${animationConfig} />
        <animate attributeName="cx" values="45%;55%;45%" ${animationConfig} />
        <animate attributeName="cy" values="45%;55%;45%" ${animationConfig} />`;
      break;

    default:
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = '';
  }

  const isRadialGradient = gradientType === 'circular' || gradientType === 'radial';
  const gradientElement = isRadialGradient ? 'radialGradient' : 'linearGradient';

  return `
    <${gradientElement} id="gradient" ${gradientAttributes}>
      ${stops}
      ${gradientAnimations}
    </${gradientElement}>
  `;
}

module.exports = { createGradientFromColors };