/*
 * MIT License
 *
 * Copyright (c) 2025 ChanMeng666
 * GitHub Profile SVG effect generators
 */

// ─── 1. createShimmerBadge ───────────────────────────────────────────────────
function createShimmerBadge(stops, animationConfig, animationDuration, params) {
  const text = (params && params.text) || 'Badge';
  const colors = (params && params.colors) || ['#6366f1'];
  const height = (params && params.height) || 32;
  const bgColor = colors[0];
  const charWidth = 8.5;
  const padding = 24;
  const width = Math.max(text.length * charWidth + padding * 2, 80);
  const fontSize = Math.round(height * 0.45);
  const rx = height / 2;
  const dur = animationDuration || '2s';

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="badgeClip">
      <rect width="${width}" height="${height}" rx="${rx}" />
    </clipPath>
    <linearGradient id="depthGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <style>
    @keyframes shimmer {
      0% { transform: translateX(-${width}px); }
      100% { transform: translateX(${width}px); }
    }
  </style>
  <g clip-path="url(#badgeClip)">
    <rect width="${width}" height="${height}" rx="${rx}" fill="${bgColor}" />
    <rect width="${width}" height="${height}" rx="${rx}" fill="url(#depthGrad)" />
    <rect width="${width}" height="${height}" fill="rgba(255,255,255,0.25)"
          style="animation: shimmer ${dur} ease-in-out infinite;" />
  </g>
  <text x="${width / 2}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
        font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}"
        font-weight="600" fill="white">${text}</text>
</svg>`;
  return { content, contentType: 'complete' };
}

// ─── 2. createTerminalTyping ─────────────────────────────────────────────────
function createTerminalTyping(stops, animationConfig, animationDuration, params) {
  const text = (params && params.text) || '$ hello world';
  const colors = (params && params.colors) || ['#a855f7'];
  const height = (params && params.height) || 60;
  const promptColor = colors[0];
  const dur = animationDuration || '3s';
  const width = 400;
  const headerH = 24;
  const steps = text.length;

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="termClip">
      <rect x="12" y="${headerH + 6}" width="0" height="${height - headerH - 12}">
        <animate attributeName="width" from="0" to="${width - 24}" dur="${dur}"
                 fill="freeze" calcMode="discrete" keyTimes="${Array.from({ length: steps + 1 }, (_, i) => (i / steps).toFixed(4)).join(';')}"
                 values="${Array.from({ length: steps + 1 }, (_, i) => Math.round((i / steps) * (width - 24))).join(';')}" />
      </rect>
    </clipPath>
  </defs>
  <style>
    @keyframes blink { 0%,50% { opacity:1; } 51%,100% { opacity:0; } }
  </style>
  <!-- Window -->
  <rect width="${width}" height="${height}" rx="8" fill="#f5f5f5" stroke="#d1d5db" stroke-width="1" />
  <!-- Dots -->
  <circle cx="16" cy="12" r="5" fill="#ff5f56"/>
  <circle cx="32" cy="12" r="5" fill="#ffbd2e"/>
  <circle cx="48" cy="12" r="5" fill="#27c93f"/>
  <!-- Prompt + text -->
  <g clip-path="url(#termClip)">
    <text x="12" y="${headerH + 22}" font-family="'SF Mono',Menlo,monospace" font-size="14" fill="${promptColor}" font-weight="bold">$</text>
    <text x="24" y="${headerH + 22}" font-family="'SF Mono',Menlo,monospace" font-size="14" fill="#333"> ${text.replace(/^\$\s*/, '')}</text>
  </g>
  <!-- Cursor -->
  <rect x="24" y="${headerH + 10}" width="8" height="16" fill="${promptColor}" style="animation: blink 1s step-end infinite;" />
</svg>`;
  return { content, contentType: 'complete' };
}

