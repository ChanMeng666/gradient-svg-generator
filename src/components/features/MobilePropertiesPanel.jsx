import React, { useState, useEffect } from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Type, Palette, Sliders, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function MobilePropertiesPanel({ 
  isOpen, 
  onClose, 
  currentConfig, 
  updateConfig, 
  isCustomMode 
}) {
  const [expandedHeight, setExpandedHeight] = useState(false);
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
        setExpandedHeight(true);
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
  }, [isOpen, onClose]);

  return (
    <SheetContent 
      side="bottom" 
      className={cn(
        "mobile-properties-sheet",
        expandedHeight ? "h-[80vh]" : "h-[60vh]",
        "transition-all duration-300 overflow-y-auto"
      )}
      onClose={onClose}
    >
      <SheetHeader className="mt-4">
        <div className="flex items-center justify-between">
          <SheetTitle>Properties</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setExpandedHeight(!expandedHeight)}
          >
            {expandedHeight ? <ChevronDown /> : <ChevronUp />}
          </Button>
        </div>
        <Badge variant={isCustomMode ? "outline" : "default"} className="w-fit">
          {isCustomMode ? "Custom Mode" : "Template Mode"}
        </Badge>
      </SheetHeader>

      <div className="mt-6">
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
              <p className="text-sm text-muted-foreground">
                {isCustomMode 
                  ? "Add custom colors to your gradient"
                  : "Colors are defined by the selected template"}
              </p>
              
              {/* Color picker interface for mobile */}
              <div className="grid grid-cols-3 gap-3">
                {currentConfig.colors?.map((color, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg border-2 border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {isCustomMode && (
                  <Button
                    variant="outline"
                    className="aspect-square"
                    onClick={() => {
                      // Add color picker functionality
                    }}
                  >
                    +
                  </Button>
                )}
              </div>
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
                      disabled={!isCustomMode}
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