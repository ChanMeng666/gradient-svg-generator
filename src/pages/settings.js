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
  
  // 预设模板列表
  const templates = {
    basic: [
      { name: 'sunset-gold', label: 'Sunset Gold' },
      { name: 'ocean-heart', label: 'Ocean Heart' },
      { name: 'emerald-forest', label: 'Emerald Forest' },
      { name: 'violet-dream', label: 'Violet Dream' }
    ],
    pride: [
      { name: 'pride-rainbow', label: 'Pride Rainbow' },
      { name: 'trans-pride', label: 'Trans Pride' },
      { name: 'bi-pride', label: 'Bi Pride' },
      { name: 'pan-pride', label: 'Pan Pride' }
    ]
  };
  
  useEffect(() => {
    const previewUrl = `/api/svg?text=${encodeURIComponent(config.text)}&color=${config.color}&height=${config.height}${config.template ? `&template=${config.template}` : ''}`;
    setPreview(previewUrl);
    const fullUrl = `https://gradient-svg-generator.vercel.app${previewUrl}`;
    setMarkdownCode(`![${config.text}](${fullUrl})`);
  }, [config]);

  return (
    <div className="container">
      <div className="header">
        <h1>Gradient SVG Generator</h1>
        <Link href="/">
          <button>Back to Home</button>
        </Link>
      </div>
      
      <div className="content">
        {/* 左侧设置区域 */}
        <div className="settings-panel">
          <section className="basic-settings">
            <h2>Basic Settings</h2>
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
              <div className="color-input">
                <input 
                  type="color"
                  value={`#${config.color}`}
                  onChange={e => setConfig({...config, color: e.target.value.substring(1)})}
                />
                <input 
                  value={config.color}
                  onChange={e => setConfig({...config, color: e.target.value})}
                  placeholder="Color (hex without #)"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label>Height: {config.height}px</label>
              <input 
                type="range"
                value={config.height}
                onChange={e => setConfig({...config, height: e.target.value})}
                min="30"
                max="300"
                step="10"
              />
            </div>
          </section>

          <section className="templates">
            <h2>Basic Templates</h2>
            <div className="template-grid">
              {templates.basic.map(temp => (
                <button
                  key={temp.name}
                  className={`template-btn ${config.template === temp.name ? 'active' : ''}`}
                  onClick={() => setConfig({...config, template: temp.name})}
                >
                  {temp.label}
                </button>
              ))}
            </div>

            <h2>Pride Templates</h2>
            <div className="template-grid">
              {templates.pride.map(temp => (
                <button
                  key={temp.name}
                  className={`template-btn ${config.template === temp.name ? 'active' : ''}`}
                  onClick={() => setConfig({...config, template: temp.name})}
                >
                  {temp.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* 右侧预览区域 */}
        <div className="preview-panel">
          <section className="preview-section">
            <h2>Preview</h2>
            <div className="preview-container">
              <img src={preview} alt="Preview" />
            </div>
          </section>

          <section className="code-section">
            <h2>Markdown Code</h2>
            <div className="code-container">
              <pre>{markdownCode}</pre>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(markdownCode);
                  alert('Copied to clipboard!');
                }}
              >
                Copy to Clipboard
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 