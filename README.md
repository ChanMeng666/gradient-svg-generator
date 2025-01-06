<div align="center">
 <h1>🌈 Gradient SVG Generator</h1>
 <img src="https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white"/>
 <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>
 <img src="https://img.shields.io/badge/SVG-%23FFB13B.svg?style=for-the-badge&logo=svg&logoColor=black"/>
</div>

![Progress Pride](https://gradient-svg-generator.vercel.app/?text=Pride&height=200&template=progress-pride)

## Introduction

The Gradient SVG Generator is a powerful tool that creates animated gradient SVGs with customizable text overlays. It's perfect for:
- Creating eye-catching headers for your documentation
- Designing beautiful badges for your GitHub profile
- Generating animated banners for social media
- Adding decorative text elements to your web projects
- Creating inclusive pride-themed graphics

## 📚 Table of Contents

1. [Introduction and Setup](#introduction)
2. [Quick Start Guide](#quick-start-guide)
3. [Configuration Options](#configuration-options)
4. [Basic Templates Collection](#basic-templates-collection)
5. [Pride Flag Templates](#pride-flag-templates-collection)
6. [Custom Examples and Advanced Usage](#custom-examples-and-advanced-usage)
7. [Installation and Development](#installation-and-development-guide)
8. [Contributing Guidelines](#contributing-guidelines)

## Quick Start Guide

### Basic Usage

The simplest way to create a gradient SVG is with a basic text parameter:

```markdown
![Basic Gradient](https://gradient-svg-generator.vercel.app/?text=Hello+World)
```
![Basic Gradient](https://gradient-svg-generator.vercel.app/?text=Hello+World)

### Adding Custom Colors

Specify a custom color using hex codes (without the # symbol):

```markdown
![Custom Color](https://gradient-svg-generator.vercel.app/?text=Custom+Color&color=ff0000)
```
![Custom Color](https://gradient-svg-generator.vercel.app/?text=Custom+Color&color=ff0000)

### Adjusting Height

Customize the height of your gradient (valid range: 30-300 pixels):

```markdown
![Custom Height](https://gradient-svg-generator.vercel.app/?text=Tall+Banner&height=200)
```
![Custom Height](https://gradient-svg-generator.vercel.app/?text=Tall+Banner&height=200)

### Using Templates

Apply pre-designed gradient templates:

```markdown
![Template Example](https://gradient-svg-generator.vercel.app/?text=Sunset&template=sunset-gold)
```
![Template Example](https://gradient-svg-generator.vercel.app/?text=Sunset&template=sunset-gold)

## Configuration Options

All available query parameters for customization:

| Parameter | Description | Default | Valid Range/Options | Example |
|-----------|-------------|---------|-------------------|---------|
| `text` | Display text (required) | - | Any URL-encoded text | `text=Hello+World` |
| `color` | Base color (hex) | `000000` | Any hex color without # | `color=ff0000` |
| `height` | SVG height | `120` | 30-300 pixels | `height=150` |
| `template` | Gradient template | - | See templates list | `template=sunset-gold` |

### Important Usage Notes

1. **Text Encoding**
   - Use URL encoding for spaces (`+` or `%20`)
   - Encode special characters properly
   - Example: "Hello World!" becomes `Hello+World%21`

2. **Color Format**
   - Use hex colors without the # symbol
   - Valid: `ff0000` for red
   - Invalid: `#ff0000` or `red`

3. **Height Constraints**
   - Minimum: 30 pixels
   - Maximum: 300 pixels
   - Recommended for headers: 150-200 pixels
   - Recommended for badges: 30-60 pixels

4. **Template Names**
   - Case-sensitive
   - Cannot be combined with custom colors for pride templates
   - Can be combined with custom heights

# Basic Templates Collection

Our basic templates offer a variety of carefully designed gradient styles and animation effects. Each template has unique characteristics and use cases.

## Available Basic Templates

### 1. Sunset Gold
Perfect for warm, welcoming headers and luxury branding.

```markdown
![Sunset Gold](https://gradient-svg-generator.vercel.app/?text=Sunset&color=ffd700&height=150&template=sunset-gold)
```
![Sunset Gold](https://gradient-svg-generator.vercel.app/?text=Sunset&color=ffd700&height=150&template=sunset-gold)

Features:
- Base color: Gold (#FFD700)
- Gradient: Gold to warm orange
- Animation: Gentle horizontal wave
- Best for: Headers, welcome banners

### 2. Ocean Heart
Ideal for cool, calming effects and water-themed content.

```markdown
![Ocean Heart](https://gradient-svg-generator.vercel.app/?text=Ocean&color=00ffff&height=150&template=ocean-heart)
```
![Ocean Heart](https://gradient-svg-generator.vercel.app/?text=Ocean&color=00ffff&height=150&template=ocean-heart)

Features:
- Base color: Cyan (#00FFFF)
- Gradient: Cyan to deep blue
- Animation: Flowing wave pattern
- Best for: Marine themes, relaxation content

### 3. Emerald Forest
Perfect for nature-themed content and environmental projects.

```markdown
![Emerald Forest](https://gradient-svg-generator.vercel.app/?text=Forest&color=50c878&height=150&template=emerald-forest)
```
![Emerald Forest](https://gradient-svg-generator.vercel.app/?text=Forest&color=50c878&height=150&template=emerald-forest)

Features:
- Base color: Emerald (#50C878)
- Gradient: Light to dark green
- Animation: Vertical wave pattern
- Best for: Nature themes, eco-friendly content

### 4. Violet Dream
Suitable for luxury branding and creative projects.

```markdown
![Violet Dream](https://gradient-svg-generator.vercel.app/?text=Violet&color=9400d3&height=150&template=violet-dream)
```
![Violet Dream](https://gradient-svg-generator.vercel.app/?text=Violet&color=9400d3&height=150&template=violet-dream)

Features:
- Base color: Dark Violet (#9400D3)
- Gradient: Purple to indigo
- Animation: Diagonal wave
- Best for: Creative portfolios, art projects

### 5. Blood Dawn
Dramatic effect for bold statements and warnings.

```markdown
![Blood Dawn](https://gradient-svg-generator.vercel.app/?text=Dawn&color=dc143c&height=150&template=blood-dawn)
```
![Blood Dawn](https://gradient-svg-generator.vercel.app/?text=Dawn&color=dc143c&height=150&template=blood-dawn)

Features:
- Base color: Crimson (#DC143C)
- Gradient: Bright to dark red
- Animation: Radial pulse
- Best for: Warnings, important notices

### 6. Aurora
Captures the ethereal quality of northern lights.

```markdown
![Aurora](https://gradient-svg-generator.vercel.app/?text=Aurora&color=00ff7f&height=150&template=aurora)
```
![Aurora](https://gradient-svg-generator.vercel.app/?text=Aurora&color=00ff7f&height=150&template=aurora)

Features:
- Base color: Spring Green (#00FF7F)
- Gradient: Green to blue with shimmer
- Animation: Wave-like aurora effect
- Best for: Nature themes, atmospheric content

### 7. Cyberpunk
Perfect for tech-themed content and futuristic designs.

```markdown
![Cyberpunk](https://gradient-svg-generator.vercel.app/?text=Cyber&color=ff00ff&height=150&template=cyberpunk)
```
![Cyberpunk](https://gradient-svg-generator.vercel.app/?text=Cyber&color=ff00ff&height=150&template=cyberpunk)

Features:
- Base color: Magenta (#FF00FF)
- Gradient: Magenta to cyan with rainbow
- Animation: Electric pulse effect
- Best for: Tech content, gaming themes

### 8. Neon City
Ideal for vibrant, urban-themed content.

```markdown
![Neon City](https://gradient-svg-generator.vercel.app/?text=Neon&color=ff1493&height=150&template=neon-city)
```
![Neon City](https://gradient-svg-generator.vercel.app/?text=Neon&color=ff1493&height=150&template=neon-city)

Features:
- Base color: Deep Pink (#FF1493)
- Gradient: Pink to magenta with glow
- Animation: Neon flicker effect
- Best for: Urban themes, night life content

### 9. Electric Beat
Perfect for music and energy-themed content.

```markdown
![Electric Beat](https://gradient-svg-generator.vercel.app/?text=Electric&color=00ff00&height=150&template=electric-beat)
```
![Electric Beat](https://gradient-svg-generator.vercel.app/?text=Electric&color=00ff00&height=150&template=electric-beat)

Features:
- Base color: Lime (#00FF00)
- Gradient: Green to cyan with pulse
- Animation: Dynamic beat pattern
- Best for: Music content, energy themes

## Template Usage Tips

1. **Choosing the Right Template**
   - Consider your content theme
   - Match the mood of your project
   - Think about your target audience
   - Consider the platform where it will be displayed

2. **Customization Options**
   ```markdown
   # Basic usage
   ![Template](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=template-name)
   ```
   ![Template](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=template-name)
   
   ```markdown
   # With custom height
   ![Template](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=template-name&height=200)
   ```
   ![Template](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=template-name&height=200)
   
   ```markdown
   # With custom color (except pride templates)
   ![Template](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=template-name&color=ff0000)
   ```
   ![Template](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=template-name&color=ff0000)

3. **Best Practices**
   - Use shorter text for better readability
   - Test different heights for optimal display
   - Consider contrast with your background
   - Match template style with your content theme

4. **Common Applications**
   - Documentation headers
   - GitHub profile decorations
   - Project banners
   - Social media content
   - Website section headers

# Pride Flag Templates Collection

Our pride flag templates accurately represent various pride flags with beautiful gradient animations. Each template maintains the authentic colors and symbolism of its respective flag while adding subtle animated effects.

## Pride Flag Templates Guide

### 1. Rainbow Pride
The traditional six-color pride flag representing the LGBTQ+ community.

```markdown
![Pride Rainbow](https://gradient-svg-generator.vercel.app/?text=Pride&height=150&template=pride-rainbow)
```
![Pride Rainbow](https://gradient-svg-generator.vercel.app/?text=Pride&height=150&template=pride-rainbow)

Specifications:
- Colors: Red, orange, yellow, green, blue, and violet
- Animation: Horizontal rainbow wave
- Best for: General pride content, LGBTQ+ community events

### 2. Trans Pride
Representing the transgender community with its distinctive colors.

```markdown
![Trans Pride](https://gradient-svg-generator.vercel.app/?text=Trans&height=150&template=trans-pride)
```
![Trans Pride](https://gradient-svg-generator.vercel.app/?text=Trans&height=150&template=trans-pride)

Specifications:
- Colors: Light blue, pink, and white
- Animation: Gentle horizontal flow
- Best for: Trans visibility content, trans rights advocacy

### 3. Bi Pride
Representing the bisexual community with its signature gradient.

```markdown
![Bi Pride](https://gradient-svg-generator.vercel.app/?text=Bi&height=150&template=bi-pride)
```
![Bi Pride](https://gradient-svg-generator.vercel.app/?text=Bi&height=150&template=bi-pride)

Specifications:
- Colors: Pink, purple, and blue
- Animation: Smooth tri-color transition
- Best for: Bisexual visibility content

### 4. Ace Pride
Representing the asexual community with its distinctive stripes.

```markdown
![Ace Pride](https://gradient-svg-generator.vercel.app/?text=Ace&height=150&template=ace-pride)
```
![Ace Pride](https://gradient-svg-generator.vercel.app/?text=Ace&height=150&template=ace-pride)

Specifications:
- Colors: Black, gray, white, and purple
- Animation: Vertical wave pattern
- Best for: Asexual visibility content

### 5. Pan Pride
Representing the pansexual community with vibrant colors.

```markdown
![Pan Pride](https://gradient-svg-generator.vercel.app/?text=Pan&height=150&template=pan-pride)
```
![Pan Pride](https://gradient-svg-generator.vercel.app/?text=Pan&height=150&template=pan-pride)

Specifications:
- Colors: Pink, yellow, and blue
- Animation: Horizontal tri-color flow
- Best for: Pansexual visibility content

### 6. Nonbinary Pride
Representing the nonbinary community with its unique color scheme.

```markdown
![Nonbinary Pride](https://gradient-svg-generator.vercel.app/?text=Nonbinary&height=150&template=nonbinary-pride)
```
![Nonbinary Pride](https://gradient-svg-generator.vercel.app/?text=Nonbinary&height=150&template=nonbinary-pride)

Specifications:
- Colors: Yellow, white, purple, and black
- Animation: Gentle quad-color transition
- Best for: Nonbinary visibility content

### 7. Genderqueer Pride
Representing the genderqueer community with distinctive colors.

```markdown
![Genderqueer Pride](https://gradient-svg-generator.vercel.app/?text=Genderqueer&height=150&template=genderqueer-pride)
```
![Genderqueer Pride](https://gradient-svg-generator.vercel.app/?text=Genderqueer&height=150&template=genderqueer-pride)

Specifications:
- Colors: Lavender, white, and green
- Animation: Tri-color wave pattern
- Best for: Genderqueer visibility content

### 8. Lesbian Pride
Modern lesbian flag representation with its warm color palette.

```markdown
![Lesbian Pride](https://gradient-svg-generator.vercel.app/?text=Lesbian&height=150&template=lesbian-pride)
```
![Lesbian Pride](https://gradient-svg-generator.vercel.app/?text=Lesbian&height=150&template=lesbian-pride)

Specifications:
- Colors: Shades of orange, white, and pink
- Animation: Smooth gradient flow
- Best for: Lesbian visibility content

### 9. Intersex Pride
Representing the intersex community with its unique design.

```markdown
![Intersex Pride](https://gradient-svg-generator.vercel.app/?text=Intersex&height=150&template=intersex-pride)
```
![Intersex Pride](https://gradient-svg-generator.vercel.app/?text=Intersex&height=150&template=intersex-pride)

Specifications:
- Colors: Yellow and purple
- Animation: Circular pulse effect
- Best for: Intersex visibility content

### 10. Genderfluid Pride
Representing gender fluidity with its multi-color design.

```markdown
![Genderfluid Pride](https://gradient-svg-generator.vercel.app/?text=Genderfluid&height=150&template=genderfluid-pride)
```
![Genderfluid Pride](https://gradient-svg-generator.vercel.app/?text=Genderfluid&height=150&template=genderfluid-pride)

Specifications:
- Colors: Pink, white, purple, black, and blue
- Animation: Flowing transition effect
- Best for: Genderfluid visibility content

### 11. Agender Pride
Representing the agender community with its striped design.

```markdown
![Agender Pride](https://gradient-svg-generator.vercel.app/?text=Agender&height=150&template=agender-pride)
```
![Agender Pride](https://gradient-svg-generator.vercel.app/?text=Agender&height=150&template=agender-pride)

Specifications:
- Colors: Black, gray, white, and green
- Animation: Horizontal stripe flow
- Best for: Agender visibility content

### 12. Aromantic Pride
Representing the aromantic community with its green palette.

```markdown
![Aromantic Pride](https://gradient-svg-generator.vercel.app/?text=Aromantic&height=150&template=aromantic-pride)
```
![Aromantic Pride](https://gradient-svg-generator.vercel.app/?text=Aromantic&height=150&template=aromantic-pride)

Specifications:
- Colors: Green, light green, white, gray, and black
- Animation: Vertical wave pattern
- Best for: Aromantic visibility content

### 13. Progress Pride
Modern inclusive design incorporating additional representative stripes.

```markdown
![Progress Pride](https://gradient-svg-generator.vercel.app/?text=Progress&height=150&template=progress-pride)
```
![Progress Pride](https://gradient-svg-generator.vercel.app/?text=Progress&height=150&template=progress-pride)

Specifications:
- Colors: Traditional rainbow plus black, brown, pink, light blue, and white
- Animation: Dynamic chevron pattern
- Best for: Inclusive pride representation

## Usage Guidelines for Pride Templates

1. **Important Notes**
   - Pride templates use fixed colors to maintain flag accuracy
   - The `color` parameter is ignored for pride templates
   - Height can be customized while maintaining proportions

2. **Recommended Applications**
   ```markdown
   # Standard usage
   ![Pride](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=pride-template-name)
   ```
   ![Pride](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=pride-template-name)
   
   ```markdown
   # With custom height
   ![Pride](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=pride-template-name&height=200)
   ```
   ![Pride](https://gradient-svg-generator.vercel.app/?text=Your+Text&template=pride-template-name&height=200)

3. **Best Practices**
   - Respect the significance of each flag
   - Use appropriate and inclusive language in text
   - Consider the context of usage
   - Maintain flag color accuracy

4. **Common Use Cases**
   - Pride event banners
   - Community resources
   - Educational materials
   - Social media content
   - Visibility campaigns

# Custom Examples and Advanced Usage

This section demonstrates advanced customization options and creative ways to implement the Gradient SVG Generator in various projects.

## Custom Styling Examples

### 1. Color Customization
Create gradients with any hex color code:

```markdown
# Vibrant Red
![Custom Red](https://gradient-svg-generator.vercel.app/?text=Custom%20Red&color=ff0000&height=150)
```
![Custom Red](https://gradient-svg-generator.vercel.app/?text=Custom%20Red&color=ff0000&height=150)

```markdown
# Deep Blue
![Custom Blue](https://gradient-svg-generator.vercel.app/?text=Custom%20Blue&color=0000ff&height=150)
```
![Custom Blue](https://gradient-svg-generator.vercel.app/?text=Custom%20Blue&color=0000ff&height=150)

```markdown
# Emerald Green
![Custom Green](https://gradient-svg-generator.vercel.app/?text=Custom%20Green&color=00ff00&height=150)
```
![Custom Green](https://gradient-svg-generator.vercel.app/?text=Custom%20Green&color=00ff00&height=150)

### 2. Height Variations
Adjust the height to create different banner sizes:

```markdown
# Tall Banner (200px)
![Tall](https://gradient-svg-generator.vercel.app/?text=Tall%20Banner&color=800080&height=200)
```
![Tall](https://gradient-svg-generator.vercel.app/?text=Tall%20Banner&color=800080&height=200)

```markdown
# Standard Banner (150px)
![Standard](https://gradient-svg-generator.vercel.app/?text=Standard&color=4b0082&height=150)
```
![Standard](https://gradient-svg-generator.vercel.app/?text=Standard&color=4b0082&height=150)

```markdown
# Compact Badge (40px)
![Compact](https://gradient-svg-generator.vercel.app/?text=Badge&color=ffa500&height=40)
```
![Compact](https://gradient-svg-generator.vercel.app/?text=Badge&color=ffa500&height=40)

### 3. Long Text Handling
The generator automatically adjusts text size for longer phrases:

```markdown
# Long Title
![Long Text](https://gradient-svg-generator.vercel.app/?text=This%20is%20a%20very%20long%20text%20example&color=4b0082&height=150)
```
![Long Text](https://gradient-svg-generator.vercel.app/?text=This%20is%20a%20very%20long%20text%20example&color=4b0082&height=150)

```markdown
# Multi-word Title
![Multi Word](https://gradient-svg-generator.vercel.app/?text=Welcome%20to%20My%20Amazing%20Project&color=ff1493&height=150)
```
![Multi Word](https://gradient-svg-generator.vercel.app/?text=Welcome%20to%20My%20Amazing%20Project&color=ff1493&height=150)

## Advanced Implementation Examples

### 1. GitHub Profile Enhancement

#### Profile Header
```markdown
<div align="center">
  ![Profile Header](https://gradient-svg-generator.vercel.app/?text=Welcome%20to%20My%20Profile&template=aurora&height=200)
</div>
```
![Profile Header](https://gradient-svg-generator.vercel.app/?text=Welcome%20to%20My%20Profile&template=aurora&height=200)

#### Section Headers
```markdown
## ![Projects](https://gradient-svg-generator.vercel.app/?text=Projects&template=neon-city&height=60)
## ![Skills](https://gradient-svg-generator.vercel.app/?text=Skills&template=ocean-heart&height=60)
## ![Contact](https://gradient-svg-generator.vercel.app/?text=Contact&template=sunset-gold&height=60)
```
## ![Projects](https://gradient-svg-generator.vercel.app/?text=Projects&template=neon-city&height=60)

## ![Skills](https://gradient-svg-generator.vercel.app/?text=Skills&template=ocean-heart&height=60)

## ![Contact](https://gradient-svg-generator.vercel.app/?text=Contact&template=sunset-gold&height=60)

#### Interactive Badges
```markdown
[![GitHub](https://gradient-svg-generator.vercel.app/?text=Follow%20on%20GitHub&template=cyberpunk&height=40)](https://github.com/yourusername)
[![LinkedIn](https://gradient-svg-generator.vercel.app/?text=Connect%20on%20LinkedIn&template=ocean-heart&height=40)](https://linkedin.com/in/yourusername)
```
[![GitHub](https://gradient-svg-generator.vercel.app/?text=Follow%20on%20GitHub&template=cyberpunk&height=40)](https://github.com/yourusername)

[![LinkedIn](https://gradient-svg-generator.vercel.app/?text=Connect%20on%20LinkedIn&template=ocean-heart&height=40)](https://linkedin.com/in/yourusername)

### 2. Documentation Enhancement

#### Chapter Headers
```markdown
# ![Introduction](https://gradient-svg-generator.vercel.app/?text=Introduction&template=sunset-gold&height=100)
# ![Getting Started](https://gradient-svg-generator.vercel.app/?text=Getting%20Started&template=emerald-forest&height=100)
# ![Advanced Topics](https://gradient-svg-generator.vercel.app/?text=Advanced%20Topics&template=violet-dream&height=100)
```
# ![Introduction](https://gradient-svg-generator.vercel.app/?text=Introduction&template=sunset-gold&height=100)
# ![Getting Started](https://gradient-svg-generator.vercel.app/?text=Getting%20Started&template=emerald-forest&height=100)
# ![Advanced Topics](https://gradient-svg-generator.vercel.app/?text=Advanced%20Topics&template=violet-dream&height=100)

#### Feature Highlights
```markdown
### ![New Feature](https://gradient-svg-generator.vercel.app/?text=New%20Feature&template=electric-beat&height=50)
### ![Important Note](https://gradient-svg-generator.vercel.app/?text=Important%20Note&template=blood-dawn&height=50)
```
### ![New Feature](https://gradient-svg-generator.vercel.app/?text=New%20Feature&template=electric-beat&height=50)
### ![Important Note](https://gradient-svg-generator.vercel.app/?text=Important%20Note&template=blood-dawn&height=50)

### 3. Web Content Integration

#### Blog Post Headers
```html
<article>
  <img src="https://gradient-svg-generator.vercel.app/?text=Blog%20Title&template=aurora&height=180" alt="Blog Title">
  <p>Your blog content here...</p>
</article>
```
<article>
  <img src="https://gradient-svg-generator.vercel.app/?text=Blog%20Title&template=aurora&height=180" alt="Blog Title">
  <p>Your blog content here...</p>
</article>

#### Section Dividers
```html
<div class="section-break">
  <img src="https://gradient-svg-generator.vercel.app/?text=•••&template=ocean-heart&height=60" alt="Section Break">
</div>
```
<div class="section-break">
  <img src="https://gradient-svg-generator.vercel.app/?text=•••&template=ocean-heart&height=60" alt="Section Break">
</div>

## Creative Use Cases

### 1. Social Media Content

#### Twitter Header
```markdown
![Twitter Banner](https://gradient-svg-generator.vercel.app/?text=Your%20Tagline%20Here&template=aurora&height=300)
```
![Twitter Banner](https://gradient-svg-generator.vercel.app/?text=Your%20Tagline%20Here&template=aurora&height=300)

#### Instagram Story Highlights
```markdown
![Story Highlight](https://gradient-svg-generator.vercel.app/?text=Featured&template=neon-city&height=100)
```
![Story Highlight](https://gradient-svg-generator.vercel.app/?text=Featured&template=neon-city&height=100)

### 2. Presentation Slides

#### Slide Headers
```markdown
![Slide Title](https://gradient-svg-generator.vercel.app/?text=Your%20Presentation%20Title&template=sunset-gold&height=150)
```
![Slide Title](https://gradient-svg-generator.vercel.app/?text=Your%20Presentation%20Title&template=sunset-gold&height=150)

#### Section Breaks
```markdown
![Section Break](https://gradient-svg-generator.vercel.app/?text=Next%20Topic&template=violet-dream&height=100)
```
![Section Break](https://gradient-svg-generator.vercel.app/?text=Next%20Topic&template=violet-dream&height=100)

## Usage Tips and Best Practices

1. **Text Optimization**
   - Keep text concise for better readability
   - Use URL encoding for spaces and special characters
   - Consider text length when choosing banner height

2. **Color Selection**
   - Use brand colors for consistent styling
   - Ensure good contrast with background
   - Test different color combinations

3. **Layout Considerations**
   - Match banner width to content width
   - Use appropriate heights for different contexts
   - Consider mobile responsiveness

4. **Performance Tips**
   - Cache generated SVGs when possible
   - Preload important banners
   - Use appropriate image sizes

# Installation and Development Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)
- Git

## Installation Steps

### 1. Clone the Repository
```bash
# Using HTTPS
git clone https://github.com/ChanMeng666/gradient-svg-generator.git

# Using SSH
git clone git@github.com:ChanMeng666/gradient-svg-generator.git

# Navigate to project directory
cd gradient-svg-generator
```

### 2. Install Dependencies
```bash
# Using npm
npm install
```

### 3. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your settings
nano .env
```

### 4. Start Development Server
```bash
# Start with npm
npm start
```

## Project Structure

```
gradient-svg-generator/
├── node_modules/
├── src/
│   ├── config/
│   │   └── gradientConfig.js
│   ├── templates/
│   │   ├── basicTemplates.js
│   │   └── prideTemplates.js
│   ├── utils/
│   │   ├── colorUtils.js
│   │   └── svgUtils.js
│   ├── gradientGenerator.js
│   └── index.js
├── .gitattributes
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── server.js
└── vercel.json
```

## Contributing Guidelines

### 1. Setting Up for Development

```bash
# Create new branch
git checkout -b feature/your-feature-name

# Keep branch updated
git pull origin main
git rebase main
```

### 2. Making Changes

1. **Adding New Templates**
```typescript
// src/components/templates/basic/NewTemplate.tsx
export const NewTemplate: TemplateComponent = {
  name: 'new-template',
  gradient: {
    colors: ['#start-color', '#end-color'],
    animation: 'animation-type'
  }
};
```

2. **Modifying Existing Templates**
- Update gradient properties
- Test with different text lengths
- Verify animation performance
- Check accessibility

3. **Adding New Features**
- Create feature branch
- Write tests first
- Implement feature
- Update documentation

### 3. Quality Assurance

```bash
# Run all checks
npm run verify

# Check types
npm run type-check

# Run tests
npm run test

# Check formatting
npm run format:check
```

### 4. Submitting Changes

1. **Prepare Commit**
```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new gradient template"
```

2. **Push Changes**
```bash
git push origin feature/your-feature-name
```

3. **Create Pull Request**
- Use PR template
- Add screenshots/videos
- Update documentation
- Request review

## Support and Troubleshooting

### Common Issues

1. **Installation Problems**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall dependencies
npm install
```

2. **Build Issues**
```bash
# Clear build cache
npm run clean

# Rebuild
npm run build
```

### Getting Help

- Create an issue on GitHub
- Join our Discord community
- Check documentation
- Contact maintainers

## License and Legal

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2024 Chan Meng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software...
```

## Contact and Support

### Connect with the Team
- GitHub: [@ChanMeng666](https://github.com/ChanMeng666)
- LinkedIn: [Chan Meng](https://www.linkedin.com/in/chanmeng666/)
- Website: [https://chanmeng.live/](https://chanmeng.live/)

### Support the Project
- Star on GitHub
- Report issues
- Submit PRs
- Share with others

---

<div align="center">
Made with ❤️ by Chan Meng
</br>
⭐ Star us on GitHub | 🐛 Report an Issue | 🤝 Contribute
</div>