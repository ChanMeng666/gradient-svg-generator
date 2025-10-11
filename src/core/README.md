# Core Architecture Documentation

This directory contains the core refactored architecture for the Gradient SVG Generator. The new system provides a unified, extensible, and maintainable approach to SVG effect generation.

## Overview

The refactored architecture consists of five main components:

1. **Effect Registry** - Central registry for all effects
2. **Base Effect Generator** - Standard interface for generators
3. **Effect Loader** - Auto-loads and registers effects
4. **Filter Library** - Centralized SVG filter definitions
5. **SVG Composer** - Composes complete SVG documents
6. **Unified Gradient Generator** - Main entry point for generation

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        API Endpoint                             │
│                    (src/pages/api/svg.js)                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Unified Gradient Generator                         │
│           (UnifiedGradientGenerator.js)                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Effect Registry                               │  │
│  │         (EffectRegistry.js)                              │  │
│  │                                                          │  │
│  │  - Register effects                                      │  │
│  │  - Map templates to effects                             │  │
│  │  - Store metadata                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                        │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Effect Loader                                    │  │
│  │       (EffectLoader.js)                                  │  │
│  │                                                          │  │
│  │  - Load all effect generators                           │  │
│  │  - Auto-register in registry                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌──────────────────┐              ┌──────────────────┐
│  SVG Composer    │              │ Filter Library   │
│ (SVGComposer.js) │              │(FilterLibrary.js)│
│                  │              │                  │
│ - Compose SVG    │              │ - All filters    │
│ - Add text       │              │ - Filter mapping │
│ - Add animations │              │                  │
└──────────────────┘              └──────────────────┘
```

## Component Details

### 1. Effect Registry (`EffectRegistry.js`)

**Purpose**: Central registry that maintains all available effects and their metadata.

**Key Features**:
- Maps effect names to generators
- Maps templates to effects
- Stores effect metadata (category, filters, description)
- Provides lookup by name or template
- Category-based organization

**Usage Example**:
```javascript
const { effectRegistry } = require('./EffectRegistry');

// Register an effect
effectRegistry.register({
  name: 'myEffect',
  category: 'custom',
  generator: myGeneratorFunction,
  outputType: 'gradient',
  filters: ['myFilter'],
  description: 'My custom effect',
  templates: ['my-template']
});

// Get effect metadata
const metadata = effectRegistry.get('myEffect');

// Get by template name
const sameMetadata = effectRegistry.get('my-template');

// Get all effects in a category
const customEffects = effectRegistry.getByCategory('custom');

// Get statistics
const stats = effectRegistry.getStats();
```

### 2. Base Effect Generator (`BaseEffectGenerator.js`)

**Purpose**: Standard interface that all effect generators should implement.

**Key Methods**:
- `generate(params)` - Generate SVG content
- `getFilters()` - Get required filter definitions
- `getMetadata()` - Get effect metadata
- `validateParams(params)` - Validate input parameters

**Usage Example**:
```javascript
const BaseEffectGenerator = require('./BaseEffectGenerator');

class MyEffectGenerator extends BaseEffectGenerator {
  constructor() {
    super({
      name: 'myEffect',
      category: 'custom',
      outputType: 'complete',
      description: 'My custom effect generator'
    });
  }

  generate(params) {
    this.validateParams(params);
    const { text, colors, width, height, duration } = params;

    // Generate your effect
    const svg = `...`; // Your SVG generation logic

    return {
      svg,
      metadata: this.getMetadata()
    };
  }

