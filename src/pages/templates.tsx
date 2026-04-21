import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/layout/Header';
import GEOHead from '../components/seo/GEOHead';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Search,
  Grid3x3,
  List,
  SlidersHorizontal,
  Star,
  X,
  ChevronRight,
  Sparkles,
  Layers,
  LayoutGrid,
  SearchX,
} from 'lucide-react';
import { cn } from '../lib/utils';
import useStore from '../store/useStore';
import TemplatePreviewModal from '../components/features/TemplatePreviewModal';
import TemplateCard from '../components/features/TemplateCard';
import { getAllTemplates, getCategories, getTemplatesByCategory } from '../utils/templateUtils';

interface TemplateRecord {
  name: string;
  displayName: string;
  label?: string;
  category: string;
  gradientType?: string;
  animationDuration?: string;
  description?: string;
  colors?: string[];
}

interface CategoryMeta {
  id: string;
  name: string;
  icon: string;
}

type ViewMode = 'grid' | 'list';

const CARD_MIN_WIDTH = 300;
const ROW_GAP = 24;
const GRID_ROW_HEIGHT = 224 + ROW_GAP;
const LIST_ROW_HEIGHT = 104;

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const { favorites, addFavorite, removeFavorite } = useStore();

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const el = gridContainerRef.current;
    if (!el) return;

    const compute = (width: number) => {
      if (width <= 0) return;
      const cols = Math.max(1, Math.floor((width + ROW_GAP) / (CARD_MIN_WIDTH + ROW_GAP)));
      setColumnCount(cols);
    };

    compute(el.clientWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        compute(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [viewMode]);

  const templates = useMemo<TemplateRecord[]>(() => getAllTemplates() as TemplateRecord[], []);
  const categories = useMemo<CategoryMeta[]>(() => getCategories() as CategoryMeta[], []);

  const categoryMap = useMemo(() => {
    const map = new Map<string, CategoryMeta>();
    categories.forEach((c) => map.set(c.id, c));
    return map;
  }, [categories]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    categories.forEach((c) => {
      counts.set(c.id, getTemplatesByCategory(c.id).length);
    });
    return counts;
  }, [categories]);

  const availableGradientTypes = useMemo(() => {
    const types = new Set<string>();
    templates.forEach((t) => {
      if (t.gradientType) types.add(t.gradientType);
    });
    return Array.from(types).sort();
  }, [templates]);

  const availableAnimationSpeeds = useMemo(() => {
    const speeds = new Set<string>();
    templates.forEach((t) => {
      const seconds = parseInt(t.animationDuration || '6s');
      if (seconds <= 4) speeds.add('fast');
      else if (seconds <= 8) speeds.add('normal');
      else speeds.add('slow');
    });
    return Array.from(speeds);
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    let result = templates;

    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (favoritesOnly) {
      result = result.filter((t) => favorites.includes(t.name));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.displayName.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q),
      );
    }

    if (selectedFilters.length > 0) {
      const gradientTypeFilters = selectedFilters.filter((f) => availableGradientTypes.includes(f));
      const speedFilters = selectedFilters.filter((f) => ['fast', 'normal', 'slow'].includes(f));

      if (gradientTypeFilters.length > 0) {
        result = result.filter(
          (t) => t.gradientType && gradientTypeFilters.includes(t.gradientType),
        );
      }

      if (speedFilters.length > 0) {
        result = result.filter((t) => {
          const seconds = parseInt(t.animationDuration || '6s');
          if (speedFilters.includes('fast') && seconds <= 4) return true;
          if (speedFilters.includes('normal') && seconds >= 5 && seconds <= 8) return true;
          if (speedFilters.includes('slow') && seconds >= 9) return true;
          return false;
        });
      }
    }

    return result;
  }, [
    templates,
    selectedCategory,
    favoritesOnly,
    favorites,
    searchQuery,
    selectedFilters,
    availableGradientTypes,
  ]);

  const gridRows = useMemo(() => {
    const rows: TemplateRecord[][] = [];
    for (let i = 0; i < filteredTemplates.length; i += columnCount) {
      rows.push(filteredTemplates.slice(i, i + columnCount));
    }
    return rows;
  }, [filteredTemplates, columnCount]);

  const gridVirtualizer = useVirtualizer({
    count: gridRows.length,
    getScrollElement: () => gridContainerRef.current,
    estimateSize: () => GRID_ROW_HEIGHT,
    overscan: 3,
  });

  const listVirtualizer = useVirtualizer({
    count: filteredTemplates.length,
    getScrollElement: () => listContainerRef.current,
    estimateSize: () => LIST_ROW_HEIGHT,
    overscan: 4,
  });

  const handleToggleFavorite = useCallback(
    (templateName: string) => {
      if (favorites.includes(templateName)) {
        removeFavorite(templateName);
      } else {
        addFavorite(templateName);
      }
    },
    [favorites, addFavorite, removeFavorite],
  );

  const handleListFavorite = useCallback(
    (e: MouseEvent<HTMLButtonElement>, templateName: string) => {
      e.preventDefault();
      e.stopPropagation();
      handleToggleFavorite(templateName);
    },
    [handleToggleFavorite],
  );

  const openPreview = useCallback(
    (templateName: string) => {
      const t = filteredTemplates.find((x) => x.name === templateName);
      if (t) {
        setSelectedTemplate(t);
        setIsModalOpen(true);
      }
    },
    [filteredTemplates],
  );

  const clearAll = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFilters([]);
    setFavoritesOnly(false);
  }, []);

  const activeFilterCount =
    selectedFilters.length + (favoritesOnly ? 1 : 0) + (selectedCategory !== 'all' ? 1 : 0);

  return (
    <>
      <GEOHead
        pageType="templates"
        templateCategory={selectedCategory}
        customInstructions={`Template gallery with ${filteredTemplates.length} templates. ${selectedCategory !== 'all' ? `Currently viewing ${selectedCategory} category.` : 'All categories available.'} Help users find appropriate templates based on their project needs and provide direct API usage examples.`}
      />
      <Head>
        <title>Template Gallery - 340+ Professional Gradient Templates | Chromaflow</title>
        <meta
          name="description"
          content="Browse 340+ professional gradient templates across 19 categories including Path Animation, Weather, Light & Shadow, Art Movement, and Culinary effects. Perfect for GitHub headers, web projects, and design work. Free API access to all templates."
        />
        <meta
          name="keywords"
          content="gradient templates, SVG templates, design gallery, GitHub headers, professional gradients, template library, path animation, typing animation, weather effects, light shadow, art movement, culinary"
        />
        <meta property="og:title" content="340+ Professional Gradient Templates" />
        <meta
          property="og:description"
          content="Browse our comprehensive template gallery with 340+ gradients for every project type across 19 categories, including Path-Based Text Animation, Weather, Light & Shadow, Art Movement, and Culinary categories."
        />
      </Head>

      <div className="min-h-screen bg-background">
        <Header showMobileMenu={false} />

        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-muted/40 via-background to-background">
          <div className="container mx-auto px-4 py-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Template Gallery
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Find the perfect gradient for your project
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                {templates.length} professionally crafted templates across {categories.length}{' '}
                categories, with unique animations and live preview.
              </p>

              <div className="relative mx-auto max-w-xl">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, category, or effect…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-10 pr-10 rounded-full"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  {templates.length}+ Templates
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  {categories.length} Categories
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  {availableGradientTypes.length}+ Gradient Types
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky: categories + toolbar + filter panel */}
        <div className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          {/* Category pills */}
          <div className="container mx-auto px-4">
            <div className="-mx-4 overflow-x-auto px-4 scroll-smooth">
              <div className="flex items-center gap-2 py-3 min-w-max">
                <CategoryPill
                  active={selectedCategory === 'all'}
                  label="All"
                  count={templates.length}
                  onClick={() => setSelectedCategory('all')}
                />
                {categories.map((c) => (
                  <CategoryPill
                    key={c.id}
                    active={selectedCategory === c.id}
                    label={c.name}
                    icon={c.icon}
                    count={categoryCounts.get(c.id) ?? 0}
                    onClick={() => setSelectedCategory(c.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-3 border-t py-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{filteredTemplates.length}</span>
                <span className="hidden sm:inline"> of {templates.length}</span> templates
                {searchQuery && (
                  <span className="ml-1">
                    for <span className="text-foreground">&ldquo;{searchQuery}&rdquo;</span>
                  </span>
                )}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFavoritesOnly((v) => !v)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md border h-9 px-3 text-sm font-medium transition-colors',
                    favoritesOnly
                      ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-700 dark:text-yellow-400'
                      : 'bg-background border-input text-muted-foreground hover:text-foreground hover:bg-accent',
                  )}
                  aria-pressed={favoritesOnly}
                >
                  <Star
                    className={cn('h-4 w-4', favoritesOnly && 'fill-current text-yellow-500')}
                  />
                  <span className="hidden sm:inline">Favorites</span>
                  {favorites.length > 0 && (
                    <span
                      className={cn(
                        'ml-0.5 rounded px-1.5 text-[11px] leading-5',
                        favoritesOnly
                          ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {favorites.length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowFilters((v) => !v)}
                  aria-expanded={showFilters}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-md border h-9 px-3 text-sm font-medium transition-colors',
                    showFilters || selectedFilters.length > 0
                      ? 'bg-primary/10 border-primary/40 text-primary'
                      : 'bg-background border-input text-muted-foreground hover:text-foreground hover:bg-accent',
                  )}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {selectedFilters.length > 0 && (
                    <span className="ml-0.5 rounded bg-primary px-1.5 text-[11px] leading-5 text-primary-foreground">
                      {selectedFilters.length}
                    </span>
                  )}
                </button>

                <div className="flex items-center rounded-md border bg-background p-0.5">
                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded transition-colors',
                      viewMode === 'grid'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded transition-colors',
                      viewMode === 'list'
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="border-t bg-muted/20">
              <div className="container mx-auto px-4 py-5 space-y-5">
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Gradient Type
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {availableGradientTypes.length} types
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {availableGradientTypes.map((type) => {
                      const active = selectedFilters.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setSelectedFilters((prev) =>
                              prev.includes(type)
                                ? prev.filter((f) => f !== type)
                                : [...prev, type],
                            );
                          }}
                          className={cn(
                            'rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors',
                            active
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-input bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30',
                          )}
                        >
                          {type.replace(/([A-Z])/g, ' $1').trim()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Animation Speed
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {availableAnimationSpeeds.map((speed) => {
                      const active = selectedFilters.includes(speed);
                      return (
                        <button
                          key={speed}
                          type="button"
                          onClick={() => {
                            setSelectedFilters((prev) =>
                              prev.includes(speed)
                                ? prev.filter((f) => f !== speed)
                                : [...prev, speed],
                            );
                          }}
                          className={cn(
                            'rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors',
                            active
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-input bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30',
                          )}
                        >
                          {speed}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedFilters.length > 0 && (
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-muted-foreground">
                      {selectedFilters.length} filter{selectedFilters.length !== 1 ? 's' : ''}{' '}
                      active
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFilters([])}
                      className="h-7 text-xs"
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Active filter summary */}
          {activeFilterCount > 0 && !showFilters && (
            <div className="border-t bg-muted/10">
              <div className="container mx-auto px-4 py-2.5 flex items-center gap-2 overflow-x-auto">
                <span className="text-xs text-muted-foreground shrink-0">Active:</span>
                {selectedCategory !== 'all' && (
                  <FilterChip
                    label={categoryMap.get(selectedCategory)?.name ?? selectedCategory}
                    onRemove={() => setSelectedCategory('all')}
                  />
                )}
                {favoritesOnly && (
                  <FilterChip label="Favorites" onRemove={() => setFavoritesOnly(false)} />
                )}
                {selectedFilters.map((f) => (
                  <FilterChip
                    key={f}
                    label={f.replace(/([A-Z])/g, ' $1').trim()}
                    onRemove={() => setSelectedFilters((prev) => prev.filter((x) => x !== f))}
                  />
                ))}
                <button
                  type="button"
                  onClick={clearAll}
                  className="ml-auto shrink-0 text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <section className="container mx-auto px-4 pt-6 pb-20">
          {filteredTemplates.length === 0 ? (
            <EmptyState
              hasActiveFilters={activeFilterCount > 0 || !!searchQuery}
              onClear={clearAll}
            />
          ) : viewMode === 'grid' ? (
            <div
              ref={gridContainerRef}
              className="h-[calc(100vh-360px)] min-h-[480px] overflow-y-auto -mx-1 px-1"
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
                      <div
                        className="grid pb-6"
                        style={{
                          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                          gap: `${ROW_GAP}px`,
                        }}
                      >
                        {rowTemplates.map((template) => (
                          <TemplateCard
                            key={template.name}
                            template={{
                              name: template.name,
                              displayName: template.displayName,
                              category: template.category,
                              categoryIcon: categoryMap.get(template.category)?.icon,
                            }}
                            isFavorite={favorites.includes(template.name)}
                            onToggleFavorite={handleToggleFavorite}
                            onPreview={openPreview}
                          />
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
              className="h-[calc(100vh-360px)] min-h-[480px] overflow-y-auto"
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
                  const cat = categoryMap.get(template.category);
                  const isFav = favorites.includes(template.name);
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
                      <div
                        onClick={() => openPreview(template.name)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openPreview(template.name);
                          }
                        }}
                        className="group mb-3 flex items-center gap-4 rounded-xl border bg-card p-3 pr-4 transition-all cursor-pointer hover:border-primary/40 hover:shadow-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <div className="h-20 w-32 shrink-0 overflow-hidden rounded-md bg-muted">
                          <img
                            src={`/api/svg?text=${encodeURIComponent(template.displayName)}&template=${template.name}&height=80&v=2`}
                            alt={template.displayName}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="truncate font-semibold text-base">
                            {template.displayName}
                          </h3>
                          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="font-normal">
                              {cat?.icon ? <span className="mr-1">{cat.icon}</span> : null}
                              <span className="capitalize">{template.category}</span>
                            </Badge>
                            {template.gradientType && (
                              <span className="capitalize truncate">
                                {template.gradientType.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            )}
                            {template.animationDuration && (
                              <span className="hidden md:inline">
                                · {template.animationDuration}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                            onClick={(e) => handleListFavorite(e, template.name)}
                            className={cn(
                              'inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors',
                              isFav
                                ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-500'
                                : 'border-input bg-background text-muted-foreground hover:text-foreground hover:bg-accent',
                            )}
                          >
                            <Star className={cn('h-4 w-4', isFav && 'fill-current')} />
                          </button>
                          <Link
                            href={`/create?template=${template.name}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button size="sm" className="gap-1.5">
                              Use
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
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
          onFavorite={handleToggleFavorite}
          isFavorite={!!selectedTemplate && favorites.includes(selectedTemplate.name)}
        />
      </div>
    </>
  );
}

interface CategoryPillProps {
  active: boolean;
  label: string;
  icon?: string;
  count: number;
  onClick: () => void;
}

function CategoryPill({ active, label, icon, count, onClick }: CategoryPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 h-8 text-sm font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground shadow-sm'
          : 'border-input bg-background text-muted-foreground hover:text-foreground hover:border-foreground/30',
      )}
      aria-pressed={active}
    >
      {icon ? <span className="text-[15px] leading-none">{icon}</span> : null}
      <span>{label}</span>
      <span
        className={cn(
          'ml-0.5 rounded px-1.5 text-[11px] leading-5 font-medium',
          active
            ? 'bg-primary-foreground/15 text-primary-foreground'
            : 'bg-muted text-muted-foreground',
        )}
      >
        {count}
      </span>
    </button>
  );
}

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-input bg-background px-2.5 py-0.5 text-xs capitalize text-foreground">
      {label}
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        onClick={onRemove}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClear: () => void;
}

function EmptyState({ hasActiveFilters, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <SearchX className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold mb-1">No templates found</h3>
      <p className="text-sm text-muted-foreground mb-5 max-w-sm">
        {hasActiveFilters
          ? 'Try broadening your filters or clearing your search to see more templates.'
          : 'Your favorites list is empty. Browse the gallery and add some favorites.'}
      </p>
      {hasActiveFilters && (
        <Button variant="outline" onClick={onClear}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
