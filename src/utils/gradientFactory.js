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

// Import all gradient generators
const basicGradients = require('./gradientGenerators/basicGradients');
const shapeGradients = require('./gradientGenerators/shapeGradients');
const effectGradients = require('./gradientGenerators/effectGradients');
const futureTechGradients = require('./gradientGenerators/futureTechGradients');
const artisticGradients = require('./gradientGenerators/artisticGradients');
const luxuryGradients = require('./gradientGenerators/luxuryGradients');
const organicGradients = require('./gradientGenerators/organicGradients');
const gamingGradients = require('./gradientGenerators/gamingGradients');
const morphingGradients = require('./gradientGenerators/morphingGradients');
const fluidDynamicsGradients = require('./gradientGenerators/fluidDynamicsGradients');
const dimensionalGradients = require('./gradientGenerators/dimensionalGradients');
const weatherGradients = require('./gradientGenerators/weatherGradients');
const lightShadowGradients = require('./gradientGenerators/lightShadowGradients');
const artMovementGradients = require('./gradientGenerators/artMovementGradients');
const culinaryLiquidGradients = require('./gradientGenerators/culinaryLiquidGradients');
const patternGradients = require('./gradientGenerators/patternGradients');
const metallicGradients = require('./gradientGenerators/metallicGradients');

