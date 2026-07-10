import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface LiveEndpointCardProps {
  /** Display text passed to the endpoint. Default "Hello". */
  text?: string;
  /** Template slug rendered in the response. Default "sunset-gold". */
  template?: string;
  /** Banner height. Default 120. */
  height?: number;
  className?: string;
}

/**
 * Terminal-style card that shows a real /api/svg request and renders its actual
 * response below — the endpoint documenting itself. The copy control yields the
 * request path exactly as shown.
 */
export function LiveEndpointCard({
  text = 'Hello',
  template = 'sunset-gold',
  height = 120,
  className,
}: LiveEndpointCardProps) {
  const [copied, setCopied] = React.useState(false);
  const path = `/api/svg?text=${text}&template=${template}&height=${height}`;
  const request = `GET ${path}`;

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(request);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }, [request]);

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border bg-card', className)}>
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-foreground">
          <span className="text-muted-foreground">GET</span> {path}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy request"
          className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="border-t border-border px-5 py-5">
        <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          Response — rendered live
        </span>
        <img
          src={path}
          alt="Live API response"
          width={854}
          height={height}
          className="h-auto w-full rounded-lg"
        />
      </div>
    </div>
  );
}

export default LiveEndpointCard;
