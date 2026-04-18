/**
 * /api/svg query schema tests.
 *
 * The contract harness (tests/contract/svg-parity.test.ts) already proves
 * the *success* path stays byte-identical through the Zod layer. This file
 * covers the failure and edge-case branches that aren't in the snapshot set:
 * malformed height, array-valued query keys, the `color0..N` walker.
 */
import { describe, expect, test } from 'vitest';
import { SvgQuerySchema, collectColors } from '@/core/schema/api.schema';

describe('SvgQuerySchema', () => {
  test('applies legacy defaults when keys are absent', () => {
    const parsed = SvgQuerySchema.parse({});
    expect(parsed.text).toBeUndefined();
    expect(parsed.height).toBeUndefined();
    expect(parsed.template).toBe('');
    expect(parsed.duration).toBe('6s');
    expect(parsed.animation).toBe('none');
    expect(parsed.stroke).toBeNull();
    expect(parsed.textBg).toBeNull();
    expect(parsed.strokeWidth).toBe(0);
    expect(parsed.rotate).toBe(0);
  });

  test('takes the first element of array-valued query keys', () => {
    const parsed = SvgQuerySchema.parse({
      text: ['Hello', 'ignored'],
      template: ['aurora-borealis', 'also-ignored'],
    });
    expect(parsed.text).toBe('Hello');
    expect(parsed.template).toBe('aurora-borealis');
  });

  test('coerces strokeWidth/rotate with legacy parseFloat-or-zero semantics', () => {
    const parsed = SvgQuerySchema.parse({ strokeWidth: '2.5', rotate: 'abc' });
    expect(parsed.strokeWidth).toBe(2.5);
    expect(parsed.rotate).toBe(0);
  });

  test('rejects non-numeric height with INVALID_QUERY-class failure', () => {
    const result = SvgQuerySchema.safeParse({ height: 'abc' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/positive integer/i);
    }
  });

  test('accepts valid height as a string', () => {
    const parsed = SvgQuerySchema.parse({ height: '150' });
    expect(parsed.height).toBe('150');
  });
});

describe('collectColors', () => {
  test('walks color0..colorN and stops at first gap', () => {
    const result = collectColors({ color0: 'ff0000', color1: '00ff00', color3: '0000ff' });
    expect(result).toEqual(['ff0000', '00ff00']);
  });

  test('falls back to legacy 000000 default on empty query', () => {
    expect(collectColors({})).toEqual(['000000']);
  });

  test('flattens array-valued color keys to the first element', () => {
    const result = collectColors({ color0: ['ff0000', 'ignored'] });
    expect(result).toEqual(['ff0000']);
  });
});
