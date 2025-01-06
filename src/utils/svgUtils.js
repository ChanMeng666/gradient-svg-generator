function createGradientFromColors(colors, gradientType = 'horizontal', animationDuration = '6s') {
  const colorList = [...colors, colors[0]];
  const stops = colorList.map((color, index) => {
    const offset = (index / (colorList.length - 1)) * 100;
    return `<stop offset="${offset}%" style="stop-color:#${color}">
      <animate 
        attributeName="stop-color" 
        values="#${color};#${colorList[(index + 1) % colorList.length]};#${color}"
        dur="${animationDuration}"
        repeatCount="indefinite"
      />
    </stop>`;
  }).join('');

  let gradientAttributes, gradientAnimations;
  switch (gradientType) {
    case 'horizontal':
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = `
        <animate 
          attributeName="x1" 
          values="-100%;0%;100%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />
        <animate 
          attributeName="x2" 
          values="0%;100%;200%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />`;
      break;
    case 'vertical':
      gradientAttributes = 'x1="0%" y1="0%" x2="0%" y2="100%"';
      gradientAnimations = `
        <animate 
          attributeName="y1" 
          values="-100%;0%;100%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />
        <animate 
          attributeName="y2" 
          values="0%;100%;200%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />`;
      break;
    case 'diagonal':
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="100%"';
      gradientAnimations = `
        <animate 
          attributeName="x1" 
          values="-100%;0%;100%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />
        <animate 
          attributeName="y1" 
          values="-100%;0%;100%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />
        <animate 
          attributeName="x2" 
          values="0%;100%;200%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />
        <animate 
          attributeName="y2" 
          values="0%;100%;200%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />`;
      break;
    case 'circular':
      gradientAttributes = 'cx="50%" cy="50%" r="50%"';
      gradientAnimations = `
        <animate 
          attributeName="r" 
          values="45%;55%;45%"
          dur="${animationDuration}"
          repeatCount="indefinite"
        />`;
      break;
    default:
      gradientAttributes = 'x1="0%" y1="0%" x2="100%" y2="0%"';
      gradientAnimations = '';
  }

  return `
    <${gradientType === 'circular' ? 'radialGradient' : 'linearGradient'} id="gradient" ${gradientAttributes}>
      ${stops}
      ${gradientAnimations}
    </${gradientType === 'circular' ? 'radialGradient' : 'linearGradient'}>
  `;
}

module.exports = { createGradientFromColors };