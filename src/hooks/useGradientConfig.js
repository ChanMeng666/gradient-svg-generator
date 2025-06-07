import { useState, useEffect } from 'react';

export const useGradientConfig = (initialConfig = {}) => {
  const [config, setConfig] = useState({
    text: 'Hello World',
    color: '000000',
    height: 120,
    template: '',
    gradientType: 'horizontal',
    animationDuration: 6,
    colors: ['000000'],
    ...initialConfig
  });

  const [preview, setPreview] = useState('');
  const [markdownCode, setMarkdownCode] = useState('');

  useEffect(() => {
    console.log('🔄 useGradientConfig: Config updated', {
      text: config.text,
      height: config.height,
      gradientType: config.gradientType,
      animationDuration: config.animationDuration,
      colors: config.colors,
      template: config.template,
      timestamp: new Date().toISOString()
    });

    const previewUrl = `/api/svg?text=${encodeURIComponent(config.text)}&height=${config.height}&gradientType=${config.gradientType}&duration=${config.animationDuration}s${config.colors.map((c, i) => `&color${i}=${c}`).join('')}${config.template ? `&template=${config.template}` : ''}`;
    
    console.log('📡 useGradientConfig: Generated preview URL', {
      previewUrl,
      parsedParams: {
        text: config.text,
        height: config.height,
        gradientType: config.gradientType,
        duration: `${config.animationDuration}s`,
        colors: config.colors,
        template: config.template || 'none'
      }
    });

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