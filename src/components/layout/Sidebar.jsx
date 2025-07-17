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
  Filter
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
    removeFavorite 
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

    // Apply search
    if (searchQuery) {
      results = fuse.search(searchQuery).map(result => result.item);
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(template => 
        selectedCategories.includes(template.category)
      );
    }

    // Apply tab filter
    if (activeTab === 'favorites') {
      results = results.filter(template => favorites.includes(template.name));
    } else if (activeTab === 'recent') {
      const recentNames = recentTemplates.map(t => t.name);
      results = results.filter(template => recentNames.includes(template.name));
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
      "h-full bg-muted/50 border-r transition-all duration-300",
      sidebarCollapsed ? "w-16" : "w-80"
    )}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-lg font-semibold">Templates</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-auto"
            >
              {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </div>
        </div>

        {!sidebarCollapsed && (
          <>
            {/* Search */}
            <div className="p-4">
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="mx-4">
                <TabsTrigger value="all" className="flex-1">
                  <Sparkles className="h-4 w-4 mr-1" />
                  All
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex-1">
                  <Star className="h-4 w-4 mr-1" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="recent" className="flex-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Recent
                </TabsTrigger>
              </TabsList>

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

              {/* Template Grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-3">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.name}
                      className="relative group cursor-pointer"
                      onClick={() => onTemplateSelect(template)}
                    >
                      <div className="aspect-video rounded-lg overflow-hidden border bg-background transition-all hover:shadow-lg hover:scale-105">
                        {/* Template preview would go here */}
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="text-xs font-medium text-center px-2">
                            {template.displayName}
                          </span>
                        </div>
                      </div>
                      
                      {/* Favorite button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => toggleFavorite(e, template.name)}
                      >
                        <Star
                          className={cn(
                            "h-3 w-3",
                            favorites.includes(template.name) && "fill-current text-yellow-500"
                          )}
                        />
                      </Button>
                    </div>
                  ))}
                </div>

                {filteredTemplates.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No templates found</p>
                  </div>
                )}
              </div>
            </Tabs>
          </>
        )}
      </div>
    </aside>
  );
}