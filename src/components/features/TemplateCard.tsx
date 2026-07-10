import { memo, type MouseEvent } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface TemplateCardData {
  name: string;
  displayName: string;
  category: string;
  categoryIcon?: string;
}

interface TemplateCardProps {
  template: TemplateCardData;
  isFavorite: boolean;
  onToggleFavorite: (templateName: string) => void;
  onPreview: (templateName: string) => void;
}

// The /api/svg endpoint returns SVGs sized 854 × height (default height=180 for
// these previews), so the native aspect ratio is 854/180 ≈ 4.74:1. Driving the
// preview container with this exact ratio lets the animation fill the card
// horizontally edge-to-edge without any horizontal cropping.
const PREVIEW_ASPECT_RATIO = '854 / 180';

function TemplateCardImpl({
  template,
  isFavorite,
  onToggleFavorite,
  onPreview,
}: TemplateCardProps) {
  const handleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(template.name);
  };

  const handlePreview = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onPreview(template.name);
  };

  const handleCardClick = () => {
    onPreview(template.name);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left',
        'transition-colors duration-200 cursor-pointer',
        'hover:border-foreground/40',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      )}
    >
      <div
        className="relative w-full overflow-hidden bg-muted"
        style={{ aspectRatio: PREVIEW_ASPECT_RATIO }}
      >
        <img
          src={`/api/svg?text=${encodeURIComponent(template.displayName)}&template=${template.name}&height=180&v=2`}
          alt={template.displayName}
          loading="lazy"
          className="block h-full w-full"
        />

        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={handleFavorite}
          className={cn(
            'absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full',
            'bg-black/50 transition-colors',
            'hover:bg-black/70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          <Star
            className={cn('h-3.5 w-3.5', isFavorite ? 'fill-white text-white' : 'text-white/70')}
          />
        </button>
      </div>

      {/* Info strip — height must stay visually constant so the virtualizer's
          GRID_CARD_INFO_HEIGHT estimate holds. Fixed leading enforces that. */}
      <div className="border-t border-border px-4 py-3.5">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] leading-4 text-muted-foreground line-clamp-1">
          {template.category}
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="text-[15px] font-normal leading-5 text-foreground line-clamp-1">
            {template.displayName}
          </span>
          <span
            aria-hidden
            className="shrink-0 text-foreground/40 transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </div>
      </div>

      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center gap-2 p-4',
          'bg-black/60 opacity-0',
          'transition-opacity duration-200',
          'group-hover:opacity-100 group-focus-within:opacity-100',
        )}
      >
        <button
          type="button"
          onClick={handlePreview}
          className={cn(
            'inline-flex items-center rounded-full border border-white/40 px-4 h-9',
            'font-mono text-[12px] uppercase tracking-[0.08em] text-white transition-colors',
            'hover:bg-white/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white',
          )}
        >
          Preview
        </button>
        <Link
          href={`/create?template=${template.name}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full bg-white px-4 h-9',
            'font-mono text-[12px] uppercase tracking-[0.08em] text-black transition-colors',
            'hover:bg-white/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white',
          )}
        >
          Use <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

const TemplateCard = memo(TemplateCardImpl);
TemplateCard.displayName = 'TemplateCard';

export default TemplateCard;
