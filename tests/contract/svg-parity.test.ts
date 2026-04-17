/**
 * SVG contract parity harness.
 *
 * Snapshots the SVG output of `/api/svg` for ~100 representative URLs, covering
 * every template category plus edge cases. Auto-generated IDs are normalized so
 * snapshots stay stable across runs. Any future refactor must keep these
 * snapshots byte-identical — that is the public contract for URLs users have
 * embedded in their GitHub READMEs.
 */
import { beforeEach, describe, expect, test, vi } from 'vitest';
import handler from '@/pages/api/svg';
import * as registry from '@/core/TemplateRegistry';

/**
 * Deterministic PRNG — replaces Math.random() so generators that use randomness
 * (animation offsets, color-palette roulette in cyberpunk templates) produce
 * stable output in tests. Any changes to generator Math.random() call *counts*
 * will still show up as snapshot diffs, which is exactly the coverage we want.
 */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

beforeEach(() => {
  vi.spyOn(Math, 'random').mockImplementation(seededRandom(42));
  vi.spyOn(Date, 'now').mockReturnValue(1_700_000_000_000);
});

type Query = Record<string, string>;

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Template {
  name: string;
  label?: string;
  [key: string]: unknown;
}

function callHandler(query: Query): { body: string; status: number } {
  let body = '';
  let status = 200;
  const res = {
    setHeader: () => res,
    status: (code: number) => {
      status = code;
      return res;
    },
    send: (data: string) => {
      body = data;
      return res;
    },
    json: (data: unknown) => {
      body = JSON.stringify(data);
      return res;
    },
    end: () => res,
  };
  const url = `/api/svg?${new URLSearchParams(query).toString()}`;
  (handler as (req: unknown, res: unknown) => void)({ query, url, method: 'GET' }, res);
  return { body, status };
}

/**
 * Strip nondeterministic output from the generated SVG so snapshots are stable.
 * Several generators use Math.random() for animation duration jitter and
 * IDs. These get collapsed to stable markers so the contract test can verify
 * semantic output without tripping on randomness.
 */
function normalizeSvg(svg: string): string {
  return (
    svg
      // Random floats with high decimal precision (Math.random outputs)
      .replace(/(-?\d+\.\d{4,})/g, 'RANDOM')
      // IDs with a numeric suffix 6+ digits — typically Date.now() or a counter
      .replace(/\bid="([a-zA-Z][\w-]*?)-?\d{6,}"/g, 'id="$1-NORMALIZED"')
      .replace(/url\(#([a-zA-Z][\w-]*?)-?\d{6,}\)/g, 'url(#$1-NORMALIZED)')
      .replace(/xlink:href="#([a-zA-Z][\w-]*?)-?\d{6,}"/g, 'xlink:href="#$1-NORMALIZED"')
      // IDs ending with a random alphanumeric slug (hex-ish suffix, 8+ chars)
      .replace(/\bid="([a-zA-Z][\w-]*?)-?([a-f0-9]{8,})"/g, 'id="$1-NORMALIZED"')
      .replace(/url\(#([a-zA-Z][\w-]*?)-?([a-f0-9]{8,})\)/g, 'url(#$1-NORMALIZED)')
      .replace(/xlink:href="#([a-zA-Z][\w-]*?)-?([a-f0-9]{8,})"/g, 'xlink:href="#$1-NORMALIZED"')
      // ISO timestamps (if any leak into SVG comments or attributes)
      .replace(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z/g, 'TIMESTAMP')
      // Raw Date.now() values (13-digit epoch ms) anywhere in the SVG
      .replace(/\b1[0-9]{12}\b/g, 'EPOCH')
  );
}

const categories: Category[] = registry.getCategories();

interface TestCase {
  name: string;
  query: Query;
}

const cases: TestCase[] = [];

for (const cat of categories) {
  const templates: Template[] = registry.getTemplatesByCategory(cat.id);
  const sample = templates.slice(0, 3);
  for (const t of sample) {
    cases.push({
      name: `${cat.id}:${t.name}`,
      query: { text: 'Hello World', template: t.name, height: '120' },
    });
  }
}

cases.push(
  { name: 'edge:no-params', query: {} },
  { name: 'edge:text-only', query: { text: 'Standalone' } },
  { name: 'edge:short-text', query: { text: 'A', template: 'aurora-borealis' } },
  {
    name: 'edge:long-text',
    query: {
      text: 'The quick brown fox jumps over the lazy dog repeatedly across many lines',
      template: 'aurora-borealis',
    },
  },
  { name: 'edge:min-height', query: { text: 'Hi', template: 'aurora-borealis', height: '30' } },
  { name: 'edge:max-height', query: { text: 'Hi', template: 'aurora-borealis', height: '300' } },
  {
    name: 'edge:custom-colors-2',
    query: { text: 'Two', color0: 'ff0080', color1: '7928ca' },
  },
  {
    name: 'edge:custom-colors-5',
    query: {
      text: 'Five',
      color0: 'ff0080',
      color1: '7928ca',
      color2: '00dfd8',
      color3: 'f9cb28',
      color4: 'fb7185',
    },
  },
  {
    name: 'edge:rotation',
    query: { text: 'Spin', template: 'aurora-borealis', rotate: '45' },
  },
  {
    name: 'edge:stroke',
    query: {
      text: 'Outline',
      template: 'aurora-borealis',
      stroke: 'ffffff',
      strokeWidth: '2',
    },
  },
  {
    name: 'edge:text-bg',
    query: { text: 'BG', template: 'aurora-borealis', textBg: '000000' },
  },
  {
    name: 'edge:animation-none',
    query: { text: 'Static', template: 'aurora-borealis', animation: 'none' },
  },
  {
    name: 'edge:custom-duration',
    query: { text: 'Slow', template: 'aurora-borealis', duration: '20s' },
  },
);

describe('SVG contract parity', () => {
  test('categories loaded from registry', () => {
    // Threshold relaxed post Phase 5.2 category consolidation
    // (~31 categories collapsed to ~19). Guardrail still ensures the
    // registry isn't empty or catastrophically misregistered.
    expect(categories.length).toBeGreaterThan(15);
  });

  test('sampled >40 template cases', () => {
    const sampled = cases.filter((c) => !c.name.startsWith('edge:'));
    expect(sampled.length).toBeGreaterThan(40);
  });

  for (const c of cases) {
    test(c.name, () => {
      const { body, status } = callHandler(c.query);
      expect(status).toBe(200);
      expect(body).toContain('<svg');
      expect(normalizeSvg(body)).toMatchSnapshot();
    });
  }
});
