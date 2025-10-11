import React, { useCallback, useState, memo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import TemplatePreviewModal from './TemplatePreviewModal';
import { throttle } from '../../utils/performance';

const TemplateCard = memo(({ template, onFavorite, isFavorite, style, onPreview }) => {
  return (
    <div style={style} className="p-3">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all">
        <div className="aspect-video bg-muted relative group">
          <img
            src={`/api/svg?text=PREVIEW&template=${template.name}&height=150&v=2`}
            alt={template.displayName}
            className="w-full h-full object-cover"
            loading="lazy"
            key={`virtual-${template.name}`}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              onFavorite(template.name);
            }}
          >
            <Star className={cn("h-4 w-4", isFavorite && "fill-current text-yellow-500")} />
          </Button>
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{template.displayName}</CardTitle>
          <CardDescription className="text-sm">
            {template.category}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Link href={`/create?template=${template.name}`} className="flex-1">
              <Button className="w-full" size="sm">
                Use Template
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => onPreview(template)}>
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default function VirtualizedTemplateGrid({ 
  templates, 
  favorites = [], 
  onFavorite,
  width,
  height,
  columnCount = 4
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowCount = Math.ceil(templates.length / columnCount);
  
  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= templates.length) return null;
    
    const template = templates[index];
    const isFavorite = favorites.includes(template.name);
    
    return (
      <TemplateCard
        template={template}
        onFavorite={onFavorite}
        isFavorite={isFavorite}
        style={style}
        onPreview={(template) => {
          setSelectedTemplate(template);
          setIsModalOpen(true);
        }}
      />
    );
  }, [templates, favorites, onFavorite, columnCount]);

  return (
    <>
      <Grid
        columnCount={columnCount}
        columnWidth={width / columnCount}
        height={height}
        rowCount={rowCount}
        rowHeight={320}
        width={width}
      >
        {Cell}
      </Grid>
      
      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTemplate(null);
        }}
        onFavorite={onFavorite}
        isFavorite={selectedTemplate && favorites.includes(selectedTemplate.name)}
      />
    </>
  );
}