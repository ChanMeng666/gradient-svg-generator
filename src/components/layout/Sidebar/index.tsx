import { useState, useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import Fuse from 'fuse.js';
import { Button } from '../../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { Star, Clock, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../../../lib/utils';
import useStore from '../../../store/useStore';
import SidebarSearch from './SidebarSearch';
import SidebarFilters, { type SidebarCategory } from './SidebarFilters';
import SidebarFavorites from './SidebarFavorites';

export interface SidebarTemplate {
  name: string;
  displayName: string;
  category?: string;
}

interface SidebarProps {
  templates: readonly SidebarTemplate[];
  categories: readonly SidebarCategory[];
  onTemplateSelect: (template: SidebarTemplate) => void;
}

type Tab = 'all' | 'favorites' | 'recent';

const ROW_HEIGHT = 170;
const OVERSCAN = 3;

export default function Sidebar({ templates, categories, onTemplateSelect }: SidebarProps) {
  const {
    favorites,
    recentTemplates,
    sidebarCollapsed,
    toggleSidebar,
    addFavorite,
    removeFavorite,
    clearFavorites,
    clearRecent,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(templates as SidebarTemplate[], {
        keys: ['displayName', 'name', 'category'],
        threshold: 0.3,
      }),
    [templates],
  );

  const filteredTemplates = useMemo(() => {
    if (activeTab === 'favorites') {
      const validFavorites = favorites.filter((favName: string) =>
        templates.some((t) => t.name === favName),
      );
      return templates.filter((t) => validFavorites.includes(t.name));
    }

    if (activeTab === 'recent') {
      const recentNames = recentTemplates
        .map((t) => t.name)
        .filter((name: string) => templates.some((t) => t.name === name));
      return recentNames
        .map((name: string) => templates.find((t) => t.name === name))
        .filter(Boolean) as SidebarTemplate[];
    }

    let results: readonly SidebarTemplate[] = templates;
    if (searchQuery) {
      results = fuse.search(searchQuery).map((r) => r.item);
    }
    if (selectedCategories.length > 0) {
      results = results.filter((t) => t.category && selectedCategories.includes(t.category));
    }
    return results;
  }, [templates, searchQuery, selectedCategories, activeTab, favorites, recentTemplates, fuse]);

  const rowVirtualizer = useVirtualizer({
    count: filteredTemplates.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const toggleFavorite = (e: React.MouseEvent, templateName: string) => {
    e.stopPropagation();
    if (favorites.includes(templateName)) {
      removeFavorite(templateName);
    } else {
      addFavorite(templateName);
    }
  };

  const showClearButton =
    (activeTab === 'favorites' && favorites.length > 0) ||
    (activeTab === 'recent' && recentTemplates.length > 0);

  return (
    <aside
      className={cn(
        'h-full bg-background border-r transition-all duration-300 flex flex-col',
        sidebarCollapsed ? 'w-16' : 'w-80',
      )}
    >
      <div className="flex flex-col h-full overflow-hidden pb-16 md:pb-0">
        <div className="p-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && <h2 className="text-lg font-semibold">Templates</h2>}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn('ml-auto', sidebarCollapsed && 'mx-auto')}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {!sidebarCollapsed && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <SidebarSearch value={searchQuery} onChange={setSearchQuery} />

            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as Tab)}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <TabsList className="mx-4 shrink-0">
                <TabsTrigger value="all" className="flex-1">
                  <Sparkles className="h-4 w-4 mr-1" />
                  All
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex-1 relative">
                  <Star className="h-4 w-4 mr-1" />
                  Favorites
                  {favorites.length > 0 && (
                    <span className="ml-1 text-xs">({favorites.length})</span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex-1 relative">
                  <Clock className="h-4 w-4 mr-1" />
                  Recent
                  {recentTemplates.length > 0 && (
                    <span className="ml-1 text-xs">({recentTemplates.length})</span>
                  )}
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 flex flex-col overflow-hidden">
                {activeTab === 'all' && (
                  <SidebarFilters
                    categories={categories}
                    selected={selectedCategories}
                    onToggle={toggleCategory}
                  />
                )}

                {showClearButton && (
                  <SidebarFavorites
                    variant={activeTab === 'favorites' ? 'favorites' : 'recent'}
                    onClear={activeTab === 'favorites' ? clearFavorites : clearRecent}
                  />
                )}

                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4">
                  {filteredTemplates.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">
                        {activeTab === 'favorites' &&
                          'No favorite templates yet. Click the star icon to add favorites.'}
                        {activeTab === 'recent' &&
                          'No recent templates. Select a template to get started.'}
                        {activeTab === 'all' && 'No templates found matching your search.'}
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                      }}
                    >
                      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
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
                            <div
                              className="relative group cursor-pointer pb-4"
                              onClick={() => onTemplateSelect(template)}
                            >
                              <div className="relative">
                                <img
                                  src={`/api/svg?text=PREVIEW&template=${template.name}&height=120`}
                                  alt={template.displayName}
                                  className="w-full"
                                  loading="lazy"
                                />

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={(e) => toggleFavorite(e, template.name)}
                                >
                                  <Star
                                    className={cn(
                                      'h-4 w-4',
                                      favorites.includes(template.name) &&
                                        'fill-current text-yellow-500',
                                    )}
                                  />
                                </Button>
                              </div>

                              <div className="mt-2">
                                <div className="text-sm font-medium text-center">
                                  {template.displayName}
                                </div>
                                {activeTab === 'recent' && (
                                  <div className="text-xs text-muted-foreground text-center mt-1">
                                    Recently used
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </aside>
  );
}
