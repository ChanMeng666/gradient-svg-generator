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
        colors: ['ff0080', '7928ca', 'ff0080'], // Default gradient colors (no # prefix)
      },
      
      // Template tracking
      baseTemplate: null, // Original template before modifications
      isModified: false, // Whether current config differs from base template
      
      // UI state
      isCustomMode: true,
      sidebarCollapsed: false,
      
      // Favorites
      favorites: [],
      
      // Recent history
      recentTemplates: [],
      
      // Actions
      updateConfig: (config) => set((state) => {
        const newConfig = { ...state.currentConfig, ...config };
        // Check if config has been modified from base template
        let isModified = false;
        if (state.baseTemplate) {
          const templateDuration = state.baseTemplate.animationDuration || state.baseTemplate.duration || '6s';
          isModified = 
            JSON.stringify(newConfig.colors) !== JSON.stringify(state.baseTemplate.colors) ||
            newConfig.gradientType !== state.baseTemplate.gradientType ||
            newConfig.duration !== templateDuration;
        }
        return {
          currentConfig: newConfig,
          isModified,
        };
      }),
      
      setTemplate: (template) => set((state) => ({
        currentConfig: {
          ...state.currentConfig,
          template: template.name,
          colors: template.colors || [],
          gradientType: template.gradientType || 'horizontal',
          duration: template.animationDuration || template.duration || '6s',
          animation: template.animation || {},
        },
        baseTemplate: template,
        isModified: false,
        isCustomMode: true, // Always keep custom mode enabled
      })),
      
      resetToTemplate: () => set((state) => {
        if (!state.baseTemplate) return state;
        return {
          currentConfig: {
            ...state.currentConfig,
            colors: state.baseTemplate.colors || [],
            gradientType: state.baseTemplate.gradientType || 'horizontal',
            duration: state.baseTemplate.animationDuration || state.baseTemplate.duration || '6s',
          },
          isModified: false,
        };
      }),
      
      clearTemplate: () => set((state) => ({
        currentConfig: {
          ...state.currentConfig,
          template: null,
        },
        baseTemplate: null,
        isModified: false,
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