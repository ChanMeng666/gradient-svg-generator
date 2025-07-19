import React, { useState, useEffect } from 'react';
// Removed Sheet imports - using custom implementation
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Type, Palette, Sliders, ChevronUp, ChevronDown, X, Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { GRADIENT_TYPES } from '../../constants/gradientTypes';

export default function MobilePropertiesPanel({ 
  isOpen, 
  onClose, 
  currentConfig, 
  updateConfig, 
  isCustomMode,
  baseTemplate,
  isModified,
  resetToTemplate
}) {
  const [panelHeight, setPanelHeight] = useState('normal'); // 'mini', 'normal', 'expanded'
  const [activeTab, setActiveTab] = useState('basic');

  // Color handling functions
  const handleColorUpdate = (index, newColor) => {
    const colors = currentConfig.colors || [];
    const newColors = [...colors];
    newColors[index] = newColor;
    updateConfig({ colors: newColors });
  };

  const handleAddColor = () => {
    const colors = currentConfig.colors || [];
    updateConfig({ colors: [...colors, 'ff0000'] });
  };

  const handleRemoveColor = (index) => {
    const colors = currentConfig.colors || [];
    updateConfig({ colors: colors.filter((_, i) => i !== index) });
  };

  // Handle swipe gestures
  useEffect(() => {
    if (!isOpen) return;

    let startY = 0;
    let currentY = 0;
    const threshold = 50;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      currentY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const diffY = currentY - startY;
      
      // Swipe down to close
      if (diffY > threshold) {
        onClose();
      }
      // Swipe up to expand
      else if (diffY < -threshold) {
        // Cycle through heights
        if (panelHeight === 'mini') setPanelHeight('normal');
        else if (panelHeight === 'normal') setPanelHeight('expanded');
      }
    };

    const sheet = document.querySelector('.mobile-properties-sheet');
    if (sheet) {
      sheet.addEventListener('touchstart', handleTouchStart);
      sheet.addEventListener('touchmove', handleTouchMove);
      sheet.addEventListener('touchend', handleTouchEnd);

      return () => {
        sheet.removeEventListener('touchstart', handleTouchStart);
        sheet.removeEventListener('touchmove', handleTouchMove);
        sheet.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isOpen, onClose, panelHeight]);

  // Height mapping - account for bottom navigation
  const heightClasses = {
    mini: "h-[30vh] mb-16",
    normal: "h-[50vh] mb-16",
    expanded: "h-[calc(100vh-8rem)]" // Full height minus header and some padding
  };

  // Cycle through heights
  const cycleHeight = () => {
    if (panelHeight === 'mini') setPanelHeight('normal');
    else if (panelHeight === 'normal') setPanelHeight('expanded');
    else setPanelHeight('mini');
  };

  // Render nothing if panel is not open
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 bg-background border-t rounded-t-[10px] shadow-lg",
        "mobile-properties-sheet",
        heightClasses[panelHeight],
        "transition-all duration-300 overflow-hidden flex flex-col"
      )}
    >
      {/* Drag handle */}
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-muted mb-2" />
      
      {/* Custom header with properly spaced buttons */}
      <div className="flex items-start justify-between p-4 pb-2 pt-0">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Properties</h3>
          <Badge 
            variant={baseTemplate && !isModified ? "default" : "outline"} 
            className="w-fit mt-1"
          >
            {baseTemplate ? (isModified ? "Modified" : "Template") : "Custom"}
          </Badge>
        </div>
        
        {/* Button container with proper spacing */}
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleHeight}
            className="h-10 w-10"
            title={`Height: ${panelHeight}`}
          >
            {panelHeight === 'expanded' ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </Button>
          
          {/* Close button moved here for better spacing */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="text-xs">
              <Type className="h-4 w-4 mr-1" />
              Basic
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-xs">
              <Palette className="h-4 w-4 mr-1" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs">
              <Sliders className="h-4 w-4 mr-1" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Text Content
              </label>
              <Input
                value={currentConfig.text}
                onChange={(e) => updateConfig({ text: e.target.value })}
                placeholder="Enter your text..."
                className="w-full text-base" // Larger text for mobile
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Height: {currentConfig.height}px
              </label>
              <input
                type="range"
                min="30"
                max="300"
                value={currentConfig.height}
                onChange={(e) => updateConfig({ height: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((currentConfig.height - 30) / 270) * 100}%, hsl(var(--muted)) ${((currentConfig.height - 30) / 270) * 100}%, hsl(var(--muted)) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>30</span>
                <span>300</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Animation Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['3s', '6s', '10s', '15s'].map((duration) => (
                  <Button
                    key={duration}
                    variant={currentConfig.duration === duration ? "default" : "outline"}
                    onClick={() => updateConfig({ duration })}
                    className="w-full"
                  >
                    {duration === '3s' && 'Fast'}
                    {duration === '6s' && 'Normal'}
                    {duration === '10s' && 'Slow'}
                    {duration === '15s' && 'Very Slow'}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Customize your gradient colors
                </p>
                {baseTemplate && (
                  <p className="text-xs text-muted-foreground">
                    {isModified ? 
                      `Modified from: ${baseTemplate.label || baseTemplate.name}` : 
                      `Using: ${baseTemplate.label || baseTemplate.name}`}
                  </p>
                )}
              </div>
              
              {/* Color picker interface for mobile */}
              <div className="space-y-3">
                {currentConfig.colors?.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative">
                        <input
                          type="color"
                          value={`#${color}`}
                          onChange={(e) => handleColorUpdate(index, e.target.value.substring(1))}
                          className="sr-only"
                          id={`mobile-color-picker-${index}`}
                        />
                        <label
                          htmlFor={`mobile-color-picker-${index}`}
                          className="block w-12 h-12 rounded-md border-2 border-border cursor-pointer hover:border-primary transition-colors"
                          style={{ backgroundColor: `#${color}` }}
                        />
                      </div>
                      <Input
                        value={color}
                        onChange={(e) => handleColorUpdate(index, e.target.value)}
                        placeholder="Hex color"
                        className="font-mono text-sm"
                        maxLength={6}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      {currentConfig.colors.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveColor(index)}
                          className="h-10 w-10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                      {index === currentConfig.colors.length - 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleAddColor}
                          className="h-10 w-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {(!currentConfig.colors || currentConfig.colors.length === 0) && (
                  <Button
                    variant="outline"
                    onClick={handleAddColor}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Color
                  </Button>
                )}
              </div>
              
              {baseTemplate && isModified && (
                <Button
                  onClick={resetToTemplate}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Reset to Template Colors
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Gradient Type ({GRADIENT_TYPES.length} types available)
                </label>
                <div className="max-h-64 overflow-y-auto border rounded-md p-2 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {GRADIENT_TYPES.map(type => (
                      <Button
                        key={type.value}
                        variant={currentConfig.gradientType === type.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateConfig({ gradientType: type.value })}
                        className="justify-start text-xs w-full"
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}