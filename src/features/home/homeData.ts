/**
 * Data arrays used by the home page. Extracted from pages/index.js so
 * the component stays focused on layout instead of embedded content
 * tables. The lists are pure data (no JSX) and safe to import into a
 * server-rendered page.
 *
 * When adding new entries: prefer template `name`s that exist in the
 * registry -- the home page assumes these names resolve to real SVG
 * output for its preview cards.
 */

export interface FeaturedTemplate {
  readonly name: string;
  readonly displayName: string;
  readonly text: string;
}

export interface EditorsChoiceTemplate extends FeaturedTemplate {
  readonly category: string;
}

export interface PopularTemplate {
  readonly name: string;
  readonly displayName: string;
  readonly users: string;
}

/** Rotated through the hero carousel. */
export const FEATURED_TEMPLATES: readonly FeaturedTemplate[] = [
  { name: 'hologram-matrix', displayName: 'Hologram Matrix', text: 'FUTURISTIC' },
  { name: 'aurora-borealis', displayName: 'Aurora Borealis', text: 'NATURE' },
  { name: 'typing-path-reveal', displayName: 'Typing Animation', text: 'TYPING' },
  { name: 'liquid-venom', displayName: 'Liquid Venom', text: 'LIQUID' },
  { name: 'watercolor-dream', displayName: 'Watercolor Dream', text: 'ARTISTIC' },
  { name: 'sunset-gold', displayName: 'Sunset Gold', text: 'LUXURY' },
  { name: 'pixel-art-retro', displayName: 'Pixel Art', text: 'RETRO' },
  { name: 'rainbow-wave', displayName: 'Rainbow Wave', text: 'RAINBOW' },
] as const;

/** Curated showcase grid, one or two per design vertical. */
export const EDITORS_CHOICE: readonly EditorsChoiceTemplate[] = [
  { name: 'sunset-gold', displayName: 'Sunset Gold', category: 'luxury', text: 'PREMIUM' },
  {
    name: 'diamond-sparkle',
    displayName: 'Diamond Sparkle',
    category: 'material',
    text: 'DIAMOND',
  },
  { name: 'ocean-heart', displayName: 'Ocean Heart', category: 'nature', text: 'OCEAN' },
  {
    name: 'aurora-borealis',
    displayName: 'Aurora Borealis',
    category: 'organicNature',
    text: 'AURORA',
  },
  { name: 'cyber-scan', displayName: 'Cyber Scanner', category: 'tech', text: 'CYBER' },
  { name: 'neural-network', displayName: 'Neural Network', category: 'digitalLife', text: 'AI' },
  {
    name: 'watercolor-dream',
    displayName: 'Watercolor Dream',
    category: 'artistic',
    text: 'WATERCOLOR',
  },
  { name: 'art-deco-luxury', displayName: 'Art Deco', category: 'artMovement', text: 'DECO' },
  { name: 'neon-arcade', displayName: 'Neon Arcade', category: 'gaming', text: 'ARCADE' },
  { name: 'pixel-art-retro', displayName: 'Pixel Art', category: 'gaming', text: 'PIXEL' },
  {
    name: 'typing-path-reveal',
    displayName: 'Typing Animation',
    category: 'pathText',
    text: 'TYPING',
  },
  { name: 'handwriting', displayName: 'Handwriting', category: 'pathText', text: 'WRITE' },
  { name: 'liquid-venom', displayName: 'Liquid Venom', category: 'capsuleShape', text: 'VENOM' },
  { name: 'dreamy-sunset', displayName: 'Dreamy Sunset', category: 'capsuleShape', text: 'DREAMY' },
  { name: 'monsoon-rain', displayName: 'Monsoon Rain', category: 'weather', text: 'RAIN' },
  { name: 'stained-glass', displayName: 'Stained Glass', category: 'lightShadow', text: 'GLASS' },
] as const;

/** Popular-this-week list with usage counts (static, not live metrics). */
export const POPULAR_TEMPLATES: readonly PopularTemplate[] = [
  { name: 'typing-path-reveal', displayName: 'Typing Animation', users: '3.2k' },
  { name: 'aurora-borealis', displayName: 'Aurora Borealis', users: '2.8k' },
  { name: 'liquid-venom', displayName: 'Liquid Venom', users: '2.5k' },
  { name: 'watercolor-dream', displayName: 'Watercolor Dream', users: '2.1k' },
  { name: 'neon-arcade', displayName: 'Neon Arcade', users: '1.9k' },
  { name: 'hologram-matrix', displayName: 'Hologram Matrix', users: '1.7k' },
] as const;
