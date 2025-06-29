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

// Special effect gradient generators
function createGalaxyGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <g opacity="0.8">
      <ellipse cx="427" cy="60" rx="200" ry="40" fill="url(#gradient)" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 427 60;360 427 60" dur="${parseFloat(animationDuration) * 2}s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="427" cy="60" rx="150" ry="25" fill="url(#gradient)" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 427 60;-360 427 60" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="427" cy="60" rx="100" ry="15" fill="url(#gradient)" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 427 60;360 427 60" ${animationConfig} />
      </ellipse>
      <circle cx="427" cy="60" r="20" fill="url(#gradient)" opacity="0.9">
        <animate attributeName="r" values="15;25;15" ${animationConfig} />
      </circle>
    </g>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animate attributeName="r" values="50%;90%;50%" ${animationConfig} />
      </radialGradient>`,
    additionalElements
  };
}

function createSpiralGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <g opacity="0.85">
      <path d="M427,60 Q327,60 327,20 Q327,-20 427,-20 Q527,-20 527,60 Q527,140 327,140 Q127,140 127,60 Q127,-40 427,-40" 
            fill="none" stroke="url(#gradient)" stroke-width="8" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 427 60;360 427 60" ${animationConfig} />
      </path>
      <path d="M427,60 Q377,60 377,40 Q377,20 427,20 Q477,20 477,60 Q477,100 377,100 Q277,100 277,60" 
            fill="none" stroke="url(#gradient)" stroke-width="6" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 427 60;-360 427 60" dur="${parseFloat(animationDuration) * 1.3}s" repeatCount="indefinite" />
      </path>
      <circle cx="427" cy="60" r="30" fill="url(#gradient)" opacity="0.8">
        <animate attributeName="r" values="20;40;20" ${animationConfig} />
      </circle>
    </g>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="60%">
        ${stops}
        <animate attributeName="r" values="30%;90%;50%;120%;30%" ${animationConfig} />
        <animate attributeName="cx" values="50%;30%;70%;20%;80%;50%" ${animationConfig} />
        <animate attributeName="cy" values="50%;70%;30%;80%;20%;50%" ${animationConfig} />
      </radialGradient>`,
    additionalElements
  };
}

function createConicGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <g opacity="0.8">
      <circle cx="427" cy="60" r="100" fill="none" stroke="url(#gradient)" stroke-width="15" opacity="0.6" 
              stroke-dasharray="20,10">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 427 60;360 427 60" ${animationConfig} />
      </circle>
      <circle cx="427" cy="60" r="70" fill="none" stroke="url(#gradient)" stroke-width="12" opacity="0.7" 
              stroke-dasharray="15,8">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 427 60;-360 427 60" dur="${parseFloat(animationDuration) * 1.5}s" repeatCount="indefinite" />
      </circle>
      <circle cx="427" cy="60" r="40" fill="none" stroke="url(#gradient)" stroke-width="8" opacity="0.8" 
              stroke-dasharray="10,5">
        <animateTransform attributeName="transform" type="rotate" 
          values="0 427 60;360 427 60" dur="${parseFloat(animationDuration) * 0.8}s" repeatCount="indefinite" />
      </circle>
      <circle cx="427" cy="60" r="15" fill="url(#gradient)" opacity="0.9">
        <animate attributeName="r" values="10;20;10" ${animationConfig} />
      </circle>
    </g>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="50%" r="70%">
        ${stops}
        <animateTransform attributeName="gradientTransform" type="rotate" 
          values="0 50 50;90 50 50;180 50 50;270 50 50;360 50 50" ${animationConfig} />
      </radialGradient>`,
    additionalElements
  };
}

function createLuminanceGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <style>
        .luminance-text {
          background: 50% 100%/50% 50% no-repeat radial-gradient(ellipse at bottom, #fff, rgba(255,255,255,0.8), transparent);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-size: 40px;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          animation: luminanceReveal ${animationDuration} ease-in-out forwards 200ms, luminanceGlow 2500ms linear infinite ${parseFloat(animationDuration) * 1000 + 500}ms;
        }
        @keyframes luminanceReveal {
          80% { letter-spacing: 8px; }
          100% { background-size: 300% 300%; }
        }
        @keyframes luminanceGlow {
          40% { text-shadow: 0 0 8px #fff; }
        }
      </style>
    </defs>`;

  return {
    gradientDef: `
      <radialGradient id="gradient" cx="50%" cy="100%" r="50%">
        ${stops}
        <animate attributeName="r" values="30%;70%;30%" ${animationConfig} />
      </radialGradient>`,
    additionalElements
  };
}

function createTextBoxGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <style>
        .textbox-border {
          fill: transparent;
          stroke-dasharray: 140 540;
          stroke-dashoffset: -474;
          stroke-width: 8px;
          stroke: url(#gradient);
          animation: borderDraw ${animationDuration} linear forwards;
        }
        @keyframes borderDraw {
          0% {
            stroke-dasharray: 140 540;
            stroke-dashoffset: -474;
            stroke-width: 8px;
          }
          100% {
            stroke-dasharray: 760;
            stroke-dashoffset: 0;
            stroke-width: 2px;
          }
        }
      </style>
    </defs>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;100%;0%" ${animationConfig} />
        <animate attributeName="x2" values="100%;200%;100%" ${animationConfig} />
      </linearGradient>`,
    additionalElements
  };
}

function createGlitchGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <style>
        .glitch-text {
          font-size: 40px;
          letter-spacing: 8px;
          font-family: "Lucida Console", Monaco, monospace;
          font-weight: 400;
          animation: glitch1 ${animationDuration} infinite;
        }
        .glitch-text:nth-child(2) {
          animation: glitch2 ${animationDuration} infinite;
        }
        .glitch-text:nth-child(3) {
          animation: glitch3 ${animationDuration} infinite;
        }
        @keyframes glitch1 {
          0%, 100% { transform: none; opacity: 1; }
          7% { transform: skew(-0.5deg, -0.9deg); opacity: 0.75; }
          10% { transform: none; opacity: 1; }
          30% { transform: skew(0.8deg, -0.1deg); opacity: 0.75; }
          35% { transform: none; opacity: 1; }
          55% { transform: skew(-1deg, 0.2deg); opacity: 0.75; }
          60% { transform: none; opacity: 1; }
          75% { transform: skew(0.4deg, 1deg); opacity: 0.75; }
          80% { transform: none; opacity: 1; }
        }
        @keyframes glitch2 {
          0%, 100% { transform: none; opacity: 0.25; }
          7% { transform: translate(-2px, -3px); opacity: 0.5; }
          10% { transform: none; opacity: 0.25; }
          30% { transform: translate(-5px, -2px); opacity: 0.5; }
          35% { transform: none; opacity: 0.25; }
          55% { transform: translate(-5px, -1px); opacity: 0.5; }
          60% { transform: none; opacity: 0.25; }
          75% { transform: translate(-2px, -6px); opacity: 0.5; }
          80% { transform: none; opacity: 0.25; }
        }
        @keyframes glitch3 {
          0%, 100% { transform: none; opacity: 0.25; }
          7% { transform: translate(2px, 3px); opacity: 0.5; }
          10% { transform: none; opacity: 0.25; }
          30% { transform: translate(5px, 2px); opacity: 0.5; }
          35% { transform: none; opacity: 0.25; }
          55% { transform: translate(5px, 1px); opacity: 0.5; }
          60% { transform: none; opacity: 0.25; }
          75% { transform: translate(2px, 6px); opacity: 0.5; }
          80% { transform: none; opacity: 0.25; }
        }
      </style>
    </defs>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x1" values="0%;20%;-10%;30%;0%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
        <animate attributeName="x2" values="100%;80%;110%;70%;100%" dur="${parseFloat(animationDuration) * 0.4}s" repeatCount="indefinite" />
      </linearGradient>`,
    additionalElements
  };
}

function createTypewriterGradient(stops, animationConfig, animationDuration) {
  const additionalElements = `
    <defs>
      <style>
        .typewriter-text {
          font-size: 40px;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          border-right: 2px solid rgba(255,255,255,.75);
          white-space: nowrap;
          overflow: hidden;
          animation: typewriter ${animationDuration} steps(44) ${parseFloat(animationDuration) * 0.25}s 1 normal both,
                     blinkCursor 500ms steps(44) infinite normal;
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blinkCursor {
          from { border-right-color: rgba(255,255,255,.75); }
          to { border-right-color: transparent; }
        }
      </style>
    </defs>`;

  return {
    gradientDef: `
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops}
        <animate attributeName="x2" values="0%;100%" ${animationConfig} begin="0s" />
      </linearGradient>`,
    additionalElements
  };
}

module.exports = {
  createGalaxyGradient,
  createSpiralGradient,
  createConicGradient,
  createLuminanceGradient,
  createTextBoxGradient,
  createGlitchGradient,
  createTypewriterGradient
}; 