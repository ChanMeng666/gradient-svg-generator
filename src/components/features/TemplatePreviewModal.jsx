import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import Link from 'next/link';
import { Star, Download, Code2, Copy, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function TemplatePreviewModal({ 
  template, 
  isOpen, 
  onClose, 
  onFavorite,
  isFavorite 
}) {
  const [previewText, setPreviewText] = useState('PREVIEW');
  const [previewHeight, setPreviewHeight] = useState(120);
  const [copied, setCopied] = useState(false);

  if (!template) return null;

  const previewUrl = `/api/svg?text=${encodeURIComponent(previewText)}&template=${template.name}&height=${previewHeight}`;
  const apiUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${previewUrl}`;

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvg = async () => {
    const response = await fetch(previewUrl);
    const svgText = await response.text();
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" onClose={onClose}>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{template.displayName}</DialogTitle>
              <DialogDescription className="mt-2 flex items-center gap-2">
                <Badge>{template.category}</Badge>
                <span className="text-sm">{template.description}</span>
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onFavorite(template.name)}
            >
              <Star className={cn("h-5 w-5", isFavorite && "fill-current text-yellow-500")} />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="customize">Customize</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <div className="rounded-lg border bg-muted/30 p-8">
                <div className="max-w-full overflow-hidden">
                  <img 
                    src={previewUrl}
                    alt={template.displayName}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Animation: {template.animationDuration} • 
                  Type: {template.gradientType} • 
                  Colors: {template.colors?.length || 0}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="customize" className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Preview Text</label>
                <Input
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Enter preview text..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Height: {previewHeight}px
                </label>
                <input
                  type="range"
                  min="30"
                  max="300"
                  value={previewHeight}
                  onChange={(e) => setPreviewHeight(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <img 
                  src={previewUrl}
                  alt="Custom preview"
                  className="w-full h-auto"
                />
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Markdown</label>
                <div className="relative">
                  <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                    <code>{`![${previewText}](${apiUrl})`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(`![${previewText}](${apiUrl})`)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">HTML</label>
                <div className="relative">
                  <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                    <code>{`<img src="${apiUrl}" alt="${previewText}" />`}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(`<img src="${apiUrl}" alt="${previewText}" />`)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">API URL</label>
                <div className="relative">
                  <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                    <code>{apiUrl}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(apiUrl)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={downloadSvg} className="gap-2">
            <Download className="h-4 w-4" />
            Download SVG
          </Button>
          <Link href={`/create?template=${template.name}`}>
            <Button className="gap-2">
              <Code2 className="h-4 w-4" />
              Use This Template
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}