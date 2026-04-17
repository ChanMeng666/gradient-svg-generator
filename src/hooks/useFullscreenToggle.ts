import { useCallback, useEffect, useState } from 'react';

/**
 * Small toggle for a fullscreen overlay mode that closes on Escape.
 * Used by the create page's preview canvas.
 */
export function useFullscreenToggle(initial = false) {
  const [isFullscreen, setIsFullscreen] = useState(initial);

  const toggle = useCallback(() => setIsFullscreen((prev) => !prev), []);
  const close = useCallback(() => setIsFullscreen(false), []);

  useEffect(() => {
    if (!isFullscreen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isFullscreen, close]);

  return { isFullscreen, toggle, close };
}

export default useFullscreenToggle;
