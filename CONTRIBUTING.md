# Contributing to Gradient SVG Generator

Thank you for your interest in contributing! This guide explains how to get involved with this
Node.js / Next.js service for generating animated gradient SVGs.

## How to Contribute

### Reporting Bugs

If you find a bug, please [open an issue](https://github.com/ChanMeng666/gradient-svg-generator/issues/new) with:

- The SVG parameters or API request you used
- Steps to reproduce the problem
- Expected vs. actual output (a screenshot or the generated SVG helps)
- Your Node.js version and operating system

### Suggesting Features

Have an idea for a new gradient type, animation effect, or template? [Open a feature request](https://github.com/ChanMeng666/gradient-svg-generator/issues/new) describing the use case and your proposed solution.

### Submitting Changes

1. **Fork** the repository and **clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/gradient-svg-generator.git
   cd gradient-svg-generator
   ```
2. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Install dependencies** (Node.js >= 20):
   ```bash
   npm install
   ```
4. **Make your changes** and verify locally (see Development Setup below).
5. **Commit** with a clear message following [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: add radial gradient template"
   ```
6. **Push** and open a Pull Request against the `main` branch.

## Development Setup

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Add a new effect via the generator script
npm run create:effect
```

## Quality Checks

Please make sure these pass before opening a PR:

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript type checking
npm run format      # Prettier (auto-format)
npm test            # Vitest test suite
```

A Husky pre-commit hook runs automatically; please don't bypass it.

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). For questions or
support, see [SUPPORT.md](SUPPORT.md). For security issues, see [SECURITY.md](SECURITY.md).