// ─── 3. createSkillPills ─────────────────────────────────────────────────────
function createSkillPills(stops, animationConfig, animationDuration, params) {
  const text = (params && params.text) || 'React;Node.js;Python';
  const colors = (params && params.colors) || ['#6366f1', '#a855f7', '#ec4899'];
  const height = (params && params.height) || 36;
  const skills = text.split(';').map(s => s.trim()).filter(Boolean);
  const pillHeight = 28;
  const pillPadding = 16;
  const gap = 8;
  const charWidth = 8;
  const fontSize = 13;
  const dur = animationDuration || '2s';

  let x = 8;
  const pills = skills.map((skill, i) => {
    const color = colors[i % colors.length];
    const pillW = skill.length * charWidth + pillPadding * 2;
    const rx = pillHeight / 2;
    const pill = `
    <g>
      <defs>
        <linearGradient id="pillShimmer${i}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="white" stop-opacity="0"/>
          <stop offset="0.5" stop-color="white" stop-opacity="0.3"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
          <animate attributeName="x1" values="-1;2" dur="${dur}" repeatCount="indefinite"/>
          <animate attributeName="x2" values="0;3" dur="${dur}" repeatCount="indefinite"/>
        </linearGradient>
      </defs>
      <rect x="${x}" y="${(height - pillHeight) / 2}" width="${pillW}" height="${pillHeight}" rx="${rx}" fill="${color}"/>
      <rect x="${x}" y="${(height - pillHeight) / 2}" width="${pillW}" height="${pillHeight}" rx="${rx}" fill="url(#pillShimmer${i})"/>
      <text x="${x + pillW / 2}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
            font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}"
            font-weight="600" fill="white">${skill}</text>
    </g>`;
    x += pillW + gap;
    return pill;
  });

  const totalW = x;
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${height}" viewBox="0 0 ${totalW} ${height}">
  ${pills.join('\n')}
</svg>`;
  return { content: svgContent, contentType: 'complete' };
}

// ─── 4. createShimmerBanner ──────────────────────────────────────────────────
function createShimmerBanner(stops, animationConfig, animationDuration, params) {
  const text = (params && params.text) || 'Developed by Claude Code';
  const colors = (params && params.colors) || ['#6366f1'];
  const height = (params && params.height) || 36;
  const bgColor = colors[0];
  const charWidth = 9;
  const padding = 32;
  const width = Math.max(text.length * charWidth + padding * 2, 200);
  const fontSize = Math.round(height * 0.42);
  const dur = animationDuration || '2s';

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="bannerClip">
      <rect width="${width}" height="${height}" rx="6" />
    </clipPath>
  </defs>
  <style>
    @keyframes shimmer {
      0% { transform: translateX(-${width}px); }
      100% { transform: translateX(${width}px); }
    }
  </style>
  <g clip-path="url(#bannerClip)">
    <rect width="${width}" height="${height}" rx="6" fill="${bgColor}" />
    <!-- top edge highlight -->
    <line x1="0" y1="0.5" x2="${width}" y2="0.5" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <!-- bottom edge shadow -->
    <line x1="0" y1="${height - 0.5}" x2="${width}" y2="${height - 0.5}" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
    <!-- shimmer sweep -->
    <rect width="${width}" height="${height}" fill="rgba(255,255,255,0.2)"
          style="animation: shimmer ${dur} ease-in-out infinite;" />
  </g>
  <text x="${width / 2}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
        font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}"
        font-weight="600" fill="white">${text}</text>
</svg>`;
  return { content, contentType: 'complete' };
}

