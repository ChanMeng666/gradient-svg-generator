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

const palettes = require('../_shared/palettes');

module.exports = {
  // ── Shimmer Badges (7) ──
  'shimmer-red': {
    name: 'shimmer-red',
    label: 'Shimmer Red',
    colors: ['e3342f'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Red shimmer badge',
  },
  'shimmer-green': {
    name: 'shimmer-green',
    label: 'Shimmer Green',
    colors: ['2ea44f'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Green shimmer badge',
  },
  'shimmer-blue': {
    name: 'shimmer-blue',
    label: 'Shimmer Blue',
    colors: palettes.githubBlue,
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Blue shimmer badge',
  },
  'shimmer-gold': {
    name: 'shimmer-gold',
    label: 'Shimmer Gold',
    colors: ['f1c40f'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Gold shimmer badge',
  },
  'shimmer-orange': {
    name: 'shimmer-orange',
    label: 'Shimmer Orange',
    colors: ['CC7C5E'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Orange shimmer badge',
  },
  'shimmer-purple': {
    name: 'shimmer-purple',
    label: 'Shimmer Purple',
    colors: ['7c3aed'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Purple shimmer badge',
  },
  'shimmer-dark': {
    name: 'shimmer-dark',
    label: 'Shimmer Dark',
    colors: ['1a1a1a'],
    gradientType: 'shimmerBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Dark shimmer badge',
  },

  // ── Terminal Typing (3) ──
  'terminal-purple': {
    name: 'terminal-purple',
    label: 'Terminal Purple',
    colors: ['8b5cf6'],
    gradientType: 'terminalTyping',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Purple terminal typing effect',
  },
  'terminal-green': {
    name: 'terminal-green',
    label: 'Terminal Green',
    colors: ['22c55e'],
    gradientType: 'terminalTyping',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Green terminal typing effect',
  },
  'terminal-blue': {
    name: 'terminal-blue',
    label: 'Terminal Blue',
    colors: palettes.githubBlue,
    gradientType: 'terminalTyping',
    animationDuration: '2.5s',
    category: 'GitHub Profile',
    description: 'Blue terminal typing effect',
  },

  // ── Skill Pills (4) ──
  'pills-dark': {
    name: 'pills-dark',
    label: 'Pills Dark',
    colors: ['424242', '616161'],
    gradientType: 'skillPills',
    animationDuration: '2s',
    category: 'GitHub Profile',
    description: 'Dark skill pills',
  },
  'pills-rainbow': {
    name: 'pills-rainbow',
    label: 'Pills Rainbow',
    colors: ['e3342f', '3b82f6', '2ea44f', 'f1c40f'],
    gradientType: 'skillPills',
    animationDuration: '2s',
    category: 'GitHub Profile',
    description: 'Rainbow skill pills',
  },
  'pills-blue': {
    name: 'pills-blue',
    label: 'Pills Blue',
    colors: ['1e40af', '3b82f6'],
    gradientType: 'skillPills',
    animationDuration: '2s',
    category: 'GitHub Profile',
    description: 'Blue skill pills',
  },
  'pills-purple': {
    name: 'pills-purple',
    label: 'Pills Purple',
    colors: ['5b21b6', '7c3aed'],
    gradientType: 'skillPills',
    animationDuration: '2s',
    category: 'GitHub Profile',
    description: 'Purple skill pills',
  },

  // ── Shimmer Banners (4) ──
  'banner-orange': {
    name: 'banner-orange',
    label: 'Banner Orange',
    colors: ['CC7C5E'],
    gradientType: 'shimmerBanner',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Orange shimmer banner',
  },
  'banner-dark': {
    name: 'banner-dark',
    label: 'Banner Dark',
    colors: ['24292f'],
    gradientType: 'shimmerBanner',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Dark shimmer banner',
  },
  'banner-blue': {
    name: 'banner-blue',
    label: 'Banner Blue',
    colors: palettes.githubDeepBlue,
    gradientType: 'shimmerBanner',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Blue shimmer banner',
  },
  'banner-red': {
    name: 'banner-red',
    label: 'Banner Red',
    colors: ['dc2626'],
    gradientType: 'shimmerBanner',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Red shimmer banner',
  },

  // ── Shimmer Text (3) ──
  'text-shimmer-purple': {
    name: 'text-shimmer-purple',
    label: 'Text Shimmer Purple',
    colors: ['1f2937', 'a855f7'],
    gradientType: 'shimmerText',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Purple shimmer text effect',
  },
  'text-shimmer-blue': {
    name: 'text-shimmer-blue',
    label: 'Text Shimmer Blue',
    colors: ['1f2937', '3b82f6'],
    gradientType: 'shimmerText',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Blue shimmer text effect',
  },
  'text-shimmer-gold': {
    name: 'text-shimmer-gold',
    label: 'Text Shimmer Gold',
    colors: ['78350f', 'fbbf24'],
    gradientType: 'shimmerText',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Gold shimmer text effect',
  },

  // ── Gold Badges (3) ──
  'gold-luxury': {
    name: 'gold-luxury',
    label: 'Gold Luxury',
    colors: ['b8860b', 'daa520', 'ffd700'],
    gradientType: 'goldBadge',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Luxury gold badge effect',
  },
  'gold-platinum': {
    name: 'gold-platinum',
    label: 'Gold Platinum',
    colors: ['666666', '999999', 'cccccc'],
    gradientType: 'goldBadge',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Platinum badge effect',
  },
  'gold-rose': {
    name: 'gold-rose',
    label: 'Gold Rose',
    colors: ['b76e79', 'e8a0b0', 'f4c2c2'],
    gradientType: 'goldBadge',
    animationDuration: '3s',
    category: 'GitHub Profile',
    description: 'Rose gold badge effect',
  },

  // ── Social Badges (4) ──
  'social-trending': {
    name: 'social-trending',
    label: 'Social Trending',
    colors: ['f6f8fa'],
    gradientType: 'socialBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Trending social badge',
  },
  'social-achievement-red': {
    name: 'social-achievement-red',
    label: 'Social Achievement Red',
    colors: ['FF5252'],
    gradientType: 'socialBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Red achievement social badge',
  },
  'social-achievement-blue': {
    name: 'social-achievement-blue',
    label: 'Social Achievement Blue',
    colors: palettes.githubDeepBlue,
    gradientType: 'socialBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Blue achievement social badge',
  },
  'social-achievement-green': {
    name: 'social-achievement-green',
    label: 'Social Achievement Green',
    colors: ['16a34a'],
    gradientType: 'socialBadge',
    animationDuration: '1.8s',
    category: 'GitHub Profile',
    description: 'Green achievement social badge',
  },

  // ── Repo Cards (2) ──
  'repo-card-dark': {
    name: 'repo-card-dark',
    label: 'Repo Card Dark',
    colors: ['24292f', 'f6f8fa'],
    gradientType: 'repoCard',
    animationDuration: '1.2s',
    category: 'GitHub Profile',
    description: 'Dark repo card effect',
  },
  'repo-card-blue': {
    name: 'repo-card-blue',
    label: 'Repo Card Blue',
    colors: ['1e3a5f', 'e8f0fe'],
    gradientType: 'repoCard',
    animationDuration: '1.2s',
    category: 'GitHub Profile',
    description: 'Blue repo card effect',
  },
};
