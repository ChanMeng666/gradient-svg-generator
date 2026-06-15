# Support

## Getting Help

If you need help with Gradient SVG Generator, here are the available channels:

- **GitHub Discussions**: for general questions, ideas, and showcasing what you built, visit the [Discussions](https://github.com/ChanMeng666/gradient-svg-generator/discussions) tab.
- **GitHub Issues**: for bug reports and feature requests, [open an issue](https://github.com/ChanMeng666/gradient-svg-generator/issues).

## Common Questions

**My SVG isn't animating**
- Make sure you're viewing the SVG in a context that renders SMIL/CSS animation (most browsers do; some Markdown renderers and image previewers strip animation).
- GitHub READMEs render animated SVGs when embedded as an `<img>` pointing at the live endpoint.

**The text is clipped or off-center**
- Adjust the width/height and font-size parameters; very long text needs a wider canvas.

**Local dev server won't start**
- Ensure Node.js >= 20 (`node -v`) and run `npm install` before `npm run dev`.

## Scope of Support

This is an open-source project maintained on a volunteer basis. We do our best to respond, but
cannot guarantee response times. Please be patient and respectful.

## Security Issues

For security-related concerns, **do not open a public issue**. Follow the process in
[SECURITY.md](SECURITY.md).