// Gradient type mapping
const gradientMapping = {
  // Basic gradients
  horizontal: basicGradients.createHorizontalGradient,
  vertical: basicGradients.createVerticalGradient,
  diagonal: basicGradients.createDiagonalGradient,
  radial: basicGradients.createRadialGradient,
  burst: basicGradients.createBurstGradient,
  pulse: basicGradients.createPulseGradient,
  reflection: basicGradients.createReflectionGradient,
  diamond: basicGradients.createDiamondGradient,
  rainbow: basicGradients.createRainbowGradient,

  // Shape gradients
  circular: shapeGradients.createCircularGradient,
  star: shapeGradients.createStarGradient,
  heart: shapeGradients.createHeartGradient,
  lightning: shapeGradients.createLightningGradient,
  wave: shapeGradients.createWaveGradient,
  zigzag: shapeGradients.createZigzagGradient,
  ripple: shapeGradients.createRippleGradient,

  // Effect gradients
  galaxy: effectGradients.createGalaxyGradient,
  spiral: effectGradients.createSpiralGradient,
  conic: effectGradients.createConicGradient,
  luminance: effectGradients.createLuminanceGradient,
  textBox: effectGradients.createTextBoxGradient,
  glitch: effectGradients.createGlitchGradient,
  typewriter: effectGradients.createTypewriterGradient,

  // 🌈 NEW: Rainbow Layer Effect - 借鉴自 example-1/rainbow.js
  rainbowLayer: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'rainbow-layer' }),

  // Future tech gradients
  hologram: futureTechGradients.createHologramGradient,
  quantum: futureTechGradients.createQuantumGradient,
  laserGrid: futureTechGradients.createLaserGridGradient,
  neuralNet: futureTechGradients.createNeuralNetGradient,
  plasma: futureTechGradients.createPlasmaGradient,
  dataStream: futureTechGradients.createDataStreamGradient,

  // Artistic gradients
  watercolor: artisticGradients.createWatercolorGradient,
  oilPaint: artisticGradients.createOilPaintGradient,
  inkSplash: artisticGradients.createInkSplashGradient,
  mosaic: artisticGradients.createMosaicGradient,
  abstractGeo: artisticGradients.createAbstractGeoGradient,
  graffiti: artisticGradients.createGraffitiGradient,
  vintage: artisticGradients.createVintageGradient,

  // Luxury gradients
  goldFoil: luxuryGradients.createGoldFoilGradient,
  // diamond: luxuryGradients.createDiamondGradient, // Note: conflicts with basic diamond
  marble: luxuryGradients.createMarbleGradient,
  platinum: luxuryGradients.createPlatinumGradient,
  roseGold: luxuryGradients.createRoseGoldGradient,
  crystal: luxuryGradients.createCrystalGradient,
  velvet: luxuryGradients.createVelvetGradient,

  // Organic gradients
  flowingWater: organicGradients.createFlowingWaterGradient,
  flame: organicGradients.createFlameGradient,
  clouds: organicGradients.createCloudsGradient,
  aurora: organicGradients.createAuroraGradient,
  oceanWaves: organicGradients.createOceanWavesGradient,
  forest: organicGradients.createForestGradient,
  // lightning: organicGradients.createLightningGradient, // Note: conflicts with shape lightning
  mountainMist: organicGradients.createMountainMistGradient,

  // Gaming gradients
  pixelArt: gamingGradients.createPixelArtGradient,
  neonArcade: gamingGradients.createNeonArcadeGradient,
  energyBlast: gamingGradients.createEnergyBlastGradient,
  speedLines: gamingGradients.createSpeedLinesGradient,
  bossBattle: gamingGradients.createBossBattleGradient,
  powerUp: gamingGradients.createPowerUpGradient,
  cyberpunk: gamingGradients.createCyberpunkGradient,
  retroWave: gamingGradients.createRetroWaveGradient,

  // Morphing gradients
  liquidMorphing: morphingGradients.createLiquidMorphingGradient,
  plasmaMorphing: morphingGradients.createPlasmaMorphingGradient,
  cosmicMorphing: morphingGradients.createCosmicMorphingGradient,
  bioMorphing: morphingGradients.createBioMorphingGradient,
  quantumMorphing: morphingGradients.createQuantumMorphingGradient,
  lavaMorphing: morphingGradients.createLavaMorphingGradient,

  // Fluid dynamics gradients
  turbulentWaves: fluidDynamicsGradients.createTurbulentWavesGradient,
  electromagneticWaves: fluidDynamicsGradients.createElectromagneticWavesGradient,
  auroraWaves: fluidDynamicsGradients.createAuroraWavesGradient,
  soundWaves: fluidDynamicsGradients.createSoundWavesGradient,
  cryogenicWaves: fluidDynamicsGradients.createCryogenicWavesGradient,
  solarWaves: fluidDynamicsGradients.createSolarWavesGradient,

  // Dimensional gradients
  portalDistortion: dimensionalGradients.createPortalDistortionGradient,
  hypercubeProjection: dimensionalGradients.createHypercubeProjectionGradient,
  wormholeEffect: dimensionalGradients.createWormholeEffectGradient,
  fractalDimension: dimensionalGradients.createFractalDimensionGradient,
  multiverseOverlap: dimensionalGradients.createMultiverseOverlapGradient,
  realityDistortion: dimensionalGradients.createRealityDistortionGradient,

  // 🌟 NEW: Dimensional Portal gradients (using advanced effect generator)
  quantumTunnel: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'quantumTunnel' }),
  parallelDimension: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'parallelDimension' }),
  wormholePortal: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'wormholeTransit' }),
  dimensionalTear: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'dimensionalRift' }),
  holographicGrid: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'holographicMatrix' }),
  voidDistortion: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'voidChamber' }),
  realityGlitch: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'realityGlitch' }),
  astralPlane: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'astralProjection' }),

  // 🌟 NEW: Digital Life gradients (using advanced effect generator)
  aiConsciousness: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'aiConsciousness' }),
  bioDigitalMerge: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'bioDigitalMerge' }),
  quantumDNA: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'quantumDNA' }),
  digitalEvolution: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'digitalEvolution' }),
  syntheticSoul: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'syntheticSoul' }),
  cyberSymbiosis: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'cyberSymbiosis' }),
  neuralStorm: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'neuralStorm' }),
  digitalGenome: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'digitalGenome' }),

  // 🌟 NEW: Cyber Aesthetics gradients (using advanced effect generator)
  neonCityscape: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'neonGridCity' }),
  dataMatrix: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'dataStreamFlow' }),
  cyberpunkShadow: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'cyberPunkNoir' }),
  holographicUI: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'hologramInterface' }),
  pixelCorruption: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'digitalDecay' }),
  chromeFinish: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'chromeReflection' }),
  viralSpread: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'virusInfection' }),
  encryptionField: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'quantumEncryption' }),
  arOverlay: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'augmentedReality' }),

  // 🌟 NEW: Consciousness Stream gradients (using advanced effect generator)
  thoughtWaves: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'thoughtWaves' }),
  memoryFragments: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'memoryFragments' }),
  dreamLogic: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'dreamLogic' }),
  emotionalSpectrum: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'emotionalSpectrum' }),
  meditativeCalm: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'meditativeCalm' }),
  anxietySpiral: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'anxietySpiral' }),
  egoDissolution: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'egoDissolution' }),
  psychedelicInsight: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'psychedelicInsight' }),
  collectiveUnconscious: (stops, animationConfig, duration) => ({ gradientDef: '', useAdvancedEffect: true, effectType: 'collectiveUnconscious' }),

  // 🌟 NEW: Weather & Atmospheric gradients
  fogRolling: weatherGradients.createFogRollingGradient,
  monsoonRain: weatherGradients.createMonsoonRainGradient,
  snowfallDrift: weatherGradients.createSnowfallDriftGradient,
  sandstormSwirl: weatherGradients.createSandstormSwirlGradient,
  tornadoVortex: weatherGradients.createTornadoVortexGradient,
  lightningWeb: weatherGradients.createLightningWebGradient,
  prismRefraction: weatherGradients.createPrismRefractionGradient,

  // 🌟 NEW: Light & Shadow Play gradients
  causticUnderwater: lightShadowGradients.createCausticUnderwaterGradient,
  venetianBlind: lightShadowGradients.createVenetianBlindGradient,
  stainedGlass: lightShadowGradients.createStainedGlassGradient,
  lensFlare: lightShadowGradients.createLensFlareGradient,
  bokehBlur: lightShadowGradients.createBokehBlurGradient,
  godRays: lightShadowGradients.createGodRaysGradient,
  eclipseCorona: lightShadowGradients.createEclipseCoronaGradient,

  // 🌟 NEW: Art Movement gradients
  artNouveauFlow: artMovementGradients.createArtNouveauFlowGradient,
  artDecoLuxury: artMovementGradients.createArtDecoLuxuryGradient,
  bauhausMinimal: artMovementGradients.createBauhausMinimalGradient,
  impressionistDots: artMovementGradients.createImpressionistDotsGradient,
  cubistFragments: artMovementGradients.createCubistFragmentsGradient,
  surrealistMelt: artMovementGradients.createSurrealistMeltGradient,
  popArtHalftone: artMovementGradients.createPopArtHalftoneGradient,

  // 🌟 NEW: Culinary & Liquid Flow gradients
  coffeeCream: culinaryLiquidGradients.createCoffeeCreamGradient,
  winePour: culinaryLiquidGradients.createWinePourGradient,
  honeyDrizzle: culinaryLiquidGradients.createHoneyDrizzleGradient,
  chocolateMelt: culinaryLiquidGradients.createChocolateMeltGradient,
  caramelSwirl: culinaryLiquidGradients.createCaramelSwirlGradient,
  tieDye: culinaryLiquidGradients.createTieDyeGradient,
  marbleMixing: culinaryLiquidGradients.createMarbleMixingGradient,

  // 🌟 NEW: Pattern-based gradients (inspired by example project)
  candystripe: patternGradients.createCandystripeGradient,
  patternZigzag: patternGradients.createZigzagGradient,
  diamondPattern: patternGradients.createDiamondPatternGradient,
  heartsPattern: patternGradients.createHeartsPatternGradient,
  checkered: patternGradients.createCheckeredGradient,
  diagonalFlow: patternGradients.createDiagonalFlowGradient,
  geometricPulse: patternGradients.createGeometricPulseGradient,
  patternWave: patternGradients.createPatternWaveGradient,

  // 🌟 NEW: Metallic & Shimmer gradients (inspired by example project)
  copperMetallic: metallicGradients.createCopperMetallicGradient,
  shineShimmer: metallicGradients.createShineShimmerGradient,
  neonPulse: metallicGradients.createNeonPulseGradient,
  aquaFlow: metallicGradients.createAquaFlowGradient,
  sparkleEffect: metallicGradients.createSparkleEffectGradient,
  chromeFlow: metallicGradients.createChromeFlowGradient,
  bronzeGleam: metallicGradients.createBronzeGleamGradient,
  platinumSparkle: metallicGradients.createPlatinumSparkleGradient,
  steelAqua: metallicGradients.createSteelAquaGradient
};

