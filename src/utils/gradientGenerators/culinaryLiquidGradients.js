/*
 * MIT License - Culinary & Liquid Flow Gradient Generators
 * Food and beverage aesthetic patterns with fluid dynamics
 * Refactored to use centralized FilterLibrary and AnimationLibrary
 *
 * Copyright (c) 2025 ChanMeng666
 */

const { createTurbulenceFilter, createBlurFilter } = require('../../core/FilterLibrary');
const { multiplyDuration } = require('../../core/AnimationLibrary');

// Coffee Cream - Swirling cream mixing into coffee
function createCoffeeCreamGradient(stops, animationConfig, animationDuration) {
  const creamFilter = createTurbulenceFilter('creamMix', {
    baseFrequency: '0.3',
    numOctaves: 3,
    scale: 15,
    animated: true,
    animationValues: '10;20;10',
    duration: animationDuration
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="cx" values="50%;45%;55%;50%" ${animationConfig} />
        <animate attributeName="cy" values="50%;55%;45%;50%" dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite" />
      </radialGradient>
      ${creamFilter}`,
    additionalElements: `
      <g filter="url(#creamMix)">
        <ellipse cx="400" cy="300" rx="120" ry="100" fill="url(#gradient)" opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" ${animationConfig} />
        </ellipse>
        <ellipse cx="350" cy="280" rx="80" ry="70" fill="url(#gradient)" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="0 350 280;-360 350 280" dur="${multiplyDuration(animationDuration, 1.3)}" repeatCount="indefinite" />
        </ellipse>
      </g>`
  };
}

// Wine Pour - Liquid flow with transparency and bubbles
function createWinePourGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
        ${stops}
        <animate attributeName="y1" values="0%;-20%;0%" ${animationConfig} />
      </linearGradient>
      <radialGradient id="bubbleGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2"/>
      </radialGradient>`,
    additionalElements: `
      <g>
        <path d="M 350 100 Q 360 150, 370 200 Q 380 250, 390 300 Q 395 350, 400 400"
              stroke="url(#gradient)" stroke-width="40" fill="none" opacity="0.9">
          <animate attributeName="d"
                   values="M 350 100 Q 360 150, 370 200 Q 380 250, 390 300 Q 395 350, 400 400;
                           M 350 100 Q 355 150, 365 200 Q 375 250, 385 300 Q 392 350, 400 400;
                           M 350 100 Q 360 150, 370 200 Q 380 250, 390 300 Q 395 350, 400 400"
                   ${animationConfig} />
        </path>
        ${Array.from({length: 8}, (_, i) => `
          <circle cx="${370 + i * 5}" cy="${200 + i * 30}" r="${3 + (i % 2)}" fill="url(#bubbleGrad)">
            <animate attributeName="cy" values="${200 + i * 30};${150 + i * 30};${200 + i * 30}" dur="${3 + i * 0.3}s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="${2 + i * 0.2}s" repeatCount="indefinite" />
          </circle>
        `).join('')}
      </g>`
  };
}

// Honey Drizzle - Viscous golden syrup flow
function createHoneyDrizzleGradient(stops, animationConfig, animationDuration) {
  const honeyFilter = `
    <filter id="honeyGlow">
      <feGaussianBlur stdDeviation="2"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="1.2"/>
      </feComponentTransfer>
    </filter>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
        ${stops}
      </linearGradient>
      ${honeyFilter}`,
    additionalElements: `
      <g filter="url(#honeyGlow)">
        <ellipse cx="400" cy="150" rx="30" ry="20" fill="url(#gradient)" opacity="0.95">
          <animate attributeName="ry" values="15;25;15" ${animationConfig} />
        </ellipse>
        <path d="M 400 170 Q 395 250, 390 350 Q 388 400, 385 450"
              stroke="url(#gradient)" stroke-width="25" fill="none" opacity="0.9">
          <animate attributeName="stroke-width" values="20;30;20" ${animationConfig} />
        </path>
        <ellipse cx="385" cy="470" rx="60" ry="25" fill="url(#gradient)" opacity="0.85">
          <animate attributeName="rx" values="50;70;50" dur="${multiplyDuration(animationDuration, 1.5)}" repeatCount="indefinite" />
        </ellipse>
      </g>`
  };
}

