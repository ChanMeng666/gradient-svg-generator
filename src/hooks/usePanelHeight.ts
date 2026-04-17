import { useState, useEffect, useCallback, useRef } from 'react';

export type PanelHeight = 'mini' | 'normal' | 'expanded';

interface UsePanelHeightOptions {
  isOpen?: boolean;
  onClose?: () => void;
  selector?: string;
  threshold?: number;
}

const HEIGHT_CLASSES: Record<PanelHeight, string> = {
  mini: 'h-[30vh] mb-16',
  normal: 'h-[50vh] mb-16',
  expanded: 'h-[calc(100vh-8rem)]',
};

/**
 * Drives the mobile properties sheet between mini / normal / expanded
 * heights, plus touch-swipe handlers bound to the given selector.
 * Down-swipe past `threshold` collapses (or closes from mini); up-swipe
 * expands.
 */
export function usePanelHeight(options: UsePanelHeightOptions = {}) {
  const {
    isOpen = true,
    onClose = () => {},
    selector = '.mobile-properties-sheet',
    threshold = 50,
  } = options;

  const [panelHeight, setPanelHeight] = useState<PanelHeight>('normal');
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  const cycleHeight = useCallback(() => {
    setPanelHeight((prev) => {
      if (prev === 'mini') return 'normal';
      if (prev === 'normal') return 'expanded';
      return 'mini';
    });
  }, []);

  const setHeight = useCallback((height: PanelHeight) => {
    setPanelHeight(height);
  }, []);

  const expand = useCallback(() => {
    setPanelHeight((prev) => (prev === 'mini' ? 'normal' : prev === 'normal' ? 'expanded' : prev));
  }, []);

  const collapse = useCallback(() => {
    setPanelHeight((prev) => (prev === 'expanded' ? 'normal' : prev === 'normal' ? 'mini' : prev));
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleTouchStart = (e: TouchEvent) => {
      startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      currentYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const diffY = currentYRef.current - startYRef.current;

      if (diffY > threshold) {
        if (panelHeight === 'mini') {
          onClose();
        } else {
          collapse();
        }
      } else if (diffY < -threshold) {
        expand();
      }

      startYRef.current = 0;
      currentYRef.current = 0;
    };

    const sheet = document.querySelector(selector);
    if (!sheet) return;

    sheet.addEventListener('touchstart', handleTouchStart as EventListener);
    sheet.addEventListener('touchmove', handleTouchMove as EventListener);
    sheet.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      sheet.removeEventListener('touchstart', handleTouchStart as EventListener);
      sheet.removeEventListener('touchmove', handleTouchMove as EventListener);
      sheet.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [isOpen, onClose, panelHeight, selector, threshold, expand, collapse]);

  useEffect(() => {
    if (!isOpen) {
      setPanelHeight('normal');
    }
  }, [isOpen]);

  return {
    panelHeight,
    heightClasses: HEIGHT_CLASSES,
    heightClass: HEIGHT_CLASSES[panelHeight],
    cycleHeight,
    setHeight,
    expand,
    collapse,
    isExpanded: panelHeight === 'expanded',
    isMini: panelHeight === 'mini',
    isNormal: panelHeight === 'normal',
  };
}

export default usePanelHeight;
