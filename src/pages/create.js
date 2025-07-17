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
import styles from '../styles/create.module.css';
import { ColorPicker } from '../components/ui/color-picker';
import { GRADIENT_TYPES } from '../constants/gradientTypes';
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
  Menu,
  X
} from 'lucide-react';

// Dynamic imports for heavy components
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
  const [isShared, setIsShared] = useState(false);
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

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen]);

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
    const colors = currentConfig.colors || [];
    if (colors.length > 0) {
      colors.forEach((color, index) => {
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

  return (
    <>
      <Head>
        <title>Create Gradient - Gradient SVG Generator</title>
        <meta name="description" content="Create beautiful animated SVG gradients with our powerful editor. Choose from 216+ templates or design your own." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className={styles.pageContainer}>
          {/* Sidebar - Hidden on mobile, shown via menu */}
          <div className={cn(
            "h-full transition-all duration-300 flex-shrink-0",
            "fixed inset-y-16 left-0 z-40 md:relative md:inset-y-0",
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
          <div className={styles.mainContent}>
            {/* Canvas Area */}
            <div className={styles.canvasArea}>
              {/* Canvas Header */}
              <div className={styles.canvasHeader}>
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
                styles.canvasContent,
                isFullscreen && "fixed inset-0 z-50 bg-background"
              )}>
                {/* Close button for fullscreen mode */}
                {isFullscreen && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 z-10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <div className={styles.canvasWrapper}>
                  <div className="bg-white">
                    {previewUrl && (
                      <img 
                        src={previewUrl}
                        alt="Gradient Preview"
                        className="block"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Bar */}
              <div className={styles.actionsBar}>
                <div className="flex flex-col gap-3">
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
                        onClick={async () => {
                          const shareUrl = `https://gradient-svg-generator.vercel.app${previewUrl}`;
                          const shareText = `Check out this awesome gradient: ${currentConfig.text}`;
                          
                          // Try Web Share API first (mobile)
                          if (navigator.share) {
                            try {
                              await navigator.share({
                                title: 'Gradient SVG',
                                text: shareText,
                                url: shareUrl,
                              });
                            } catch (err) {
                              console.log('Share cancelled');
                            }
                          } else {
                            // Fallback: Copy share link
                            await navigator.clipboard.writeText(shareUrl);
                            setIsShared(true);
                            setTimeout(() => setIsShared(false), 2000);
                          }
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        <span className={cn(isMobile && "hidden sm:inline")}>
                          {isShared ? "Link Copied!" : "Share"}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <code className="font-mono text-xs bg-muted px-2 py-1 rounded block truncate">
                        https://gradient-svg-generator.vercel.app{previewUrl}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Panel - Desktop */}
            {!isMobile && (
              <div className={styles.propertiesPanel}>
                <div className={styles.propertiesContent}>
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
                        <p className="text-sm text-muted-foreground mb-4">
                          {isCustomMode 
                            ? "Add custom colors to your gradient. Click + to add more colors."
                            : "Colors are defined by the selected template"}
                        </p>
                        {isCustomMode && currentConfig.colors && currentConfig.colors.length > 0 && (
                          <div className="space-y-3">
                            {currentConfig.colors.map((color, index) => (
                              <ColorPicker
                                key={index}
                                color={color}
                                index={index}
                                total={currentConfig.colors.length}
                                onUpdate={handleColorUpdate}
                                onAdd={handleAddColor}
                                onRemove={handleRemoveColor}
                              />
                            ))}
                          </div>
                        )}
                        {isCustomMode && (!currentConfig.colors || currentConfig.colors.length === 0) && (
                          <Button 
                            onClick={handleAddColor}
                            variant="outline"
                            className="w-full"
                          >
                            Add First Color
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
                          <div className="max-h-96 overflow-y-auto border rounded-md p-2">
                            <div className="grid grid-cols-2 gap-2">
                              {GRADIENT_TYPES.map(type => (
                                <Button
                                  key={type.value}
                                  variant={currentConfig.gradientType === type.value ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => updateConfig({ gradientType: type.value })}
                                  disabled={!isCustomMode}
                                  className="justify-start text-xs"
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
            )}

            {/* Mobile Properties Button */}
            {isMobile && (
              <div className="fixed bottom-20 right-4 z-20">
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
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t">
          <div className="mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Quick Templates</h3>
          </div>
          <SwipeableTemplateCarousel
            templates={templates.slice(0, 12)} // Show top 12 templates
            onTemplateSelect={handleTemplateSelect}
            favorites={favorites}
            onFavorite={toggleFavorite}
            className="pb-4"
          />
        </div>
      )}
    </>
  );
}