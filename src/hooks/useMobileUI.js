import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for managing mobile UI state
 * Consolidates mobile-related state from create.js
 *
 * @param {number} breakpoint - Width breakpoint for mobile detection (default: 768)
 * @returns {Object} Mobile UI state and toggle functions
 */
export function useMobileUI(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false)
  const [quickTemplatesOpen, setQuickTemplatesOpen] = useState(false)

  // Detect mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check initially
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  // Toggle functions with useCallback for stable references
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const toggleMobileProperties = useCallback(() => {
    setMobilePropertiesOpen(prev => !prev)
  }, [])

  const toggleQuickTemplates = useCallback(() => {
    setQuickTemplatesOpen(prev => !prev)
  }, [])

  // Close functions
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const closeMobileProperties = useCallback(() => {
    setMobilePropertiesOpen(false)
  }, [])

  const closeQuickTemplates = useCallback(() => {
    setQuickTemplatesOpen(false)
  }, [])

  // Open functions
  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true)
  }, [])

  const openMobileProperties = useCallback(() => {
    setMobilePropertiesOpen(true)
  }, [])

  const openQuickTemplates = useCallback(() => {
    setQuickTemplatesOpen(true)
  }, [])

  // Close all mobile panels
  const closeAllPanels = useCallback(() => {
    setMobileMenuOpen(false)
    setMobilePropertiesOpen(false)
    setQuickTemplatesOpen(false)
  }, [])

  return {
    // State
    isMobile,
    mobileMenuOpen,
    mobilePropertiesOpen,
    quickTemplatesOpen,

    // Setters for direct control
    setMobileMenuOpen,
    setMobilePropertiesOpen,
    setQuickTemplatesOpen,

    // Toggle functions
    toggleMobileMenu,
    toggleMobileProperties,
    toggleQuickTemplates,

    // Close functions
    closeMobileMenu,
    closeMobileProperties,
    closeQuickTemplates,
    closeAllPanels,

    // Open functions
    openMobileMenu,
    openMobileProperties,
    openQuickTemplates,
  }
}

export default useMobileUI
