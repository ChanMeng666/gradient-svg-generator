import * as React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface HeroHeadlineProps {
  /** Display lines, each rendered on its own row (e.g. ["LIVING", "COLOR."]). */
  lines: readonly string[];
  /** Optional per-line classes (aligned by index) — e.g. ['', 'text-right']
      for a staggered poster composition. */
  lineClassNames?: readonly (string | undefined)[];
  /** Template slugs the headline rotates through. First is the SSR default. */
  templates: readonly string[];
  /** Height of the source SVG banner used as the gradient fill. Default 300. */
  height?: number;
  /** Rotation interval in ms. Default 5000. */
  intervalMs?: number;
  /** Notified with the active template slug on mount and every rotation. */
  onTemplateChange?: (template: string) => void;
  /** Applied to the semantic wrapper — font-size / leading / tracking live here. */
  className?: string;
  /** Semantic element. Default 'h1'. */
  as?: React.ElementType;
}

function bannerUrl(template: string, height: number): string {
  return `/api/svg?text=%20&template=${template}&height=${height}`;
}

function fillStyle(template: string, height: number): React.CSSProperties {
  return {
    backgroundImage: `url("${bannerUrl(template, height)}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#2b2b31',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
  };
}

/**
 * The signature hero element: real, selectable DOM text whose fill is the
 * product's own live gradient SVG (background-clip: text). Rotates through
 * `templates`, but only swaps after the next banner has decoded, and crossfades
 * between two stacked layers. The first template is rendered identically on the
 * server (zero CLS). Honors prefers-reduced-motion by pinning the first
 * template with no rotation.
 */
export function HeroHeadline({
  lines,
  lineClassNames,
  templates,
  height = 300,
  intervalMs = 5000,
  onTemplateChange,
  className,
  as = 'h1',
}: HeroHeadlineProps) {
  const Tag = as as React.ElementType;
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef(0);

  React.useEffect(() => {
    indexRef.current = index;
    onTemplateChange?.(templates[index]);
    // onTemplateChange is a stable callback from the parent; re-run on index only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, templates]);

  React.useEffect(() => {
    if (reduceMotion || templates.length <= 1) return;
    let cancelled = false;
    const id = window.setInterval(() => {
      const next = (indexRef.current + 1) % templates.length;
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setIndex(next);
      };
      img.src = bannerUrl(templates[next], height);
    }, intervalMs);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [reduceMotion, templates, height, intervalMs]);

  const renderLines = (extra?: string) =>
    lines.map((line, i) => (
      <span key={i} className={cn('block', lineClassNames?.[i], extra)}>
        {line}
      </span>
    ));

  return (
    <Tag className={cn('relative block', className)}>
      {/* Layout + semantic text. Invisible so the crossfading layers show through. */}
      <span className="invisible block">{renderLines()}</span>

      {/* Crossfading gradient fills, stacked over the spacer. Decorative. */}
      <AnimatePresence initial={false}>
        <motion.span
          key={templates[index]}
          aria-hidden
          className="absolute inset-0 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={fillStyle(templates[index], height)}
        >
          {renderLines()}
        </motion.span>
      </AnimatePresence>
    </Tag>
  );
}

export default HeroHeadline;
