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

  let gradientAttributes, gradientAnimations, additionalDefs = '';
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

    case 'conic':
      // 使用多个径向渐变创建圆锥效果
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;360 50 50;0 50 50" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    case 'wave':
      // 创建波浪效果
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = `
        <animate attributeName="x1" values="0%;50%;100%;50%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;30%;0%;-30%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;150%;200%;150%;100%" ${animationConfig} />
        <animate attributeName="y2" values="0%;30%;0%;-30%;0%" ${animationConfig} />`;
      break;

    case 'spiral':
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animateTransform attributeName="gradientTransform" type="rotate" 
            values="0 50 50;360 50 50;720 50 50" dur="${animationDuration}" repeatCount="indefinite" />
          <animate attributeName="r" values="30%;70%;30%" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    case 'diamond':
      gradientAttributes = 'x1="50%" y1="0%" x2="50%" y2="100%"';
      gradientAnimations = `
        <animate attributeName="x1" values="20%;50%;80%;50%;20%" ${animationConfig} />
        <animate attributeName="y1" values="20%;0%;20%;0%;20%" ${animationConfig} />
        <animate attributeName="x2" values="80%;50%;20%;50%;80%" ${animationConfig} />
        <animate attributeName="y2" values="80%;100%;80%;100%;80%" ${animationConfig} />`;
      break;

    case 'burst':
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="0%;80%;0%" ${animationConfig} />
          <animate attributeName="cx" values="50%;40%;60%;50%" ${animationConfig} />
          <animate attributeName="cy" values="50%;40%;60%;50%" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    case 'reflection':
      gradientAttributes = 'x1="0%" y1="0%" x2="0%" y2="100%"';
      gradientAnimations = `
        <animate attributeName="y1" values="0%;50%;100%;50%;0%" ${animationConfig} />
        <animate attributeName="y2" values="100%;150%;200%;150%;100%" ${animationConfig} />`;
      break;

    case 'pulse':
      additionalDefs = `
        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          ${stops}
          <animate attributeName="r" values="20%;60%;20%" dur="2s" repeatCount="indefinite" />
          <animate attributeName="fx" values="45%;55%;45%" ${animationConfig} />
          <animate attributeName="fy" values="45%;55%;45%" ${animationConfig} />
        </radialGradient>`;
      return additionalDefs;

    default:
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = '';
  }

  const isRadialGradient = ['circular', 'radial', 'conic', 'spiral', 'burst', 'pulse'].includes(gradientType);
  const gradientElement = isRadialGradient ? 'radialGradient' : 'linearGradient';

  return `
    <${gradientElement} id="gradient" ${gradientAttributes}>
      ${stops}
      ${gradientAnimations}
    </${gradientElement}>
  `;
}

module.exports = { createGradientFromColors };