// ─── 5. createShimmerText ────────────────────────────────────────────────────
function createShimmerText(stops, animationConfig, animationDuration, params) {
  const text = (params && params.text) || 'Shimmer Text';
  const colors = (params && params.colors) || ['#6366f1', '#a855f7'];
  const height = (params && params.height) || 60;
  const baseColor = colors[0];
  const accentColor = colors.length > 1 ? colors[1] : '#ffffff';
  const fontSize = Math.round(height * 0.6);
  const charWidth = fontSize * 0.6;
  const width = Math.max(text.length * charWidth + 40, 200);
  const dur = animationDuration || '3s';

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="shimmer" x1="-1" y1="0" x2="0" y2="0">
      <stop offset="0" stop-color="${baseColor}"/>
      <stop offset="0.4" stop-color="${baseColor}"/>
      <stop offset="0.5" stop-color="${accentColor}"/>
      <stop offset="0.6" stop-color="${baseColor}"/>
      <stop offset="1" stop-color="${baseColor}"/>
      <animate attributeName="x1" values="-1;2" dur="${dur}" repeatCount="indefinite"/>
      <animate attributeName="x2" values="0;3" dur="${dur}" repeatCount="indefinite"/>
    </linearGradient>
  </defs>
  <text x="${width / 2}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
        font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}"
        font-weight="700" fill="url(#shimmer)">${text}</text>
</svg>`;
  return { content, contentType: 'complete' };
}

// ─── 6. createGoldBadge ─────────────────────────────────────────────────────
function createGoldBadge(stops, animationConfig, animationDuration, params) {
  const text = (params && params.text) || 'Premium';
  const height = (params && params.height) || 40;
  const charWidth = 10;
  const padding = 48;
  const width = Math.max(text.length * charWidth + padding * 2, 160);
  const fontSize = Math.round(height * 0.4);
  const rx = height / 2;
  const dur = animationDuration || '3s';

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="goldClip">
      <rect width="${width}" height="${height}" rx="${rx}" />
    </clipPath>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8B6914"/>
      <stop offset="25%" stop-color="#DAA520"/>
      <stop offset="50%" stop-color="#FFD700"/>
      <stop offset="75%" stop-color="#DAA520"/>
      <stop offset="100%" stop-color="#8B6914"/>
    </linearGradient>
    <linearGradient id="goldDepth" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.2"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <style>
    @keyframes shimmer {
      0% { transform: translateX(-${width}px); }
      100% { transform: translateX(${width}px); }
    }
    @keyframes pulse { 0%,100% { opacity:0.7; } 50% { opacity:1; } }
  </style>
  <g clip-path="url(#goldClip)">
    <!-- Gold background -->
    <rect width="${width}" height="${height}" rx="${rx}" fill="url(#goldGrad)" />
    <!-- Depth overlay -->
    <rect width="${width}" height="${height}" fill="url(#goldDepth)" />
    <!-- Top highlight -->
    <line x1="4" y1="1" x2="${width - 4}" y2="1" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
    <!-- Bottom shadow -->
    <line x1="4" y1="${height - 1}" x2="${width - 4}" y2="${height - 1}" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    <!-- Shimmer sweep -->
    <rect width="${width}" height="${height}" fill="rgba(255,255,255,0.2)"
          style="animation: shimmer ${dur} ease-in-out infinite;" />
  </g>
  <!-- Diamond symbols -->
  <text x="${padding * 0.45}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
        font-size="${fontSize * 0.7}" fill="#8B6914" style="animation: pulse 2s ease-in-out infinite;">&#9670;</text>
  <text x="${width - padding * 0.45}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
        font-size="${fontSize * 0.7}" fill="#8B6914" style="animation: pulse 2s ease-in-out infinite;">&#9670;</text>
  <!-- Text with shadow + glow -->
  <text x="${width / 2 + 1}" y="${height / 2 + fontSize * 0.35 + 1}" text-anchor="middle"
        font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}"
        font-weight="700" fill="rgba(0,0,0,0.3)">${text}</text>
  <text x="${width / 2}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
        font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}"
        font-weight="700" fill="#3a2800" filter="url(#glow)">${text}</text>
</svg>`;
  return { content, contentType: 'complete' };
}

