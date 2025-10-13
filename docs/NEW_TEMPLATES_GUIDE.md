# New Templates Usage Guide

## Quick Access

All 9 new SVG animation templates are now available on both `/create` and `/templates` pages!

## Access Methods

### 1. Via /create Page
1. Open `http://localhost:3000/create`
2. Click the sidebar menu (☰ icon on mobile)
3. Browse by category or search by name
4. Click any template to apply it instantly

### 2. Via /templates Page
1. Open `http://localhost:3000/templates`
2. Use category tabs to filter templates:
   - **Animation** 🎬 - 6 new templates
   - **Text Effects** ✨ - 2 new templates
   - **Nature** 🌿 - 1 new template
3. Click "Use Template" to open in editor
4. Click "Preview" for a larger view

### 3. Via Direct API
Use this URL pattern:
```
http://localhost:3000/api/svg?text=YOUR_TEXT&template=TEMPLATE_NAME&height=150
```

## New Templates Reference

| Template Name | Category | Effect | Duration |
|---------------|----------|--------|----------|
| cyber-glitch-enhanced | Animation | RGB chromatic aberration | 3s |
| data-corruption-pro | Animation | Advanced glitch | 3s |
| border-reveal | Animation | Border drawing | 2.5s |
| terminal-frame | Animation | Terminal frame | 2.5s |
| rainbow-wave-cascade | Animation | 7-layer waves | 1.5s |
| hacker-terminal-pro | Animation | Typewriter | 4s |
| luminance-reveal | Text Effects | Background-clip reveal | 4s |
| aurora-luminance | Text Effects | Aurora glow | 4s |
| ocean-layers | Nature | Ocean waves | 1.5s |

## Example API Calls

```bash
# Cyber Glitch
http://localhost:3000/api/svg?text=CYBER&template=cyber-glitch-enhanced&height=150

# Luminance Reveal
http://localhost:3000/api/svg?text=GLOW&template=luminance-reveal&height=150

# Ocean Layers
http://localhost:3000/api/svg?text=WAVE&template=ocean-layers&height=150

# Rainbow Cascade
http://localhost:3000/api/svg?text=COLOR&template=rainbow-wave-cascade&height=150

# Hacker Terminal
http://localhost:3000/api/svg?text=HACK&template=hacker-terminal-pro&height=150
```

## Search Tips

In the `/templates` page, you can search by:
- Template name (e.g., "cyber", "luminance", "ocean")
- Category name (e.g., "animation", "nature")
- Effect type (e.g., "glitch", "wave", "terminal")

## Categories

The new templates are distributed across 3 categories:

### 🎬 Animation (6 templates)
- cyber-glitch-enhanced
- data-corruption-pro
- border-reveal
- terminal-frame
- rainbow-wave-cascade
- hacker-terminal-pro

### ✨ Text Effects (2 templates)
- luminance-reveal
- aurora-luminance

### 🌿 Nature (1 template)
- ocean-layers

## Features

All new templates use advanced CSS animations:
- ✨ Smooth keyframe animations
- 🎨 Multiple color layers
- 🌊 Cascading effects
- 💫 Glowing and blur effects
- 🎭 Chromatic aberration
- ✏️ Drawing animations

---

**Note**: Make sure the development server is running (`npm run dev`) to access the templates.

*Last updated: 2025-01-13*
