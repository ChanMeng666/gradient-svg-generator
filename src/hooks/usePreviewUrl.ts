import { useMemo } from 'react';
import useStore from '../store/useStore';

const BASE_URL = 'https://gradient-svg-generator.vercel.app';

/**
 * Derives the /api/svg URL + embed snippets from the current store
 * config. When a template is selected without modifications, the URL
 * only carries `template=`; once modified (or custom mode), it
 * enumerates every parameter so the API sees the override.
 */
export function usePreviewUrl() {
  const currentConfig = useStore((s) => s.currentConfig);
  const isModified = useStore((s) => s.isModified);

  const previewUrl = useMemo(() => {
    const params = new URLSearchParams({
      text: currentConfig.text || 'Preview',
      height: String(currentConfig.height || 120),
    });

    if (currentConfig.template && !isModified) {
      params.append('template', currentConfig.template);
    } else {
      params.append('gradientType', currentConfig.gradientType || 'horizontal');
      params.append('duration', currentConfig.duration || '6s');

      const colors = currentConfig.colors || [];
      colors.forEach((color, index) => {
        params.append(`color${index}`, color.replace('#', ''));
      });
    }

    return `/api/svg?${params.toString()}`;
  }, [currentConfig, isModified]);

  const fullUrl = useMemo(() => `${BASE_URL}${previewUrl}`, [previewUrl]);

  const markdownCode = useMemo(
    () => `![${currentConfig.text || 'Gradient'}](${fullUrl})`,
    [currentConfig.text, fullUrl],
  );

  const htmlCode = useMemo(
    () => `<img src="${fullUrl}" alt="${currentConfig.text || 'Gradient'}" />`,
    [currentConfig.text, fullUrl],
  );

  const queryString = useMemo(() => previewUrl.replace('/api/svg?', ''), [previewUrl]);

  return { previewUrl, fullUrl, markdownCode, htmlCode, queryString, baseUrl: BASE_URL };
}

export default usePreviewUrl;
