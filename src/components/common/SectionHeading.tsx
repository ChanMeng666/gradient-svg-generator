import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SectionHeadingProps {
  /** Mono uppercase overline label above the title. */
  overline?: string;
  /** Optional index counter shown before the overline (e.g. "01"). */
  counter?: string;
  /** The display heading. Size comes from className. */
  title: React.ReactNode;
  /** Optional right-aligned action slot (e.g. a "View all" link/button). */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Shared editorial section header: mono uppercase overline (optionally with a
 * counter prefix) over a single-weight display heading, with an optional
 * right-aligned action. Reused across WP1/2/3 sections.
 */
export function SectionHeading({
  overline,
  counter,
  title,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn('flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}
    >
      <div className="flex flex-col gap-3">
        {overline && (
          <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
            {counter && <span className="mr-3 text-foreground/50">{counter}</span>}
            {overline}
          </span>
        )}
        <h2 className="font-normal tracking-display text-foreground">{title}</h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default SectionHeading;
