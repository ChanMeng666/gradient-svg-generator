import { memo, type MouseEvent } from 'react';
import Link from 'next/link';
import { Star, Eye, ArrowRight } from 'lucide-react';
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
        'group relative flex flex-col overflow-hidden rounded-xl border bg-card text-left',
        'transition-all duration-300 ease-out cursor-pointer',
        'hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xl',
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
            'bg-black/35 text-white backdrop-blur-md transition-all',
            'hover:bg-black/55 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring',
            isFavorite && 'bg-yellow-500/90 text-white hover:bg-yellow-500',
          )}
        >
          <Star className={cn('h-3.5 w-3.5', isFavorite && 'fill-current')} />
        </button>
      </div>

      <div className="flex flex-col gap-0.5 border-t px-3.5 py-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          {template.categoryIcon ? <span>{template.categoryIcon}</span> : null}
          <span className="capitalize">{template.category}</span>
        </div>
        <h3 className="text-sm font-semibold text-foreground line-clamp-1">
          {template.displayName}
        </h3>
      </div>

      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center gap-2 p-4',
          'bg-black/50 backdrop-blur-[2px] opacity-0',
          'transition-opacity duration-200',
          'group-hover:opacity-100 group-focus-within:opacity-100',
        )}
      >
        <button
          type="button"
          onClick={handlePreview}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md border border-white/40 bg-white/10 px-3 h-9',
            'text-sm font-medium text-white backdrop-blur-sm transition-colors',
            'hover:bg-white/20 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white',
          )}
        >
          <Eye className="h-4 w-4" />
          Preview
        </button>
        <Link
          href={`/create?template=${template.name}`}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md bg-primary px-3 h-9',
            'text-sm font-medium text-primary-foreground transition-colors',
            'hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white',
          )}
        >
          Use Template
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

const TemplateCard = memo(TemplateCardImpl);
TemplateCard.displayName = 'TemplateCard';

export default TemplateCard;
