#!/usr/bin/env node
/**
 * Scaffold a new effect category.
 *
 * Usage: npm run create:effect <name>
 *
 * Creates:
 *   src/features/<name>/effect.js
 *   src/features/<name>/templates.js
 *   src/utils/gradientGenerators/<name>Gradients.js
 *
 * Then prints a TODO checklist for the three registration sites that
 * can't be reliably auto-edited (TemplateRegistry, templateCategories,
 * templateUtils).
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const rawName = process.argv[2];
if (!rawName) {
  console.error('Usage: npm run create:effect <name>');
  console.error('Example: npm run create:effect neonArcade');
  process.exit(1);
}

// Validate and normalize the name.
if (!/^[a-z][a-zA-Z0-9]*$/.test(rawName)) {
  console.error(`Invalid name "${rawName}". Use camelCase starting with a lowercase letter.`);
  console.error('Example: neonArcade, retroWave, pixelArt');
  process.exit(1);
}

const name = rawName;
const NamePascal = name[0].toUpperCase() + name.slice(1);
const kebab = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const featureDir = join(ROOT, 'src', 'features', name);
const generatorFile = join(ROOT, 'src', 'utils', 'gradientGenerators', `${name}Gradients.js`);

if (existsSync(featureDir)) {
  console.error(`Feature folder already exists: src/features/${name}/`);
  process.exit(1);
}
if (existsSync(generatorFile)) {
  console.error(`Generator file already exists: src/utils/gradientGenerators/${name}Gradients.js`);
  process.exit(1);
}

mkdirSync(featureDir, { recursive: true });

// -- Generator stub --------------------------------------------------------

const generatorSrc = `/**
 * ${NamePascal} gradient generators.
 */

const {
  animatedLinearGradient,
  animatedRadialGradient,
} = require('../../features/_shared/svgPrimitives');

function create${NamePascal}Gradient(stops, animationConfig /* , animationDuration */) {
  // TODO: Replace this starter with your effect's actual animation values.
  return animatedLinearGradient(stops, animationConfig, {
    coords: 'x1="0%" y1="0%" x2="100%" y2="0%"',
    animates: [
      ['x1', '-50%;50%;-50%'],
      ['x2', '50%;150%;50%'],
    ],
  });
}

module.exports = {
  create${NamePascal}Gradient,
};
`;

writeFileSync(generatorFile, generatorSrc);

// -- Effect manifest stub --------------------------------------------------

const effectSrc = `/**
 * ${NamePascal} gradient effects manifest.
 *
 * @typedef {import('../../core/schema/effect.schema').EffectManifest} EffectManifest
 */

const ${name}Gradients = require('../../utils/gradientGenerators/${name}Gradients');

const category = '${name}';

/** @type {EffectManifest} */
const manifest = {
  id: '${name}',
  category,
  effects: [
    {
      name: '${name}',
      category,
      generator: ${name}Gradients.create${NamePascal}Gradient,
      outputType: 'gradient',
      description: 'TODO: Describe what this effect does.',
    },
  ],
};

module.exports = { manifest };
`;

writeFileSync(join(featureDir, 'effect.js'), effectSrc);

// -- Template stub ---------------------------------------------------------

const templatesSrc = `/**
 * ${NamePascal} templates.
 *
 * Public template names are part of the /api/svg contract. Once you ship
 * a template, never rename it -- users embed the name in GitHub READMEs.
 */

module.exports = {
  '${kebab}-starter': {
    name: '${kebab}-starter',
    label: '${NamePascal} Starter',
    colors: ['000000', 'ffffff'],
    gradientType: '${name}',
    animationDuration: '6s',
    description: 'TODO: Describe what this template looks like.',
  },
};
`;

writeFileSync(join(featureDir, 'templates.js'), templatesSrc);

// -- Next-step checklist ---------------------------------------------------

console.log(`
Scaffolded new effect: ${name}

  Created:
    src/features/${name}/effect.js
    src/features/${name}/templates.js
    src/utils/gradientGenerators/${name}Gradients.js

Three registration sites still need manual edits (they use position-indexed
arrays that are fragile to auto-edit):

  1. src/core/TemplateRegistry.js
     - Add require for '../features/${name}/templates'
     - Add entry to CATEGORY_REGISTRY:
         ${name}: { name: '${NamePascal}', icon: '✨', templates: ${name}Templates },

  2. src/data/templateCategories.js
     - Add require and category entry.

  3. src/utils/templateUtils.js
     - Add to the import list, allTemplateGroups array, categoryMap
       array (in BOTH getAllTemplates and getTemplateByName), and the
       categoryMap object in getCategories.

  4. src/features/index.js
     - Add the barrel export.

After those edits:
  - npm test                    # Verify all 101 contract snapshots stay green
  - npm run dev                 # Open http://localhost:3000 and find your new category

See docs/adding-an-effect.md for the full walkthrough.
`);
