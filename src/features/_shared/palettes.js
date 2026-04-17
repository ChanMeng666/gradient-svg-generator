/**
 * Named color palettes for template composition.
 *
 * Keep palettes here when either (a) the same color sequence appears in 2+
 * templates, or (b) the sequence has a canonical meaning (pride flags,
 * brand colors) worth naming for readability.
 *
 * Palettes are frozen arrays so templates can share a reference without risk
 * of mutation leaking across modules.
 */

const freeze = (arr) => Object.freeze(arr);

// ---- Duplicate palettes (shared across features) -------------------------

const sunsetGold = freeze(['ffd700', 'ff8c00', 'ff4500']);
const amberFlow = freeze(['ff8000', 'ffaa00', 'ffcc00', 'ffff00']);
const greenPulse = freeze(['00ff80', '40ff40', '80ff80', '00ff00']);
const gradientWeb = freeze(['667eea', '764ba2', 'f093fb', 'f5576c']);
const rainbow6 = freeze(['ff0000', 'ff8000', 'ffff00', '00ff00', '0080ff', '8000ff']);
const rainbow7 = freeze(['ff0000', 'ff7f00', 'ffff00', '00ff00', '0000ff', '4b0082', '9400d3']);
const githubBlue = freeze(['3b82f6']);
const githubDeepBlue = freeze(['1d4ed8']);

// ---- Pride flag palettes (canonical) -------------------------------------

const prideRainbow = freeze(['ff0000', 'ff8c00', 'ffff00', '008000', '0000ff', '4b0082']);
const transPride = freeze(['55cdfc', 'f7a8b8', 'ffffff', 'f7a8b8', '55cdfc']);
const biPride = freeze(['d60270', '9b4f96', '0038a8']);
const panPride = freeze(['ff1b8d', 'ffd800', '00b5ff']);
const nonbinaryPride = freeze(['fcf434', 'ffffff', '9c59d1', '2c2c2c']);
const lesbianPride = freeze(['d62900', 'ff9b55', 'ffffff', 'd461a6', 'a50062']);
const genderqueerPride = freeze(['b57edc', 'ffffff', '4a8123']);
const genderfluidPride = freeze(['ff75a2', 'ffffff', 'be18d6', '000000', '333ebd']);
const acePride = freeze(['000000', 'a3a3a3', 'ffffff', '800080']);
const aroPride = freeze(['3da542', 'a7d379', 'ffffff', 'a9a9a9', '000000']);
const intersexPride = freeze(['ffd800', '7902aa']);
const agenderPride = freeze(['000000', 'b9b9b9', 'ffffff', 'b8f483', 'ffffff', 'b9b9b9', '000000']);
const polyPride = freeze(['0000ff', 'ff0000', '000000']);
const demiboyPride = freeze(['7f7f7f', 'c4c4c4', '9ad9eb', 'ffffff']);
const demigirlPride = freeze(['7f7f7f', 'c4c4c4', 'ffaec9', 'ffffff']);
const omnisexualPride = freeze(['ff9ccd', 'ff53bd', '2c2c2c', '6760ff', '9cb9ff']);
const progressPride = freeze([
  '000000',
  '784F17',
  'ff0000',
  'ff8c00',
  'ffff00',
  '008000',
  '0000ff',
  '4b0082',
]);
const demiromanticPride = freeze(['ffffff', '3da542', '000000', 'a9a9a9']);
const demisexualPride = freeze(['ffffff', '6e0070', 'd2d2d2', '000000']);
const queerPride = freeze(['b57edc', 'ffffff', '4a8123', '000000']);

module.exports = {
  sunsetGold,
  amberFlow,
  greenPulse,
  gradientWeb,
  rainbow6,
  rainbow7,
  githubBlue,
  githubDeepBlue,
  prideRainbow,
  transPride,
  biPride,
  panPride,
  nonbinaryPride,
  lesbianPride,
  genderqueerPride,
  genderfluidPride,
  acePride,
  aroPride,
  intersexPride,
  agenderPride,
  polyPride,
  demiboyPride,
  demigirlPride,
  omnisexualPride,
  progressPride,
  demiromanticPride,
  demisexualPride,
  queerPride,
};
