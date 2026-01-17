import { useMemo } from 'react'
import useStore from '../store/useStore'

const BASE_URL = 'https://gradient-svg-generator.vercel.app'

/**
 * Custom hook for generating preview URLs
 * Centralizes the preview URL generation logic used in create.js
 *
 * @returns {Object} Preview URL data and utilities
 */
export function usePreviewUrl() {
  const currentConfig = useStore(state => state.currentConfig)
  const isModified = useStore(state => state.isModified)

  // Generate the API preview URL
  const previewUrl = useMemo(() => {
    const params = new URLSearchParams({
      text: currentConfig.text || 'Preview',
      height: currentConfig.height || 120,
    })

    // If template is not modified, use template parameter only
    if (currentConfig.template && !isModified) {
      params.append('template', currentConfig.template)
    } else {
      // Send all specific parameters when template is modified or in custom mode
      params.append('gradientType', currentConfig.gradientType || 'horizontal')
      params.append('duration', currentConfig.duration || '6s')

      // Add colors
      const colors = currentConfig.colors || []
      if (colors.length > 0) {
        colors.forEach((color, index) => {
          params.append(`color${index}`, color.replace('#', ''))
        })
      }
    }

    return `/api/svg?${params.toString()}`
  }, [currentConfig, isModified])

  // Full URL for external sharing
  const fullUrl = useMemo(() => {
    return `${BASE_URL}${previewUrl}`
  }, [previewUrl])

  // Markdown code for embedding
  const markdownCode = useMemo(() => {
    return `![${currentConfig.text || 'Gradient'}](${fullUrl})`
  }, [currentConfig.text, fullUrl])

  // HTML img tag for embedding
  const htmlCode = useMemo(() => {
    return `<img src="${fullUrl}" alt="${currentConfig.text || 'Gradient'}" />`
  }, [currentConfig.text, fullUrl])

  // Just the API query string (without /api/svg)
  const queryString = useMemo(() => {
    return previewUrl.replace('/api/svg?', '')
  }, [previewUrl])

  return {
    previewUrl,     // Relative API URL: /api/svg?...
    fullUrl,        // Full URL with domain
    markdownCode,   // Markdown embed code
    htmlCode,       // HTML img tag
    queryString,    // Just the query parameters
    baseUrl: BASE_URL,
  }
}

export default usePreviewUrl
