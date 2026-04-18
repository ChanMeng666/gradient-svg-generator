import type { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'node:crypto';

// UnifiedGradientGenerator is CommonJS with loose JSDoc types that don't cover
// every param the function actually accepts at runtime (animation, stroke, etc.).
// Wrap it in a widened signature so the handler doesn't fight the existing shape.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { generateGradientSVG } = require('../../core/UnifiedGradientGenerator') as {
  generateGradientSVG: (params: Record<string, unknown>) => string;
};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { APP_URL } = require('../../core/constants') as { APP_URL: string };

const DOCS_URL = `${APP_URL}/api-docs`;
const GALLERY_URL = `${APP_URL}/templates`;
const CREATOR_URL = `${APP_URL}/create`;

/** Coerce a query value that may be `undefined | string | string[]` to a single string (or undefined). */
function first(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

function setAiFriendlyHeaders(res: NextApiResponse, requestId: string): void {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('X-API-Usage', 'free-unlimited-usage');
  res.setHeader('X-Documentation', DOCS_URL);
  res.setHeader('X-Template-Gallery', GALLERY_URL);
  res.setHeader('X-Creator-Tool', CREATOR_URL);
  res.setHeader('X-Request-ID', requestId);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestId = randomUUID();

  try {
    console.log('🚀 API: SVG generation request received', {
      requestId,
      query: req.query,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    const text = first(req.query.text as string | string[] | undefined);
    const heightRaw = first(req.query.height as string | string[] | undefined);
    const template = first(req.query.template as string | string[] | undefined) ?? '';
    const gradientTypeRaw = first(req.query.gradientType as string | string[] | undefined);
    const duration = first(req.query.duration as string | string[] | undefined) ?? '6s';
    const animation = first(req.query.animation as string | string[] | undefined) ?? 'none';
    const stroke = first(req.query.stroke as string | string[] | undefined) ?? null;
    const strokeWidthRaw = first(req.query.strokeWidth as string | string[] | undefined);
    const textBg = first(req.query.textBg as string | string[] | undefined) ?? null;
    const rotateRaw = first(req.query.rotate as string | string[] | undefined);

    const height = heightRaw ?? 120;

    // Only use 'horizontal' as default if no template is provided
    const finalGradientType = gradientTypeRaw || (template ? undefined : 'horizontal');

    // Handle multiple color parameters
    const colors: string[] = [];
    for (let i = 0; ; i++) {
      const color = first(req.query[`color${i}`] as string | string[] | undefined);
      if (!color) break;
      colors.push(color);
    }
    if (colors.length === 0) {
      colors.push('000000');
    }

    // Match the legacy parseFloat-with-OR-zero behavior exactly — zero and NaN both fall to 0.
    const parsedStrokeWidth = parseFloat(strokeWidthRaw ?? '0') || 0;
    const parsedRotate = parseFloat(rotateRaw ?? '0') || 0;

    console.log('🚀 API: Parsed parameters', {
      requestId,
      text,
      height,
      template,
      gradientType: finalGradientType,
      duration,
      animation,
      stroke,
      strokeWidth: parsedStrokeWidth,
      textBg,
      rotate: parsedRotate,
      colors,
      hasTemplate: !!template,
    });

    if (!text) {
      // No text parameter — return a safe default SVG so embedders get something renderable.
      const defaultSvg = generateGradientSVG({
        text: 'Gradient SVG',
        colors: ['000000'],
        height: 120,
        gradientType: 'horizontal',
        duration: '6s',
        animation: 'none',
        stroke: null,
        strokeWidth: 0,
        textBg: null,
        rotate: 0,
      });
      setAiFriendlyHeaders(res, requestId);
      return res.send(defaultSvg);
    }

    const svg = generateGradientSVG({
      text,
      colors,
      height,
      gradientType: finalGradientType,
      duration,
      template,
      animation,
      stroke,
      strokeWidth: parsedStrokeWidth,
      textBg,
      rotate: parsedRotate,
    });

    setAiFriendlyHeaders(res, requestId);
    return res.send(svg);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error generating SVG:', { requestId, error: message });
    res.setHeader('X-Error-Code', 'SVG_GENERATION_FAILED');
    res.setHeader('X-Request-ID', requestId);
    return res.status(500).json({ error: 'Failed to generate SVG', requestId });
  }
}
