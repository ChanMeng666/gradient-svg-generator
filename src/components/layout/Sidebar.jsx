import React, { useState, useMemo } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { 
  Search, 
  Star, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Filter,
  Trash2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import useStore from '../../store/useStore';
import Fuse from 'fuse.js';

export default function Sidebar({ templates, categories, onTemplateSelect }) {
  const { 
    favorites, 
    recentTemplates, 
    sidebarCollapsed, 
    toggleSidebar,
    addFavorite,
    removeFavorite,
    clearFavorites,
    clearRecent 
  } = useStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(templates, {
      keys: ['displayName', 'name', 'category'],
      threshold: 0.3,
    });
  }, [templates]);

  // Filter templates based on search and categories
  const filteredTemplates = useMemo(() => {
    let results = templates;

    // Apply tab filter first
    if (activeTab === 'favorites') {
      // Only show templates that exist in both templates array AND favorites array
      const validFavorites = favorites.filter(favName => 
        templates.some(template => template.name === favName)
      );
      results = results.filter(template => validFavorites.includes(template.name));
    } else if (activeTab === 'recent') {
      // Get recent template names and validate they still exist
      const recentNames = recentTemplates
        .map(t => t.name)
        .filter(name => templates.some(template => template.name === name));
      
      // Sort by recency (most recent first)
      results = recentNames
        .map(name => templates.find(t => t.name === name))
        .filter(Boolean);
    } else {
      // Only apply search and category filters on 'all' tab
      if (searchQuery) {
        results = fuse.search(searchQuery).map(result => result.item);
      }

      if (selectedCategories.length > 0) {
        results = results.filter(template => 
          selectedCategories.includes(template.category)
        );
      }
    }

    return results;
  }, [templates, searchQuery, selectedCategories, activeTab, favorites, recentTemplates, fuse]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFavorite = (e, templateName) => {
    e.stopPropagation();
    if (favorites.includes(templateName)) {
      removeFavorite(templateName);
    } else {
      addFavorite(templateName);
    }
  };

  return (
    <aside className={cn(
      "h-full bg-background border-r transition-all duration-300 flex flex-col",
      sidebarCollapsed ? "w-16" : "w-80"
    )}>
      <div className="flex flex-col h-full overflow-hidden pb-16 md:pb-0">
        {/* Sidebar Header */}
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-lg font-semibold">Templates</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn("ml-auto", sidebarCollapsed && "mx-auto")}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {!sidebarCollapsed && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-4 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="mx-4 flex-shrink-0">
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

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto">
                {/* Category Filter */}
                {activeTab === 'all' && (
                  <div className="p-4 border-b">
                    <div className="flex items-center mb-2">
                      <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Categories</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <Badge
                          key={category.id}
                          variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleCategory(category.id)}
                        >
                          {category.icon} {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Clear All button for Favorites and Recent */}
                {((activeTab === 'favorites' && favorites.length > 0) || 
                  (activeTab === 'recent' && recentTemplates.length > 0)) && (
                  <div className="p-4 border-b">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (activeTab === 'favorites') {
                          if (confirm('Are you sure you want to clear all favorites?')) {
                            clearFavorites();
                          }
                        } else {
                          if (confirm('Are you sure you want to clear recent history?')) {
                            clearRecent();
                          }
                        }
                      }}
                      className="w-full gap-2 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                      {activeTab === 'favorites' ? 'Clear All Favorites' : 'Clear Recent History'}
                    </Button>
                  </div>
                )}

                {/* Template Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-4">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.name}
                      className="relative group cursor-pointer"
                      onClick={() => onTemplateSelect(template)}
                    >
                      <div className="relative">
                        <img
                          src={`/api/svg?text=PREVIEW&template=${template.name}&height=120`}
                          alt={template.displayName}
                          className="w-full"
                          loading="lazy"
                        />
                        
                        {/* Favorite button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => toggleFavorite(e, template.name)}
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              favorites.includes(template.name) && "fill-current text-yellow-500"
                            )}
                          />
                        </Button>
                      </div>
                      
                      {/* Template name */}
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
                  ))}
                    {filteredTemplates.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">
                          {activeTab === 'favorites' && "No favorite templates yet. Click the star icon to add favorites."}
                          {activeTab === 'recent' && "No recent templates. Select a template to get started."}
                          {activeTab === 'all' && "No templates found matching your search."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </aside>
  );
}