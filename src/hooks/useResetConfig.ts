import { useCallback } from 'react';
import useStore from '../store/useStore';

const DEFAULT_RESET = {
  text: 'Gradient SVG',
  height: 120,
  gradientType: 'horizontal',
  duration: '6s',
  colors: ['ff0080', '7928ca', 'ff0080'],
};

/**
 * Three-way reset used by the "Reset" button on the create page:
 *   - unmodified template selected -> drop the template and restore
 *     application defaults (clearing the `template` config field);
 *   - template with user edits       -> restore the template's original
 *     colors/gradientType/duration via the store's resetToTemplate;
 *   - custom mode (no template)     -> restore application defaults.
 */
export function useResetConfig() {
  const baseTemplate = useStore((s) => s.baseTemplate);
  const isModified = useStore((s) => s.isModified);
  const updateConfig = useStore((s) => s.updateConfig);
  const clearTemplate = useStore((s) => s.clearTemplate);
  const resetToTemplate = useStore((s) => s.resetToTemplate);

  return useCallback(() => {
    if (baseTemplate && !isModified) {
      clearTemplate();
      updateConfig(DEFAULT_RESET);
      return;
    }
    if (baseTemplate && isModified) {
      resetToTemplate();
      return;
    }
    updateConfig({ ...DEFAULT_RESET, template: null });
  }, [baseTemplate, isModified, clearTemplate, resetToTemplate, updateConfig]);
}

export default useResetConfig;
