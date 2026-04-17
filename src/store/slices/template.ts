import type { StateCreator } from 'zustand';
import type { Store } from '../useStore';

export interface Template {
  name: string;
  label?: string;
  colors?: string[];
  gradientType?: string;
  animationDuration?: string;
  duration?: string;
  animation?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface TemplateSlice {
  baseTemplate: Template | null;
  isModified: boolean;
  setTemplate: (template: Template) => void;
  resetToTemplate: () => void;
  clearTemplate: () => void;
}

const DEFAULT_DURATION = '6s';
const DEFAULT_GRADIENT_TYPE = 'horizontal';

export const createTemplateSlice: StateCreator<Store, [], [], TemplateSlice> = (set) => ({
  baseTemplate: null,
  isModified: false,

  setTemplate: (template) =>
    set((state) => ({
      currentConfig: {
        ...state.currentConfig,
        template: template.name,
        colors: template.colors ?? [],
        gradientType: template.gradientType ?? DEFAULT_GRADIENT_TYPE,
        duration: template.animationDuration ?? template.duration ?? DEFAULT_DURATION,
        animation: template.animation ?? {},
      },
      baseTemplate: template,
      isModified: false,
      isCustomMode: true,
    })),

  resetToTemplate: () =>
    set((state) => {
      if (!state.baseTemplate) return state;
      return {
        currentConfig: {
          ...state.currentConfig,
          colors: state.baseTemplate.colors ?? [],
          gradientType: state.baseTemplate.gradientType ?? DEFAULT_GRADIENT_TYPE,
          duration:
            state.baseTemplate.animationDuration ?? state.baseTemplate.duration ?? DEFAULT_DURATION,
        },
        isModified: false,
      };
    }),

  clearTemplate: () =>
    set((state) => ({
      currentConfig: { ...state.currentConfig, template: null },
      baseTemplate: null,
      isModified: false,
    })),
});
