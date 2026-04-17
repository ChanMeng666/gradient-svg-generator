/** @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest */

const githubProfileGradients = require('../../utils/gradientGenerators/githubProfileGradients');

const category = 'githubProfile';

/** @type {EffectManifest} */
const manifest = {
  id: 'githubProfile',
  category,
  effects: [
    {
      name: 'shimmerBadge',
      category,
      generator: githubProfileGradients.createShimmerBadge,
      outputType: 'complete',
      description: 'Shimmer badge with colored background and light sweep',
    },
    {
      name: 'terminalTyping',
      category,
      generator: githubProfileGradients.createTerminalTyping,
      outputType: 'complete',
      description: 'macOS terminal with typing animation and blinking cursor',
    },
    {
      name: 'skillPills',
      category,
      generator: githubProfileGradients.createSkillPills,
      outputType: 'complete',
      description: 'Row of skill/tech pills with shimmer overlay',
    },
    {
      name: 'shimmerBanner',
      category,
      generator: githubProfileGradients.createShimmerBanner,
      outputType: 'complete',
      description: 'Wide banner with shimmer sweep for announcements',
    },
    {
      name: 'shimmerText',
      category,
      generator: githubProfileGradients.createShimmerText,
      outputType: 'complete',
      description: 'Text with internal gradient shimmer highlight',
    },
    {
      name: 'goldBadge',
      category,
      generator: githubProfileGradients.createGoldBadge,
      outputType: 'complete',
      description: 'Luxury gold badge with diamond accents and glow',
    },
    {
      name: 'socialBadge',
      category,
      generator: githubProfileGradients.createSocialBadge,
      outputType: 'complete',
      description: 'Social achievement badge with auto light/dark text',
    },
    {
      name: 'repoCard',
      category,
      generator: githubProfileGradients.createRepoCard,
      outputType: 'complete',
      description: 'GitHub-style repo card with icon and shimmer',
    },
  ],
};

module.exports = { manifest };
