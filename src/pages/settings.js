import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [config, setConfig] = useState({
    text: 'Hello World',
    color: '000000',
    height: 120,
    template: ''
  });
  
  const [preview, setPreview] = useState('');
  const [markdownCode, setMarkdownCode] = useState('');
  
  useEffect(() => {
    // 生成预览URL
    const previewUrl = `https://gradient-svg-generator.vercel.app/?text=${encodeURIComponent(config.text)}&color=${config.color}&height=${config.height}&template=${config.template}`;
    setPreview(previewUrl);
    
    // 生成Markdown代码
    setMarkdownCode(`![${config.text}](${previewUrl})`);
  }, [config]);

  return (
    <div className="container">
      <h1>Gradient SVG Generator</h1>
      
      {/* 配置表单 */}
      <div className="config-form">
        <input 
          value={config.text}
          onChange={e => setConfig({...config, text: e.target.value})}
          placeholder="Enter text"
        />
        <input 
          value={config.color}
          onChange={e => setConfig({...config, color: e.target.value})}
          placeholder="Color (hex)"
        />
        {/* 其他配置项... */}
      </div>

      {/* 实时预览 */}
      <div className="preview">
        <img src={preview} alt="Preview" />
      </div>

      {/* Markdown代码 */}
      <div className="markdown-code">
        <pre>{markdownCode}</pre>
        <button onClick={() => navigator.clipboard.writeText(markdownCode)}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
} 