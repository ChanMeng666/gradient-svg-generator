import { useCallback } from 'react';
import useStore from '../store/useStore';

const MIN_COLORS_FOR_GRADIENT = 2;
const MAX_COLORS = 10;

/**
 * Color-list editor bound to the Zustand config slice. Colors are
 * stored without the leading `#` for URL compatibility -- the hook
 * normalizes both directions.
 */
export function useColorManagement() {
  const currentConfig = useStore((state: any) => state.currentConfig);
  const updateConfig = useStore((state: any) => state.updateConfig);
  const colors: string[] = currentConfig.colors || [];

  const handleColorUpdate = useCallback(
    (index: number, newColor: string) => {
      const next = [...colors];
      next[index] = newColor.replace('#', '');
      updateConfig({ colors: next });
    },
    [colors, updateConfig],
  );

  const handleAddColor = useCallback(() => {
    updateConfig({ colors: [...colors, 'ff0000'] });
  }, [colors, updateConfig]);

  const handleRemoveColor = useCallback(
    (index: number) => {
      updateConfig({ colors: colors.filter((_, i) => i !== index) });
    },
    [colors, updateConfig],
  );

  const setColors = useCallback(
    (newColors: string[]) => {
      updateConfig({ colors: newColors.map((c) => c.replace('#', '')) });
    },
    [updateConfig],
  );

  return {
    colors,
    handleColorUpdate,
    handleAddColor,
    handleRemoveColor,
    setColors,
    colorCount: colors.length,
    canRemoveColor: colors.length > MIN_COLORS_FOR_GRADIENT,
    canAddColor: colors.length < MAX_COLORS,
  };
}

export default useColorManagement;
