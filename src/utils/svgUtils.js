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

// Import the gradient factory
const { createGradient } = require('./gradientFactory');

// Main SVG utility function
function createGradientFromColors(colors, gradientType = 'horizontal', animationDuration = '6s') {
  // Create a new copy of the colors array instead of modifying the parameter
  let colorsCopy = [...colors];
  
  // If array is empty, set default value
  if (colorsCopy.length === 0) {
    colorsCopy = ['000000'];
  }
  
  // If only one color, create a gradient version
  if (colorsCopy.length === 1) {
    const baseColor = colorsCopy[0];
    colorsCopy = [baseColor, baseColor, baseColor];
  }
  
  // Loop through color list to create gradient animation
  const extendedColors = [...colorsCopy, ...colorsCopy];
  const stops = extendedColors.map((color, index) => {
    const offset = (index / (extendedColors.length - 1)) * 100;
    return `<stop offset="${offset}%" stop-color="#${color}" />`;
  }).join('');

  const animationConfig = `dur="${animationDuration}" repeatCount="indefinite"`;
  
  // Use the gradient factory to create the gradient
  const result = createGradient(gradientType, stops, animationConfig, animationDuration, colorsCopy);

  let gradientDef = result.gradientDef || '';
  let additionalElements = result.additionalElements || '';
  let hasClipPath = result.hasClipPath || false;
  let clipPathId = result.clipPathId || null;
  let replaceMainRect = result.replaceMainRect || false;

  return {
    gradientDef,
    additionalElements,
    hasClipPath,
    clipPathId,
    replaceMainRect,
    useAdvancedEffect: result.useAdvancedEffect || false,
    effectType: result.effectType || null
  };
}

module.exports = { createGradientFromColors };