import { useCallback, useState } from 'react';
import { usePreviewUrl } from './usePreviewUrl';
import useStore from '../store/useStore';

const COPY_FEEDBACK_MS = 2000;

/**
 * Groups the three export actions on the create page: copy markdown
 * embed, download SVG, and share URL (Web Share API with clipboard
 * fallback). Each action has a short-lived "just happened" flag so the
 * button can flip to its confirmation copy.
 */
export function useShareActions() {
  const { previewUrl, fullUrl, markdownCode } = usePreviewUrl();
  const currentConfig = useStore((s) => s.currentConfig);

  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(markdownCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), COPY_FEEDBACK_MS);
  }, [markdownCode]);

  const downloadSVG = useCallback(async () => {
    const response = await fetch(previewUrl);
    const svgText = await response.text();
    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentConfig.text || 'gradient'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [previewUrl, currentConfig.text]);

  const share = useCallback(async () => {
    const shareText = `Check out this awesome gradient: ${currentConfig.text}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Gradient SVG', text: shareText, url: fullUrl });
      } catch {
        // user cancelled the share sheet -- silent is fine
      }
    } else {
      await navigator.clipboard.writeText(fullUrl);
      setIsShared(true);
      setTimeout(() => setIsShared(false), COPY_FEEDBACK_MS);
    }
  }, [currentConfig.text, fullUrl]);

  return {
    previewUrl,
    fullUrl,
    markdownCode,
    copyCode,
    downloadSVG,
    share,
    isCopied,
    isShared,
  };
}

export default useShareActions;
