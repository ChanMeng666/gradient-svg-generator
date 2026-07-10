import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GEOHead from '../components/seo/GEOHead';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Grid3x3, List, Star, X } from 'lucide-react';
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
// Preview images use height=180 from /api/svg which outputs an 854×180 canvas.
// Matching this aspect on the preview region lets the SVG fill the card
// horizontally edge-to-edge without any cropping.
const PREVIEW_ASPECT = 854 / 180;
// Info strip below the preview (TemplateCard). Arithmetic from its CSS:
//   1px top border
// + 14px top padding (py-3.5)
// + 16px category line (font-mono text-[11px] leading-4)
// + 6px gap (mt-1.5)
// + 20px title line (text-[15px] leading-5)
// + 14px bottom padding (py-3.5)
// = 71px total.
const GRID_CARD_INFO_HEIGHT = 71;
// Used only as an initial estimate — the virtualizer re-measures real heights
// via `measureElement`, so slight inaccuracies self-correct after first render.
const GRID_ROW_HEIGHT_FALLBACK = 170 + ROW_GAP;
// List row height. Arithmetic from the row CSS:
//   ~47px tallest child (w-56 = 224px preview at 854/180 aspect → 224 × 180/854)
// + 24px vertical padding (p-3, 12px each side)
// + 2px top+bottom border
// + 12px bottom margin (mb-3)
// = 85px total.
const LIST_ROW_HEIGHT = 85;

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
  const [gridContainerWidth, setGridContainerWidth] = useState(0);
  const [gridScrollMargin, setGridScrollMargin] = useState(0);
  const [listScrollMargin, setListScrollMargin] = useState(0);

  useEffect(() => {
    const el = viewMode === 'grid' ? gridContainerRef.current : listContainerRef.current;
    if (!el) return;

    const updateScrollMargin = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top + window.scrollY;
      if (viewMode === 'grid') setGridScrollMargin(offset);
      else setListScrollMargin(offset);
    };

    const updateColumns = (width: number) => {
      if (viewMode !== 'grid' || width <= 0) return;
      const cols = Math.max(1, Math.floor((width + ROW_GAP) / (CARD_MIN_WIDTH + ROW_GAP)));
      setColumnCount(cols);
      setGridContainerWidth(width);
    };

    updateColumns(el.clientWidth);
    updateScrollMargin();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateColumns(entry.contentRect.width);
      }
      updateScrollMargin();
    });
    observer.observe(el);

    window.addEventListener('resize', updateScrollMargin);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScrollMargin);
    };
  }, [viewMode, showFilters, selectedCategory, selectedFilters, favoritesOnly, searchQuery]);

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

  const gridRowEstimate = useMemo(() => {
    if (!gridContainerWidth || columnCount < 1) return GRID_ROW_HEIGHT_FALLBACK;
    const totalGap = (columnCount - 1) * ROW_GAP;
    const cardWidth = Math.max(0, (gridContainerWidth - totalGap) / columnCount);
    const previewHeight = cardWidth / PREVIEW_ASPECT;
    return Math.ceil(previewHeight + GRID_CARD_INFO_HEIGHT) + ROW_GAP;
  }, [gridContainerWidth, columnCount]);

  const gridVirtualizer = useWindowVirtualizer({
    count: gridRows.length,
    estimateSize: () => gridRowEstimate,
    overscan: 3,
    scrollMargin: gridScrollMargin,
  });

  const listVirtualizer = useWindowVirtualizer({
    count: filteredTemplates.length,
    estimateSize: () => LIST_ROW_HEIGHT,
    overscan: 4,
    scrollMargin: listScrollMargin,
  });

  // Invalidate virtualizer measurements when the per-row estimate changes
  // (viewport resize, column-count change, etc.) so the total layout height
  // stays correct while measureElement picks up the real sizes.
  useEffect(() => {
    gridVirtualizer.measure();
  }, [gridVirtualizer, gridRowEstimate]);

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

        {/* Page header */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <span className="font-mono text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
              The Catalog — {templates.length} Templates / {categories.length} Categories
            </span>
            <h1 className="mt-6 text-[clamp(2.75rem,7vw,6.5rem)] font-normal leading-[0.95] tracking-display text-foreground">
              The Gallery
            </h1>

            <div className="mt-10 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, category, or effect…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 rounded-full pl-11 pr-10"
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
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
                {filteredTemplates.length} Shown
                {searchQuery && <span> — &ldquo;{searchQuery}&rdquo;</span>}
              </p>
            </div>
          </div>
        </section>

        {/* Sticky: categories + toolbar + filter panel */}
        <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur">
          {/* Category pills */}
          <div className="container mx-auto px-4">
            <div className="-mx-4 overflow-x-auto px-4 scroll-smooth no-scrollbar">
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
                    count={categoryCounts.get(c.id) ?? 0}
                    onClick={() => setSelectedCategory(c.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-3 border-t border-border py-3">
              <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
                <span className="text-foreground">{filteredTemplates.length}</span>
                <span className="hidden sm:inline"> / {templates.length}</span> Shown
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFavoritesOnly((v) => !v)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors',
                    favoritesOnly
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                  aria-pressed={favoritesOnly}
                >
                  <span aria-hidden>★</span>
                  <span className="hidden sm:inline">Favorites</span>
                  {favorites.length > 0 && <span className="opacity-60">{favorites.length}</span>}
                </button>

                <button
                  type="button"
                  onClick={() => setShowFilters((v) => !v)}
                  aria-expanded={showFilters}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors',
                    showFilters || selectedFilters.length > 0
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span>Filters</span>
                  {selectedFilters.length > 0 && (
                    <span className="opacity-60">{selectedFilters.length}</span>
                  )}
                </button>

                <div className="inline-flex items-center overflow-hidden rounded-full border border-border">
                  <button
                    type="button"
                    aria-label="Grid view"
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center transition-colors',
                      viewMode === 'grid'
                        ? 'bg-foreground text-background'
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
                      'inline-flex h-8 w-8 items-center justify-center border-l border-border transition-colors',
                      viewMode === 'list'
                        ? 'bg-foreground text-background'
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
            <div className="border-t border-border bg-card">
              <div className="container mx-auto px-4 py-5 space-y-5">
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                      Gradient Type
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                      {availableGradientTypes.length} Types
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
                            'rounded-full border px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors',
                            active
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border text-muted-foreground hover:text-foreground',
                          )}
                        >
                          {type.replace(/([A-Z])/g, ' $1').trim()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
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
                            'rounded-full border px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors',
                            active
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border text-muted-foreground hover:text-foreground',
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
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      {selectedFilters.length} Filter{selectedFilters.length !== 1 ? 's' : ''}{' '}
                      Active
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedFilters([])}>
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Active filter summary */}
          {activeFilterCount > 0 && !showFilters && (
            <div className="border-t border-border">
              <div className="container mx-auto px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground/60">
                  Active
                </span>
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
                  className="ml-auto shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <section className="container mx-auto px-4 pt-6 pb-12">
          {filteredTemplates.length === 0 ? (
            <EmptyState
              hasActiveFilters={activeFilterCount > 0 || !!searchQuery}
              onClear={clearAll}
            />
          ) : viewMode === 'grid' ? (
            <div
              ref={gridContainerRef}
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
                    data-index={virtualRow.index}
                    ref={gridVirtualizer.measureElement}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start - gridScrollMargin}px)`,
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
          ) : (
            <div
              ref={listContainerRef}
              style={{
                height: `${listVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {listVirtualizer.getVirtualItems().map((virtualRow) => {
                const template = filteredTemplates[virtualRow.index];
                const isFav = favorites.includes(template.name);
                return (
                  <div
                    key={template.name}
                    data-index={virtualRow.index}
                    ref={listVirtualizer.measureElement}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start - listScrollMargin}px)`,
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
                      className="group mb-3 flex items-center gap-4 rounded-2xl border border-border bg-card p-3 pr-4 transition-colors cursor-pointer hover:border-foreground/40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div
                        className="w-56 shrink-0 overflow-hidden rounded-lg bg-muted"
                        style={{ aspectRatio: `${PREVIEW_ASPECT}` }}
                      >
                        <img
                          src={`/api/svg?text=${encodeURIComponent(template.displayName)}&template=${template.name}&height=80&v=2`}
                          alt={template.displayName}
                          className="block h-full w-full"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="truncate text-[15px] font-normal text-foreground">
                          {template.displayName}
                        </h3>
                        <div className="mt-1.5 flex items-center gap-2 truncate font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                          <span>{template.category}</span>
                          {template.gradientType && (
                            <span className="truncate">
                              · {template.gradientType.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          )}
                          {template.animationDuration && (
                            <span className="hidden md:inline">· {template.animationDuration}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                          onClick={(e) => handleListFavorite(e, template.name)}
                          className={cn(
                            'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                            isFav
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border text-muted-foreground hover:text-foreground',
                          )}
                        >
                          <Star className={cn('h-4 w-4', isFav && 'fill-current')} />
                        </button>
                        <Link
                          href={`/create?template=${template.name}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button size="sm">Use →</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
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

        <Footer />
      </div>
    </>
  );
}

interface CategoryPillProps {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}

function CategoryPill({ active, label, count, onClick }: CategoryPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors',
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border text-muted-foreground hover:text-foreground',
      )}
      aria-pressed={active}
    >
      <span>{label}</span>
      <span className="opacity-60">{count}</span>
    </button>
  );
}

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

function FilterChip({ label, onRemove }: FilterChipProps) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-foreground">
      {label}
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        onClick={onRemove}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
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
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-mono text-[13px] uppercase tracking-[0.15em] text-muted-foreground">
        {hasActiveFilters
          ? 'No templates match — try a different query'
          : 'No favorites yet — browse the gallery and star a few'}
      </p>
      {hasActiveFilters && (
        <Button variant="ghost" onClick={onClear}>
          Clear filters
        </Button>
      )}
    </div>
  );
}