// Chocolate Melt - Heat-induced liquefaction
function createChocolateMeltGradient(stops, animationConfig, animationDuration) {
  const meltFilter = createTurbulenceFilter('meltDistortion', {
    baseFrequency: '0.15',
    numOctaves: 2,
    scale: 12,
    animated: true,
    animationValues: '8;16;8',
    duration: animationDuration
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
        ${stops}
        <animate attributeName="y2" values="100%;110%;100%" ${animationConfig} />
      </linearGradient>
      ${meltFilter}`,
    additionalElements: `
      <g filter="url(#meltDistortion)">
        <rect x="300" y="150" width="200" height="100" fill="url(#gradient)" opacity="0.95">
          <animate attributeName="height" values="100;120;100" ${animationConfig} />
        </rect>
        <path d="M 300 250 L 300 280 Q 320 300, 340 310 Q 360 320, 380 315 Q 400 310, 420 315 Q 440 320, 460 310 Q 480 300, 500 280 L 500 250 Z"
              fill="url(#gradient)" opacity="0.9">
          <animate attributeName="d"
                   values="M 300 250 L 300 280 Q 320 300, 340 310 Q 360 320, 380 315 Q 400 310, 420 315 Q 440 320, 460 310 Q 480 300, 500 280 L 500 250 Z;
                           M 300 250 L 300 300 Q 320 330, 340 345 Q 360 360, 380 355 Q 400 350, 420 355 Q 440 360, 460 345 Q 480 330, 500 300 L 500 250 Z;
                           M 300 250 L 300 280 Q 320 300, 340 310 Q 360 320, 380 315 Q 400 310, 420 315 Q 440 320, 460 310 Q 480 300, 500 280 L 500 250 Z"
                   ${animationConfig} />
        </path>
      </g>`
  };
}

// Caramel Swirl - Thick sweet spiral pattern
function createCaramelSwirlGradient(stops, animationConfig, animationDuration) {
  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
        <animate attributeName="r" values="45%;55%;45%" ${animationConfig} />
      </radialGradient>`,
    additionalElements: `
      <g transform="translate(400, 300)">
        ${Array.from({length: 5}, (_, i) => {
          const radius = 40 + i * 30;
          const startAngle = i * 72;
          return `
            <path d="M ${radius * Math.cos(startAngle * Math.PI / 180)} ${radius * Math.sin(startAngle * Math.PI / 180)}
                     A ${radius} ${radius} 0 1 1 ${radius * Math.cos((startAngle + 359) * Math.PI / 180)} ${radius * Math.sin((startAngle + 359) * Math.PI / 180)}"
                  stroke="url(#gradient)" stroke-width="${20 - i * 2}" fill="none" opacity="${0.9 - i * 0.1}">
              <animateTransform attributeName="transform" type="rotate" values="0;360" dur="${multiplyDuration(animationDuration, 1 + i * 0.2)}" repeatCount="indefinite"/>
            </path>
          `;
        }).join('')}
      </g>`
  };
}

// Tie-Dye - Fabric dye diffusion spiral
function createTieDyeGradient(stops, animationConfig, animationDuration) {
  const tieDyeFilter = createTurbulenceFilter('tieDyeDiffusion', {
    baseFrequency: '0.5',
    numOctaves: 2,
    scale: 25,
    animated: true,
    animationValues: '20;30;20',
    duration: animationDuration
  });

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
        ${stops}
      </radialGradient>
      ${tieDyeFilter}`,
    additionalElements: `
      <g filter="url(#tieDyeDiffusion)">
        <circle cx="400" cy="300" r="150" fill="url(#gradient)" opacity="0.8">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" ${animationConfig} />
        </circle>
        <circle cx="400" cy="300" r="100" fill="url(#gradient)" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" values="360 400 300;0 400 300" dur="${multiplyDuration(animationDuration, 1.3)}" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="300" r="60" fill="url(#gradient)" opacity="0.9">
          <animateTransform attributeName="transform" type="rotate" values="0 400 300;360 400 300" dur="${multiplyDuration(animationDuration, 0.7)}" repeatCount="indefinite" />
        </circle>
      </g>`
  };
}

// Marble Mixing - Cake batter swirl patterns
function createMarbleMixingGradient(stops, animationConfig, animationDuration) {
  const marbleFilter = createTurbulenceFilter('marbleTexture', {
    baseFrequency: '0.4',
    numOctaves: 3,
    scale: 20,
    animated: true,
    animationValues: '15;25;15',
    duration: animationDuration
  });

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        ${stops}
        <animate attributeName="x1" values="0%;20%;0%" ${animationConfig} />
        <animate attributeName="y1" values="0%;20%;0%" dur="${multiplyDuration(animationDuration, 1.2)}" repeatCount="indefinite" />
      </linearGradient>
      ${marbleFilter}`,
    additionalElements: `
      <g filter="url(#marbleTexture)">
        <path d="M 100 200 Q 200 250, 300 200 T 500 200 Q 600 250, 700 200"
              stroke="url(#gradient)" stroke-width="60" fill="none" opacity="0.8">
          <animate attributeName="d"
                   values="M 100 200 Q 200 250, 300 200 T 500 200 Q 600 250, 700 200;
                           M 100 220 Q 200 270, 300 220 T 500 220 Q 600 270, 700 220;
                           M 100 200 Q 200 250, 300 200 T 500 200 Q 600 250, 700 200"
                   ${animationConfig} />
        </path>
        <path d="M 100 350 Q 200 300, 300 350 T 500 350 Q 600 300, 700 350"
              stroke="url(#gradient)" stroke-width="50" fill="none" opacity="0.7">
          <animate attributeName="d"
                   values="M 100 350 Q 200 300, 300 350 T 500 350 Q 600 300, 700 350;
                           M 100 330 Q 200 280, 300 330 T 500 330 Q 600 280, 700 330;
                           M 100 350 Q 200 300, 300 350 T 500 350 Q 600 300, 700 350"
                   dur="${multiplyDuration(animationDuration, 1.4)}" repeatCount="indefinite" />
        </path>
      </g>`
  };
}

module.exports = {
  createCoffeeCreamGradient,
  createWinePourGradient,
  createHoneyDrizzleGradient,
  createChocolateMeltGradient,
  createCaramelSwirlGradient,
  createTieDyeGradient,
  createMarbleMixingGradient
};
