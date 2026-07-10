import * as React from 'react';
import { cn } from '../../lib/utils';

export interface GradientInkTextProps {
  /** The text to render as real DOM text, clipped to the live gradient. */
  text: string;
  /** Template name passed to /api/svg (e.g. "aurora-borealis"). */
  template: string;
  /** Height of the source SVG banner used as the fill. Default 300. */
  height?: number;
  /** Extra classes — font-size lives here; the component sets no fixed size. */
  className?: string;
  /** Rendered element. Default 'h1'. */
  as?: React.ElementType;
}

/**
 * Renders real, selectable DOM text whose fill is the product's own live
 * gradient SVG (via background-clip: text). The gradient's SMIL animation keeps
 * playing inside the CSS background-image. Falls back to a flat ink tone before
 * the image decodes and where background-clip: text is unsupported.
 */
export function GradientInkText({
  text,
  template,
  height = 300,
  className,
  as = 'h1',
}: GradientInkTextProps) {
  const Tag = as;
  const url = `/api/svg?text=%20&template=${template}&height=${height}`;

  return (
    <Tag
      className={cn('inline-block', className)}
      style={{
        backgroundImage: `url("${url}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#2b2b31',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {text}
    </Tag>
  );
}

export default GradientInkText;