// ─── 7. createSocialBadge ────────────────────────────────────────────────────
function createSocialBadge(stops, animationConfig, animationDuration, params) {
  const text = (params && params.text) || 'Follow';
  const colors = (params && params.colors) || ['#1DA1F2'];
  const height = (params && params.height) || 30;
  const bgColor = colors[0];
  const charWidth = 8;
  const padding = 20;
  const width = Math.max(text.length * charWidth + padding * 2, 80);
  const fontSize = Math.round(height * 0.45);
  const rx = height / 2;
  const dur = animationDuration || '2s';

  // Parse hex to RGB and calculate luminance
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  const textColor = luminance > 0.6 ? '#333333' : '#ffffff';
  const shineColor = luminance > 0.6 ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.2)';

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="socialClip">
      <rect width="${width}" height="${height}" rx="${rx}" />
    </clipPath>
  </defs>
  <style>
    @keyframes shimmer {
      0% { transform: translateX(-${width}px); }
      100% { transform: translateX(${width}px); }
    }
  </style>
  <g clip-path="url(#socialClip)">
    <rect width="${width}" height="${height}" rx="${rx}" fill="${bgColor}" stroke="${bgColor}" stroke-width="0.2"/>
    <!-- shimmer sweep -->
    <rect width="${width}" height="${height}" fill="${shineColor}"
          style="animation: shimmer ${dur} ease-in-out infinite;" />
  </g>
  <text x="${width / 2}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
        font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}"
        font-weight="600" fill="${textColor}">${text}</text>
</svg>`;
  return { content, contentType: 'complete' };
}

// ─── 8. createRepoCard ──────────────────────────────────────────────────────
function createRepoCard(stops, animationConfig, animationDuration, params) {
  const text = (params && params.text) || 'my-repo';
  const colors = (params && params.colors) || ['#24292e', '#f6f8fa'];
  const height = (params && params.height) || 48;
  const darkColor = colors[0];
  const lightColor = colors.length > 1 ? colors[1] : '#f6f8fa';
  const leftW = 56;
  const charWidth = 9;
  const padding = 20;
  const rightW = Math.max(text.length * charWidth + padding * 2, 120);
  const width = leftW + rightW;
  const fontSize = Math.round(height * 0.35);
  const dur = animationDuration || '3s';

  // GitHub Invertocat SVG path (simplified)
  const octocatScale = 0.55;
  const octocatX = leftW / 2 - 12 * octocatScale;
  const octocatY = height / 2 - 12 * octocatScale;
  const githubIcon = `<g transform="translate(${octocatX},${octocatY}) scale(${octocatScale})">
    <path fill="white" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.577C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
  </g>`;

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <clipPath id="repoClip">
      <rect width="${width}" height="${height}" rx="6" />
    </clipPath>
  </defs>
  <style>
    @keyframes shimmer {
      0% { transform: translateX(-${width}px); }
      100% { transform: translateX(${width}px); }
    }
  </style>
  <g clip-path="url(#repoClip)">
    <!-- Left panel -->
    <rect x="0" y="0" width="${leftW}" height="${height}" fill="${darkColor}" />
    ${githubIcon}
    <!-- Right panel -->
    <rect x="${leftW}" y="0" width="${rightW}" height="${height}" fill="${lightColor}" />
    <!-- Shimmer overlay -->
    <rect width="${width}" height="${height}" fill="rgba(255,255,255,0.15)"
          style="animation: shimmer ${dur} ease-in-out infinite;" />
    <!-- Border -->
    <rect width="${width}" height="${height}" rx="6" fill="none" stroke="#d1d5db" stroke-width="0.5"/>
  </g>
  <text x="${leftW + rightW / 2}" y="${height / 2 + fontSize * 0.35}" text-anchor="middle"
        font-family="'Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}"
        font-weight="700" fill="#24292e">${text}</text>
</svg>`;
  return { content, contentType: 'complete' };
}

module.exports = {
  createShimmerBadge,
  createTerminalTyping,
  createSkillPills,
  createShimmerBanner,
  createShimmerText,
  createGoldBadge,
  createSocialBadge,
  createRepoCard
};
