import { Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';

interface SidebarFavoritesProps {
  /** Which list the current tab is showing. */
  variant: 'favorites' | 'recent';
  /** Callback invoked after the user confirms the clear action. */
  onClear: () => void;
}

const COPY = {
  favorites: {
    prompt: 'Are you sure you want to clear all favorites?',
    label: 'Clear All Favorites',
  },
  recent: {
    prompt: 'Are you sure you want to clear recent history?',
    label: 'Clear Recent History',
  },
} as const;

export default function SidebarFavorites({ variant, onClear }: SidebarFavoritesProps) {
  const { prompt, label } = COPY[variant];

  return (
    <div className="p-4 border-b shrink-0">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (confirm(prompt)) {
            onClear();
          }
        }}
        className="w-full gap-2 hover:bg-destructive hover:text-destructive-foreground"
      >
        <Trash2 className="h-4 w-4" />
        {label}
      </Button>
    </div>
  );
}
