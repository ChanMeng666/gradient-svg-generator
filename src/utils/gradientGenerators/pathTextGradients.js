/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 *
 * Path-Based Text Animation Gradients
 * Inspired by Readme Typing SVG - uses SVG path animations for text reveal effects
 */

// ============================================
// Category 1: Path-Based Text Animation
// ============================================

/**
 * Typing Path Reveal - Text appears character-by-character on animated path
 * Inspired by the core typing animation from Readme Typing SVG
 */
function generateTypingPathReveal(colors, duration) {
  const [bgColor, textColor, pathColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['1a1a2e', 'ffffff', '00ffff'];

  return `
    <defs>
      <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#${colors[0] || bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#${colors[1] || pathColor};stop-opacity:1" />
      </linearGradient>
    </defs>

    <rect width="854" height="120" fill="#${bgColor}"/>

    <path id="typingPath">
      <animate
        attributeName="d"
        begin="0s"
        dur="${duration}"
        fill="freeze"
        values="m50,60 h0; m50,60 h0; m50,60 h750; m50,60 h750"
        keyTimes="0; 0.1; 0.9; 1"
      />
    </path>

    <text font-family="'Courier New', monospace" font-size="32" fill="#${textColor}" font-weight="bold">
      <textPath href="#typingPath" startOffset="0">
        <tspan dy="8">##TEXT##</tspan>
      </textPath>
    </text>

    <!-- Cursor effect -->
    <rect x="50" y="45" width="3" height="30" fill="#${pathColor}">
      <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite"/>
      <animate attributeName="x" begin="0s" dur="${duration}" fill="freeze" values="50;50;800;800" keyTimes="0;0.1;0.9;1"/>
    </rect>
  `;
}

/**
 * Curved Flow - Text follows an animated curved path
 */
function generateCurvedFlow(colors, duration) {
  const [bgColor, textColor, pathColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['0a0e27', 'ffffff', 'ff00ff'];

  return `
    <defs>
      <radialGradient id="curvedBg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#${pathColor};stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:#${bgColor};stop-opacity:1" />
      </radialGradient>
    </defs>

    <rect width="854" height="120" fill="url(#curvedBg)"/>

    <path id="curvedPath" stroke="#${pathColor}" stroke-width="2" fill="none" opacity="0.3"
          d="M50,60 Q200,20 427,60 Q654,100 804,60">
      <animate attributeName="d"
        values="M50,60 Q200,100 427,60 Q654,20 804,60;
                M50,60 Q200,20 427,60 Q654,100 804,60;
                M50,60 Q200,100 427,60 Q654,20 804,60"
        dur="${duration}" repeatCount="indefinite"/>
    </path>

    <text font-family="Arial, sans-serif" font-size="36" fill="#${textColor}" font-weight="bold">
      <textPath href="#curvedPath" startOffset="50%" text-anchor="middle">
        ##TEXT##
        <animate attributeName="startOffset"
          values="0%;50%;100%;50%;0%"
          dur="${duration}"
          repeatCount="indefinite"/>
      </textPath>
    </text>
  `;
}

/**
 * Spiral Text - Text spirals inward or outward on spiral path
 */
function generateSpiralText(colors, duration) {
  const [bgColor, textColor, spiralColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['000000', 'ffff00', 'ff6600'];

  return `
    <defs>
      <radialGradient id="spiralGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#${spiralColor};stop-opacity:0.8">
          <animate attributeName="stop-opacity" values="0.8;0.3;0.8" dur="${duration}" repeatCount="indefinite"/>
        </stop>
        <stop offset="100%" style="stop-color:#${bgColor};stop-opacity:1" />
      </radialGradient>
    </defs>

    <rect width="854" height="120" fill="url(#spiralGradient)"/>

    <!-- Spiral path approximation using Bezier curves -->
    <path id="spiralPath" stroke="#${spiralColor}" stroke-width="1.5" fill="none" opacity="0.4"
          d="M427,60 Q500,60 520,80 Q540,100 520,120 Q480,140 427,120 Q374,100 354,80 Q334,40 374,20 Q440,-10 500,20">
      <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="${duration}" repeatCount="indefinite"/>
    </path>

    <text font-family="Arial, sans-serif" font-size="28" fill="#${textColor}" font-weight="bold">
      <textPath href="#spiralPath" startOffset="0%">
        ##TEXT##
        <animate attributeName="startOffset"
          values="0%;100%;0%"
          dur="${duration}"
          repeatCount="indefinite"/>
      </textPath>
    </text>
  `;
}

/**
 * Wave Text Path - Text follows an animated sine wave path
 */
function generateWaveTextPath(colors, duration) {
  const [bgColor, textColor, waveColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['001a33', 'ffffff', '00ccff'];

  return `
    <defs>
      <linearGradient id="waveGradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:#${bgColor};stop-opacity:1" />
        <stop offset="50%" style="stop-color:#${waveColor};stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:#${bgColor};stop-opacity:1" />
      </linearGradient>
    </defs>

    <rect width="854" height="120" fill="url(#waveGradient)"/>

    <path id="wavePath" stroke="#${waveColor}" stroke-width="2" fill="none" opacity="0.5"
          d="M20,60 Q127,20 234,60 T448,60 T662,60 T834,60">
      <animate attributeName="d"
        values="M20,60 Q127,20 234,60 T448,60 T662,60 T834,60;
                M20,60 Q127,100 234,60 T448,60 T662,60 T834,60;
                M20,60 Q127,20 234,60 T448,60 T662,60 T834,60"
        dur="${duration}" repeatCount="indefinite"/>
    </path>

    <text font-family="Arial, sans-serif" font-size="32" fill="#${textColor}" font-weight="bold">
      <textPath href="#wavePath" startOffset="50%" text-anchor="middle">
        ##TEXT##
        <animateTransform attributeName="transform" type="translate"
          values="0,0; 0,-5; 0,5; 0,0"
          dur="${duration}" repeatCount="indefinite"/>
      </textPath>
    </text>
  `;
}

// ============================================
// Category 2: Progressive Reveal
// ============================================

/**
 * Char by Char - Individual character reveal with growing path
 */
function generateCharByChar(colors, duration) {
  const [bgColor, textColor, highlightColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['1a1a1a', '00ff00', 'ffff00'];

  return `
    <defs>
      <linearGradient id="charGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#${highlightColor};stop-opacity:0.2" />
      </linearGradient>
    </defs>

    <rect width="854" height="120" fill="url(#charGradient)"/>

    <defs>
      <clipPath id="revealClip">
        <rect x="0" y="0" width="0" height="120">
          <animate attributeName="width" from="0" to="854" dur="${duration}" fill="freeze"/>
        </rect>
      </clipPath>
    </defs>

    <text x="427" y="70" font-family="'Courier New', monospace" font-size="36"
          fill="#${textColor}" font-weight="bold" text-anchor="middle"
          clip-path="url(#revealClip)">
      ##TEXT##
    </text>

    <!-- Scanning line -->
    <line x1="0" y1="30" x2="0" y2="90" stroke="#${highlightColor}" stroke-width="2">
      <animate attributeName="x1" from="0" to="854" dur="${duration}" fill="freeze"/>
      <animate attributeName="x2" from="0" to="854" dur="${duration}" fill="freeze"/>
      <animate attributeName="opacity" values="1;0" begin="${parseFloat(duration) * 0.95}s" dur="0.2s" fill="freeze"/>
    </line>
  `;
}

/**
 * Word Cascade - Words appear one at a time, cascading down
 */
function generateWordCascade(colors, duration) {
  const [bgColor, textColor, accentColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['2d1b69', 'ffffff', 'ff1493'];

  return `
    <defs>
      <linearGradient id="cascadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#${accentColor};stop-opacity:0.3" />
      </linearGradient>

      <filter id="cascadeGlow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feFlood flood-color="#${accentColor}" flood-opacity="0.6"/>
        <feComposite in2="blur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <rect width="854" height="120" fill="url(#cascadeGradient)"/>

    <text x="427" y="60" font-family="Arial, sans-serif" font-size="40"
          fill="#${textColor}" font-weight="bold" text-anchor="middle"
          filter="url(#cascadeGlow)">
      ##TEXT##
      <animate attributeName="opacity" values="0;0;1" keyTimes="0;0.3;1" dur="${duration}" fill="freeze"/>
      <animate attributeName="y" values="20;20;60" keyTimes="0;0.3;1" dur="${duration}" fill="freeze"/>
    </text>
  `;
}

/**
 * Line Sequence - Multiple text lines appear sequentially
 */
function generateLineSequence(colors, duration) {
  const [bgColor, line1Color, line2Color, line3Color] = colors.length >= 4
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['0d1117', '00ff00', '00ccff', 'ff00ff'];

  return `
    <defs>
      <linearGradient id="seqGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#${line3Color};stop-opacity:0.2" />
      </linearGradient>
    </defs>

    <rect width="854" height="120" fill="url(#seqGradient)"/>

    <!-- Line 1 -->
    <path id="line1">
      <animate attributeName="d" values="m100,35 h0; m100,35 h654"
        begin="0s" dur="${parseFloat(duration) / 3}s" fill="freeze"/>
    </path>
    <text font-family="'Courier New', monospace" font-size="20" fill="#${line1Color}" font-weight="600">
      <textPath href="#line1"><tspan dy="5">> ##TEXT##</tspan></textPath>
    </text>

    <!-- Line 2 -->
    <path id="line2">
      <animate attributeName="d" values="m100,60 h0; m100,60 h654"
        begin="${parseFloat(duration) / 3}s" dur="${parseFloat(duration) / 3}s" fill="freeze"/>
    </path>
    <text font-family="'Courier New', monospace" font-size="20" fill="#${line2Color}" font-weight="600">
      <textPath href="#line2"><tspan dy="5">> ##TEXT##</tspan></textPath>
    </text>

    <!-- Line 3 -->
    <path id="line3">
      <animate attributeName="d" values="m100,85 h0; m100,85 h654"
        begin="${(parseFloat(duration) * 2) / 3}s" dur="${parseFloat(duration) / 3}s" fill="freeze"/>
    </path>
    <text font-family="'Courier New', monospace" font-size="20" fill="#${line3Color}" font-weight="600">
      <textPath href="#line3"><tspan dy="5">> ##TEXT##</tspan></textPath>
    </text>
  `;
}

/**
 * Fade In Path - Text fades in while path draws
 */
function generateFadeInPath(colors, duration) {
  const [bgColor, textColor, pathColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['1a1a2e', 'ffffff', '00d4ff'];

  return `
    <defs>
      <radialGradient id="fadeGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#${pathColor};stop-opacity:0.2" />
        <stop offset="100%" style="stop-color:#${bgColor};stop-opacity:1" />
      </radialGradient>
    </defs>

    <rect width="854" height="120" fill="url(#fadeGradient)"/>

    <!-- Animated path -->
    <path stroke="#${pathColor}" stroke-width="3" fill="none" opacity="0.6"
          stroke-dasharray="854" stroke-dashoffset="854"
          d="M50,60 L804,60">
      <animate attributeName="stroke-dashoffset" from="854" to="0" dur="${duration}" fill="freeze"/>
    </path>

    <text x="427" y="70" font-family="Arial, sans-serif" font-size="40"
          fill="#${textColor}" font-weight="bold" text-anchor="middle">
      ##TEXT##
      <animate attributeName="opacity" from="0" to="1" dur="${duration}" fill="freeze"/>
      <animate attributeName="letter-spacing" values="20px;0px" dur="${duration}" fill="freeze"/>
    </text>
  `;
}

// ============================================
// Category 3: Stroke Drawing
// ============================================

/**
 * Handwriting - Text appears as if handwritten
 */
function generateHandwriting(colors, duration) {
  const [bgColor, inkColor, paperColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['f5f5dc', '2c3e50', 'add8e6'];

  return `
    <defs>
      <filter id="inkBleed">
        <feTurbulence baseFrequency="0.05" numOctaves="2" result="turbulence"/>
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="2"/>
      </filter>

      <linearGradient id="paperTexture" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#${paperColor};stop-opacity:0.3" />
      </linearGradient>
    </defs>

    <rect width="854" height="120" fill="url(#paperTexture)"/>

    <path id="handwritingPath" stroke="#${inkColor}" stroke-width="3" fill="none"
          stroke-dasharray="800" stroke-dashoffset="800" filter="url(#inkBleed)"
          d="M100,60 Q200,55 300,60 T500,60 T700,60 L754,60">
      <animate attributeName="stroke-dashoffset" from="800" to="0" dur="${duration}" fill="freeze"/>
    </path>

    <text font-family="'Brush Script MT', cursive" font-size="36" fill="#${inkColor}"
          font-weight="normal" opacity="0">
      <textPath href="#handwritingPath" startOffset="0">
        ##TEXT##
      </textPath>
      <animate attributeName="opacity" values="0;0;1" keyTimes="0;0.5;1" dur="${duration}" fill="freeze"/>
    </text>
  `;
}

/**
 * Brush Stroke - Artistic brush stroke reveals text
 */
function generateBrushStroke(colors, duration) {
  const [bgColor, brushColor, textColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['2c2c2c', 'ff6b6b', 'ffffff'];

  return `
    <defs>
      <linearGradient id="brushGradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" style="stop-color:#${brushColor};stop-opacity:0">
          <animate attributeName="stop-opacity" values="0;0.9;0.9" keyTimes="0;0.3;1" dur="${duration}" fill="freeze"/>
        </stop>
        <stop offset="50%" style="stop-color:#${brushColor};stop-opacity:0.9" />
        <stop offset="100%" style="stop-color:#${brushColor};stop-opacity:0">
          <animate attributeName="stop-opacity" values="0;0;0.9" keyTimes="0;0.7;1" dur="${duration}" fill="freeze"/>
        </stop>
      </linearGradient>

      <filter id="brushTexture">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>

    <rect width="854" height="120" fill="#${bgColor}"/>

    <!-- Brush stroke background -->
    <rect x="50" y="35" width="0" height="50" fill="url(#brushGradient)"
          rx="5" filter="url(#brushTexture)">
      <animate attributeName="width" from="0" to="754" dur="${duration}" fill="freeze"/>
    </rect>

    <text x="427" y="70" font-family="'Impact', Arial, sans-serif" font-size="42"
          fill="#${textColor}" font-weight="bold" text-anchor="middle">
      ##TEXT##
      <animate attributeName="opacity" values="0;0;1" keyTimes="0;0.4;1" dur="${duration}" fill="freeze"/>
    </text>
  `;
}

/**
 * Neon Flicker - Neon sign flickers on with path animation
 */
function generateNeonFlicker(colors, duration) {
  const [bgColor, neonColor, glowColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['0a0a0a', 'ff00ff', '00ffff'];

  return `
    <defs>
      <filter id="neonGlow">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <linearGradient id="neonBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#${neonColor};stop-opacity:0.05" />
      </linearGradient>
    </defs>

    <rect width="854" height="120" fill="url(#neonBg)"/>

    <text x="427" y="70" font-family="Arial, sans-serif" font-size="48"
          fill="#${neonColor}" font-weight="bold" text-anchor="middle"
          stroke="#${neonColor}" stroke-width="2" filter="url(#neonGlow)">
      ##TEXT##
      <animate attributeName="opacity"
        values="0;1;0.3;1;0.5;1;0.7;1;1"
        keyTimes="0;0.1;0.15;0.3;0.35;0.5;0.55;0.7;1"
        dur="${duration}" fill="freeze"/>
    </text>

    <!-- Additional glow layer -->
    <text x="427" y="70" font-family="Arial, sans-serif" font-size="48"
          fill="none" font-weight="bold" text-anchor="middle"
          stroke="#${glowColor}" stroke-width="1" opacity="0.6">
      ##TEXT##
      <animate attributeName="opacity"
        values="0;0.6;0;0.6;0;0.6;0;0.6;0.6"
        keyTimes="0;0.1;0.15;0.3;0.35;0.5;0.55;0.7;1"
        dur="${duration}" fill="freeze"/>
    </text>
  `;
}

/**
 * Elastic Bounce - Text on elastic bouncing path
 */
function generateElasticBounce(colors, duration) {
  const [bgColor, textColor, bounceColor] = colors.length >= 3
    ? colors.map(c => c.startsWith('#') ? c.substring(1) : c)
    : ['1a1a2e', 'ffffff', 'ff3366'];

  return `
    <defs>
      <radialGradient id="bounceGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#${bounceColor};stop-opacity:0.4" />
        <stop offset="100%" style="stop-color:#${bgColor};stop-opacity:1" />
      </radialGradient>

      <filter id="elasticBlur">
        <feGaussianBlur stdDeviation="0" result="blur">
          <animate attributeName="stdDeviation"
            values="0;3;0;2;0;1;0"
            dur="${duration}"
            fill="freeze"/>
        </feGaussianBlur>
      </filter>
    </defs>

    <rect width="854" height="120" fill="url(#bounceGradient)"/>

    <path id="bouncePath" fill="none">
      <animate attributeName="d"
        values="M100,60 L754,60;
                M100,40 L754,40;
                M100,70 L754,70;
                M100,55 L754,55;
                M100,65 L754,65;
                M100,60 L754,60"
        keyTimes="0;0.2;0.4;0.6;0.8;1"
        dur="${duration}" fill="freeze"/>
    </path>

    <text font-family="Arial, sans-serif" font-size="40" fill="#${textColor}"
          font-weight="bold" filter="url(#elasticBlur)">
      <textPath href="#bouncePath" startOffset="50%" text-anchor="middle">
        ##TEXT##
      </textPath>
    </text>

    <!-- Bounce indicator -->
    <circle cx="427" cy="60" r="5" fill="#${bounceColor}" opacity="0.6">
      <animate attributeName="cy"
        values="60;40;70;55;65;60"
        keyTimes="0;0.2;0.4;0.6;0.8;1"
        dur="${duration}" fill="freeze"/>
      <animate attributeName="r"
        values="5;8;5;7;5;6;5"
        dur="${duration}" fill="freeze"/>
    </circle>
  `;
}

// ============================================
// Factory Function
// ============================================

function createPathTextGradient(type, colors, duration = '6s') {
  switch (type) {
    // Path-Based Text Animation
    case 'typingPathReveal':
    case 'typing-path-reveal':
      return generateTypingPathReveal(colors, duration);
    case 'curvedFlow':
    case 'curved-flow':
      return generateCurvedFlow(colors, duration);
    case 'spiralText':
    case 'spiral-text':
      return generateSpiralText(colors, duration);
    case 'waveTextPath':
    case 'wave-text-path':
      return generateWaveTextPath(colors, duration);

    // Progressive Reveal
    case 'charByChar':
    case 'char-by-char':
      return generateCharByChar(colors, duration);
    case 'wordCascade':
    case 'word-cascade':
      return generateWordCascade(colors, duration);
    case 'lineSequence':
    case 'line-sequence':
      return generateLineSequence(colors, duration);
    case 'fadeInPath':
    case 'fade-in-path':
      return generateFadeInPath(colors, duration);

    // Stroke Drawing
    case 'handwriting':
      return generateHandwriting(colors, duration);
    case 'brushStroke':
    case 'brush-stroke':
      return generateBrushStroke(colors, duration);
    case 'neonFlicker':
    case 'neon-flicker':
      return generateNeonFlicker(colors, duration);
    case 'elasticBounce':
    case 'elastic-bounce':
      return generateElasticBounce(colors, duration);

    default:
      return generateTypingPathReveal(colors, duration);
  }
}

module.exports = {
  createPathTextGradient,
  // Export individual functions for testing
  generateTypingPathReveal,
  generateCurvedFlow,
  generateSpiralText,
  generateWaveTextPath,
  generateCharByChar,
  generateWordCascade,
  generateLineSequence,
  generateFadeInPath,
  generateHandwriting,
  generateBrushStroke,
  generateNeonFlicker,
  generateElasticBounce
};
