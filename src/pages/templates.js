import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/layout/Header';
import GEOHead from '../components/seo/GEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { getAllTemplates, getCategories, getTemplatesByCategory } from '../utils/templateUtils';
import { Search, Grid3x3, List, Filter, ChevronRight, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import useStore from '../store/useStore';
import TemplatePreviewModal from '../components/features/TemplatePreviewModal';

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { favorites, addFavorite, removeFavorite } = useStore();

  // Refs for virtualization
  const gridContainerRef = useRef(null);
  const listContainerRef = useRef(null);
  const [columnCount, setColumnCount] = useState(4);

  // Calculate column count based on container width
  useEffect(() => {
    const calculateColumns = () => {
      if (!gridContainerRef.current) return;
      const width = gridContainerRef.current.offsetWidth;
      if (width < 768) setColumnCount(1);
      else if (width < 1024) setColumnCount(2);
      else if (width < 1280) setColumnCount(3);
      else setColumnCount(4);
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, []);

  const templates = useMemo(() => getAllTemplates(), []);
  const categories = useMemo(() => getCategories(), []);
  
  // Get available gradient types and animation speeds from actual templates
  const availableGradientTypes = useMemo(() => {
    const types = new Set();
    templates.forEach(t => {
      if (t.gradientType) {
        types.add(t.gradientType);
      }
    });
    return Array.from(types).sort();
  }, [templates]);
  
  const availableAnimationSpeeds = useMemo(() => {
    const speeds = new Map();
    templates.forEach(t => {
      const duration = t.animationDuration || '6s';
      const seconds = parseInt(duration);
      if (seconds <= 4) {
        speeds.set('fast', true);
      } else if (seconds >= 5 && seconds <= 8) {
        speeds.set('normal', true);
      } else if (seconds >= 9) {
        speeds.set('slow', true);
      }
    });
    return Array.from(speeds.keys());
  }, [templates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let result = templates;

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(t => t.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(query) ||
        t.displayName.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    // Advanced filters
    if (selectedFilters.length > 0) {
      const gradientTypeFilters = selectedFilters.filter(f => 
        availableGradientTypes.includes(f)
      );
      const speedFilters = selectedFilters.filter(f => 
        ['fast', 'normal', 'slow'].includes(f)
      );

      if (gradientTypeFilters.length > 0) {
        result = result.filter(t => gradientTypeFilters.includes(t.gradientType));
      }

      if (speedFilters.length > 0) {
        result = result.filter(t => {
          const duration = t.animationDuration || '6s';
          const seconds = parseInt(duration);
          if (speedFilters.includes('fast') && seconds <= 4) return true;
          if (speedFilters.includes('normal') && seconds >= 5 && seconds <= 8) return true;
          if (speedFilters.includes('slow') && seconds >= 9) return true;
          return false;
        });
      }
    }

    return result;
  }, [templates, selectedCategory, searchQuery, selectedFilters, availableGradientTypes]);

  // Group templates into rows for grid virtualization
  const gridRows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < filteredTemplates.length; i += columnCount) {
      rows.push(filteredTemplates.slice(i, i + columnCount));
    }
    return rows;
  }, [filteredTemplates, columnCount]);

  // Grid virtualizer (row-based)
  const gridVirtualizer = useVirtualizer({
    count: gridRows.length,
    getScrollElement: () => gridContainerRef.current,
    estimateSize: () => 280, // Approximate height of each row
    overscan: 2,
  });

  // List virtualizer
  const listVirtualizer = useVirtualizer({
    count: filteredTemplates.length,
    getScrollElement: () => listContainerRef.current,
    estimateSize: () => 100, // Height of list item
    overscan: 3,
  });

  // Memoized toggle favorite handler
  const handleToggleFavorite = useCallback((e, templateName) => {
    e.preventDefault();
    if (favorites.includes(templateName)) {
      removeFavorite(templateName);
    } else {
      addFavorite(templateName);
    }
  }, [favorites, addFavorite, removeFavorite]);

  return (
    <>
      <GEOHead 
        pageType="templates"
        templateCategory={selectedCategory}
        customInstructions={`Template gallery with ${filteredTemplates.length} templates. ${selectedCategory !== 'all' ? `Currently viewing ${selectedCategory} category.` : 'All categories available.'} Help users find appropriate templates based on their project needs and provide direct API usage examples.`}
      />
      <Head>
        <title>Template Gallery - 326+ Professional Gradient Templates | Chromaflow</title>
        <meta name="description" content="Browse 326+ professional gradient templates across 30 categories including Path Animation, Weather, Light & Shadow, Art Movement, and Culinary effects. Perfect for GitHub headers, web projects, and design work. Free API access to all templates." />
        <meta name="keywords" content="gradient templates, SVG templates, design gallery, GitHub headers, professional gradients, template library, path animation, typing animation, weather effects, light shadow, art movement, culinary" />
        <meta property="og:title" content="326+ Professional Gradient Templates" />
        <meta property="og:description" content="Browse our comprehensive template gallery with 326+ gradients for every project type across 30 categories, including Path-Based Text Animation, Weather, Light & Shadow, Art Movement, and Culinary categories." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header showMobileMenu={false} />

        {/* Hero Section */}
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Template Gallery</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Browse our collection of {templates.length}+ professional gradient templates. 
                Each template is carefully crafted with unique animations and effects.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters and View Options */}
        <section className="sticky top-16 z-30 bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Category Tabs */}
              <div className="flex-1 overflow-x-auto">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="all">
                      All Templates
                      <Badge variant="secondary" className="ml-2">{templates.length}</Badge>
                    </TabsTrigger>
                    {categories.map(category => (
                      <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                        <span className="mr-1">{category.icon}</span>
                        {category.name}
                        <Badge variant="secondary" className="ml-2">
                          {getTemplatesByCategory(category.id).length}
                        </Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Summary */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTemplates.length} of {templates.length} templates
              {searchQuery && ` for "${searchQuery}"`}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </section>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <section className="border-b bg-muted/10">
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Filter by Gradient Type ({availableGradientTypes.length} types)</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableGradientTypes.length > 0 ? (
                      availableGradientTypes.map((type) => (
                        <Badge
                          key={type}
                          variant={selectedFilters.includes(type) ? "default" : "outline"}
                          className="cursor-pointer capitalize"
                          onClick={() => {
                            setSelectedFilters(prev => 
                              prev.includes(type) 
                                ? prev.filter(f => f !== type)
                                : [...prev, type]
                            );
                          }}
                        >
                          {type.replace(/([A-Z])/g, ' $1').trim()}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No gradient types available</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Filter by Animation Speed</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableAnimationSpeeds.length > 0 ? (
                      availableAnimationSpeeds.map((speed) => (
                        <Badge
                          key={speed}
                          variant={selectedFilters.includes(speed) ? "default" : "outline"}
                          className="cursor-pointer capitalize"
                          onClick={() => {
                            setSelectedFilters(prev => 
                              prev.includes(speed) 
                                ? prev.filter(f => f !== speed)
                                : [...prev, speed]
                            );
                          }}
                        >
                          {speed}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No animation speeds available</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFilters([])}
                    disabled={selectedFilters.length === 0}
                  >
                    Clear Filters
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {selectedFilters.length} filter{selectedFilters.length !== 1 ? 's' : ''} active
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Template Grid/List with Virtualization */}
        <section className="container mx-auto px-4 pb-20">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No templates found matching your criteria.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div
              ref={gridContainerRef}
              className="h-[calc(100vh-400px)] min-h-[400px] overflow-y-auto"
            >
              <div
                style={{
                  height: `${gridVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {gridVirtualizer.getVirtualItems().map((virtualRow) => {
                  const rowTemplates = gridRows[virtualRow.index];
                  return (
                    <div
                      key={virtualRow.index}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
                        {rowTemplates.map((template) => (
                          <div key={template.name} className="group">
                            <div className="aspect-video bg-muted relative overflow-hidden rounded-lg border hover:shadow-lg transition-all">
                              <img
                                src={`/api/svg?text=PREVIEW&template=${template.name}&height=150&v=2`}
                                alt={template.displayName}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                              <Button
                                size="icon"
                                variant="secondary"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => handleToggleFavorite(e, template.name)}
                              >
                                <Star className={cn("h-4 w-4", favorites.includes(template.name) && "fill-current text-yellow-500")} />
                              </Button>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold mb-1">{template.displayName}</h3>
                              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                                {categories.find(c => c.id === template.category)?.icon} {template.category}
                              </p>
                              <div className="flex gap-2">
                                <Link href={`/create?template=${template.name}`} className="flex-1">
                                  <Button className="w-full" size="sm">
                                    Use Template
                                  </Button>
                                </Link>
                                <Button variant="outline" size="sm" onClick={() => {
                                  setSelectedTemplate(template);
                                  setIsModalOpen(true);
                                }}>
                                  Preview
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              ref={listContainerRef}
              className="h-[calc(100vh-400px)] min-h-[400px] overflow-y-auto"
            >
              <div
                style={{
                  height: `${listVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {listVirtualizer.getVirtualItems().map((virtualRow) => {
                  const template = filteredTemplates[virtualRow.index];
                  return (
                    <div
                      key={template.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <Card className="overflow-hidden hover:shadow-md transition-all mb-4">
                        <div className="flex items-center gap-4 p-4">
                          <div className="w-32 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={`/api/svg?text=PREVIEW&template=${template.name}&height=80&v=2`}
                              alt={template.displayName}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{template.displayName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {categories.find(c => c.id === template.category)?.icon} {template.category}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={(e) => handleToggleFavorite(e, template.name)}
                            >
                              <Star className={cn("h-4 w-4", favorites.includes(template.name) && "fill-current text-yellow-500")} />
                            </Button>
                            <Link href={`/create?template=${template.name}`}>
                              <Button className="gap-2">
                                Use Template
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
        
        <TemplatePreviewModal
          template={selectedTemplate}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTemplate(null);
          }}
          onFavorite={(templateName) => {
            if (favorites.includes(templateName)) {
              removeFavorite(templateName);
            } else {
              addFavorite(templateName);
            }
          }}
          isFavorite={selectedTemplate && favorites.includes(selectedTemplate.name)}
        />
      </div>
    </>
  );
}