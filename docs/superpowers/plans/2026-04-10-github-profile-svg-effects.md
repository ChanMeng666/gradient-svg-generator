# GitHub Profile SVG Effects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 7 new gradient types and 30+ templates inspired by shanraisshan's GitHub profile SVG effects, enabling users to generate shimmer badges, terminal typing animations, skill pill bars, GitHub-style repo cards, shimmer text banners, golden luxury badges, and social achievement badges — all through the existing API and UI with zero hand-coding.

**Architecture:** Each new effect is a generator function in a new file `githubProfileGradients.js`, registered via `EffectLoader.js`. Templates are defined in a new `githubProfileTemplates.js`. The existing `SVGComposer.compose()` method handles non-standard layouts (badges, terminals) by returning complete SVG documents. New API parameters (`badgeLabel`, `icon`, `pillItems`) are added to `svg.js` for badge/pill-specific configuration.

**Tech Stack:** Pure SVG + CSS `@keyframes` + SMIL `<animate>` — no external dependencies. Follows existing generator pattern: function receives `(stops, animationConfig, animationDuration)`, returns `{ gradientDef, additionalElements }` or complete SVG string.

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/utils/gradientGenerators/githubProfileGradients.js` | 7 generator functions for all new effect types |
| Create | `src/templates/githubProfileTemplates.js` | 30+ preset templates using the new gradient types |
| Modify | `src/core/EffectLoader.js` | Import and register the 7 new effects + template mappings |
| Modify | `src/constants/gradientTypes.js` | Add 7 new entries to the GRADIENT_TYPES dropdown |
| Modify | `src/data/templateCategories.js` | Add "GitHub Profile" category to the category list |
| Modify | `src/utils/templateUtils.js` | Import and aggregate the new template file |
| Modify | `src/pages/api/svg.js` | Pass new query parameters (`badgeLabel`, `icon`, `pillItems`) to generator |
| Create | `tests/githubProfileGradients.test.js` | Unit tests for all 7 generators |

---

### Task 1: Create the shimmer badge generator

The shimmer badge is the most fundamental effect — a colored rounded-rect with text, overlaid by a translucent gradient that sweeps left-to-right. This powers `Best Practice`, `Implemented`, `Boris`, and similar tags from shanraisshan's repos.

**Files:**
- Create: `src/utils/gradientGenerators/githubProfileGradients.js`
- Create: `tests/githubProfileGradients.test.js`

- [ ] **Step 1: Write the failing test for shimmerBadge**

```javascript
// tests/githubProfileGradients.test.js
const {
  createShimmerBadge
} = require('../src/utils/gradientGenerators/githubProfileGradients');

