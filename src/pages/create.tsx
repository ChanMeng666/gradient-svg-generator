import { useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Header from '../components/layout/Header';
import GEOHead from '../components/seo/GEOHead';
import Sidebar from '../components/layout/Sidebar';
import type { SidebarTemplate } from '../components/layout/Sidebar';
import type { SidebarCategory } from '../components/layout/Sidebar/SidebarFilters';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';
import useStore from '../store/useStore';
import type { Template } from '../store/slices/template';
import styles from '../styles/create.module.css';
import { APP_URL } from '../core/constants';
import { useMobileUI } from '../hooks/useMobileUI';
import { useShareActions } from '../hooks/useShareActions';
import { useFullscreenToggle } from '../hooks/useFullscreenToggle';
import { useResetConfig } from '../hooks/useResetConfig';
import {
  Download,
  Copy,
  Maximize2,
  Settings,
  Palette,
  Code2,
  Share2,
  RotateCcw,
  X,
} from 'lucide-react';
import { getAllTemplates, getCategories } from '../utils/templateUtils';

const PropertiesPanel = dynamic(
  () =>
    import('../components/features/properties-panel').then((m) => ({
      default: m.PropertiesPanel,
    })),
  { ssr: false },
);
const MobilePropertiesPanel = dynamic(
  () =>
    import('../components/features/properties-panel').then((m) => ({
      default: m.MobilePropertiesPanel,
    })),
  { ssr: false },
);
const SwipeableTemplateCarousel = dynamic(
  () => import('../components/features/SwipeableTemplateCarousel'),
  { ssr: false },
);

export default function Create() {
  const router = useRouter();
  const { setTemplate, addToRecent, favorites, toggleFavorite, baseTemplate, isModified } =
    useStore();

  const {
    isMobile,
    mobileMenuOpen,
    mobilePropertiesOpen,
    quickTemplatesOpen,
    setMobileMenuOpen,
    setMobilePropertiesOpen,
    setQuickTemplatesOpen,
    closeMobileMenu,
  } = useMobileUI();
  const { previewUrl, copyCode, downloadSVG, share, isCopied, isShared } = useShareActions();
  const { isFullscreen, toggle: toggleFullscreen, close: closeFullscreen } = useFullscreenToggle();
  const resetConfig = useResetConfig();

  const templates = useMemo(() => getAllTemplates() as Template[], []);
  const categories = useMemo(() => getCategories() as SidebarCategory[], []);

  useEffect(() => {
    if (!router.isReady) return;
    const queryTemplate = router.query.template;
    const templateName = Array.isArray(queryTemplate) ? queryTemplate[0] : queryTemplate;
    if (!templateName) return;
    const template = templates.find((t) => t.name === templateName);
    if (template) {
      setTemplate(template);
      addToRecent(template);
    }
  }, [router.isReady, router.query.template, templates, setTemplate, addToRecent]);

  const handleTemplateSelect = useCallback(
    (template: Template) => {
      setTemplate(template);
      addToRecent(template);
      closeMobileMenu();
    },
    [setTemplate, addToRecent, closeMobileMenu],
  );

  return (
    <>
      <GEOHead
        pageType="create"
        customInstructions="This is the main creation interface where users can design custom gradients with real-time preview. Guide users through template selection, color customization, and parameter tuning for optimal results."
      />
      <Head>
        <title>Create Custom Gradients - Chromaflow | Real-time Editor</title>
        <meta
          name="description"
          content="Create beautiful animated SVG gradients with our powerful real-time editor. Choose from 340+ professional templates including Path Animation, Weather, Light & Shadow, Art Movement, and Culinary effects or design your own custom gradients. Free API generation."
        />
        <meta
          name="keywords"
          content="gradient creator, SVG editor, custom gradients, real-time preview, design tool, API generator, path animation, typing animation, weather effects, light shadow, art movement, culinary"
        />
        <meta property="og:title" content="Gradient Creator - Real-time SVG Editor" />
        <meta
          property="og:description"
          content="Professional gradient creation tool with real-time preview and 340+ templates across 19 categories."
        />
      </Head>

      <div className="min-h-screen bg-background">
        <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

        <div className={styles.pageContainer}>
          <div
            className={cn(
              'transition-all duration-300 shrink-0',
              'fixed top-16 left-0 z-40 md:relative md:inset-y-0',
              'md:h-full',
              isMobile ? 'bottom-0 h-[calc(100vh-4rem)]' : 'h-full',
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
            )}
          >
            <Sidebar
              templates={templates as unknown as SidebarTemplate[]}
              categories={categories}
              onTemplateSelect={(template) => handleTemplateSelect(template as unknown as Template)}
            />
          </div>

          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          <div className={styles.mainContent}>
            <div className={styles.canvasArea}>
              <div className={styles.canvasHeader}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <h2 className={cn('font-semibold', isMobile ? 'text-base' : 'text-lg')}>
                      Preview
                    </h2>
                    <Badge
                      variant={baseTemplate && !isModified ? 'default' : 'outline'}
                      className={cn(isMobile && 'text-xs px-2 py-0.5')}
                    >
                      {baseTemplate ? (isModified ? 'Modified' : 'Template') : 'Custom'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size={isMobile ? 'default' : 'icon'}
                      onClick={toggleFullscreen}
                      className={cn('transition-all', isMobile ? 'h-12 w-12' : 'h-10 w-10')}
                    >
                      <Maximize2 className={cn(isMobile ? 'h-6 w-6' : 'h-4 w-4')} />
                    </Button>
                    <Button
                      variant="outline"
                      size={isMobile ? 'default' : 'icon'}
                      onClick={resetConfig}
                      className={cn('transition-all', isMobile ? 'h-12 w-12' : 'h-10 w-10')}
                    >
                      <RotateCcw className={cn(isMobile ? 'h-6 w-6' : 'h-4 w-4')} />
                    </Button>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  styles.canvasContent,
                  isFullscreen && 'fixed inset-0 z-50 bg-background',
                )}
              >
                {isFullscreen && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={closeFullscreen}
                    className="absolute top-4 right-4 z-10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <div className={styles.canvasWrapper}>
                  <div className="bg-white">
                    {previewUrl && (
                      <img src={previewUrl} alt="Gradient Preview" className="block" />
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.actionsBar}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={downloadSVG}
                        className={cn('gap-2', isMobile && 'text-xs px-3')}
                      >
                        <Download className="h-4 w-4" />
                        <span className={cn(isMobile && 'hidden sm:inline')}>Download</span>
                        {isMobile && 'SVG'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={copyCode}
                        className={cn('gap-2', isMobile && 'text-xs px-3')}
                      >
                        <Copy className="h-4 w-4" />
                        <span className={cn(isMobile && 'hidden sm:inline')}>
                          {isCopied ? 'Copied!' : 'Copy Code'}
                        </span>
                        {isMobile && (isCopied ? '✓' : 'Copy')}
                      </Button>
                      <Button
                        variant="outline"
                        className={cn('gap-2', isMobile && 'text-xs px-3')}
                        onClick={share}
                      >
                        <Share2 className="h-4 w-4" />
                        <span className={cn(isMobile && 'hidden sm:inline')}>
                          {isShared ? 'Link Copied!' : 'Share'}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className="hidden lg:block mt-3">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Code2 className="h-4 w-4 shrink-0 mt-1" />
                      <div className="flex-1">
                        <code className="font-mono text-xs bg-muted px-3 py-2 rounded block break-all whitespace-pre-wrap">
                          {APP_URL}
                          {previewUrl}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!isMobile && (
              <div className={styles.propertiesPanel}>
                <PropertiesPanel />
              </div>
            )}

            {isMobile && !mobilePropertiesOpen && (
              <div className="fixed bottom-24 right-4 z-20">
                <Button
                  size="icon"
                  className="h-14 w-14 rounded-full shadow-lg"
                  onClick={() => setMobilePropertiesOpen(true)}
                >
                  <Settings className="h-6 w-6" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <MobilePropertiesPanel
          isOpen={mobilePropertiesOpen}
          onClose={() => setMobilePropertiesOpen(false)}
        />
      )}

      {isMobile && !isFullscreen && !mobilePropertiesOpen && (
        <div className="fixed bottom-20 left-4 z-20">
          <Button
            size="sm"
            variant={quickTemplatesOpen ? 'default' : 'outline'}
            className="shadow-lg"
            onClick={() => setQuickTemplatesOpen(!quickTemplatesOpen)}
          >
            <Palette className="h-4 w-4 mr-1" />
            Templates
          </Button>
        </div>
      )}

      {isMobile && !isFullscreen && quickTemplatesOpen && !mobilePropertiesOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-30 animate-in slide-in-from-bottom duration-300">
          <div className="bg-background/95 backdrop-blur-sm border-t rounded-t-lg shadow-lg">
            <div className="p-4 pb-20">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">Quick Templates</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(true)}
                    className="text-xs"
                  >
                    View All
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuickTemplatesOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <SwipeableTemplateCarousel
                templates={templates.slice(0, 12)}
                onTemplateSelect={(template) => {
                  handleTemplateSelect(template as Template);
                  setQuickTemplatesOpen(false);
                }}
                favorites={favorites}
                onFavorite={toggleFavorite}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
