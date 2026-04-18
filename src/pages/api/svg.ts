import type { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'node:crypto';
import { SvgQuerySchema, collectColors } from '../../core/schema/api.schema';

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

  const parsed = SvgQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      path: i.path.join('.') || '<root>',
      message: i.message,
    }));
    console.warn('API: invalid /api/svg query', { requestId, issues });
    res.setHeader('X-Error-Code', 'INVALID_QUERY');
    res.setHeader('X-Request-ID', requestId);
    return res.status(400).json({ error: 'Invalid query parameters', issues, requestId });
  }

  try {
    const q = parsed.data;
    const colors = collectColors(req.query);

    // Match the legacy default: fall back to 'horizontal' only when no template is set;
    // when a template is provided we let it pick its own gradientType.
    const finalGradientType = q.gradientType || (q.template ? undefined : 'horizontal');
    const height = q.height ?? 120;

    console.log('🚀 API: SVG generation request', {
      requestId,
      text: q.text,
      height,
      template: q.template,
      gradientType: finalGradientType,
      duration: q.duration,
      animation: q.animation,
      stroke: q.stroke,
      strokeWidth: q.strokeWidth,
      textBg: q.textBg,
      rotate: q.rotate,
      colors,
      timestamp: new Date().toISOString(),
    });

    if (!q.text) {
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
      text: q.text,
      colors,
      height,
      gradientType: finalGradientType,
      duration: q.duration,
      template: q.template,
      animation: q.animation,
      stroke: q.stroke,
      strokeWidth: q.strokeWidth,
      textBg: q.textBg,
      rotate: q.rotate,
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
