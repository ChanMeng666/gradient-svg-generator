import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createConfigSlice, type ConfigSlice } from './slices/config';
import { createTemplateSlice, type TemplateSlice } from './slices/template';
import { createUISlice, type UISlice } from './slices/ui';

export type Store = ConfigSlice & TemplateSlice & UISlice;

const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createConfigSlice(...a),
      ...createTemplateSlice(...a),
      ...createUISlice(...a),
    }),
    {
      name: 'gradient-svg-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        recentTemplates: state.recentTemplates,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);

// Memoized selectors for optimized re-renders.
export const useCurrentConfig = () => useStore((s) => s.currentConfig);
export const useColors = () => useStore((s) => s.currentConfig.colors);
export const useFavorites = () => useStore((s) => s.favorites);
export const useRecentTemplates = () => useStore((s) => s.recentTemplates);
export const useTemplateState = () =>
  useStore((s) => ({ baseTemplate: s.baseTemplate, isModified: s.isModified }));
export const useIsFavorite = (templateName: string) =>
  useStore((s) => s.favorites.includes(templateName));

export default useStore;
