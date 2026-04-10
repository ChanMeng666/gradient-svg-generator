const {
  createShimmerBadge,
  createTerminalTyping,
  createSkillPills,
  createShimmerBanner,
  createShimmerText,
  createGoldBadge,
  createSocialBadge,
  createRepoCard
} = require('../src/utils/gradientGenerators/githubProfileGradients');

// Default test args
const stops = '<stop offset="0%" stop-color="#6366f1"/><stop offset="100%" stop-color="#a855f7"/>';
const animationConfig = 'dur="3s" repeatCount="indefinite"';
const animationDuration = '3s';

function defaultParams(overrides) {
  return { text: 'Test', colors: ['#6366f1', '#a855f7'], height: 36, ...overrides };
}

// ─── Helper ──────────────────────────────────────────────────────────────────
function assertComplete(result) {
  expect(result).toHaveProperty('content');
  expect(result).toHaveProperty('contentType', 'complete');
  expect(result.content).toContain('<svg');
}

// ─── 1. createShimmerBadge ───────────────────────────────────────────────────
describe('createShimmerBadge', () => {
  test('returns complete SVG', () => {
    const result = createShimmerBadge(stops, animationConfig, animationDuration, defaultParams());
    assertComplete(result);
  });

  test('contains text and background color', () => {
    const result = createShimmerBadge(stops, animationConfig, '2s', defaultParams({ text: 'Hello' }));
    expect(result.content).toContain('Hello');
    expect(result.content).toContain('#6366f1');
  });

  test('contains shimmer keyframes and depth gradient', () => {
    const result = createShimmerBadge(stops, animationConfig, '2s', defaultParams());
    expect(result.content).toContain('@keyframes shimmer');
    expect(result.content).toContain('depthGrad');
    expect(result.content).toContain('clipPath');
  });
});

// ─── 2. createTerminalTyping ─────────────────────────────────────────────────
describe('createTerminalTyping', () => {
  test('returns complete SVG', () => {
    const result = createTerminalTyping(stops, animationConfig, animationDuration, defaultParams({ text: '$ npm install' }));
    assertComplete(result);
  });

  test('contains terminal dots and prompt', () => {
    const result = createTerminalTyping(stops, animationConfig, '3s', defaultParams({ text: '$ npm install', colors: ['#a855f7'] }));
    expect(result.content).toContain('#ff5f56'); // red dot
    expect(result.content).toContain('#ffbd2e'); // yellow dot
    expect(result.content).toContain('#27c93f'); // green dot
    expect(result.content).toContain('$');       // prompt
    expect(result.content).toContain('#a855f7'); // prompt color
  });

  test('contains typing animation and blinking cursor', () => {
    const result = createTerminalTyping(stops, animationConfig, '3s', defaultParams({ text: '$ hello' }));
    expect(result.content).toContain('clipPath');
    expect(result.content).toContain('@keyframes blink');
    expect(result.content).toContain('#f5f5f5'); // terminal bg
  });
});

// ─── 3. createSkillPills ─────────────────────────────────────────────────────
describe('createSkillPills', () => {
  test('returns complete SVG', () => {
    const result = createSkillPills(stops, animationConfig, animationDuration, defaultParams({ text: 'React;Node.js' }));
    assertComplete(result);
  });

  test('contains each skill text', () => {
    const result = createSkillPills(stops, animationConfig, '2s', defaultParams({ text: 'React;Node.js;Python', colors: ['#61dafb', '#339933', '#3776ab'] }));
    expect(result.content).toContain('React');
    expect(result.content).toContain('Node.js');
    expect(result.content).toContain('Python');
  });

  test('uses alternating colors and SMIL animate', () => {
    const result = createSkillPills(stops, animationConfig, '2s', defaultParams({ text: 'A;B', colors: ['#ff0000', '#00ff00'] }));
    expect(result.content).toContain('#ff0000');
    expect(result.content).toContain('#00ff00');
    expect(result.content).toContain('<animate');
  });

  test('pills have fully rounded rx', () => {
    const result = createSkillPills(stops, animationConfig, '2s', defaultParams({ text: 'X' }));
    // pillHeight = 28, rx = 14
    expect(result.content).toContain('rx="14"');
  });
});

// ─── 4. createShimmerBanner ──────────────────────────────────────────────────
describe('createShimmerBanner', () => {
  test('returns complete SVG', () => {
    const result = createShimmerBanner(stops, animationConfig, animationDuration, defaultParams({ text: 'Banner' }));
    assertComplete(result);
  });

  test('contains text and shimmer animation', () => {
    const result = createShimmerBanner(stops, animationConfig, '2s', defaultParams({ text: 'Developed by Claude Code' }));
    expect(result.content).toContain('Developed by Claude Code');
    expect(result.content).toContain('@keyframes shimmer');
  });

  test('has rounded corners and edge highlights', () => {
    const result = createShimmerBanner(stops, animationConfig, '2s', defaultParams());
    expect(result.content).toContain('rx="6"');
    expect(result.content).toContain('rgba(255,255,255,0.3)'); // top highlight
    expect(result.content).toContain('rgba(0,0,0,0.2)');       // bottom shadow
  });
});

