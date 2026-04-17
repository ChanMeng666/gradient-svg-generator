/**
 * SVG gradient primitives.
 *
 * Factories that subsume the dozens of near-duplicate linearGradient/
 * radialGradient generator functions scattered across
 * src/utils/gradientGenerators/*. Each factory reproduces the exact
 * whitespace of the legacy generator it replaces so /api/svg output is
 * byte-identical.
 *
 * Indentation is pinned at 4/6 spaces (outer/inner) — the convention used
 * by basicGradients.js and the other files whose snapshots are the public
 * contract. Callers that need a different indent pass it explicitly.
 */

/**
 * Emit a single <animate> or <animateTransform> child line.
 * Accepts either a shorthand tuple ['attr', 'values'] or a full object.
 */
function animateLine(a, animationConfig, indent) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(a)) {
    const [attr, values] = a;
    return `${pad}<animate attributeName="${attr}" values="${values}" ${animationConfig} />`;
  }
  const { attr, values, type, transformType = 'rotate', cfg = animationConfig } = a;
  if (type === 'transform') {
    return `${pad}<animateTransform attributeName="${attr}" type="${transformType}" values="${values}" ${cfg} />`;
  }
  return `${pad}<animate attributeName="${attr}" values="${values}" ${cfg} />`;
}

/**
 * Generate an animated <linearGradient id="gradient"> block.
 *
 * Output shape (matches legacy basicGradients.js whitespace):
 *   \n    <linearGradient id="gradient" COORDS>
 *   \n      ${stops}
 *   \n      <animate ... /> ...
 *   \n    </linearGradient>
 *
 * @param {string} stops - Already-rendered <stop> elements.
 * @param {string} animationConfig - `dur="..." repeatCount="indefinite"` fragment.
 * @param {object} opts
 * @param {string} opts.coords - Raw coord attrs, e.g. `x1="0%" y1="0%" x2="100%" y2="0%"`.
 * @param {Array} opts.animates - Array of [attr, values] tuples or {attr, values, type, cfg} objects.
 */
function animatedLinearGradient(stops, animationConfig, { coords, animates, indent = 4 }) {
  const outer = ' '.repeat(indent);
  const inner = ' '.repeat(indent + 2);
  const animateLines = animates.map((a) => animateLine(a, animationConfig, indent + 2)).join('\n');
  return `
${outer}<linearGradient id="gradient" ${coords}>
${inner}${stops}
${animateLines}
${outer}</linearGradient>`;
}

/**
 * Generate an animated <radialGradient id="gradient"> block.
 * Same whitespace conventions as animatedLinearGradient.
 *
 * @param {string} stops
 * @param {string} animationConfig
 * @param {object} opts
 * @param {string} opts.coords - Raw coord attrs, e.g. `cx="50%" cy="50%" r="50%"`.
 * @param {Array} opts.animates
 */
function animatedRadialGradient(stops, animationConfig, { coords, animates, indent = 4 }) {
  const outer = ' '.repeat(indent);
  const inner = ' '.repeat(indent + 2);
  const animateLines = animates.map((a) => animateLine(a, animationConfig, indent + 2)).join('\n');
  return `
${outer}<radialGradient id="gradient" ${coords}>
${inner}${stops}
${animateLines}
${outer}</radialGradient>`;
}

module.exports = {
  animatedLinearGradient,
  animatedRadialGradient,
};
