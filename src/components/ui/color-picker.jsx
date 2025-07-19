import React from 'react';
import { Button } from './button';
import { Input } from './input';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ColorPicker({ color, index, total, onUpdate, onAdd, onRemove }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 flex-1">
        <div className="relative">
          <input
            type="color"
            value={color.startsWith('#') ? color : `#${color}`}
            onChange={(e) => onUpdate(index, e.target.value.substring(1))}
            className="sr-only"
            id={`color-picker-${index}`}
          />
          <label
            htmlFor={`color-picker-${index}`}
            className={cn(
              "block w-10 h-10 rounded-md border-2 border-border cursor-pointer",
              "hover:border-primary transition-colors"
            )}
            style={{ backgroundColor: color.startsWith('#') ? color : `#${color}` }}
          />
        </div>
        <Input
          value={color}
          onChange={(e) => onUpdate(index, e.target.value)}
          placeholder="Hex color"
          className="font-mono text-sm"
          maxLength={6}
        />
      </div>
      <div className="flex items-center gap-1">
        {total > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onRemove(index)}
            className="h-8 w-8"
          >
            <Minus className="h-3 w-3" />
          </Button>
        )}
        {index === total - 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={onAdd}
            className="h-8 w-8"
          >
            <Plus className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
}