import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCopy, FiCheck, FiGithub, FiInfo } from 'react-icons/fi';
import { BiPalette, BiText, BiRuler } from 'react-icons/bi';
import { HiOutlineTemplate } from 'react-icons/hi';
import { MdPreview } from 'react-icons/md';

export default function Settings() {
  const [config, setConfig] = useState({
    text: 'Hello World',
    color: '000000',
    height: 120,
    template: ''
  });
  
  const [preview, setPreview] = useState('');
  const [markdownCode, setMarkdownCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' or 'pride'
  
  // 预设模板列表
  const templates = {
    basic: [
      { name: 'sunset-gold', label: 'Sunset Gold', preview: '/templates/sunset-gold.svg' },
      { name: 'ocean-heart', label: 'Ocean Heart', preview: '/templates/ocean-heart.svg' },
      { name: 'emerald-forest', label: 'Emerald Forest', preview: '/templates/emerald-forest.svg' },
      { name: 'violet-dream', label: 'Violet Dream', preview: '/templates/violet-dream.svg' }
    ],
    pride: [
      { name: 'pride-rainbow', label: 'Pride Rainbow', preview: '/templates/pride-rainbow.svg' },
      { name: 'trans-pride', label: 'Trans Pride', preview: '/templates/trans-pride.svg' },
      { name: 'bi-pride', label: 'Bi Pride', preview: '/templates/bi-pride.svg' },
      { name: 'pan-pride', label: 'Pan Pride', preview: '/templates/pan-pride.svg' }
    ]
  };

  // 添加主题切换功能
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 检查系统主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    // 应用主题
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const previewUrl = `/api/svg?text=${encodeURIComponent(config.text)}&color=${config.color}&height=${config.height}${config.template ? `&template=${config.template}` : ''}`;
    setPreview(previewUrl);
    const fullUrl = `https://gradient-svg-generator.vercel.app${previewUrl}`;
    setMarkdownCode(`![${config.text}](${fullUrl})`);
  }, [config]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdownCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      <nav className="navbar">
        <Link href="/">
          <div className="logo">
            <BiPalette size={24} />
            <span>Gradient SVG Generator</span>
          </div>
        </Link>
        <div className="nav-controls">
          <button 
            className="theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <a 
            href="https://github.com/ChanMeng666/gradient-svg-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <FiGithub />
            <span className="desktop-only">Star on GitHub</span>
          </a>
        </div>
      </nav>
      
      <div className="content">
        <div className="settings-panel">
          <div className="panel-header">
            <h2>Customize Your Gradient</h2>
            <p>Adjust the settings below to create your perfect gradient SVG.</p>
          </div>

          <section className="basic-settings">
            <div className="input-group">
              <label>
                <div className="label-content">
                  <BiText />
                  <span>Display Text</span>
                </div>
                <FiInfo className="tooltip-icon" title="The text that will appear on your gradient" />
              </label>
              <input 
                value={config.text}
                onChange={e => setConfig({...config, text: e.target.value})}
                placeholder="Enter your text here"
                className="text-input"
              />
            </div>
            
            <div className="input-group">
              <label>
                <div className="label-content">
                  <BiPalette />
                  <span>Color</span>
                </div>
                <FiInfo className="tooltip-icon" title="Choose a base color for your gradient" />
              </label>
              <div className="color-input">
                <input 
                  type="color"
                  value={`#${config.color}`}
                  onChange={e => setConfig({...config, color: e.target.value.substring(1)})}
                  className="color-picker"
                />
                <input 
                  value={config.color}
                  onChange={e => setConfig({...config, color: e.target.value})}
                  placeholder="Hex color (without #)"
                  className="hex-input"
                />
              </div>
            </div>
            
            <div className="input-group">
              <label>
                <div className="label-content">
                  <BiRuler />
                  <span>Height</span>
                </div>
                <span className="value">{config.height}px</span>
              </label>
              <input 
                type="range"
                value={config.height}
                onChange={e => setConfig({...config, height: e.target.value})}
                min="30"
                max="300"
                step="10"
                className="range-slider"
              />
              <div className="range-labels">
                <span>30px</span>
                <span>300px</span>
              </div>
            </div>
          </section>

          <section className="templates-section">
            <div className="section-header">
              <div className="header-content">
                <HiOutlineTemplate />
                <h2>Templates</h2>
              </div>
            </div>
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Templates
              </button>
              <button 
                className={`tab ${activeTab === 'pride' ? 'active' : ''}`}
                onClick={() => setActiveTab('pride')}
              >
                Pride Templates
              </button>
            </div>

            <div className="template-grid">
              {templates[activeTab].map(temp => (
                <button
                  key={temp.name}
                  className={`template-btn ${config.template === temp.name ? 'active' : ''}`}
                  onClick={() => setConfig({...config, template: temp.name})}
                >
                  <div className="template-preview">
                    <img src={temp.preview} alt={temp.label} loading="lazy" />
                  </div>
                  <span>{temp.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="preview-panel">
          <section className="preview-section">
            <div className="section-header">
              <div className="header-content">
                <MdPreview />
                <h2>Preview</h2>
              </div>
              <p>Live preview of your gradient SVG</p>
            </div>
            <div className="preview-container">
              <img src={preview} alt="Preview" />
            </div>
          </section>

          <section className="code-section">
            <div className="section-header">
              <h2>Markdown Code</h2>
              <p>Copy this code to use in your README</p>
            </div>
            <div className="code-container">
              <pre>{markdownCode}</pre>
              <button 
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <FiCheck /> Copied!
                  </>
                ) : (
                  <>
                    <FiCopy /> Copy to Clipboard
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 