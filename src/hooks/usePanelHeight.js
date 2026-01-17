import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for managing mobile panel height with swipe gestures
 *
 * @param {Object} options - Hook options
 * @param {boolean} options.isOpen - Whether the panel is open
 * @param {Function} options.onClose - Callback when panel should close
 * @param {string} options.selector - CSS selector for the panel element
 * @param {number} options.threshold - Swipe threshold in pixels (default: 50)
 * @returns {Object} Panel height state and controls
 */
export function usePanelHeight(options = {}) {
  const {
    isOpen = true,
    onClose = () => {},
    selector = '.mobile-properties-sheet',
    threshold = 50
  } = options

  const [panelHeight, setPanelHeight] = useState('normal') // 'mini', 'normal', 'expanded'
  const startYRef = useRef(0)
  const currentYRef = useRef(0)

  // Height mapping classes - account for bottom navigation
  const heightClasses = {
    mini: 'h-[30vh] mb-16',
    normal: 'h-[50vh] mb-16',
    expanded: 'h-[calc(100vh-8rem)]' // Full height minus header and some padding
  }

  // Cycle through heights
  const cycleHeight = useCallback(() => {
    setPanelHeight((prev) => {
      if (prev === 'mini') return 'normal'
      if (prev === 'normal') return 'expanded'
      return 'mini'
    })
  }, [])

  // Set specific height
  const setHeight = useCallback((height) => {
    if (['mini', 'normal', 'expanded'].includes(height)) {
      setPanelHeight(height)
    }
  }, [])

  // Expand panel
  const expand = useCallback(() => {
    if (panelHeight === 'mini') setPanelHeight('normal')
    else if (panelHeight === 'normal') setPanelHeight('expanded')
  }, [panelHeight])

  // Collapse panel
  const collapse = useCallback(() => {
    if (panelHeight === 'expanded') setPanelHeight('normal')
    else if (panelHeight === 'normal') setPanelHeight('mini')
  }, [panelHeight])

  // Handle swipe gestures
  useEffect(() => {
    if (!isOpen) return

    const handleTouchStart = (e) => {
      startYRef.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      currentYRef.current = e.touches[0].clientY
    }

    const handleTouchEnd = () => {
      const diffY = currentYRef.current - startYRef.current

      // Swipe down to close or collapse
      if (diffY > threshold) {
        if (panelHeight === 'mini') {
          onClose()
        } else {
          collapse()
        }
      }
      // Swipe up to expand
      else if (diffY < -threshold) {
        expand()
      }

      // Reset
      startYRef.current = 0
      currentYRef.current = 0
    }

    const sheet = document.querySelector(selector)
    if (sheet) {
      sheet.addEventListener('touchstart', handleTouchStart)
      sheet.addEventListener('touchmove', handleTouchMove)
      sheet.addEventListener('touchend', handleTouchEnd)

      return () => {
        sheet.removeEventListener('touchstart', handleTouchStart)
        sheet.removeEventListener('touchmove', handleTouchMove)
        sheet.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isOpen, onClose, panelHeight, selector, threshold, expand, collapse])

  // Reset to normal when closed
  useEffect(() => {
    if (!isOpen) {
      setPanelHeight('normal')
    }
  }, [isOpen])

  return {
    panelHeight,
    heightClasses,
    heightClass: heightClasses[panelHeight],
    cycleHeight,
    setHeight,
    expand,
    collapse,
    isExpanded: panelHeight === 'expanded',
    isMini: panelHeight === 'mini',
    isNormal: panelHeight === 'normal'
  }
}

export default usePanelHeight
