import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Type, Palette, Sliders } from 'lucide-react';
import { cn } from '../../../lib/utils';
import useStore from '../../../store/useStore';
import { useColorManagement } from '../../../hooks/useColorManagement';
import { BasicTab, ColorsTab, AdvancedTab } from './PanelTabs';

interface PropertiesPanelProps {
  className?: string;
}

export default function PropertiesPanel({ className }: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const currentConfig = useStore((state: any) => state.currentConfig);
  const updateConfig = useStore((state: any) => state.updateConfig);
  const baseTemplate = useStore((state: any) => state.baseTemplate);
  const isModified = useStore((state: any) => state.isModified);
  const resetToTemplate = useStore((state: any) => state.resetToTemplate);

  const { colors, handleColorUpdate, handleAddColor, handleRemoveColor, canAddColor } =
    useColorManagement();

  return (
    <div className={cn('h-full flex flex-col bg-background', className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Properties</h2>
          <Badge variant={baseTemplate && !isModified ? 'default' : 'outline'}>
            {baseTemplate ? (isModified ? 'Modified' : 'Template') : 'Custom'}
          </Badge>
        </div>
        {baseTemplate && (
          <p className="text-xs text-muted-foreground mt-1">
            {isModified
              ? `Modified from: ${baseTemplate.label || baseTemplate.name}`
              : `Using: ${baseTemplate.label || baseTemplate.name}`}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList
            className="grid w-full grid-cols-3 mx-4 mt-4"
            style={{ width: 'calc(100% - 2rem)' }}
          >
            <TabsTrigger value="basic" className="gap-1">
              <Type className="h-4 w-4" />
              <span className="hidden xl:inline">Basic</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="gap-1">
              <Palette className="h-4 w-4" />
              <span className="hidden xl:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="gap-1">
              <Sliders className="h-4 w-4" />
              <span className="hidden xl:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-4">
            <TabsContent value="basic" className="mt-0 space-y-6">
              <BasicTab
                variant="desktop"
                currentConfig={currentConfig}
                updateConfig={updateConfig}
              />
            </TabsContent>

            <TabsContent value="colors" className="mt-0">
              <ColorsTab
                variant="desktop"
                colors={colors}
                onColorUpdate={handleColorUpdate}
                onAddColor={handleAddColor}
                onRemoveColor={handleRemoveColor}
                canAddColor={canAddColor}
                baseTemplate={baseTemplate}
                isModified={isModified}
                onResetToTemplate={resetToTemplate}
              />
            </TabsContent>

            <TabsContent value="advanced" className="mt-0">
              <AdvancedTab
                variant="desktop"
                currentConfig={currentConfig}
                updateConfig={updateConfig}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
