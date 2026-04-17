import type { StateCreator } from 'zustand';
import type { Store } from '../useStore';
import type { Template } from './template';

const MAX_RECENT = 10;

export interface UISlice {
  isCustomMode: boolean;
  sidebarCollapsed: boolean;
  favorites: string[];
  recentTemplates: Template[];
  toggleMode: () => void;
  toggleSidebar: () => void;
  addFavorite: (templateName: string) => void;
  removeFavorite: (templateName: string) => void;
  toggleFavorite: (templateName: string) => void;
  addToRecent: (template: Template) => void;
  clearFavorites: () => void;
  clearRecent: () => void;
}

export const createUISlice: StateCreator<Store, [], [], UISlice> = (set) => ({
  isCustomMode: true,
  sidebarCollapsed: false,
  favorites: [],
  recentTemplates: [],

  toggleMode: () => set((state) => ({ isCustomMode: !state.isCustomMode })),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  addFavorite: (templateName) =>
    set((state) => ({ favorites: Array.from(new Set([...state.favorites, templateName])) })),

  removeFavorite: (templateName) =>
    set((state) => ({ favorites: state.favorites.filter((n) => n !== templateName) })),

  toggleFavorite: (templateName) =>
    set((state) => ({
      favorites: state.favorites.includes(templateName)
        ? state.favorites.filter((n) => n !== templateName)
        : Array.from(new Set([...state.favorites, templateName])),
    })),

  addToRecent: (template) =>
    set((state) => ({
      recentTemplates: [
        template,
        ...state.recentTemplates.filter((t) => t.name !== template.name),
      ].slice(0, MAX_RECENT),
    })),

  clearFavorites: () => set({ favorites: [] }),
  clearRecent: () => set({ recentTemplates: [] }),
});