describe('createShimmerBadge', () => {
  it('returns a complete SVG with shimmer animation', () => {
    const result = createShimmerBadge(
      '', // stops (unused — badge uses flat color)
      'dur="2s" repeatCount="indefinite"',
      '2s',
      { text: 'Best Practice', colors: ['e3342f'], height: 20 }
    );
    expect(result.content).toContain('<svg');
    expect(result.content).toContain('Best Practice');
    expect(result.content).toContain('@keyframes shimmer');
    expect(result.content).toContain('translateX');
    expect(result.contentType).toBe('complete');
  });

  it('uses the first color as background', () => {
    const result = createShimmerBadge('', '', '2s', {
      text: 'Test', colors: ['3b82f6'], height: 20
    });
    expect(result.content).toContain('#3b82f6');
  });

  it('auto-sizes width based on text length', () => {
    const short = createShimmerBadge('', '', '2s', {
      text: 'Hi', colors: ['000'], height: 20
    });
    const long = createShimmerBadge('', '', '2s', {
      text: 'Orchestration Workflow', colors: ['000'], height: 20
    });
    // Extract width from SVG
    const shortWidth = parseInt(short.content.match(/width="(\d+)"/)[1]);
    const longWidth = parseInt(long.content.match(/width="(\d+)"/)[1]);
    expect(longWidth).toBeGreaterThan(shortWidth);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js --no-cache 2>&1 | head -20`
Expected: FAIL — module not found

- [ ] **Step 3: Write the shimmerBadge implementation**

```javascript
// src/utils/gradientGenerators/githubProfileGradients.js

/*
 * MIT License - Copyright (c) 2025 ChanMeng666
 *
 * GitHub Profile SVG Effects
 * Generators for badge, terminal, pill, card, and banner effects
 * inspired by shanraisshan's GitHub profile design system.
 */

/**
 * Shimmer Badge — colored rounded-rect with animated light sweep.
 * Used for status tags like "Best Practice", "Implemented", "Community".
 *
 * @param {string} stops - Gradient stops (unused — badge uses flat color from params.colors)
 * @param {string} animationConfig - SMIL animation attributes
 * @param {string} animationDuration - CSS duration string, e.g. "2s"
 * @param {Object} params - Extra parameters
 * @param {string} params.text - Badge label text
 * @param {string[]} params.colors - Hex colors (first = background)
 * @param {number} params.height - Badge height (default 28)
 * @returns {{ content: string, contentType: 'complete' }}
 */
function createShimmerBadge(stops, animationConfig, animationDuration, params = {}) {
  const text = params.text || 'Badge';
  const bgColor = `#${(params.colors && params.colors[0]) || '555'}`;
  const badgeHeight = Math.min(params.height || 28, 44);
  const fontSize = Math.round(badgeHeight * 0.5);
  const charWidth = fontSize * 0.62;
  const textWidth = text.length * charWidth;
  const padding = badgeHeight * 0.8;
  const badgeWidth = Math.round(textWidth + padding * 2);
  const rx = Math.round(badgeHeight / 6);
  const dur = animationDuration || '1.8s';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${badgeWidth}" height="${badgeHeight}" role="img" aria-label="${text}">
  <title>${text}</title>
  <defs>
    <linearGradient id="depth" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.4" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity=".15"/>
      <stop offset="0.6" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="r">
      <rect width="${badgeWidth}" height="${badgeHeight}" rx="${rx}" fill="#fff"/>
    </clipPath>
  </defs>
  <style>
    @keyframes shimmer {
      0% { transform: translateX(-${badgeWidth}px); }
      100% { transform: translateX(${badgeWidth}px); }
    }
    .sweep { animation: shimmer ${dur} ease-in-out infinite; }
  </style>
  <g clip-path="url(#r)">
    <rect width="${badgeWidth}" height="${badgeHeight}" fill="${bgColor}"/>
    <rect width="${badgeWidth}" height="${badgeHeight}" fill="url(#depth)"/>
    <rect class="sweep" width="${badgeWidth}" height="${badgeHeight}" fill="url(#shine)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="${fontSize}">
    <text x="${badgeWidth / 2}" y="${badgeHeight * 0.72}">${text}</text>
  </g>
</svg>`;

  return { content: svg, contentType: 'complete' };
}

module.exports = {
  createShimmerBadge
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js --no-cache`
Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/gradientGenerators/githubProfileGradients.js tests/githubProfileGradients.test.js
git commit -m "feat: add shimmerBadge generator for GitHub profile badge effects"
```

---

### Task 2: Add terminalTyping generator

A macOS-style terminal window with red/yellow/green dots, a blinking cursor, and text that types itself character-by-character using CSS `steps()` + `clipPath`.

**Files:**
- Modify: `src/utils/gradientGenerators/githubProfileGradients.js`
- Modify: `tests/githubProfileGradients.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
// Append to tests/githubProfileGradients.test.js
const { createTerminalTyping } = require('../src/utils/gradientGenerators/githubProfileGradients');

describe('createTerminalTyping', () => {
  it('returns a complete SVG with terminal chrome and typing animation', () => {
    const result = createTerminalTyping('', '', '3s', {
      text: 'npm install chromaflow',
      colors: ['8b5cf6'], // prompt color
      height: 50
    });
    expect(result.content).toContain('<svg');
    expect(result.content).toContain('npm install chromaflow');
    expect(result.content).toContain('#ff5f56'); // red dot
    expect(result.content).toContain('#ffbd2e'); // yellow dot
    expect(result.content).toContain('#27ca40'); // green dot
    expect(result.content).toContain('@keyframes typing');
    expect(result.content).toContain('@keyframes blink');
    expect(result.contentType).toBe('complete');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createTerminalTyping" --no-cache`
Expected: FAIL

- [ ] **Step 3: Write the terminalTyping implementation**

```javascript
// Append to src/utils/gradientGenerators/githubProfileGradients.js

/**
 * Terminal Typing — macOS-style terminal with typing animation + blinking cursor.
 */
function createTerminalTyping(stops, animationConfig, animationDuration, params = {}) {
  const text = params.text || '$ hello world';
  const promptColor = `#${(params.colors && params.colors[0]) || '8b5cf6'}`;
  const termHeight = Math.max(params.height || 50, 40);
  const charCount = text.length;
  const fontSize = Math.round(termHeight * 0.28);
  const charWidth = fontSize * 0.6;
  const textWidth = charCount * charWidth;
  const termWidth = Math.round(Math.max(textWidth + 60, 200));
  const dur = animationDuration || '3s';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${termWidth}" height="${termHeight}" viewBox="0 0 ${termWidth} ${termHeight}">
  <style>
    @keyframes typing {
      from { width: 0 }
      to { width: ${Math.round(textWidth)}px }
    }
    @keyframes blink {
      0%, 50% { opacity: 1 }
      51%, 100% { opacity: 0 }
    }
    .terminal-text { animation: typing ${dur} steps(${charCount}) infinite; overflow: hidden; white-space: nowrap; }
    .cursor { animation: blink 1s infinite; }
  </style>
  <rect x="0" y="0" width="${termWidth}" height="${termHeight}" rx="8" fill="#f5f5f5"/>
  <rect x="0" y="0" width="${termWidth}" height="${termHeight}" rx="8" fill="none" stroke="#e0e0e0" stroke-width="1"/>
  <circle cx="16" cy="12" r="5" fill="#ff5f56"/>
  <circle cx="32" cy="12" r="5" fill="#ffbd2e"/>
  <circle cx="48" cy="12" r="5" fill="#27ca40"/>
  <g transform="translate(14, ${termHeight - 8})">
    <text font-family="'SF Mono','Fira Code','Consolas',monospace" font-size="${fontSize}" fill="${promptColor}">$</text>
    <clipPath id="textClip">
      <rect x="0" y="${-fontSize - 2}" class="terminal-text" height="${fontSize + 6}"/>
    </clipPath>
    <text x="${fontSize}" font-family="'SF Mono','Fira Code','Consolas',monospace" font-size="${fontSize}" fill="#374151" clip-path="url(#textClip)">${text}</text>
    <rect x="${Math.round(textWidth + fontSize + 4)}" y="${-fontSize}" width="${Math.round(fontSize * 0.55)}" height="${fontSize + 2}" fill="${promptColor}" class="cursor"/>
  </g>
</svg>`;

  return { content: svg, contentType: 'complete' };
}

// Update module.exports
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createTerminalTyping" --no-cache`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/gradientGenerators/githubProfileGradients.js tests/githubProfileGradients.test.js
git commit -m "feat: add terminalTyping generator for macOS terminal typing effect"
```

---

### Task 3: Add skillPills generator

A row of rounded "pill" buttons with text labels, each with a shimmer overlay sweeping across. Users provide pill labels as a semicolon-separated string via the `pillItems` API parameter.

**Files:**
- Modify: `src/utils/gradientGenerators/githubProfileGradients.js`
- Modify: `tests/githubProfileGradients.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
const { createSkillPills } = require('../src/utils/gradientGenerators/githubProfileGradients');

describe('createSkillPills', () => {
  it('renders multiple pills with shimmer', () => {
    const result = createSkillPills('', '', '2s', {
      text: 'React;Node.js;Python',
      colors: ['616161', '757575'],
      height: 36
    });
    expect(result.content).toContain('React');
    expect(result.content).toContain('Node.js');
    expect(result.content).toContain('Python');
    expect(result.content).toContain('@keyframes shimmer');
    expect(result.contentType).toBe('complete');
  });

  it('handles single pill', () => {
    const result = createSkillPills('', '', '2s', {
      text: 'Solo',
      colors: ['333'],
      height: 28
    });
    expect(result.content).toContain('Solo');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createSkillPills" --no-cache`
Expected: FAIL

- [ ] **Step 3: Write the skillPills implementation**

```javascript
// Append to src/utils/gradientGenerators/githubProfileGradients.js

/**
 * Skill Pills — row of rounded pill tags with shimmer overlay.
 * Text is semicolon-separated: "React;Node.js;Python"
 */
function createSkillPills(stops, animationConfig, animationDuration, params = {}) {
  const items = (params.text || 'Skill').split(';').map(s => s.trim()).filter(Boolean);
  const colors = (params.colors || ['616161', '757575']);
  const pillHeight = Math.min(params.height || 28, 36);
  const fontSize = Math.round(pillHeight * 0.42);
  const charWidth = fontSize * 0.58;
  const gap = 10;
  const paddingX = pillHeight * 0.6;
  const rx = Math.round(pillHeight / 2);
  const dur = animationDuration || '2s';

  // Calculate layout
  let xPos = 0;
  const pills = items.map((label, i) => {
    const textW = label.length * charWidth;
    const pillW = Math.round(textW + paddingX * 2);
    const colorIdx = i % colors.length;
    const color = `#${colors[colorIdx]}`;
    const x = xPos;
    xPos += pillW + gap;
    return { label, x, pillW, color };
  });

  const totalWidth = xPos - gap;

  const pillsSvg = pills.map(p => `
    <g>
      <rect x="${p.x}" y="0" width="${p.pillW}" height="${pillHeight}" rx="${rx}" fill="${p.color}"/>
      <rect x="${p.x}" y="0" width="${p.pillW}" height="${pillHeight}" rx="${rx}" class="shimmer-overlay"/>
      <text x="${p.x + p.pillW / 2}" y="${pillHeight * 0.68}" class="label" text-anchor="middle">${p.label}</text>
    </g>`).join('\n');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${pillHeight}" viewBox="0 0 ${totalWidth} ${pillHeight}">
  <defs>
    <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0); stop-opacity:0">
        <animate attributeName="offset" values="-1;2" dur="${dur}" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" style="stop-color:rgba(255,255,255,0.3); stop-opacity:0.3">
        <animate attributeName="offset" values="-0.5;2.5" dur="${dur}" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:rgba(255,255,255,0); stop-opacity:0">
        <animate attributeName="offset" values="0;3" dur="${dur}" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
  </defs>
  <style>
    .label { font-family: 'Roboto','Segoe UI',Arial,sans-serif; font-size: ${fontSize}px; font-weight: 500; fill: white; }
    .shimmer-overlay { fill: url(#shimmer); }
  </style>
  ${pillsSvg}
</svg>`;

  return { content: svg, contentType: 'complete' };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createSkillPills" --no-cache`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/gradientGenerators/githubProfileGradients.js tests/githubProfileGradients.test.js
git commit -m "feat: add skillPills generator for tech stack pill bar effects"
```

---

### Task 4: Add shimmerBanner and shimmerText generators

Two related effects:
- **shimmerBanner**: Wide colored bar with icon + text + shimmer (like `developed-by.svg`, `claude-for-oss.svg`)
- **shimmerText**: Text filled with a moving gradient highlight (like `role.svg` — the light passes through the text itself)

**Files:**
- Modify: `src/utils/gradientGenerators/githubProfileGradients.js`
- Modify: `tests/githubProfileGradients.test.js`

- [ ] **Step 1: Write failing tests**

```javascript
const { createShimmerBanner, createShimmerText } = require('../src/utils/gradientGenerators/githubProfileGradients');

describe('createShimmerBanner', () => {
  it('renders a wide bar with shimmer sweep', () => {
    const result = createShimmerBanner('', '', '1.8s', {
      text: 'This project is 100% autopilot',
      colors: ['CC7C5E'],
      height: 32
    });
    expect(result.content).toContain('100% autopilot');
    expect(result.content).toContain('@keyframes shimmer');
    expect(result.content).toContain('#CC7C5E');
    expect(result.contentType).toBe('complete');
  });
});

describe('createShimmerText', () => {
  it('renders text with internal gradient shimmer', () => {
    const result = createShimmerText('', '', '3s', {
      text: 'Associate Software Architect',
      colors: ['1f2937', 'a855f7'],
      height: 30
    });
    expect(result.content).toContain('Associate Software Architect');
    expect(result.content).toContain('fill="url(#shimmer)"');
    expect(result.content).toContain('<animate');
    expect(result.contentType).toBe('complete');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "shimmer" --no-cache`
Expected: FAIL

- [ ] **Step 3: Write both implementations**

```javascript
// Append to src/utils/gradientGenerators/githubProfileGradients.js

/**
 * Shimmer Banner — wide colored bar with text and shimmer sweep.
 * Like "Developed by Claude Code" or "Claude for OSS" banners.
 */
function createShimmerBanner(stops, animationConfig, animationDuration, params = {}) {
  const text = params.text || 'Banner';
  const bgColor = `#${(params.colors && params.colors[0]) || '555'}`;
  const bannerHeight = params.height || 32;
  const fontSize = Math.round(bannerHeight * 0.34);
  const charWidth = fontSize * 0.58;
  const textWidth = text.length * charWidth;
  const bannerWidth = Math.round(Math.max(textWidth + 60, 200));
  const dur = animationDuration || '1.8s';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${bannerWidth}" height="${bannerHeight}" role="img" aria-label="${text}">
  <title>${text}</title>
  <defs>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.4" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity=".12"/>
      <stop offset="0.6" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="r">
      <rect width="${bannerWidth}" height="${bannerHeight}" rx="6" fill="#fff"/>
    </clipPath>
  </defs>
  <style>
    @keyframes shimmer {
      0% { transform: translateX(-${bannerWidth}px); }
      100% { transform: translateX(${bannerWidth}px); }
    }
    .sweep { animation: shimmer ${dur} ease-in-out infinite; }
  </style>
  <g clip-path="url(#r)">
    <rect width="${bannerWidth}" height="${bannerHeight}" fill="${bgColor}"/>
    <rect width="${bannerWidth}" height="1" fill="#fff" fill-opacity=".08"/>
    <rect y="${bannerHeight - 1}" width="${bannerWidth}" height="1" fill="#fff" fill-opacity=".05"/>
    <rect class="sweep" width="${bannerWidth}" height="${bannerHeight}" fill="url(#shine)"/>
  </g>
  <g font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" text-anchor="middle">
    <text x="${bannerWidth / 2}" y="${bannerHeight * 0.65}" font-size="${fontSize}" font-weight="bold" fill="#fff" fill-opacity=".95">${text}</text>
  </g>
</svg>`;

  return { content: svg, contentType: 'complete' };
}

/**
 * Shimmer Text — text where the fill is a gradient with a moving highlight.
 * The light passes *through* the letterforms. Like role.svg.
 */
function createShimmerText(stops, animationConfig, animationDuration, params = {}) {
  const text = params.text || 'Title';
  const baseColor = `#${(params.colors && params.colors[0]) || '1f2937'}`;
  const accentColor = `#${(params.colors && params.colors[1]) || 'a855f7'}`;
  const textHeight = params.height || 30;
  const fontSize = Math.round(textHeight * 0.75);
  const charWidth = fontSize * 0.56;
  const textWidth = Math.round(text.length * charWidth);
  const svgWidth = textWidth + 20;
  const dur = animationDuration || '3s';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${textHeight}" viewBox="0 0 ${svgWidth} ${textHeight}">
  <defs>
    <linearGradient id="shimmer" gradientUnits="userSpaceOnUse" x1="-200" y1="0" x2="0" y2="0">
      <stop offset="0%" stop-color="${baseColor}"/>
      <stop offset="40%" stop-color="${baseColor}"/>
      <stop offset="50%" stop-color="${accentColor}"/>
      <stop offset="60%" stop-color="${baseColor}"/>
      <stop offset="100%" stop-color="${baseColor}"/>
      <animate attributeName="x1" values="-200;${svgWidth + 200}" dur="${dur}" repeatCount="indefinite"/>
      <animate attributeName="x2" values="0;${svgWidth + 400}" dur="${dur}" repeatCount="indefinite"/>
    </linearGradient>
  </defs>
  <text x="10" y="${textHeight * 0.78}" font-family="'DM Sans','Segoe UI',Helvetica,Arial,sans-serif" font-size="${fontSize}" font-weight="500" fill="url(#shimmer)">${text}</text>
</svg>`;

  return { content: svg, contentType: 'complete' };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "shimmer" --no-cache`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/gradientGenerators/githubProfileGradients.js tests/githubProfileGradients.test.js
git commit -m "feat: add shimmerBanner and shimmerText generators"
```

---

### Task 5: Add goldBadge generator

A luxury multi-layered badge: gold gradient background + depth overlay + top/bottom edge highlights + shimmer sweep + optional pulsing diamond accents + text with glow filter. Like the "Billion-Dollar Questions" badge.

**Files:**
- Modify: `src/utils/gradientGenerators/githubProfileGradients.js`
- Modify: `tests/githubProfileGradients.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
const { createGoldBadge } = require('../src/utils/gradientGenerators/githubProfileGradients');

describe('createGoldBadge', () => {
  it('renders a gold gradient badge with diamond accents', () => {
    const result = createGoldBadge('', '', '3s', {
      text: 'Featured Project',
      colors: ['b8860b', 'daa520', 'ffd700'],
      height: 44
    });
    expect(result.content).toContain('Featured Project');
    expect(result.content).toContain('linearGradient');
    expect(result.content).toContain('#ffd700'); // gold
    expect(result.content).toContain('@keyframes shimmer');
    expect(result.content).toContain('&#9670;'); // diamond ◆
    expect(result.content).toContain('@keyframes pulse');
    expect(result.contentType).toBe('complete');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createGoldBadge" --no-cache`
Expected: FAIL

- [ ] **Step 3: Write the goldBadge implementation**

```javascript
// Append to src/utils/gradientGenerators/githubProfileGradients.js

/**
 * Gold Badge — luxury multi-layer badge with gold gradient, shimmer, and diamond accents.
 */
function createGoldBadge(stops, animationConfig, animationDuration, params = {}) {
  const text = params.text || 'Golden Badge';
  const colors = params.colors || ['b8860b', 'daa520', 'ffd700'];
  const c0 = `#${colors[0] || 'b8860b'}`;
  const c1 = `#${colors[1] || 'daa520'}`;
  const c2 = `#${colors[2] || 'ffd700'}`;
  const badgeHeight = params.height || 44;
  const fontSize = Math.round(badgeHeight * 0.42);
  const charWidth = fontSize * 0.6;
  const textWidth = text.length * charWidth;
  const badgeWidth = Math.round(Math.max(textWidth + 80, 200));
  const dur = animationDuration || '3s';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${badgeWidth}" height="${badgeHeight}" role="img" aria-label="${text}">
  <title>${text}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c0}"/>
      <stop offset="30%" stop-color="${c1}"/>
      <stop offset="50%" stop-color="${c2}"/>
      <stop offset="70%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c0}"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.35" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#fff" stop-opacity=".45"/>
      <stop offset="0.65" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="depth" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".15"/>
      <stop offset="1" stop-color="#000" stop-opacity=".2"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="r">
      <rect width="${badgeWidth}" height="${badgeHeight}" rx="6" fill="#fff"/>
    </clipPath>
  </defs>
  <style>
    @keyframes shimmer { 0% { transform: translateX(-${badgeWidth}px); } 100% { transform: translateX(${badgeWidth}px); } }
    @keyframes pulse { 0%, 100% { opacity: .6; } 50% { opacity: 1; } }
    .sweep { animation: shimmer ${dur} ease-in-out infinite; }
    .diamond { animation: pulse 2s ease-in-out infinite; }
  </style>
  <g clip-path="url(#r)">
    <rect width="${badgeWidth}" height="${badgeHeight}" fill="url(#bg)"/>
    <rect width="${badgeWidth}" height="${badgeHeight}" fill="url(#depth)"/>
    <rect width="${badgeWidth}" height="1" fill="#fff" fill-opacity=".25"/>
    <rect y="${badgeHeight - 1}" width="${badgeWidth}" height="1" fill="#000" fill-opacity=".3"/>
    <rect class="sweep" width="${badgeWidth}" height="${badgeHeight}" fill="url(#shine)"/>
  </g>
  <text class="diamond" x="16" y="${badgeHeight * 0.65}" font-size="16" fill="#fff" fill-opacity=".9" filter="url(#glow)">&#9670;</text>
  <text class="diamond" x="${badgeWidth - 24}" y="${badgeHeight * 0.65}" font-size="16" fill="#fff" fill-opacity=".9" filter="url(#glow)">&#9670;</text>
  <g font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" text-anchor="middle">
    <text x="${badgeWidth / 2 + 1}" y="${badgeHeight * 0.66 + 1}" font-size="${fontSize}" font-weight="bold" fill="#000" fill-opacity=".3">${text}</text>
    <text x="${badgeWidth / 2}" y="${badgeHeight * 0.66}" font-size="${fontSize}" font-weight="bold" fill="#fff" filter="url(#glow)">${text}</text>
  </g>
</svg>`;

  return { content: svg, contentType: 'complete' };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createGoldBadge" --no-cache`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/gradientGenerators/githubProfileGradients.js tests/githubProfileGradients.test.js
git commit -m "feat: add goldBadge generator with diamond accents and glow"
```

---

### Task 6: Add socialBadge generator

A full-width achievement badge with optional icon slot, description text, and shimmer — like "GitHub Trending" or "Top 1% Poster" badges. Supports light and dark variants via colors array.

**Files:**
- Modify: `src/utils/gradientGenerators/githubProfileGradients.js`
- Modify: `tests/githubProfileGradients.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
const { createSocialBadge } = require('../src/utils/gradientGenerators/githubProfileGradients');

describe('createSocialBadge', () => {
  it('renders a wide badge with text and shimmer', () => {
    const result = createSocialBadge('', '', '1.8s', {
      text: 'Top 1% Poster on r/ClaudeAI',
      colors: ['FF5252'],
      height: 32
    });
    expect(result.content).toContain('Top 1% Poster');
    expect(result.content).toContain('#FF5252');
    expect(result.content).toContain('@keyframes shimmer');
    expect(result.contentType).toBe('complete');
  });

  it('supports light background variant', () => {
    const result = createSocialBadge('', '', '1.8s', {
      text: 'GitHub Monthly Trending',
      colors: ['f6f8fa'],
      height: 32
    });
    // Light bg should use dark text
    expect(result.content).toContain('fill="#333"');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createSocialBadge" --no-cache`
Expected: FAIL

- [ ] **Step 3: Write the socialBadge implementation**

```javascript
// Append to src/utils/gradientGenerators/githubProfileGradients.js

/**
 * Social Badge — wide achievement badge with shimmer, auto light/dark text.
 */
function createSocialBadge(stops, animationConfig, animationDuration, params = {}) {
  const text = params.text || 'Achievement Badge';
  const bgColor = `#${(params.colors && params.colors[0]) || '555'}`;
  const badgeHeight = params.height || 32;
  const fontSize = Math.round(badgeHeight * 0.34);
  const charWidth = fontSize * 0.58;
  const textWidth = text.length * charWidth;
  const badgeWidth = Math.round(Math.max(textWidth + 50, 200));
  const dur = animationDuration || '1.8s';

  // Determine if background is light (use dark text) or dark (use light text)
  const hex = (params.colors && params.colors[0]) || '555';
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const textColor = luminance > 0.6 ? '#333' : '#fff';
  const shineColor = luminance > 0.6 ? '#000' : '#fff';
  const shineOpacity = luminance > 0.6 ? '.08' : '.12';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${badgeWidth}" height="${badgeHeight}" role="img" aria-label="${text}">
  <title>${text}</title>
  <defs>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${shineColor}" stop-opacity="0"/>
      <stop offset="0.4" stop-color="${shineColor}" stop-opacity="0"/>
      <stop offset="0.5" stop-color="${shineColor}" stop-opacity="${shineOpacity}"/>
      <stop offset="0.6" stop-color="${shineColor}" stop-opacity="0"/>
      <stop offset="1" stop-color="${shineColor}" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="r">
      <rect width="${badgeWidth}" height="${badgeHeight}" rx="6" fill="#fff"/>
    </clipPath>
  </defs>
  <style>
    @keyframes shimmer { 0% { transform: translateX(-${badgeWidth}px); } 100% { transform: translateX(${badgeWidth}px); } }
    .sweep { animation: shimmer ${dur} ease-in-out infinite; }
  </style>
  <g clip-path="url(#r)">
    <rect width="${badgeWidth}" height="${badgeHeight}" fill="${bgColor}"/>
    <rect width="${badgeWidth}" height="1" fill="${shineColor}" fill-opacity=".04"/>
    <rect y="${badgeHeight - 1}" width="${badgeWidth}" height="1" fill="${shineColor}" fill-opacity=".04"/>
    <rect class="sweep" width="${badgeWidth}" height="${badgeHeight}" fill="url(#shine)"/>
  </g>
  <rect x="0" y="0" width="${badgeWidth}" height="${badgeHeight}" rx="6" fill="none" stroke="#000" stroke-width="0.2"/>
  <g font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" text-anchor="middle">
    <text x="${badgeWidth / 2}" y="${badgeHeight * 0.65}" font-size="${fontSize}" fill="${textColor}" fill-opacity=".95">${text}</text>
  </g>
</svg>`;

  return { content: svg, contentType: 'complete' };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createSocialBadge" --no-cache`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/gradientGenerators/githubProfileGradients.js tests/githubProfileGradients.test.js
git commit -m "feat: add socialBadge generator with auto light/dark text"
```

---

### Task 7: Add repoCard generator

A GitHub-style repo card: dark left panel with GitHub icon + light right panel with repo name + shimmer overlay across both. Like `repo.svg`.

**Files:**
- Modify: `src/utils/gradientGenerators/githubProfileGradients.js`
- Modify: `tests/githubProfileGradients.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
const { createRepoCard } = require('../src/utils/gradientGenerators/githubProfileGradients');

describe('createRepoCard', () => {
  it('renders a two-panel card with GitHub icon and repo name', () => {
    const result = createRepoCard('', '', '1.2s', {
      text: 'my-awesome-project',
      colors: ['24292f', 'f6f8fa'],
      height: 56
    });
    expect(result.content).toContain('my-awesome-project');
    expect(result.content).toContain('#24292f'); // dark panel
    expect(result.content).toContain('#f6f8fa'); // light panel
    expect(result.content).toContain('<path'); // GitHub icon path
    expect(result.content).toContain('shimmer');
    expect(result.contentType).toBe('complete');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createRepoCard" --no-cache`
Expected: FAIL

- [ ] **Step 3: Write the repoCard implementation**

```javascript
// Append to src/utils/gradientGenerators/githubProfileGradients.js

/**
 * Repo Card — two-panel card: dark icon area + light text area + shimmer.
 */
function createRepoCard(stops, animationConfig, animationDuration, params = {}) {
  const text = params.text || 'repository';
  const colors = params.colors || ['24292f', 'f6f8fa'];
  const darkColor = `#${colors[0] || '24292f'}`;
  const lightColor = `#${colors[1] || 'f6f8fa'}`;
  const cardHeight = params.height || 56;
  const iconAreaWidth = 60;
  const fontSize = Math.round(cardHeight * 0.32);
  const charWidth = fontSize * 0.58;
  const textWidth = text.length * charWidth;
  const cardWidth = Math.round(Math.max(iconAreaWidth + textWidth + 30, 200));
  const dur = animationDuration || '1.2s';
  const iconScale = (cardHeight * 0.5) / 16; // GitHub icon is 16x16 base

  // GitHub icon SVG path (official Invertocat)
  const ghIcon = `<g transform="translate(${(iconAreaWidth - 16 * iconScale) / 2}, ${(cardHeight - 16 * iconScale) / 2}) scale(${iconScale})">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="white"/>
  </g>`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cardWidth} ${cardHeight}" width="${cardWidth}" height="${cardHeight}">
  <defs>
    <linearGradient id="shimmer" x1="-100%" y1="0" x2="100%" y2="0">
      <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0.4)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      <animateTransform attributeName="gradientTransform" type="translate" from="-2 0" to="2 0" dur="${dur}" repeatCount="indefinite"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${iconAreaWidth}" height="${cardHeight}" fill="${darkColor}"/>
  <rect x="${iconAreaWidth}" y="0" width="${cardWidth - iconAreaWidth}" height="${cardHeight}" fill="${lightColor}"/>
  <rect x="0" y="0" width="${cardWidth}" height="${cardHeight}" fill="url(#shimmer)"/>
  ${ghIcon}
  <text x="${iconAreaWidth + 12}" y="${cardHeight * 0.62}" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="${fontSize}" font-weight="bold" fill="#333">${text}</text>
  <rect x="0" y="0" width="${cardWidth}" height="${cardHeight}" fill="none" stroke="#d1d9e0" stroke-width="0.5"/>
</svg>`;

  return { content: svg, contentType: 'complete' };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest tests/githubProfileGradients.test.js -t "createRepoCard" --no-cache`
Expected: PASS

- [ ] **Step 5: Update module.exports with all 7 generators**

```javascript
// Bottom of src/utils/gradientGenerators/githubProfileGradients.js
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
```

- [ ] **Step 6: Commit**

```bash
git add src/utils/gradientGenerators/githubProfileGradients.js tests/githubProfileGradients.test.js
git commit -m "feat: add repoCard generator, finalize all 7 GitHub profile effects"
```

---

### Task 8: Register all effects in EffectLoader and add gradient types

Wire the 7 new generators into the system so they're discoverable via the API (`gradientType=shimmerBadge`) and the UI dropdown.

**Files:**
- Modify: `src/core/EffectLoader.js`
- Modify: `src/constants/gradientTypes.js`

- [ ] **Step 1: Add import and registration to EffectLoader.js**

At the top of `src/core/EffectLoader.js`, after the existing imports, add:

```javascript
const githubProfileGradients = require('../utils/gradientGenerators/githubProfileGradients');
```

In the `TEMPLATE_MAPPINGS` object (around line 57), add:

```javascript
  // GitHub Profile templates
  'shimmer-red': 'shimmerBadge',
  'shimmer-green': 'shimmerBadge',
  'shimmer-blue': 'shimmerBadge',
  'shimmer-gold': 'shimmerBadge',
  'terminal-purple': 'terminalTyping',
  'terminal-green': 'terminalTyping',
  'pills-dark': 'skillPills',
  'pills-rainbow': 'skillPills',
  'banner-orange': 'shimmerBanner',
  'banner-dark': 'shimmerBanner',
  'text-shimmer-purple': 'shimmerText',
  'text-shimmer-blue': 'shimmerText',
  'gold-luxury': 'goldBadge',
  'gold-platinum': 'goldBadge',
  'gold-rose': 'goldBadge',
  'social-trending': 'socialBadge',
  'social-achievement-red': 'socialBadge',
  'social-achievement-blue': 'socialBadge',
  'repo-card-dark': 'repoCard',
  'repo-card-blue': 'repoCard',
```

At the bottom of `src/core/EffectLoader.js`, before the final `module.exports`, add a new function:

```javascript
function loadGithubProfileEffects() {
  const effects = [
    { name: 'shimmerBadge', category: 'githubProfile', generator: githubProfileGradients.createShimmerBadge, outputType: 'complete', description: 'Shimmer badge with colored background and light sweep' },
    { name: 'terminalTyping', category: 'githubProfile', generator: githubProfileGradients.createTerminalTyping, outputType: 'complete', description: 'macOS terminal with typing animation and blinking cursor' },
    { name: 'skillPills', category: 'githubProfile', generator: githubProfileGradients.createSkillPills, outputType: 'complete', description: 'Row of skill/tech pills with shimmer overlay' },
    { name: 'shimmerBanner', category: 'githubProfile', generator: githubProfileGradients.createShimmerBanner, outputType: 'complete', description: 'Wide banner with shimmer sweep for announcements' },
    { name: 'shimmerText', category: 'githubProfile', generator: githubProfileGradients.createShimmerText, outputType: 'complete', description: 'Text with internal gradient shimmer highlight' },
    { name: 'goldBadge', category: 'githubProfile', generator: githubProfileGradients.createGoldBadge, outputType: 'complete', description: 'Luxury gold badge with diamond accents and glow' },
    { name: 'socialBadge', category: 'githubProfile', generator: githubProfileGradients.createSocialBadge, outputType: 'complete', description: 'Social achievement badge with auto light/dark text' },
    { name: 'repoCard', category: 'githubProfile', generator: githubProfileGradients.createRepoCard, outputType: 'complete', description: 'GitHub-style repo card with icon and shimmer' }
  ];

  effects.forEach(effect => effectRegistry.register(effect));
}
```

In the `loadAllEffects()` function, add the call:

```javascript
loadGithubProfileEffects();
```

- [ ] **Step 2: Add entries to gradientTypes.js**

In `src/constants/gradientTypes.js`, add after the existing entries:

```javascript
  // GitHub Profile effects
  { value: 'shimmerBadge', label: 'Shimmer Badge' },
  { value: 'terminalTyping', label: 'Terminal Typing' },
  { value: 'skillPills', label: 'Skill Pills' },
  { value: 'shimmerBanner', label: 'Shimmer Banner' },
  { value: 'shimmerText', label: 'Shimmer Text' },
  { value: 'goldBadge', label: 'Gold Badge' },
  { value: 'socialBadge', label: 'Social Badge' },
  { value: 'repoCard', label: 'Repo Card' },
```

- [ ] **Step 3: Verify the app builds**

Run: `cd D:\github_repository\gradient-svg-generator && npx next build 2>&1 | tail -10`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/core/EffectLoader.js src/constants/gradientTypes.js
git commit -m "feat: register 7 GitHub profile effects in EffectLoader and gradient types dropdown"
```

---

### Task 9: Create templates and add to template system

Define 30+ preset templates and wire them into the template browsing UI.

**Files:**
- Create: `src/templates/githubProfileTemplates.js`
- Modify: `src/data/templateCategories.js`
- Modify: `src/utils/templateUtils.js`

- [ ] **Step 1: Create the templates file**

```javascript
// src/templates/githubProfileTemplates.js

/*
 * MIT License - Copyright (c) 2025 ChanMeng666
 *
 * GitHub Profile Effect Templates
 * Inspired by shanraisshan's profile SVG design system.
 */

module.exports = {
  // === Shimmer Badges ===
  'shimmer-red': {
    name: 'shimmer-red',
    label: 'Badge Red',
    colors: ['e3342f'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Red shimmer badge — "Best Practice" style'
  },
  'shimmer-green': {
    name: 'shimmer-green',
    label: 'Badge Green',
    colors: ['2ea44f'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Green shimmer badge — "Implemented" style'
  },
  'shimmer-blue': {
    name: 'shimmer-blue',
    label: 'Badge Blue',
    colors: ['3b82f6'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Blue shimmer badge — "Workflow" style'
  },
  'shimmer-gold': {
    name: 'shimmer-gold',
    label: 'Badge Gold',
    colors: ['f1c40f'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Gold shimmer badge — "Community" style'
  },
  'shimmer-orange': {
    name: 'shimmer-orange',
    label: 'Badge Orange',
    colors: ['CC7C5E'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Orange shimmer badge — Claude brand style'
  },
  'shimmer-purple': {
    name: 'shimmer-purple',
    label: 'Badge Purple',
    colors: ['7c3aed'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Purple shimmer badge'
  },
  'shimmer-dark': {
    name: 'shimmer-dark',
    label: 'Badge Dark',
    colors: ['1a1a1a'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Dark shimmer badge'
  },

  // === Terminal Typing ===
  'terminal-purple': {
    name: 'terminal-purple',
    label: 'Terminal Purple',
    colors: ['8b5cf6'],
    gradientType: 'terminalTyping',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Terminal with purple prompt — light mode'
  },
  'terminal-green': {
    name: 'terminal-green',
    label: 'Terminal Green',
    colors: ['22c55e'],
    gradientType: 'terminalTyping',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Terminal with green prompt — hacker style'
  },
  'terminal-blue': {
    name: 'terminal-blue',
    label: 'Terminal Blue',
    colors: ['3b82f6'],
    gradientType: 'terminalTyping',
    animationDuration: '2.5s',
    category: 'GitHub Profile',
    description: 'Terminal with blue prompt'
  },

  // === Skill Pills ===
  'pills-dark': {
    name: 'pills-dark',
    label: 'Pills Dark',
    colors: ['424242', '616161'],
    gradientType: 'skillPills',
    animationDuration: '2s',
    category: 'GitHub Profile',
    description: 'Dark gray skill pills with shimmer'
  },
  'pills-rainbow': {
    name: 'pills-rainbow',
    label: 'Pills Rainbow',
    colors: ['e3342f', '3b82f6', '2ea44f', 'f1c40f'],
    gradientType: 'skillPills',
    animationDuration: '2s',
    category: 'GitHub Profile',
    description: 'Multi-color skill pills'
  },
  'pills-blue': {
    name: 'pills-blue',
    label: 'Pills Blue',
    colors: ['1e40af', '3b82f6'],
    gradientType: 'skillPills',
    animationDuration: '2s',
    category: 'GitHub Profile',
    description: 'Blue-themed skill pills'
  },
  'pills-purple': {
    name: 'pills-purple',
    label: 'Pills Purple',
    colors: ['5b21b6', '7c3aed'],
    gradientType: 'skillPills',
    animationDuration: '2s',
    category: 'GitHub Profile',
    description: 'Purple-themed skill pills'
  },

  // === Shimmer Banners ===
  'banner-orange': {
    name: 'banner-orange',
    label: 'Banner Claude',
    colors: ['CC7C5E'],
    gradientType: 'shimmerBanner',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Orange banner — "Developed by Claude" style'
  },
  'banner-dark': {
    name: 'banner-dark',
    label: 'Banner Dark',
    colors: ['24292f'],
    gradientType: 'shimmerBanner',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Dark banner for announcements'
  },
  'banner-blue': {
    name: 'banner-blue',
    label: 'Banner Blue',
    colors: ['1d4ed8'],
    gradientType: 'shimmerBanner',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Blue banner for feature highlights'
  },
  'banner-red': {
    name: 'banner-red',
    label: 'Banner Red',
    colors: ['dc2626'],
    gradientType: 'shimmerBanner',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Red banner for urgent notices'
  },

  // === Shimmer Text ===
  'text-shimmer-purple': {
    name: 'text-shimmer-purple',
    label: 'Text Purple Shimmer',
    colors: ['1f2937', 'a855f7'],
    gradientType: 'shimmerText',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Text with purple light shimmer — title/role style'
  },
  'text-shimmer-blue': {
    name: 'text-shimmer-blue',
    label: 'Text Blue Shimmer',
    colors: ['1f2937', '3b82f6'],
    gradientType: 'shimmerText',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Text with blue light shimmer'
  },
  'text-shimmer-gold': {
    name: 'text-shimmer-gold',
    label: 'Text Gold Shimmer',
    colors: ['78350f', 'fbbf24'],
    gradientType: 'shimmerText',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Text with golden light shimmer'
  },

  // === Gold Badges ===
  'gold-luxury': {
    name: 'gold-luxury',
    label: 'Gold Luxury',
    colors: ['b8860b', 'daa520', 'ffd700'],
    gradientType: 'goldBadge',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Classic gold luxury badge with diamonds'
  },
  'gold-platinum': {
    name: 'gold-platinum',
    label: 'Platinum',
    colors: ['666666', '999999', 'cccccc'],
    gradientType: 'goldBadge',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Platinum/silver luxury badge'
  },
  'gold-rose': {
    name: 'gold-rose',
    label: 'Rose Gold',
    colors: ['b76e79', 'e8a0b0', 'f4c2c2'],
    gradientType: 'goldBadge',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Rose gold luxury badge'
  },

  // === Social / Achievement Badges ===
  'social-trending': {
    name: 'social-trending',
    label: 'Trending Light',
    colors: ['f6f8fa'],
    gradientType: 'socialBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Light badge — GitHub Trending style'
  },
  'social-achievement-red': {
    name: 'social-achievement-red',
    label: 'Achievement Red',
    colors: ['FF5252'],
    gradientType: 'socialBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Red achievement badge — Top Poster style'
  },
  'social-achievement-blue': {
    name: 'social-achievement-blue',
    label: 'Achievement Blue',
    colors: ['1d4ed8'],
    gradientType: 'socialBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Blue achievement badge'
  },
  'social-achievement-green': {
    name: 'social-achievement-green',
    label: 'Achievement Green',
    colors: ['16a34a'],
    gradientType: 'socialBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Green achievement badge'
  },

  // === Repo Cards ===
  'repo-card-dark': {
    name: 'repo-card-dark',
    label: 'Repo Card Dark',
    colors: ['24292f', 'f6f8fa'],
    gradientType: 'repoCard',
    animationDuration: '1.2s',
    category: 'GitHub Profile',
    description: 'GitHub-style repo card — dark icon panel'
  },
  'repo-card-blue': {
    name: 'repo-card-blue',
    label: 'Repo Card Blue',
    colors: ['1e3a5f', 'e8f0fe'],
    gradientType: 'repoCard',
    animationDuration: '1.2s',
    category: 'GitHub Profile',
    description: 'Repo card with blue icon panel'
  }
};
```

- [ ] **Step 2: Add category to templateCategories.js**

In `src/data/templateCategories.js`, add the import at the top:

```javascript
const githubProfileTemplates = require('../templates/githubProfileTemplates');
```

Add this entry to the `templateCategories` array:

```javascript
  {
    id: 'github-profile',
    name: 'GitHub Profile',
    icon: '🏷️',
    description: 'Badges, banners, terminals, and cards for GitHub profile READMEs',
    templates: Object.values(githubProfileTemplates)
  },
```

- [ ] **Step 3: Add to templateUtils.js**

In `src/utils/templateUtils.js`, add the import:

```javascript
import githubProfileTemplates from '../templates/githubProfileTemplates';
```

Add `githubProfileTemplates` to the `allTemplateGroups` array.

- [ ] **Step 4: Verify the app builds**

Run: `cd D:\github_repository\gradient-svg-generator && npx next build 2>&1 | tail -10`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/templates/githubProfileTemplates.js src/data/templateCategories.js src/utils/templateUtils.js
git commit -m "feat: add 30 GitHub Profile templates across 7 effect types"
```

---

### Task 10: Wire params through API endpoint

The `complete` output type generators need access to `params.text`, `params.colors`, and `params.height`. The API endpoint must pass these through when calling UnifiedGradientGenerator.

**Files:**
- Modify: `src/pages/api/svg.js`
- Modify: `src/core/UnifiedGradientGenerator.js` (examine how params flow)

- [ ] **Step 1: Read UnifiedGradientGenerator to understand param flow**

Read: `src/core/UnifiedGradientGenerator.js`

The key question: does the generator function receive the `text`, `colors`, and `height` as a fourth parameter? Check how `outputType: 'complete'` results are handled.

- [ ] **Step 2: Add params passthrough in UnifiedGradientGenerator**

In `UnifiedGradientGenerator.js`, where generators are called, ensure that for `outputType: 'complete'`, the generator receives a params object:

```javascript
// When calling the generator for 'complete' output type:
const result = generator(stops, animationConfig, duration, {
  text,
  colors,
  height: parsedHeight
});

// If result has contentType === 'complete', use SVGComposer.compose()
if (result.contentType === 'complete') {
  return svgComposer.compose({
    content: result.content,
    contentType: 'complete'
  });
}
```

- [ ] **Step 3: Manual test via API**

Run: `curl "http://localhost:3000/api/svg?text=Hello&gradientType=shimmerBadge&color0=e3342f&height=28" -o test-badge.svg`

Open `test-badge.svg` in a browser to verify the shimmer animation works.

- [ ] **Step 4: Test all 7 types via curl**

```bash
# Badge
curl "http://localhost:3000/api/svg?text=Best+Practice&gradientType=shimmerBadge&color0=e3342f&height=28" -o test-1.svg
# Terminal
curl "http://localhost:3000/api/svg?text=npm+install+chromaflow&gradientType=terminalTyping&color0=8b5cf6&height=50" -o test-2.svg
# Pills (semicolon-separated)
curl "http://localhost:3000/api/svg?text=React;Node.js;Python&gradientType=skillPills&color0=424242&color1=616161&height=28" -o test-3.svg
# Banner
curl "http://localhost:3000/api/svg?text=Developed+by+Claude+Code&gradientType=shimmerBanner&color0=CC7C5E&height=32" -o test-4.svg
# Shimmer Text
curl "http://localhost:3000/api/svg?text=Software+Architect&gradientType=shimmerText&color0=1f2937&color1=a855f7&height=30" -o test-5.svg
# Gold Badge
curl "http://localhost:3000/api/svg?text=Featured+Project&gradientType=goldBadge&color0=b8860b&color1=daa520&color2=ffd700&height=44" -o test-6.svg
# Social Badge
curl "http://localhost:3000/api/svg?text=Top+1%25+Poster&gradientType=socialBadge&color0=FF5252&height=32" -o test-7.svg
# Repo Card
curl "http://localhost:3000/api/svg?text=my-project&gradientType=repoCard&color0=24292f&color1=f6f8fa&height=56" -o test-8.svg
```

Expected: 8 valid SVG files, each showing the correct animation when opened in browser.

- [ ] **Step 5: Commit**

```bash
git add src/pages/api/svg.js src/core/UnifiedGradientGenerator.js
git commit -m "feat: wire GitHub profile effect params through API and generator pipeline"
```

---

### Task 11: Run full test suite and final build verification

- [ ] **Step 1: Run all unit tests**

Run: `cd D:\github_repository\gradient-svg-generator && npx jest --no-cache 2>&1 | tail -20`
Expected: All tests pass, including the new `githubProfileGradients.test.js`

- [ ] **Step 2: Run production build**

Run: `cd D:\github_repository\gradient-svg-generator && npx next build 2>&1 | tail -15`
Expected: Build succeeds with no errors

- [ ] **Step 3: Smoke test the template gallery**

Run: `cd D:\github_repository\gradient-svg-generator && npx next dev &`

Open `http://localhost:3000/templates` in browser. Verify:
- "GitHub Profile" category appears in the sidebar
- 30 templates are visible when the category is selected
- Clicking any template shows a preview with animation

- [ ] **Step 4: Commit and tag**

```bash
git add -A
git commit -m "test: verify all GitHub profile effects pass full build and test suite"
```