  getRequiredFilters() {
    return ['myCustomFilter'];
  }
}
```

### 3. Effect Loader (`EffectLoader.js`)

**Purpose**: Automatically loads all effect generators and registers them in the registry.

**Key Features**:
- Imports all gradient generator modules
- Consolidated template-to-effect mappings
- Automatic registration on initialization
- Categorizes effects by type

**Effect Categories**:
- `basic` - Basic gradients (horizontal, vertical, radial, etc.)
- `shapes` - Shape-based gradients (star, heart, wave, etc.)
- `futureTech` - Future tech effects (hologram, quantum, etc.)
- `artistic` - Artistic effects (watercolor, oil paint, etc.)
- `luxury` - Luxury effects (gold foil, marble, etc.)
- `organic` - Organic nature effects (flame, aurora, etc.)
- `gaming` - Gaming effects (pixel art, neon arcade, etc.)
- `morphing` - Morphing effects (liquid, plasma, etc.)
- `fluidDynamics` - Fluid dynamics effects (turbulent waves, etc.)
- `dimensional` - Dimensional effects (portal, wormhole, etc.)
- `dimensionalPortal` - Dimensional portal effects
- `digitalLife` - Digital life effects (AI consciousness, etc.)
- `cyberAesthetics` - Cyber aesthetics effects (neon grid, etc.)
- `consciousness` - Consciousness stream effects (thought waves, etc.)

### 4. Filter Library (`FilterLibrary.js`)

**Purpose**: Centralized repository of all SVG filter definitions.

**Key Features**:
- All filters defined in one place
- Easy to add new filters
- Automatic filter selection for gradient types
- URL reference generation

**Available Filters**:
- `softLight` - Soft light effect
- `smoothTransition` - Smooth transitions
- `radialBlur` - Radial blur
- `energyEffect` - Energy and turbulence
- `spiralEffect` - Spiral distortion
- `waveEffect` - Wave motion
- `crystalEffect` - Crystal specular lighting
- `reflectionEffect` - Mirror reflection
- `starEffect` - Star glow
- `heartEffect` - Heart color shift
- `zigzagEffect` - Zigzag pattern
- `rippleEffect` - Ripple effect
- `galaxyEffect` - Galaxy turbulence
- `lightningEffect` - Lightning brightness
- `luminanceEffect` - Luminance glow
- `rainbowEffect` - Rainbow saturation
- `textBoxEffect` - Text box border glow
- `glitchEffect` - RGB glitch
- `typewriterEffect` - Typewriter shadow
- `textShadow` - Standard text shadow

**Usage Example**:
```javascript
const { getAllFilters, getFilter, getFilterUrl, getFilterForGradientType } = require('./FilterLibrary');

// Get all filters for <defs>
const allFilters = getAllFilters(120); // height parameter

// Get specific filter
const glitchFilter = getFilter('glitchEffect', 120);

// Get filter URL reference
const filterUrl = getFilterUrl('glitchEffect'); // returns "url(#glitchEffect)"

// Get recommended filter for gradient type
const filterId = getFilterForGradientType('radial'); // returns 'radialBlur'
```

### 5. SVG Composer (`SVGComposer.js`)

**Purpose**: Handles composition of complete SVG documents from components.

**Key Features**:
- Composes gradient-based SVGs
- Composes complete or fragment SVGs
- Creates text elements
- Creates rect elements
- XML escaping
- SVG validation
- SVG minification

**Usage Example**:
```javascript
const { svgComposer } = require('./SVGComposer');

// Compose gradient SVG
const svg = svgComposer.composeGradientSVG({
  text: 'Hello World',
  gradientDef: '...',
  additionalElements: '...',
  clipPath: '',
  gradientType: 'horizontal',
  width: 854,
  height: 120
});

// Compose from fragment
const svg2 = svgComposer.compose({
  content: '<rect .../>',
  contentType: 'fragment',
  width: 854,
  height: 120,
  includeFilters: true
});

// Create text element
const text = svgComposer.createTextElement({
  text: 'Sample',
  x: 427,
  y: 60,
  fontSize: 40,
  fill: '#ffffff',
  animated: true
});
```

### 6. Unified Gradient Generator (`UnifiedGradientGenerator.js`)

**Purpose**: Main entry point that replaces the old `gradientGenerator.js`.

**Key Features**:
- Unified generation pipeline
- Effect registry integration
- Template support
- Automatic fallback to legacy generators
- Backward compatible

**Usage Example**:
```javascript
const { generateGradientSVG } = require('./UnifiedGradientGenerator');

// Generate with template
const svg = generateGradientSVG({
  text: 'Hello World',
  template: 'neon-grid-city'
});

// Generate with gradient type
const svg2 = generateGradientSVG({
  text: 'Custom',
  colors: ['ff0000', '00ff00', '0000ff'],
  height: 120,
  gradientType: 'radial',
  duration: '4s'
});

// Get system stats
const { getSystemStats } = require('./UnifiedGradientGenerator');
const stats = getSystemStats();
console.log(stats);
// {
//   registry: { totalEffects: 140, totalCategories: 14, ... },
//   categories: ['basic', 'shapes', 'futureTech', ...],
//   totalEffects: 140
// }
```

## Migration Guide

### Old System (gradientGenerator.js)
```javascript
const generateGradientSVG = require('./gradientGenerator');

