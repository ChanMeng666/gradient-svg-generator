# Adding an effect

This guide walks through the three common levels of change — adding a template, adding a gradient type, and adding a whole new effect category — and shows what each one touches under the current architecture.

## Architecture in one diagram

```
/api/svg request
      ↓
UnifiedGradientGenerator
      ↓
  ┌───┴───┐
  ↓       ↓
TemplateRegistry    EffectRegistry
  (src/features/*/templates.js)  (src/features/*/effect.js)
                                    ↓
                                Generator fn
                                    ↓
                              SVGComposer → SVG
```

Every effect has three pieces of data:

| Piece            | Lives in                            | Role                                                                                                                       |
| ---------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Manifest**     | `src/features/<name>/effect.js`     | Declares the effect's generators, filters, and layout kind. Replaces the old hand-coded `EffectLoader` lookup table.       |
| **Templates**    | `src/features/<name>/templates.js`  | User-facing named compositions. Each one binds a gradient type to a color sequence.                                        |
| **Generator fn** | `src/utils/gradientGenerators/*.js` | Pure function that takes `(stops, animationConfig, animationDuration)` and returns `{ gradientDef, additionalElements? }`. |

---

## Scenario 1: Add a template (the common case)

You have a named color combination that users will want. No new generator logic — you're reusing one that already exists (e.g. `horizontal`, `aurora`, `plasma`).

1. Open the category's templates file, e.g. `src/features/basic/templates.js`.
2. Append an entry:

   ```js
   'midnight-peach': {
     name: 'midnight-peach',
     label: 'Midnight Peach',
     colors: ['1a0033', 'ff6b9d', 'ffb86c'],
     gradientType: 'horizontal',
     animationDuration: '6s',
     description: 'Dark violet fading through peach',
   },
   ```

3. If the color sequence is shared with 2+ existing templates, or is a canonical palette (pride flag, rainbow, brand color), add it to `src/features/_shared/palettes.js` and reference it by name:

   ```js
   colors: palettes.midnightPeach,
   ```

4. Run the contract tests to record the snapshot:

   ```bash
   npm test -- tests/contract
   ```

   Because new template entries are additive (no existing template name changes), all 101 existing snapshots stay byte-identical. Your new template only appears in the snapshot set if the test file samples it — the harness picks 3 per category, so if yours is among the first three alphabetically in its category, you'll see a new snapshot. Otherwise the test just loads the template and verifies the registry accepts it.

The template name is part of the public contract: users embed it in GitHub README URLs. Once shipped, never rename it.

---

## Scenario 2: Add a gradient type

You want new generator behavior (animated pattern, filter combination, etc.) that no existing template can reuse.

1. Pick a home file — either extend an existing one in `src/utils/gradientGenerators/` or create a new generator file if your effect is substantial.
2. Write the generator as a pure function:

   ```js
   const { animatedLinearGradient } = require('../../features/_shared/svgPrimitives');

   function createMyCoolGradient(stops, animationConfig, animationDuration) {
     return animatedLinearGradient(stops, animationConfig, {
       coords: 'x1="0%" y1="0%" x2="100%" y2="0%"',
       animates: [
         ['x1', '-50%;50%;-50%'],
         ['x2', '50%;150%;50%'],
       ],
     });
   }

   module.exports = { createMyCoolGradient };
   ```

   Use the `animatedLinearGradient` / `animatedRadialGradient` primitives when the effect is a straightforward animated gradient — they produce byte-identical output to hand-written template literals. Fall back to a raw template literal when the effect needs unique SVG structure (patterns, clipPaths, path animations).

3. Register the generator in the category's manifest at `src/features/<category>/effect.js`:

   ```js
   generators: {
     ...existing,
     myCool: createMyCoolGradient,
   },
   ```

4. Add the type to `src/config/gradientConfig.js` under `GRADIENT_TYPES` if it should be selectable from the UI.

5. Write a template that uses it (see Scenario 1).

6. Run contract tests. New gradient types are additive, so existing snapshots stay stable.

---

## Scenario 3: Add a new effect category

You want a whole new bucket of effects (e.g. "neon", "retro", "3d") with its own sidebar entry.

1. Create `src/features/<name>/` with:
   - `effect.js` — the manifest. Copy from `src/features/basic/effect.js` as a starting point.
   - `templates.js` — initial templates.
   - `generator.js` (optional) — if the generators are unique enough to warrant a separate file from the shared `src/utils/gradientGenerators/`.

2. Register the category in **three places** (all position-indexed — order matters for lookup precedence):
   - `src/core/TemplateRegistry.js` — add to `CATEGORY_REGISTRY`.
   - `src/data/templateCategories.js` — add to the legacy array.
   - `src/utils/templateUtils.js` — add to the `categoryMap` array _and_ the `categoryMap` object lookup.

3. Add to the barrel: `src/features/index.js`.

4. Add initial templates. Pick unique names — collisions with earlier categories cause the later one to lose (earlier `CATEGORY_REGISTRY` entry wins).

5. Contract tests will pick up the new category automatically (`registry.getCategories()`). Run:

   ```bash
   npm test
   ```

   You'll see new test cases appear; snapshots for them will be recorded on first run.

---

## The byte-identity contract

The `/api/svg` URL is a hard public contract. Users have embedded thousands of URLs like `https://…/api/svg?text=Hello&template=aurora-borealis` in GitHub READMEs. **Any change to an existing template's output breaks those embeds.**

The contract test (`tests/contract/svg-parity.test.ts`) is the non-negotiable gate. It snapshots ~100 representative URLs. Before merging any refactor:

1. Run `npm test -- tests/contract`
2. All 101 tests must pass
3. If snapshots change, the diff must be intentional and reviewed — `git diff tests/__snapshots__/` should show exactly the changes you expect

Additive changes (new templates, new gradient types, new categories) never break existing snapshots. Refactors (generator internals, filter library splits, registry reshuffles) must produce byte-identical output for every surviving template name.
