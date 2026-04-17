import { Filter } from 'lucide-react';
import { Badge } from '../../ui/badge';

export interface SidebarCategory {
  id: string;
  name: string;
  icon?: string;
}

interface SidebarFiltersProps {
  categories: readonly SidebarCategory[];
  selected: readonly string[];
  onToggle: (categoryId: string) => void;
}

export default function SidebarFilters({ categories, selected, onToggle }: SidebarFiltersProps) {
  return (
    <div className="p-4 border-b shrink-0">
      <div className="flex items-center mb-2">
        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="text-sm font-medium">Categories</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selected.includes(category.id) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onToggle(category.id)}
          >
            {category.icon} {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
