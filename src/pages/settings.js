import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
    // 使用相对路径生成预览URL
    const previewUrl = `/api/svg?text=${encodeURIComponent(config.text)}&color=${config.color}&height=${config.height}${config.template ? `&template=${config.template}` : ''}`;
    setPreview(previewUrl);
    
    // 生成完整URL的Markdown代码
    const fullUrl = `https://gradient-svg-generator.vercel.app${previewUrl}`;
    setMarkdownCode(`![${config.text}](${fullUrl})`);
  }, [config]);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Gradient SVG Generator</h1>
        <Link href="/">
          <button style={{ padding: '0.5rem 1rem' }}>Back to Home</button>
        </Link>
      </div>
      
      <div className="config-form">
        <div className="input-group">
          <label>Text:</label>
          <input 
            value={config.text}
            onChange={e => setConfig({...config, text: e.target.value})}
            placeholder="Enter text"
          />
        </div>
        
        <div className="input-group">
          <label>Color (hex):</label>
          <input 
            value={config.color}
            onChange={e => setConfig({...config, color: e.target.value})}
            placeholder="Color (hex without #)"
          />
        </div>
        
        <div className="input-group">
          <label>Height:</label>
          <input 
            type="number"
            value={config.height}
            onChange={e => setConfig({...config, height: e.target.value})}
            min="30"
            max="300"
          />
        </div>
      </div>

      <div className="preview">
        <h2>Preview:</h2>
        <img src={preview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <div className="markdown-code">
        <h2>Markdown Code:</h2>
        <pre>{markdownCode}</pre>
        <button onClick={() => navigator.clipboard.writeText(markdownCode)}>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
} 