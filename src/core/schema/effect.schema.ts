/**
 * Effect manifest schema.
 *
 * Every folder under src/features/ exports a `manifest` that conforms to
 * `EffectManifest`. The central registry (src/core/registry.ts) walks these
 * manifests at startup and registers each effect with EffectRegistry.
 *
 * This replaces the hand-registered TEMPLATE_MAPPINGS + loadXxx() functions
 * in src/core/EffectLoader.js.
 */

export type OutputType = 'complete' | 'fragment' | 'gradient';

/**
 * How the effect participates in SVG layout dispatch in renderSvg/
 * UnifiedGradientGenerator.
 *
 * - `gradient`: standard stop-based gradient (the default path)
 * - `shape`: geometric-shape effect routed through advancedSvgGenerator
 * - `animation`: text animation effect routed through advancedSvgGenerator
 * - `text`: text effect routed through textEffectGenerator
 *
 * Replaces the hardcoded `geometricShapeTypes`/`animationEffectTypes` lists
 * in UnifiedGradientGenerator.js.
 */
export type LayoutKind = 'gradient' | 'shape' | 'animation' | 'text';

export interface EffectDefinition {
  /** Unique effect name (e.g. 'horizontal', 'aurora'). */
  name: string;
  /** Display category (e.g. 'basic', 'organicNature'). */
  category: string;
  /** Generator function. Kept `unknown`-loose because each category has its own arg shape today. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generator: (...args: any[]) => unknown;
  outputType: OutputType;
  filters?: readonly string[];
  description?: string;
  /** Templates that should resolve to this effect. */
  templates?: readonly string[];
  /** Alternate names for this effect. */
  aliases?: readonly string[];
  /** How this effect participates in the rendering pipeline dispatch. */
  layoutKind?: LayoutKind;
}

export interface EffectManifest {
  /** Manifest identifier — must match the feature folder name. */
  readonly id: string;
  /** Human-readable category label for this bundle of effects. */
  readonly category: string;
  /** All effects this category contributes to the registry. */
  readonly effects: readonly EffectDefinition[];
  /**
   * Template-name → effect-name mappings owned by this category.
   * Merged into the global template-mapping table at startup.
   */
  readonly templateAliases?: Readonly<Record<string, string>>;
}
