import type { StateCreator } from 'zustand';
import type { Store } from '../useStore';

export interface ConfigState {
  text: string;
  height: number;
  template: string | null;
  gradientType: string;
  duration: string;
  colors: string[];
  animation?: Record<string, unknown>;
}

export interface ConfigSlice {
  currentConfig: ConfigState;
  updateConfig: (config: Partial<ConfigState>) => void;
}

const DEFAULT_CONFIG: ConfigState = {
  text: 'Gradient SVG',
  height: 120,
  template: null,
  gradientType: 'horizontal',
  duration: '6s',
  colors: ['ff0080', '7928ca', 'ff0080'],
};

const DEFAULT_DURATION = '6s';

export const createConfigSlice: StateCreator<Store, [], [], ConfigSlice> = (set) => ({
  currentConfig: DEFAULT_CONFIG,

  updateConfig: (config) =>
    set((state) => {
      const newConfig: ConfigState = { ...state.currentConfig, ...config };

      let isModified = false;
      if (state.baseTemplate) {
        const templateDuration =
          state.baseTemplate.animationDuration ?? state.baseTemplate.duration ?? DEFAULT_DURATION;
        isModified =
          JSON.stringify(newConfig.colors) !== JSON.stringify(state.baseTemplate.colors) ||
          newConfig.gradientType !== state.baseTemplate.gradientType ||
          newConfig.duration !== templateDuration;
      }

      return { currentConfig: newConfig, isModified };
    }),
});
