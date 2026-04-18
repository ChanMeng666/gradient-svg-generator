import { useState, useEffect, useCallback } from 'react';

export interface UseMobileUIReturn {
  isMobile: boolean;
  mobileMenuOpen: boolean;
  mobilePropertiesOpen: boolean;
  quickTemplatesOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setMobilePropertiesOpen: (open: boolean) => void;
  setQuickTemplatesOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  toggleMobileProperties: () => void;
  toggleQuickTemplates: () => void;
  closeMobileMenu: () => void;
  closeMobileProperties: () => void;
  closeQuickTemplates: () => void;
  closeAllPanels: () => void;
  openMobileMenu: () => void;
  openMobileProperties: () => void;
  openQuickTemplates: () => void;
}

export function useMobileUI(breakpoint = 768): UseMobileUIReturn {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [quickTemplatesOpen, setQuickTemplatesOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleMobileProperties = useCallback(() => {
    setMobilePropertiesOpen((prev) => !prev);
  }, []);

  const toggleQuickTemplates = useCallback(() => {
    setQuickTemplatesOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const closeMobileProperties = useCallback(() => {
    setMobilePropertiesOpen(false);
  }, []);

  const closeQuickTemplates = useCallback(() => {
    setQuickTemplatesOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const openMobileProperties = useCallback(() => {
    setMobilePropertiesOpen(true);
  }, []);

  const openQuickTemplates = useCallback(() => {
    setQuickTemplatesOpen(true);
  }, []);

  const closeAllPanels = useCallback(() => {
    setMobileMenuOpen(false);
    setMobilePropertiesOpen(false);
    setQuickTemplatesOpen(false);
  }, []);

  return {
    isMobile,
    mobileMenuOpen,
    mobilePropertiesOpen,
    quickTemplatesOpen,
    setMobileMenuOpen,
    setMobilePropertiesOpen,
    setQuickTemplatesOpen,
    toggleMobileMenu,
    toggleMobileProperties,
    toggleQuickTemplates,
    closeMobileMenu,
    closeMobileProperties,
    closeQuickTemplates,
    closeAllPanels,
    openMobileMenu,
    openMobileProperties,
    openQuickTemplates,
  };
}

export default useMobileUI;
