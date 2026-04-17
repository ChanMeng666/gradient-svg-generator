import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Type, Palette, Sliders, ChevronUp, ChevronDown, X } from 'lucide-react';
import { cn } from '../../../lib/utils';
import useStore from '../../../store/useStore';
import { useColorManagement } from '../../../hooks/useColorManagement';
import { usePanelHeight } from '../../../hooks/usePanelHeight';
import { BasicTab, ColorsTab, AdvancedTab } from './PanelTabs';

interface MobilePropertiesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobilePropertiesPanel({ isOpen, onClose }: MobilePropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const currentConfig = useStore((state: any) => state.currentConfig);
  const updateConfig = useStore((state: any) => state.updateConfig);
  const baseTemplate = useStore((state: any) => state.baseTemplate);
  const isModified = useStore((state: any) => state.isModified);
  const resetToTemplate = useStore((state: any) => state.resetToTemplate);

  const { colors, handleColorUpdate, handleAddColor, handleRemoveColor } = useColorManagement();
  const { panelHeight, heightClass, cycleHeight } = usePanelHeight({
    isOpen,
    onClose,
    selector: '.mobile-properties-sheet',
  });

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 bg-background border-t rounded-t-[10px] shadow-lg',
        'mobile-properties-sheet',
        heightClass,
        'transition-all duration-300 overflow-hidden flex flex-col',
      )}
    >
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-muted mb-2" />

      <div className="flex items-start justify-between p-4 pb-2 pt-0">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Properties</h3>
          <Badge
            variant={baseTemplate && !isModified ? 'default' : 'outline'}
            className="w-fit mt-1"
          >
            {baseTemplate ? (isModified ? 'Modified' : 'Template') : 'Custom'}
          </Badge>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleHeight}
            className="h-10 w-10"
            title={`Height: ${panelHeight}`}
          >
            {panelHeight === 'expanded' ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </Button>

          <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="text-xs">
              <Type className="h-4 w-4 mr-1" />
              Basic
            </TabsTrigger>
            <TabsTrigger value="colors" className="text-xs">
              <Palette className="h-4 w-4 mr-1" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs">
              <Sliders className="h-4 w-4 mr-1" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <BasicTab variant="mobile" currentConfig={currentConfig} updateConfig={updateConfig} />
          </TabsContent>

          <TabsContent value="colors" className="mt-4">
            <ColorsTab
              variant="mobile"
              colors={colors}
              onColorUpdate={handleColorUpdate}
              onAddColor={handleAddColor}
              onRemoveColor={handleRemoveColor}
              baseTemplate={baseTemplate}
              isModified={isModified}
              onResetToTemplate={resetToTemplate}
            />
          </TabsContent>

          <TabsContent value="advanced" className="mt-4">
            <AdvancedTab
              variant="mobile"
              currentConfig={currentConfig}
              updateConfig={updateConfig}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
