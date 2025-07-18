# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gradient SVG Generator is a Next.js 13 application that creates animated SVG gradients with customizable text overlays. It features 180+ templates across 22 categories and supports 140+ gradient types with advanced visual effects.

### Tech Stack
- **Frontend**: React 18.2 with Next.js 13
- **UI Framework**: Tailwind CSS with CSS Modules
- **Animation**: Framer Motion for UI animations, CSS animations for SVG effects
- **State Management**: Zustand with persistence
- **Build Tools**: Webpack, PostCSS

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Key Architecture Points

### API Endpoint
The main API is at `/api/svg` (src/pages/api/svg.js) which accepts query parameters:
- `text`: Display text (required)
- `height`: 30-300px (default: 120)
- `template`: Template name
- `gradientType`: Gradient type
- `duration`: Animation duration
- `color0`, `color1`, etc.: Hex colors without #

### Core Generation Flow
1. **Entry Point**: `src/pages/api/svg.js` handles HTTP requests
2. **Main Orchestrator**: `src/gradientGenerator.js` coordinates generation
3. **Factory Pattern**: `src/utils/gradientFactory.js` creates gradient instances
4. **Effect Generators**: Multiple generator categories in `src/utils/gradientGenerators/`:
   - Basic gradients (horizontal, vertical, diagonal, radial)
   - Shape-based gradients (star, heart, lightning, diamond)
   - Artistic effects (watercolor, oil paint, graffiti)
   - Future tech effects (hologram, quantum, neural net)
   - Gaming effects (pixel art, neon arcade, cyberpunk)
   - Organic effects (aurora, flame, flowing water)
   - Experimental effects (morphing, dimensional, consciousness stream)
5. **Advanced Effects**: Specialized generators for complex visual effects

### Template System
- Templates are organized by category in `src/templates/` (22 categories total)
- Each category file exports an array of template objects
- Template structure: `{ name, label, colors, gradientType, animationDuration, description }`
- All templates are auto-registered via the config system
- Categories include: Basic, Nature, Tech, Artistic, Gaming, Luxury, Experimental, and more

### Adding New Features

**New Gradient Type**:
1. Create generator in `src/utils/gradientGenerators/`
2. Register in `src/utils/gradientFactory.js`
3. Add to `GRADIENT_TYPES` in `src/config/gradientConfig.js`

**New Template**:
1. Add to appropriate category file in `src/templates/`
2. Include in category export
3. Templates auto-register via the config system

**New Effect**:
1. Check if it belongs in `advancedEffectGenerator.js` or needs its own generator
2. Follow existing patterns for SVG structure and animations
3. Test with different text lengths and colors

### Component Structure
- **Pages**: Next.js pages in `src/pages/`
  - `/` - Home page with quick access and recent templates
  - `/create` - Advanced creation interface with real-time preview
  - `/templates` - Template gallery with search and filters
  - `/settings` - User preferences and configuration
- **Components**: React components in `src/components/`
  - `SwipeableTemplateCarousel` - Mobile-friendly template browsing
  - `VirtualizedTemplateGrid` - Performance-optimized template grid
  - `PropertiesPanel` - Desktop configuration panel
  - `MobilePropertiesPanel` - Mobile configuration panel
  - `ColorPicker` - Color selection component
  - `TemplatePreviewModal` - Template preview overlay
- **Styles**: CSS Modules in `src/styles/` (match component names) + Tailwind CSS
- **Utils**: Utility functions in `src/utils/`
- **Store**: Zustand store in `src/store/` for state management

### Important Patterns
- Use CSS Modules for component-specific styling, Tailwind for utility classes
- SVG generation is server-side only (no client-side SVG generation)
- Color utilities are in `src/utils/colorUtils.js`
- Animation timing uses CSS variables for consistency
- Filter effects use SVG `<defs>` with unique IDs to avoid conflicts
- State management uses Zustand with persistence for favorites and recent templates
- Mobile-first responsive design with dedicated mobile components
- Dynamic imports for heavy components to improve performance
- Virtualization for large lists to optimize rendering

### Testing Approach
Currently no automated tests. When testing changes:
1. Test with various text lengths (short, medium, long)
2. Test all color combinations in templates
3. Verify animations work smoothly
4. Check SVG validity (well-formed XML)
5. Test API endpoint with different parameter combinations

## Development Guidelines

### Language Requirements
- **All text content in pages and components must be in English**
- No Chinese characters should appear in any user-facing content
- This includes UI labels, error messages, placeholders, and documentation

### Git Workflow
- Use **Conventional Commits** format for all commits:
  - `feat:` New features
  - `fix:` Bug fixes
  - `docs:` Documentation changes
  - `style:` Code style changes (formatting, semicolons, etc.)
  - `refactor:` Code refactoring
  - `test:` Adding or updating tests
  - `chore:` Maintenance tasks
- GitHub CLI is available for GitHub operations

### Testing Requirements
- Create functional tests for each feature implementation
- Test thoroughly after each small milestone
- Ensure steady project progress through comprehensive testing
- Test both positive and negative scenarios
- Verify edge cases and error handling

## Current Feature Set

### Gradient Types (140+ types)
The system supports an extensive array of gradient types organized into categories:
- **Basic**: Horizontal, vertical, diagonal, radial, conical
- **Shapes**: Star, heart, lightning, diamond, hexagon
- **Artistic**: Watercolor, oil paint, graffiti, brush strokes
- **Tech**: Hologram, quantum, neural network, matrix
- **Gaming**: Pixel art, neon arcade, cyberpunk, retro wave
- **Organic**: Aurora, flame, flowing water, crystal growth
- **Experimental**: Morphing effects, dimensional portals, consciousness streams

### User Features
- **Template System**: 180+ pre-designed templates across 22 categories
- **Custom Mode**: Full control over colors, gradient type, and animation
- **Favorites**: Save favorite templates for quick access
- **Recent History**: Track recently used templates
- **Real-time Preview**: See changes instantly in create mode
- **Responsive Design**: Optimized for desktop and mobile devices
- **Export Options**: Download generated SVGs directly