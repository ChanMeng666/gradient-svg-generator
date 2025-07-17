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
  RotateCcw
} from 'lucide-react';

// Dynamic imports for heavy components
const ColorPicker = dynamic(() => import('../components/features/ColorPicker'), { ssr: false });
const PropertiesPanel = dynamic(() => import('../components/features/PropertiesPanel'), { ssr: false });

// Import all templates
import { getAllTemplates, getCategories } from '../utils/templateUtils';

export default function Create() {
  const {
    currentConfig,
    updateConfig,
    setTemplate,
    isCustomMode,
    toggleMode,
    addToRecent
  } = useStore();

  const [previewUrl, setPreviewUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get all templates and categories
  const templates = useMemo(() => getAllTemplates(), []);
  const categories = useMemo(() => getCategories(), []);

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
    currentConfig.colors?.forEach((color, index) => {
      params.append(`color${index}`, color.replace('#', ''));
    });

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
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold">Preview</h2>
                    <Badge variant={isCustomMode ? "outline" : "default"}>
                      {isCustomMode ? "Custom Mode" : "Template Mode"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={resetConfig}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Canvas */}
              <div className={cn(
                "flex-1 flex items-center justify-center p-8",
                isFullscreen && "fixed inset-0 z-50 bg-background"
              )}>
                <Card className="w-full max-w-4xl overflow-hidden shadow-2xl">
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
                    <Button onClick={downloadSVG} className="gap-2">
                      <Download className="h-4 w-4" />
                      Download SVG
                    </Button>
                    <Button
                      variant="outline"
                      onClick={copyCode}
                      className="gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      {isCopied ? "Copied!" : "Copy Code"}
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 className="h-4 w-4" />
                    <code className="font-mono text-xs">
                      {typeof window !== 'undefined' ? window.location.origin : ''}{previewUrl}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Panel */}
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
          </div>
        </div>
      </div>
    </>
  );
}