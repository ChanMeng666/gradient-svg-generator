/**
 * Runtime constants.
 *
 * CommonJS so existing .js modules can require it without transpile hops.
 * .ts consumers keep working too — TypeScript infers types from the
 * module.exports shape under `allowJs: true`.
 */

const APP_NAME = 'Chromaflow';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://gradient-svg-generator.vercel.app';

// SVG geometry — the width users embedded in /api/svg URLs is load-bearing;
// never change it without a contract-test review.
const SVG_WIDTH = 854;
const DEFAULT_HEIGHT = 120;
const MIN_HEIGHT = 30;
const MAX_HEIGHT = 300;

const DEFAULT_DURATION = '6s';

const DEFAULT_COLORS = Object.freeze(['#FF0080', '#7928CA']);

const SVG_CONTENT_TYPE = 'image/svg+xml';
const SVG_CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400';

module.exports = {
  APP_NAME,
  APP_URL,
  SVG_WIDTH,
  DEFAULT_HEIGHT,
  MIN_HEIGHT,
  MAX_HEIGHT,
  DEFAULT_DURATION,
  DEFAULT_COLORS,
  SVG_CONTENT_TYPE,
  SVG_CACHE_CONTROL,
};
