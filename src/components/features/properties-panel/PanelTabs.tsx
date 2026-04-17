import { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { GRADIENT_TYPES } from '../../../constants/gradientTypes';

/**
 * Shared tab bodies for the properties panel. Desktop and mobile
 * shells render the same logic -- the only variant-specific choices
 * are copy length (e.g. "Fast (3s)" vs "Fast"), search-filter
 * availability on Advanced, and layout density for Colors.
 */

export type PanelVariant = 'desktop' | 'mobile';

interface Config {
  text: string;
  height: number;
  duration: string;
  gradientType: string;
}

interface BaseTemplate {
  name: string;
  label?: string;
}

interface BasicTabProps {
  variant: PanelVariant;
  currentConfig: Config;
  updateConfig: (update: Partial<Config>) => void;
}

const DESKTOP_DURATIONS = [
  { value: '3s', label: 'Fast (3s)' },
  { value: '6s', label: 'Normal (6s)' },
  { value: '10s', label: 'Slow (10s)' },
  { value: '15s', label: 'Very Slow (15s)' },
];

const MOBILE_DURATIONS = [
  { value: '3s', label: 'Fast' },
  { value: '6s', label: 'Normal' },
  { value: '10s', label: 'Slow' },
  { value: '15s', label: 'Very Slow' },
];

export function BasicTab({ variant, currentConfig, updateConfig }: BasicTabProps) {
  const durations = variant === 'desktop' ? DESKTOP_DURATIONS : MOBILE_DURATIONS;
  const heightProgressPct = ((currentConfig.height - 30) / 270) * 100;
  const sliderStyle =
    variant === 'mobile'
      ? {
          background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${heightProgressPct}%, hsl(var(--muted)) ${heightProgressPct}%, hsl(var(--muted)) 100%)`,
        }
      : undefined;
  const sliderClass =
    variant === 'mobile'
      ? 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
      : 'w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary';

  return (
    <>
      <div className={variant === 'desktop' ? 'space-y-2' : undefined}>
        <label
          className={
            variant === 'desktop' ? 'text-sm font-medium' : 'text-sm font-medium mb-2 block'
          }
        >
          Text Content
        </label>
        <Input
          value={currentConfig.text}
          onChange={(e) => updateConfig({ text: e.target.value })}
          placeholder="Enter your text..."
          className={variant === 'mobile' ? 'w-full text-base' : undefined}
        />
      </div>

      <div className={variant === 'desktop' ? 'space-y-2' : undefined}>
        {variant === 'desktop' ? (
          <div className="flex justify-between">
            <label className="text-sm font-medium">Height</label>
            <span className="text-sm text-muted-foreground">{currentConfig.height}px</span>
          </div>
        ) : (
          <label className="text-sm font-medium mb-2 block">Height: {currentConfig.height}px</label>
        )}
        <input
          type="range"
          min="30"
          max="300"
          value={currentConfig.height}
          onChange={(e) => updateConfig({ height: parseInt(e.target.value, 10) })}
          className={sliderClass}
          style={sliderStyle}
        />
        <div
          className={
            variant === 'desktop'
              ? 'flex justify-between text-xs text-muted-foreground'
              : 'flex justify-between text-xs text-muted-foreground mt-1'
          }
        >
          <span>{variant === 'desktop' ? '30px' : '30'}</span>
          <span>{variant === 'desktop' ? '300px' : '300'}</span>
        </div>
      </div>

      <div className={variant === 'desktop' ? 'space-y-2' : undefined}>
        <label
          className={
            variant === 'desktop' ? 'text-sm font-medium' : 'text-sm font-medium mb-2 block'
          }
        >
          Animation Duration
        </label>
        <div className="grid grid-cols-2 gap-2">
          {durations.map(({ value, label }) => (
            <Button
              key={value}
              variant={currentConfig.duration === value ? 'default' : 'outline'}
              size={variant === 'desktop' ? 'sm' : 'default'}
              onClick={() => updateConfig({ duration: value })}
              className="w-full"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

interface ColorsTabProps {
  variant: PanelVariant;
  colors: readonly string[];
  onColorUpdate: (index: number, color: string) => void;
  onAddColor: () => void;
  onRemoveColor: (index: number) => void;
  canAddColor?: boolean;
  baseTemplate: BaseTemplate | null;
  isModified: boolean;
  onResetToTemplate: () => void;
}

export function ColorsTab({
  variant,
  colors,
  onColorUpdate,
  onAddColor,
  onRemoveColor,
  canAddColor,
  baseTemplate,
  isModified,
  onResetToTemplate,
}: ColorsTabProps) {
  const isDesktop = variant === 'desktop';
  const swatchSize = isDesktop ? 'w-10 h-10' : 'w-12 h-12';

  return (
    <div className="space-y-4">
      {isDesktop ? (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {colors.length} color{colors.length !== 1 ? 's' : ''} in gradient
          </p>
          {canAddColor && (
            <Button variant="outline" size="sm" onClick={onAddColor}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Customize your gradient colors</p>
          {baseTemplate && (
            <p className="text-xs text-muted-foreground">
              {isModified
                ? `Modified from: ${baseTemplate.label || baseTemplate.name}`
                : `Using: ${baseTemplate.label || baseTemplate.name}`}
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {colors.map((color, index) => {
          const pickerId = isDesktop ? `color-picker-${index}` : `mobile-color-picker-${index}`;
          const hexValue = color.startsWith('#') ? color : `#${color}`;
          return (
            <div key={index} className="flex items-center gap-2">
              <div className={isDesktop ? undefined : 'flex items-center gap-2 flex-1'}>
                <div className="relative">
                  <input
                    type="color"
                    value={hexValue}
                    onChange={(e) => onColorUpdate(index, e.target.value.substring(1))}
                    className="sr-only"
                    id={pickerId}
                  />
                  <label
                    htmlFor={pickerId}
                    className={`block ${swatchSize} rounded-md border-2 border-border cursor-pointer hover:border-primary transition-colors`}
                    style={{ backgroundColor: hexValue }}
                  />
                </div>
                <Input
                  value={color}
                  onChange={(e) => onColorUpdate(index, e.target.value)}
                  placeholder="Hex color"
                  className={isDesktop ? 'font-mono text-sm flex-1' : 'font-mono text-sm'}
                  maxLength={6}
                />
              </div>
              {isDesktop ? (
                colors.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveColor(index)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )
              ) : (
                <div className="flex items-center gap-1">
                  {colors.length > 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onRemoveColor(index)}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                  {index === colors.length - 1 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onAddColor}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {!isDesktop && colors.length === 0 && (
          <Button variant="outline" onClick={onAddColor} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add First Color
          </Button>
        )}
      </div>

      {baseTemplate && isModified && (
        <Button onClick={onResetToTemplate} variant="outline" size="sm" className="w-full">
          {isDesktop && <RotateCcw className="h-4 w-4 mr-2" />}
          Reset to Template Colors
        </Button>
      )}
    </div>
  );
}

interface AdvancedTabProps {
  variant: PanelVariant;
  currentConfig: Config;
  updateConfig: (update: Partial<Config>) => void;
}

export function AdvancedTab({ variant, currentConfig, updateConfig }: AdvancedTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const isDesktop = variant === 'desktop';

  const filteredTypes = isDesktop
    ? GRADIENT_TYPES.filter(
        (type: { label: string; value: string }) =>
          type.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          type.value.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : GRADIENT_TYPES;

  return (
    <div className="space-y-4">
      {isDesktop ? (
        <div className="space-y-2">
          <label className="text-sm font-medium">Gradient Type</label>
          <p className="text-xs text-muted-foreground">{GRADIENT_TYPES.length} types available</p>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gradient types..."
            className="mb-2"
          />
        </div>
      ) : (
        <label className="text-sm font-medium mb-2 block">
          Gradient Type ({GRADIENT_TYPES.length} types available)
        </label>
      )}

      <div
        className={
          isDesktop
            ? 'max-h-96 overflow-y-auto border rounded-md p-2'
            : 'max-h-64 overflow-y-auto border rounded-md p-2 mb-4'
        }
      >
        <div
          className={isDesktop ? 'grid grid-cols-1 xl:grid-cols-2 gap-2' : 'grid grid-cols-2 gap-2'}
        >
          {filteredTypes.map((type: { label: string; value: string }) => (
            <Button
              key={type.value}
              variant={currentConfig.gradientType === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ gradientType: type.value })}
              className={
                isDesktop ? 'justify-start text-xs w-full truncate' : 'justify-start text-xs w-full'
              }
              title={type.label}
            >
              {type.label}
            </Button>
          ))}
        </div>
        {isDesktop && filteredTypes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No gradient types match your search
          </p>
        )}
      </div>
    </div>
  );
}
