import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set) => ({
      // Current gradient configuration
      currentConfig: {
        text: 'Gradient SVG',
        height: 120,
        template: null,
        gradientType: 'horizontal',
        duration: '6s',
        colors: ['#ff0080', '#7928ca', '#ff0080'], // Default gradient colors
      },
      
      // UI state
      isCustomMode: true,
      sidebarCollapsed: false,
      
      // Favorites
      favorites: [],
      
      // Recent history
      recentTemplates: [],
      
      // Actions
      updateConfig: (config) => set((state) => ({
        currentConfig: { ...state.currentConfig, ...config }
      })),
      
      setTemplate: (template) => set((state) => ({
        currentConfig: {
          ...state.currentConfig,
          template: template.name,
          colors: template.colors || [],
          gradientType: template.gradientType || 'horizontal',
          animation: template.animation || {},
        },
        isCustomMode: false,
      })),
      
      toggleMode: () => set((state) => ({ isCustomMode: !state.isCustomMode })),
      
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      addFavorite: (templateName) => set((state) => ({
        favorites: [...new Set([...state.favorites, templateName])]
      })),
      
      removeFavorite: (templateName) => set((state) => ({
        favorites: state.favorites.filter(name => name !== templateName)
      })),
      
      addToRecent: (template) => set((state) => ({
        recentTemplates: [
          template,
          ...state.recentTemplates.filter(t => t.name !== template.name)
        ].slice(0, 10)
      })),
      
      clearFavorites: () => set({ favorites: [] }),
      
      clearRecent: () => set({ recentTemplates: [] }),
    }),
    {
      name: 'gradient-svg-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        recentTemplates: state.recentTemplates,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)

export default useStore