// ─── 5. createShimmerText ────────────────────────────────────────────────────
describe('createShimmerText', () => {
  test('returns complete SVG', () => {
    const result = createShimmerText(stops, animationConfig, animationDuration, defaultParams({ text: 'Glow' }));
    assertComplete(result);
  });

  test('uses gradient fill on text with SMIL animate', () => {
    const result = createShimmerText(stops, animationConfig, '3s', defaultParams({ text: 'Shimmer' }));
    expect(result.content).toContain('Shimmer');
    expect(result.content).toContain('fill="url(#shimmer)"');
    expect(result.content).toContain('<animate');
  });

  test('uses base and accent colors', () => {
    const result = createShimmerText(stops, animationConfig, '3s', defaultParams({ colors: ['#ff0000', '#00ff00'] }));
    expect(result.content).toContain('#ff0000');
    expect(result.content).toContain('#00ff00');
  });
});

// ─── 6. createGoldBadge ─────────────────────────────────────────────────────
describe('createGoldBadge', () => {
  test('returns complete SVG', () => {
    const result = createGoldBadge(stops, animationConfig, animationDuration, defaultParams({ text: 'Premium' }));
    assertComplete(result);
  });

  test('contains gold gradient stops', () => {
    const result = createGoldBadge(stops, animationConfig, '3s', defaultParams());
    expect(result.content).toContain('#FFD700');
    expect(result.content).toContain('#DAA520');
    expect(result.content).toContain('#8B6914');
  });

  test('has diamond symbols and glow filter', () => {
    const result = createGoldBadge(stops, animationConfig, '3s', defaultParams());
    expect(result.content).toContain('&#9670;');
    expect(result.content).toContain('feGaussianBlur');
    expect(result.content).toContain('filter="url(#glow)"');
  });

  test('has shimmer and pulse animations', () => {
    const result = createGoldBadge(stops, animationConfig, '3s', defaultParams());
    expect(result.content).toContain('@keyframes shimmer');
    expect(result.content).toContain('@keyframes pulse');
  });

  test('has depth overlay and edge lines', () => {
    const result = createGoldBadge(stops, animationConfig, '3s', defaultParams());
    expect(result.content).toContain('goldDepth');
    expect(result.content).toContain('rgba(255,255,255,0.5)'); // top highlight
    expect(result.content).toContain('rgba(0,0,0,0.3)');       // bottom shadow
  });
});

// ─── 7. createSocialBadge ────────────────────────────────────────────────────
describe('createSocialBadge', () => {
  test('returns complete SVG', () => {
    const result = createSocialBadge(stops, animationConfig, animationDuration, defaultParams({ text: 'Follow' }));
    assertComplete(result);
  });

  test('uses dark text for light backgrounds', () => {
    // Yellow is high luminance
    const result = createSocialBadge(stops, animationConfig, '2s', defaultParams({ colors: ['#ffff00'] }));
    expect(result.content).toContain('#333333');
  });

  test('uses white text for dark backgrounds', () => {
    const result = createSocialBadge(stops, animationConfig, '2s', defaultParams({ colors: ['#000080'] }));
    expect(result.content).toContain('#ffffff');
  });

  test('has border and shimmer', () => {
    const result = createSocialBadge(stops, animationConfig, '2s', defaultParams());
    expect(result.content).toContain('stroke-width="0.2"');
    expect(result.content).toContain('@keyframes shimmer');
  });
});

// ─── 8. createRepoCard ──────────────────────────────────────────────────────
describe('createRepoCard', () => {
  test('returns complete SVG', () => {
    const result = createRepoCard(stops, animationConfig, animationDuration, defaultParams({ text: 'my-repo' }));
    assertComplete(result);
  });

  test('contains repo name and GitHub icon path', () => {
    const result = createRepoCard(stops, animationConfig, '3s', defaultParams({ text: 'awesome-lib' }));
    expect(result.content).toContain('awesome-lib');
    expect(result.content).toContain('M12 0C5.37'); // GitHub invertocat path start
  });

  test('has two panels with distinct colors', () => {
    const result = createRepoCard(stops, animationConfig, '3s', defaultParams({ colors: ['#24292e', '#f6f8fa'] }));
    expect(result.content).toContain('#24292e');
    expect(result.content).toContain('#f6f8fa');
  });

  test('has shimmer overlay and border', () => {
    const result = createRepoCard(stops, animationConfig, '3s', defaultParams());
    expect(result.content).toContain('@keyframes shimmer');
    expect(result.content).toContain('stroke-width="0.5"');
  });
});
