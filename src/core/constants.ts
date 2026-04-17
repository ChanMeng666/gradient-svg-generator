export const APP_NAME = 'Chromaflow';

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://gradient-svg-generator.vercel.app';

export const SVG_WIDTH = 854;

export const DEFAULT_HEIGHT = 120;
export const MIN_HEIGHT = 30;
export const MAX_HEIGHT = 300;

export const DEFAULT_DURATION = '6s';

export const DEFAULT_COLORS = ['#FF0080', '#7928CA'] as const;

export const SVG_CONTENT_TYPE = 'image/svg+xml';
export const SVG_CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400';
