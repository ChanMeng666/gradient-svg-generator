import { useCallback } from 'react'
import useStore from '../store/useStore'

/**
 * Custom hook for managing gradient colors
 * Extracts common color handling logic used across multiple components
 *
 * @returns {Object} Color management functions and current colors
 */
export function useColorManagement() {
  const currentConfig = useStore(state => state.currentConfig)
  const updateConfig = useStore(state => state.updateConfig)
  const colors = currentConfig.colors || []

  const handleColorUpdate = useCallback((index, newColor) => {
    const currentColors = [...colors]
    // Remove # prefix if present for consistency
    currentColors[index] = newColor.replace('#', '')
    updateConfig({ colors: currentColors })
  }, [colors, updateConfig])

  const handleAddColor = useCallback(() => {
    updateConfig({ colors: [...colors, 'ff0000'] })
  }, [colors, updateConfig])

  const handleRemoveColor = useCallback((index) => {
    updateConfig({ colors: colors.filter((_, i) => i !== index) })
  }, [colors, updateConfig])

  const setColors = useCallback((newColors) => {
    // Normalize colors by removing # prefix
    const normalizedColors = newColors.map(c => c.replace('#', ''))
    updateConfig({ colors: normalizedColors })
  }, [updateConfig])

  return {
    colors,
    handleColorUpdate,
    handleAddColor,
    handleRemoveColor,
    setColors,
    colorCount: colors.length,
    canRemoveColor: colors.length > 2, // Minimum 2 colors for gradient
    canAddColor: colors.length < 10, // Maximum 10 colors
  }
}

export default useColorManagement
