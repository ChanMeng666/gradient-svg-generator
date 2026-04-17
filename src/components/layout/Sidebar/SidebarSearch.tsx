import { Search } from 'lucide-react';
import { Input } from '../../ui/input';

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  return (
    <div className="p-4 shrink-0">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search templates..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
