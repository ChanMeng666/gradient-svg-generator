import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Type, Palette, Sliders, ChevronUp, ChevronDown, X, Plus, Minus } from 'lucide-react'
import { cn } from '../../lib/utils'
import { GRADIENT_TYPES } from '../../constants/gradientTypes'
import useStore from '../../store/useStore'
import { useColorManagement } from '../../hooks/useColorManagement'
import { usePanelHeight } from '../../hooks/usePanelHeight'

/**
 * Mobile Properties Panel
 * A bottom sheet panel for editing gradient properties on mobile devices.
 * Refactored to use custom hooks for better maintainability.
 */
export default function MobilePropertiesPanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('basic')

  // Get state from store instead of props
  const currentConfig = useStore(state => state.currentConfig)
  const updateConfig = useStore(state => state.updateConfig)
  const baseTemplate = useStore(state => state.baseTemplate)
  const isModified = useStore(state => state.isModified)
  const resetToTemplate = useStore(state => state.resetToTemplate)

  // Use custom hooks
  const { colors, handleColorUpdate, handleAddColor, handleRemoveColor } = useColorManagement()
  const { panelHeight, heightClass, cycleHeight } = usePanelHeight({
    isOpen,
    onClose,
    selector: '.mobile-properties-sheet'
  })

  // Render nothing if panel is not open
  if (!isOpen) return null

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 bg-background border-t rounded-t-[10px] shadow-lg',
        'mobile-properties-sheet',
        heightClass,
        'transition-all duration-300 overflow-hidden flex flex-col'
      )}
    >
      {/* Drag handle */}
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-muted mb-2" />

      {/* Header */}
      <PanelHeader
        baseTemplate={baseTemplate}
        isModified={isModified}
        panelHeight={panelHeight}
        onCycleHeight={cycleHeight}
        onClose={onClose}
      />

      {/* Content */}
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
            <BasicTab currentConfig={currentConfig} updateConfig={updateConfig} />
          </TabsContent>

          <TabsContent value="colors" className="mt-4">
            <ColorsTab
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
            <AdvancedTab currentConfig={currentConfig} updateConfig={updateConfig} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// ============================================================================
// Sub-components
// ============================================================================

function PanelHeader({ baseTemplate, isModified, panelHeight, onCycleHeight, onClose }) {
  return (
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
          onClick={onCycleHeight}
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
  )
}

function BasicTab({ currentConfig, updateConfig }) {
  return (
    <>
      <div>
        <label className="text-sm font-medium mb-2 block">Text Content</label>
        <Input
          value={currentConfig.text}
          onChange={(e) => updateConfig({ text: e.target.value })}
          placeholder="Enter your text..."
          className="w-full text-base"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">
          Height: {currentConfig.height}px
        </label>
        <input
          type="range"
          min="30"
          max="300"
          value={currentConfig.height}
          onChange={(e) => updateConfig({ height: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((currentConfig.height - 30) / 270) * 100}%, hsl(var(--muted)) ${((currentConfig.height - 30) / 270) * 100}%, hsl(var(--muted)) 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>30</span>
          <span>300</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Animation Duration</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: '3s', label: 'Fast' },
            { value: '6s', label: 'Normal' },
            { value: '10s', label: 'Slow' },
            { value: '15s', label: 'Very Slow' }
          ].map(({ value, label }) => (
            <Button
              key={value}
              variant={currentConfig.duration === value ? 'default' : 'outline'}
              onClick={() => updateConfig({ duration: value })}
              className="w-full"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </>
  )
}

function ColorsTab({
  colors,
  onColorUpdate,
  onAddColor,
  onRemoveColor,
  baseTemplate,
  isModified,
  onResetToTemplate
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Customize your gradient colors</p>
        {baseTemplate && (
          <p className="text-xs text-muted-foreground">
            {isModified
              ? `Modified from: ${baseTemplate.label || baseTemplate.name}`
              : `Using: ${baseTemplate.label || baseTemplate.name}`}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {colors?.map((color, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative">
                <input
                  type="color"
                  value={color.startsWith('#') ? color : `#${color}`}
                  onChange={(e) => onColorUpdate(index, e.target.value.substring(1))}
                  className="sr-only"
                  id={`mobile-color-picker-${index}`}
                />
                <label
                  htmlFor={`mobile-color-picker-${index}`}
                  className="block w-12 h-12 rounded-md border-2 border-border cursor-pointer hover:border-primary transition-colors"
                  style={{ backgroundColor: color.startsWith('#') ? color : `#${color}` }}
                />
              </div>
              <Input
                value={color}
                onChange={(e) => onColorUpdate(index, e.target.value)}
                placeholder="Hex color"
                className="font-mono text-sm"
                maxLength={6}
              />
            </div>
            <div className="flex items-center gap-1">
              {colors.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRemoveColor(index)}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
              {index === colors.length - 1 && (
                <Button variant="outline" size="icon" onClick={onAddColor} className="h-10 w-10">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        {(!colors || colors.length === 0) && (
          <Button variant="outline" onClick={onAddColor} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add First Color
          </Button>
        )}
      </div>

      {baseTemplate && isModified && (
        <Button onClick={onResetToTemplate} variant="outline" size="sm" className="w-full">
          Reset to Template Colors
        </Button>
      )}
    </div>
  )
}

function AdvancedTab({ currentConfig, updateConfig }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Gradient Type ({GRADIENT_TYPES.length} types available)
        </label>
        <div className="max-h-64 overflow-y-auto border rounded-md p-2 mb-4">
          <div className="grid grid-cols-2 gap-2">
            {GRADIENT_TYPES.map((type) => (
              <Button
                key={type.value}
                variant={currentConfig.gradientType === type.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateConfig({ gradientType: type.value })}
                className="justify-start text-xs w-full"
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
