import React, { useState, useMemo, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
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

// Dynamic import for virtualized grid
const VirtualizedTemplateGrid = dynamic(
  () => import('../components/features/VirtualizedTemplateGrid'),
  { ssr: false }
);

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  
  const { favorites, addFavorite, removeFavorite } = useStore();

  const templates = useMemo(() => getAllTemplates(), []);
  const categories = useMemo(() => getCategories(), []);
  
  // Measure container size for virtualization
  useEffect(() => {
    const measureContainer = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: window.innerHeight - 300 // Adjust based on header/filter height
        });
      }
    };

    measureContainer();
    window.addEventListener('resize', measureContainer);
    return () => window.removeEventListener('resize', measureContainer);
  }, []);

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

    return result;
  }, [templates, selectedCategory, searchQuery]);

  return (
    <>
      <Head>
        <title>Template Gallery - Gradient SVG Generator</title>
        <meta name="description" content="Browse 216+ professional gradient templates across 22 categories. Find the perfect animated SVG gradient for your project." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />

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
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </section>

        {/* Template Grid/List */}
        <section className="container mx-auto px-4 pb-20" ref={containerRef}>
          {viewMode === 'grid' ? (
            containerSize.width > 0 && filteredTemplates.length > 20 ? (
              // Use virtualization for large datasets
              <VirtualizedTemplateGrid
                templates={filteredTemplates}
                favorites={favorites}
                onFavorite={(templateName) => {
                  if (favorites.includes(templateName)) {
                    removeFavorite(templateName);
                  } else {
                    addFavorite(templateName);
                  }
                }}
                width={containerSize.width}
                height={containerSize.height}
                columnCount={
                  containerSize.width < 640 ? 1 :
                  containerSize.width < 768 ? 2 :
                  containerSize.width < 1024 ? 3 : 4
                }
              />
            ) : (
              // Use regular grid for small datasets
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                <Card key={template.name} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-video bg-muted relative group">
                    <img
                      src={`/api/svg?text=PREVIEW&template=${template.name}&height=150`}
                      alt={template.displayName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.preventDefault();
                        if (favorites.includes(template.name)) {
                          removeFavorite(template.name);
                        } else {
                          addFavorite(template.name);
                        }
                      }}
                    >
                      <Star className={cn("h-4 w-4", favorites.includes(template.name) && "fill-current text-yellow-500")} />
                    </Button>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{template.displayName}</CardTitle>
                    <CardDescription className="text-sm">
                      {categories.find(c => c.id === template.category)?.icon} {template.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>
              ))}
              </div>
            )
          ) : (
            <div className="space-y-4">
              {filteredTemplates.map((template) => (
                <Card key={template.name} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-32 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={`/api/svg?text=PREVIEW&template=${template.name}&height=80`}
                        alt={template.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{template.displayName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {categories.find(c => c.id === template.category)?.icon} {template.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
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
              ))}
            </div>
          )}

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No templates found matching your criteria.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
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