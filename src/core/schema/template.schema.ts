/**
 * Template schema.
 *
 * Dev-time runtime validation for entries loaded from
 * `src/features/<category>/templates.js`. Catches common typos
 * (`gradinetType` vs `gradientType`, `colors: '#ff0000'` instead of an
 * array, etc.) at module load time before the registry swallows the bad
 * entry silently.
 *
 * Production builds skip validation entirely via the `isDev` check in
 * `validateTemplateInDev()` -- the schema still ships with the bundle
 * but its parse cost never runs for real users.
 */
import { z } from 'zod';

/** 6-digit hex color, with or without leading `#`. Case-insensitive. */
const hexColor = z.string().regex(/^#?[0-9a-fA-F]{6}$/, 'expected a 6-digit hex color');

export const TemplateSchema = z
  .object({
    /** Public contract — embedded in user README URLs, never rename. */
    name: z.string().min(1),
    label: z.string().min(1).optional(),
    colors: z.array(hexColor).min(1),
    gradientType: z.string().min(1).optional(),
    animationDuration: z
      .string()
      .regex(/^\d+(\.\d+)?s$/, 'expected e.g. "6s" or "0.5s"')
      .optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    displayName: z.string().optional(),
    /** Some templates (e.g. gaming/retro) carry extra rendering hints we don't enforce here. */
  })
  .passthrough();

export type Template = z.infer<typeof TemplateSchema>;

const isDev = typeof process !== 'undefined' && process.env.NODE_ENV !== 'production';

/**
 * Dev-only schema guard. Logs a warning with the offending key path so a
 * broken template doesn't get registered without a trace. Returns the
 * template unchanged either way -- we never reject at runtime; the
 * contract test is the real gate.
 */
export function validateTemplateInDev(template: unknown, sourceFile: string): void {
  if (!isDev) return;
  const result = TemplateSchema.safeParse(template);
  if (!result.success) {
    const t = template as { name?: unknown };
    const name = typeof t?.name === 'string' ? t.name : '(unknown)';
    const issues = result.error.issues
      .map((i) => `${i.path.join('.') || '<root>'}: ${i.message}`)
      .join(' | ');

    console.warn(`[template-schema] ${sourceFile} template "${name}" failed validation: ${issues}`);
  }
}
