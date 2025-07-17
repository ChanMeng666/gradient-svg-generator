# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gradient SVG Generator is a Next.js application that creates animated SVG gradients with customizable text overlays. It features 180+ templates across 13 categories and supports 50+ gradient types with advanced visual effects.

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
4. **Effect Generators**: Individual generators in `src/utils/gradientGenerators/`
5. **Advanced Effects**: `src/utils/advancedEffectGenerator.js` for special effects

### Template System
- Templates are organized by category in `src/templates/`
- Each category file exports an array of template objects
- Template structure: `{ name, displayName, colors, animation, category }`
- All templates are registered in `src/config/gradientConfig.js`

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
- **Components**: React components in `src/components/`
- **Styles**: CSS Modules in `src/styles/` (match component names)
- **Utils**: Utility functions in `src/utils/`

### Important Patterns
- Use CSS Modules for component styling
- SVG generation is server-side only (no client-side SVG generation)
- Color utilities are in `src/utils/colorUtils.js`
- Animation timing uses CSS variables for consistency
- Filter effects use SVG `<defs>` with unique IDs to avoid conflicts

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