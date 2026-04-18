/**
 * Runtime schema for the /api/svg query surface.
 *
 * Goals, in priority order:
 * 1. **Byte-identical output for every current URL.** The contract test
 *    harness in tests/contract/svg-parity.test.ts fails the build if
 *    this changes, so the coercion rules here deliberately mirror what
 *    svg.js used to do by hand (parseFloat-with-OR-zero, array-first
 *    query coercion, implicit 'horizontal' only when no template is set).
 * 2. **Document the contract** via an inferred TS type — downstream code
 *    gets autocomplete for the real shape instead of `Record<string, ...>`.
 * 3. **Reject genuinely malformed input** (e.g. `?height=abc`) with an
 *    `X-Error-Code: INVALID_QUERY` header rather than quietly emitting
 *    an SVG with `y="NaN"`. No currently-snapshotted URL hits this path.
 */
import { z } from 'zod';

/**
 * Next.js parses every query string value as `string | string[] | undefined`.
 * Take the first element when we get an array; otherwise pass through.
 */
const firstOrSingle = z
  .union([z.string(), z.array(z.string()), z.undefined()])
  .transform((v) => (Array.isArray(v) ? v[0] : v));

/**
 * Integer height in pixels. Accepts numeric strings, rejects anything
 * that doesn't parse. Clamping is deliberately loose (1..10000) — the
 * api-docs suggest 30..300, but existing users may send larger values
 * we don't want to start 400-ing.
 */
const heightString = firstOrSingle.pipe(
  z
    .string()
    .optional()
    .superRefine((v, ctx) => {
      if (v === undefined) return;
      const n = Number(v);
      if (!Number.isFinite(n) || n <= 0 || n > 10000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `height must be a positive integer (got ${JSON.stringify(v)})`,
        });
      }
    }),
);

/**
 * Float param with the legacy `parseFloat(v) || 0` semantics:
 * NaN, empty string, and `undefined` all fall to 0. Negative values
 * and huge values pass through (the renderer handles them).
 */
const floatOrZero = firstOrSingle.transform((v) => {
  if (v === undefined) return 0;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : 0;
});

export const SvgQuerySchema = z
  .object({
    text: firstOrSingle,
    height: heightString,
    template: firstOrSingle.transform((v) => v ?? ''),
    gradientType: firstOrSingle,
    duration: firstOrSingle.transform((v) => v ?? '6s'),
    animation: firstOrSingle.transform((v) => v ?? 'none'),
    stroke: firstOrSingle.transform((v) => v ?? null),
    strokeWidth: floatOrZero,
    textBg: firstOrSingle.transform((v) => v ?? null),
    rotate: floatOrZero,
  })
  .passthrough();

export type SvgQueryInput = z.input<typeof SvgQuerySchema>;
export type SvgQueryParsed = z.output<typeof SvgQuerySchema>;

/**
 * Collect `color0`, `color1`, ... sequentially from the raw query bag
 * until we see a gap. Zod has no clean way to express variadic keys;
 * extracting this outside the schema keeps the coercion logic honest.
 * Falls back to the legacy `['000000']` default so an empty request
 * still produces an SVG matching every snapshot.
 */
export function collectColors(query: Record<string, string | string[] | undefined>): string[] {
  const colors: string[] = [];
  for (let i = 0; ; i++) {
    const raw = query[`color${i}`];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (!value) break;
    colors.push(value);
  }
  if (colors.length === 0) colors.push('000000');
  return colors;
}