const svg = generateGradientSVG({
  text: 'Hello',
  colors: ['ff0000'],
  height: 120,
  gradientType: 'horizontal',
  duration: '6s'
});
```

### New System (UnifiedGradientGenerator.js)
```javascript
const { generateGradientSVG } = require('./core/UnifiedGradientGenerator');

// Same API! Fully backward compatible
const svg = generateGradientSVG({
  text: 'Hello',
  colors: ['ff0000'],
  height: 120,
  gradientType: 'horizontal',
  duration: '6s'
});
```

## Benefits of New Architecture

### 1. **Unified Logic**
- Single generation pipeline for all effects
- Consistent interface across all generators
- No more duplicate effect type checks

### 2. **Extensibility**
- Add new effects without modifying core files
- Plugin-based architecture (future enhancement)
- Easy to create custom effects

### 3. **Maintainability**
- Clear separation of concerns
- Each component has single responsibility
- Easier to debug and test

### 4. **Type Safety**
- Consistent parameter validation
- Standard error handling
- Predictable return types

### 5. **Performance**
- Effect registry enables caching
- Optimized composition logic
- Reduced code duplication

### 6. **Documentation**
- Self-documenting through metadata
- Clear API contracts
- Better developer experience

## Adding a New Effect

To add a new effect to the system:

1. **Create the generator function**:
```javascript
// In src/utils/gradientGenerators/myCategory.js
function createMyEffect(stops, animationConfig, duration) {
  return `
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
      <!-- Your custom animation -->
    </linearGradient>`;
}

module.exports = {
  createMyEffect
};
```

2. **Register in EffectLoader.js**:
```javascript
// In loadAllEffects() or create a new load function
effectRegistry.register({
  name: 'myEffect',
  category: 'myCategory',
  generator: myGradients.createMyEffect,
  outputType: 'gradient',
  filters: ['smoothTransition'],
  description: 'My custom effect',
  templates: ['my-template-name']
});
```

3. **(Optional) Add custom filter**:
```javascript
// In FilterLibrary.js, add to getAllFilters()
<filter id="myCustomFilter">
  <!-- Your custom filter definition -->
</filter>
```

That's it! Your effect is now available throughout the system.

## Testing

### Manual Testing
```javascript
const { generateGradientSVG, getSystemStats } = require('./core/UnifiedGradientGenerator');

// Test generation
const svg = generateGradientSVG({
  text: 'Test',
  colors: ['ff0000', '00ff00'],
  gradientType: 'myEffect'
});

console.log(svg);

// Check registration
const stats = getSystemStats();
console.log(stats);
```

### Integration Testing
```bash
# Start development server
npm run dev

# Test via API
curl "http://localhost:3000/api/svg?text=Hello&gradientType=myEffect&color0=ff0000"
```

## Future Enhancements

1. **Plugin System** (Phase 3)
   - Dynamic plugin loading
   - Third-party effect plugins
   - Plugin marketplace

2. **Configuration Files** (Phase 6)
   - JSON-based effect definitions
   - External template mappings
   - Dynamic configuration loading

3. **Enhanced Factory** (Phase 5)
   - Effect composition (combine multiple effects)
   - Effect caching for performance
   - Advanced validation

4. **Testing Framework** (Phase 7)
   - Unit tests for each component
   - Integration tests
   - Visual regression testing

## Troubleshooting

### Effect Not Found
```
Error: Effect 'myEffect' not found
```
**Solution**: Ensure the effect is registered in EffectLoader.js

### Invalid Output Type
```
Error: Unknown output type: myType
```
**Solution**: outputType must be 'complete', 'fragment', or 'gradient'

### Filter Not Applied
**Solution**: Check if filter ID exists in FilterLibrary.js and is properly referenced

### Template Not Working
**Solution**: Verify template name is mapped in TEMPLATE_MAPPINGS in EffectLoader.js

## Contact

For questions or issues with the new architecture:
1. Check this documentation
2. Review code comments in each module
3. Check existing effect implementations for examples
4. Raise an issue in the GitHub repository

---

**Last Updated**: 2025-10-11
**Architecture Version**: 2.0
**Maintained By**: ChanMeng666