/**
 * Create gradient using the appropriate generator
 * @param {string} gradientType - The type of gradient to create
 * @param {string} stops - The SVG gradient stops
 * @param {string} animationConfig - The animation configuration
 * @param {string} animationDuration - The animation duration
 * @param {Array} colorsCopy - Copy of colors array for pattern-based gradients
 * @returns {object} - Gradient configuration object
 */
function createGradient(gradientType, stops, animationConfig, animationDuration, colorsCopy = []) {
  const gradientGenerator = gradientMapping[gradientType];
  
  if (!gradientGenerator) {
    // Fallback to horizontal gradient if type not found
    return basicGradients.createHorizontalGradient(stops, animationConfig);
  }

  // Handle different parameter requirements for different gradient types
  if (gradientType === 'mosaic' || gradientType === 'pixelArt' ||
      gradientType === 'impressionistDots' || gradientType === 'popArtHalftone') {
    return gradientGenerator(stops, animationConfig, animationDuration, colorsCopy);
  }

  // Most gradients require these three parameters
  const result = gradientGenerator(stops, animationConfig, animationDuration);
  
  // 🌟 NEW: Handle advanced effects that need special processing
  if (result && result.useAdvancedEffect) {
    return {
      gradientDef: '',
      additionalElements: '',
      hasClipPath: false,
      clipPathId: null,
      useAdvancedEffect: true,
      effectType: result.effectType
    };
  }
  
  // Handle different return formats
  if (typeof result === 'string') {
    return {
      gradientDef: result,
      additionalElements: '',
      hasClipPath: false,
      clipPathId: null
    };
  }
  
  // If result is an object, ensure all required properties exist
  return {
    gradientDef: result.gradientDef || result,
    additionalElements: result.additionalElements || '',
    hasClipPath: result.hasClipPath || false,
    clipPathId: result.clipPathId || null
  };
}

module.exports = {
  createGradient,
  gradientMapping
}; 