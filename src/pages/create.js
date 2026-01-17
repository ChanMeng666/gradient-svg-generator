import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import GEOHead from '../components/seo/GEOHead';
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
import { usePreviewUrl } from '../hooks/usePreviewUrl';
import { useMobileUI } from '../hooks/useMobileUI';
import { useColorManagement } from '../hooks/useColorManagement';
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
  const router = useRouter();
  const {
    currentConfig,
    updateConfig,
    setTemplate,
    isCustomMode,
    toggleMode,
    addToRecent,
    favorites,
    toggleFavorite,
    baseTemplate,
    isModified,
    resetToTemplate,
    clearTemplate
  } = useStore();

  // Use custom hooks for cleaner code
  const { previewUrl, fullUrl, markdownCode } = usePreviewUrl();
  const {
    isMobile,
    mobileMenuOpen,
    mobilePropertiesOpen,
    quickTemplatesOpen,
    setMobileMenuOpen,
    setMobilePropertiesOpen,
    setQuickTemplatesOpen,
    closeMobileMenu
  } = useMobileUI();
  const { colors, handleColorUpdate, handleAddColor, handleRemoveColor } = useColorManagement();

  // Local UI state
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get all templates and categories
  const templates = useMemo(() => getAllTemplates(), []);
  const categories = useMemo(() => getCategories(), []);

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

  // Handle template from URL query parameter
  useEffect(() => {
    if (router.isReady && router.query.template) {
      const templateName = router.query.template;
      const template = templates.find(t => t.name === templateName);
      if (template) {
        setTemplate(template);
        addToRecent(template);
      }
    }
  }, [router.isReady, router.query.template, templates, setTemplate, addToRecent]);

  // Handle template selection (memoized to prevent re-renders)
  const handleTemplateSelect = useCallback((template) => {
    setTemplate(template);
    addToRecent(template);
    closeMobileMenu();
  }, [setTemplate, addToRecent, closeMobileMenu]);

  // Copy code to clipboard (memoized)
  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(markdownCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [markdownCode]);

  // Download SVG (memoized)
  const downloadSVG = useCallback(async () => {
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
  }, [previewUrl, currentConfig.text]);

  // Reset to defaults (memoized)
  const resetConfig = useCallback(() => {
    if (baseTemplate && !isModified) {
      // If using an unmodified template, clear it
      clearTemplate();
      updateConfig({
        text: 'Gradient SVG',
        height: 120,
        gradientType: 'horizontal',
        duration: '6s',
        colors: ['ff0080', '7928ca', 'ff0080'],
      });
    } else if (baseTemplate && isModified) {
      // If template is modified, reset to original template
      resetToTemplate();
    } else {
      // If in custom mode, reset to defaults
      updateConfig({
        text: 'Gradient SVG',
        height: 120,
        template: null,
        gradientType: 'horizontal',
        duration: '6s',
        colors: ['ff0080', '7928ca', 'ff0080'],
      });
    }
  }, [baseTemplate, isModified, clearTemplate, resetToTemplate, updateConfig]);

  return (
    <>
      <GEOHead 
        pageType="create"
        customInstructions="This is the main creation interface where users can design custom gradients with real-time preview. Guide users through template selection, color customization, and parameter tuning for optimal results."
      />
      <Head>
        <title>Create Custom Gradients - Gradient SVG Generator | Real-time Editor</title>
        <meta name="description" content="Create beautiful animated SVG gradients with our powerful real-time editor. Choose from 326+ professional templates including Path Animation, Weather, Light & Shadow, Art Movement, and Culinary effects or design your own custom gradients. Free API generation." />
        <meta name="keywords" content="gradient creator, SVG editor, custom gradients, real-time preview, design tool, API generator, path animation, typing animation, weather effects, light shadow, art movement, culinary" />
        <meta property="og:title" content="Gradient Creator - Real-time SVG Editor" />
        <meta property="og:description" content="Professional gradient creation tool with real-time preview and 326+ templates across 30 categories." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        
        <div className={styles.pageContainer}>
          {/* Sidebar - Hidden on mobile, shown via menu */}
          <div className={cn(
            "transition-all duration-300 flex-shrink-0",
            "fixed top-16 left-0 z-40 md:relative md:inset-y-0",
            "md:h-full", // Full height on desktop
            isMobile ? "bottom-0 h-[calc(100vh-4rem)]" : "h-full", // Full height minus header on mobile
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
                      variant={baseTemplate && !isModified ? "default" : "outline"}
                      className={cn(isMobile && "text-xs px-2 py-0.5")}
                    >
                      {baseTemplate ? (isModified ? "Modified" : "Template") : "Custom"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size={isMobile ? "default" : "icon"}
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className={cn(
                        "transition-all",
                        isMobile ? "h-12 w-12" : "h-10 w-10"
                      )}
                    >
                      <Maximize2 className={cn(isMobile ? "h-6 w-6" : "h-4 w-4")} />
                    </Button>
                    <Button
                      variant="outline"
                      size={isMobile ? "default" : "icon"}
                      onClick={resetConfig}
                      className={cn(
                        "transition-all",
                        isMobile ? "h-12 w-12" : "h-10 w-10"
                      )}
                    >
                      <RotateCcw className={cn(isMobile ? "h-6 w-6" : "h-4 w-4")} />
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
                  <div className="hidden lg:block mt-3">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Code2 className="h-4 w-4 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <code className="font-mono text-xs bg-muted px-3 py-2 rounded block break-all whitespace-pre-wrap">
                          https://gradient-svg-generator.vercel.app{previewUrl}
                        </code>
                      </div>
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
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            Customize your gradient colors. Click + to add more colors.
                          </p>
                          {baseTemplate && (
                            <p className="text-xs text-muted-foreground">
                              {isModified ? 
                                `Modified from template: ${baseTemplate.label || baseTemplate.name}` : 
                                `Using template: ${baseTemplate.label || baseTemplate.name}`}
                            </p>
                          )}
                        </div>
                        {currentConfig.colors && currentConfig.colors.length > 0 ? (
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
                        ) : (
                          <Button 
                            onClick={handleAddColor}
                            variant="outline"
                            className="w-full"
                          >
                            Add First Color
                          </Button>
                        )}
                        {baseTemplate && isModified && (
                          <Button
                            onClick={resetToTemplate}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Reset to Original Template Colors
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
            {isMobile && !mobilePropertiesOpen && (
              <div className="fixed bottom-24 right-4 z-20">
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

      {/* Mobile Properties Panel - now uses store directly, simplified props */}
      {isMobile && (
        <MobilePropertiesPanel
          isOpen={mobilePropertiesOpen}
          onClose={() => setMobilePropertiesOpen(false)}
        />
      )}

      {/* Mobile Quick Templates Toggle Button */}
      {isMobile && !isFullscreen && !mobilePropertiesOpen && (
        <div className="fixed bottom-20 left-4 z-20">
          <Button
            size="sm"
            variant={quickTemplatesOpen ? "default" : "outline"}
            className="shadow-lg"
            onClick={() => setQuickTemplatesOpen(!quickTemplatesOpen)}
          >
            <Palette className="h-4 w-4 mr-1" />
            Templates
          </Button>
        </div>
      )}

      {/* Mobile Template Carousel - Collapsible */}
      {isMobile && !isFullscreen && quickTemplatesOpen && !mobilePropertiesOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-30 animate-in slide-in-from-bottom duration-300">
          <div className="bg-background/95 backdrop-blur border-t rounded-t-lg shadow-lg">
            <div className="p-4 pb-20">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">Quick Templates</h3>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setMobileMenuOpen(true)}
                    className="text-xs"
                  >
                    View All
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuickTemplatesOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <SwipeableTemplateCarousel
                templates={templates.slice(0, 12)}
                onTemplateSelect={(template) => {
                  handleTemplateSelect(template);
                  setQuickTemplatesOpen(false); // Auto-close after selection
                }}
                favorites={favorites}
                onFavorite={toggleFavorite}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}