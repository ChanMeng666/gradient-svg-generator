import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Type, Palette, Sliders, Plus, Minus, RotateCcw } from 'lucide-react'
import { cn } from '../../lib/utils'
import { GRADIENT_TYPES } from '../../constants/gradientTypes'
import useStore from '../../store/useStore'
import { useColorManagement } from '../../hooks/useColorManagement'

/**
 * Desktop Properties Panel
 * A sidebar panel for editing gradient properties on desktop devices.
 * Uses custom hooks for state management and color handling.
 */
export default function PropertiesPanel({ className }) {
  const [activeTab, setActiveTab] = useState('basic')

  // Get state from store
  const currentConfig = useStore(state => state.currentConfig)
  const updateConfig = useStore(state => state.updateConfig)
  const baseTemplate = useStore(state => state.baseTemplate)
  const isModified = useStore(state => state.isModified)
  const resetToTemplate = useStore(state => state.resetToTemplate)

  // Use color management hook
  const { colors, handleColorUpdate, handleAddColor, handleRemoveColor, canAddColor } = useColorManagement()

  return (
    <div className={cn('h-full flex flex-col bg-background', className)}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Properties</h2>
          <Badge
            variant={baseTemplate && !isModified ? 'default' : 'outline'}
          >
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

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4" style={{ width: 'calc(100% - 2rem)' }}>
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
              <BasicSection currentConfig={currentConfig} updateConfig={updateConfig} />
            </TabsContent>

            <TabsContent value="colors" className="mt-0">
              <ColorsSection
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
              <AdvancedSection currentConfig={currentConfig} updateConfig={updateConfig} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

// ============================================================================
// Sub-components
// ============================================================================

function BasicSection({ currentConfig, updateConfig }) {
  return (
    <>
      {/* Text Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Text Content</label>
        <Input
          value={currentConfig.text}
          onChange={(e) => updateConfig({ text: e.target.value })}
          placeholder="Enter your text..."
        />
      </div>

      {/* Height Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium">Height</label>
          <span className="text-sm text-muted-foreground">{currentConfig.height}px</span>
        </div>
        <input
          type="range"
          min="30"
          max="300"
          value={currentConfig.height}
          onChange={(e) => updateConfig({ height: parseInt(e.target.value) })}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>30px</span>
          <span>300px</span>
        </div>
      </div>

      {/* Animation Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Animation Duration</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: '3s', label: 'Fast (3s)' },
            { value: '6s', label: 'Normal (6s)' },
            { value: '10s', label: 'Slow (10s)' },
            { value: '15s', label: 'Very Slow (15s)' }
          ].map(({ value, label }) => (
            <Button
              key={value}
              variant={currentConfig.duration === value ? 'default' : 'outline'}
              size="sm"
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

function ColorsSection({
  colors,
  onColorUpdate,
  onAddColor,
  onRemoveColor,
  canAddColor,
  baseTemplate,
  isModified,
  onResetToTemplate
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {colors.length} color{colors.length !== 1 ? 's' : ''} in gradient
        </p>
        {canAddColor && (
          <Button variant="outline" size="sm" onClick={onAddColor}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        )}
      </div>

      {/* Color list */}
      <div className="space-y-3">
        {colors?.map((color, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative">
              <input
                type="color"
                value={color.startsWith('#') ? color : `#${color}`}
                onChange={(e) => onColorUpdate(index, e.target.value.substring(1))}
                className="sr-only"
                id={`color-picker-${index}`}
              />
              <label
                htmlFor={`color-picker-${index}`}
                className="block w-10 h-10 rounded-md border-2 border-border cursor-pointer hover:border-primary transition-colors"
                style={{ backgroundColor: color.startsWith('#') ? color : `#${color}` }}
              />
            </div>
            <Input
              value={color}
              onChange={(e) => onColorUpdate(index, e.target.value)}
              placeholder="Hex color"
              className="font-mono text-sm flex-1"
              maxLength={6}
            />
            {colors.length > 2 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveColor(index)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Reset button */}
      {baseTemplate && isModified && (
        <Button onClick={onResetToTemplate} variant="outline" size="sm" className="w-full">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Template Colors
        </Button>
      )}
    </div>
  )
}

function AdvancedSection({ currentConfig, updateConfig }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTypes = GRADIENT_TYPES.filter(type =>
    type.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.value.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Gradient Type
        </label>
        <p className="text-xs text-muted-foreground">
          {GRADIENT_TYPES.length} types available
        </p>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search gradient types..."
          className="mb-2"
        />
      </div>

      <div className="max-h-96 overflow-y-auto border rounded-md p-2">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
          {filteredTypes.map((type) => (
            <Button
              key={type.value}
              variant={currentConfig.gradientType === type.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ gradientType: type.value })}
              className="justify-start text-xs w-full truncate"
              title={type.label}
            >
              {type.label}
            </Button>
          ))}
        </div>
        {filteredTypes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No gradient types match your search
          </p>
        )}
      </div>
    </div>
  )
}
