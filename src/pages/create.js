import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Sheet } from '../components/ui/sheet';
import { cn } from '../lib/utils';
import useStore from '../store/useStore';
import { 
  Download, 
  Copy, 
  Maximize2, 
  Settings,
  Palette,
  Type,
  Sliders,
  Code2,
  Share2,
  RotateCcw,
  Menu
} from 'lucide-react';

// Dynamic imports for heavy components
const ColorPicker = dynamic(() => import('../components/features/ColorPicker'), { ssr: false });
const PropertiesPanel = dynamic(() => import('../components/features/PropertiesPanel'), { ssr: false });
const MobilePropertiesPanel = dynamic(() => import('../components/features/MobilePropertiesPanel'), { ssr: false });
const SwipeableTemplateCarousel = dynamic(() => import('../components/features/SwipeableTemplateCarousel'), { ssr: false });

// Import all templates
import { getAllTemplates, getCategories } from '../utils/templateUtils';

export default function Create() {
  const {
    currentConfig,
    updateConfig,
    setTemplate,
    isCustomMode,
    toggleMode,
    addToRecent,
    favorites,
    toggleFavorite
  } = useStore();

  const [previewUrl, setPreviewUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get all templates and categories
  const templates = useMemo(() => getAllTemplates(), []);
  const categories = useMemo(() => getCategories(), []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate preview URL
  useEffect(() => {
    const params = new URLSearchParams({
      text: currentConfig.text || 'Preview',
      height: currentConfig.height || 120,
      ...(currentConfig.template && { template: currentConfig.template }),
      ...(currentConfig.gradientType && { gradientType: currentConfig.gradientType }),
      ...(currentConfig.duration && { duration: currentConfig.duration }),
    });

    // Add colors
    if (currentConfig.colors && currentConfig.colors.length > 0) {
      currentConfig.colors.forEach((color, index) => {
        params.append(`color${index}`, color.replace('#', ''));
      });
    }

    setPreviewUrl(`/api/svg?${params.toString()}`);
  }, [currentConfig]);

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setTemplate(template);
    addToRecent(template);
    setMobileMenuOpen(false);
  };

  // Copy code to clipboard
  const copyCode = async () => {
    const code = `![${currentConfig.text}](${window.location.origin}${previewUrl})`;
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download SVG
  const downloadSVG = async () => {
    const response = await fetch(previewUrl);
    const svgText = await response.text();
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentConfig.text || 'gradient'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Reset to defaults
  const resetConfig = () => {
    updateConfig({
      text: 'Gradient SVG',
      height: 120,
      template: null,
      gradientType: 'horizontal',
      duration: '6s',
      colors: [],
    });
    toggleMode(); // Switch to custom mode
  };

  return (
    <>
      <Head>
        <title>Create Gradient - Gradient SVG Generator</title>
        <meta name="description" content="Create beautiful animated SVG gradients with our powerful editor. Choose from 216+ templates or design your own." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar - Hidden on mobile, shown via menu */}
          <div className={cn(
            "fixed inset-y-16 left-0 z-40 w-80 transform transition-transform md:relative md:inset-y-0 md:transform-none",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}>
            <Sidebar
              templates={templates}
              categories={categories}
              onTemplateSelect={handleTemplateSelect}
            />
          </div>

          {/* Mobile overlay */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Canvas Area */}
            <div className="flex-1 flex flex-col bg-muted/30">
              {/* Canvas Header */}
              <div className="border-b bg-background/95 backdrop-blur p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <h2 className={cn(
                      "font-semibold",
                      isMobile ? "text-base" : "text-lg"
                    )}>Preview</h2>
                    <Badge 
                      variant={isCustomMode ? "outline" : "default"}
                      className={cn(isMobile && "text-xs px-2 py-0.5")}
                    >
                      {isCustomMode ? "Custom" : "Template"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size={isMobile ? "sm" : "icon"}
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className={cn(isMobile && "h-8 w-8")}
                    >
                      <Maximize2 className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />
                    </Button>
                    <Button
                      variant="outline"
                      size={isMobile ? "sm" : "icon"}
                      onClick={resetConfig}
                      className={cn(isMobile && "h-8 w-8")}
                    >
                      <RotateCcw className={cn(isMobile ? "h-3 w-3" : "h-4 w-4")} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Canvas */}
              <div className={cn(
                "flex-1 flex items-center justify-center",
                isMobile ? "p-4" : "p-8",
                isFullscreen && "fixed inset-0 z-50 bg-background"
              )}>
                <Card className={cn(
                  "w-full overflow-hidden shadow-2xl",
                  !isMobile && "max-w-4xl"
                )}>
                  <div className="aspect-[2/1] bg-white flex items-center justify-center">
                    {previewUrl && (
                      <img 
                        src={previewUrl}
                        alt="Gradient Preview"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </Card>
              </div>

              {/* Actions Bar */}
              <div className="border-t bg-background/95 backdrop-blur p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={downloadSVG} 
                      className={cn(
                        "gap-2",
                        isMobile && "text-xs px-3"
                      )}
                    >
                      <Download className="h-4 w-4" />
                      <span className={cn(isMobile && "hidden sm:inline")}>Download</span>
                      {isMobile && "SVG"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={copyCode}
                      className={cn(
                        "gap-2",
                        isMobile && "text-xs px-3"
                      )}
                    >
                      <Copy className="h-4 w-4" />
                      <span className={cn(isMobile && "hidden sm:inline")}>
                        {isCopied ? "Copied!" : "Copy Code"}
                      </span>
                      {isMobile && (isCopied ? "✓" : "Copy")}
                    </Button>
                    <Button 
                      variant="outline" 
                      className={cn(
                        "gap-2",
                        isMobile && "text-xs px-3"
                      )}
                    >
                      <Share2 className="h-4 w-4" />
                      <span className={cn(isMobile && "hidden sm:inline")}>Share</span>
                    </Button>
                  </div>
                  <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 className="h-4 w-4" />
                    <code className="font-mono text-xs">
                      {typeof window !== 'undefined' ? window.location.origin : ''}{previewUrl}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Panel - Desktop */}
            {!isMobile && (
              <div className="w-full lg:w-96 border-l bg-background overflow-y-auto">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Properties</h2>
                  
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic" className="gap-1">
                        <Type className="h-4 w-4" />
                        Basic
                      </TabsTrigger>
                      <TabsTrigger value="colors" className="gap-1">
                        <Palette className="h-4 w-4" />
                        Colors
                      </TabsTrigger>
                      <TabsTrigger value="advanced" className="gap-1">
                        <Sliders className="h-4 w-4" />
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
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Height (px)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="30"
                            max="300"
                            value={currentConfig.height}
                            onChange={(e) => updateConfig({ height: parseInt(e.target.value) })}
                            className="flex-1"
                          />
                          <span className="text-sm font-mono w-12 text-right">
                            {currentConfig.height}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Animation Duration
                        </label>
                        <select
                          value={currentConfig.duration}
                          onChange={(e) => updateConfig({ duration: e.target.value })}
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="3s">Fast (3s)</option>
                          <option value="6s">Normal (6s)</option>
                          <option value="10s">Slow (10s)</option>
                          <option value="15s">Very Slow (15s)</option>
                        </select>
                      </div>
                    </TabsContent>

                    <TabsContent value="colors" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {isCustomMode 
                            ? "Add custom colors to your gradient"
                            : "Colors are defined by the selected template"}
                        </p>
                        {/* Color picker component would go here */}
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Gradient Type
                          </label>
                          <select
                            value={currentConfig.gradientType}
                            onChange={(e) => updateConfig({ gradientType: e.target.value })}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            disabled={!isCustomMode}
                          >
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                            <option value="diagonal">Diagonal</option>
                            <option value="radial">Radial</option>
                            <option value="conical">Conical</option>
                          </select>
                        </div>
                        {/* More advanced options would go here */}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}

            {/* Mobile Properties Button */}
            {isMobile && (
              <div className="fixed bottom-4 right-4 z-20">
                <Button 
                  size="icon"
                  className="h-14 w-14 rounded-full shadow-lg"
                  onClick={() => setMobilePropertiesOpen(true)}
                >
                  <Settings className="h-6 w-6" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Properties Panel */}
      {isMobile && (
        <MobilePropertiesPanel
          isOpen={mobilePropertiesOpen}
          onClose={() => setMobilePropertiesOpen(false)}
          currentConfig={currentConfig}
          updateConfig={updateConfig}
          isCustomMode={isCustomMode}
        />
      )}

      {/* Mobile Template Carousel - Show on mobile when not in fullscreen */}
      {isMobile && !isFullscreen && !mobilePropertiesOpen && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
          <div className="mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Quick Templates</h3>
          </div>
          <SwipeableTemplateCarousel
            templates={templates.slice(0, 12)} // Show top 12 templates
            onTemplateSelect={handleTemplateSelect}
            favorites={favorites}
            onFavorite={toggleFavorite}
            className="pb-16" // Add padding for the floating button
          />
        </div>
      )}
    </>
  );
}