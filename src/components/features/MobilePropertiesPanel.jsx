import React, { useState, useEffect } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Type, Palette, Sliders, ChevronUp, ChevronDown, X } from 'lucide-react';
import { cn } from '../../lib/utils';

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
  const [panelHeight, setPanelHeight] = useState('mini'); // 'mini', 'normal', 'expanded'
  const [activeTab, setActiveTab] = useState('basic');

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

  // Height mapping
  const heightClasses = {
    mini: "h-[25vh]",
    normal: "h-[50vh]",
    expanded: "h-[75vh]"
  };

  // Cycle through heights
  const cycleHeight = () => {
    if (panelHeight === 'mini') setPanelHeight('normal');
    else if (panelHeight === 'normal') setPanelHeight('expanded');
    else setPanelHeight('mini');
  };

  return (
    <SheetContent 
      side="bottom" 
      className={cn(
        "mobile-properties-sheet",
        heightClasses[panelHeight],
        "transition-all duration-300 overflow-hidden flex flex-col"
      )}
      onClose={onClose}
    >
      {/* Custom header with properly spaced buttons */}
      <div className="flex items-start justify-between p-4 pb-2">
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

      <div className="flex-1 overflow-y-auto pb-6 px-4">
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
              <div className="grid grid-cols-3 gap-3">
                {currentConfig.colors?.map((color, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg border-2 border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <Button
                  variant="outline"
                  className="aspect-square"
                  onClick={() => {
                    // Add color picker functionality
                  }}
                >
                  +
                </Button>
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
                  Gradient Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['horizontal', 'vertical', 'diagonal', 'radial'].map((type) => (
                    <Button
                      key={type}
                      variant={currentConfig.gradientType === type ? "default" : "outline"}
                      onClick={() => updateConfig({ gradientType: type })}
                      className="w-full capitalize"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SheetContent>
  );
}