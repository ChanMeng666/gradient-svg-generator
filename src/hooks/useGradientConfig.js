import { useState, useEffect } from 'react';

export const useGradientConfig = () => {
  const [config, setConfig] = useState({
    text: 'Hello World',
    color: '000000',
    height: 120,
    template: '',
    gradientType: 'horizontal',
    animationDuration: 6,
    colors: ['000000']
  });

  const [preview, setPreview] = useState('');
  const [markdownCode, setMarkdownCode] = useState('');

  useEffect(() => {
    const previewUrl = `/api/svg?text=${encodeURIComponent(config.text)}&color=${config.color}&height=${config.height}&gradientType=${config.gradientType}&duration=${config.animationDuration}s${config.colors.map((c, i) => `&color${i}=${c}`).join('')}${config.template ? `&template=${config.template}` : ''}`;
    setPreview(previewUrl);
    const fullUrl = `https://gradient-svg-generator.vercel.app${previewUrl}`;
    setMarkdownCode(`![${config.text}](${fullUrl})`);
  }, [config]);

  return {
    config,
    setConfig,
    preview,
    markdownCode
  };
}; 