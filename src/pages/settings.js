import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCopy, FiCheck, FiGithub, FiInfo } from 'react-icons/fi';
import { BiPalette, BiText, BiRuler } from 'react-icons/bi';
import { HiOutlineTemplate } from 'react-icons/hi';
import { MdPreview } from 'react-icons/md';

// 直接导入模板对象
const basicTemplates = {
  'sunset-gold': {
    name: 'sunset-gold',
    label: 'Sunset Gold',
    colors: ['ffd700', 'ff8c00', 'ff4500'],
    gradientType: 'horizontal',
    animationDuration: '6s',
    description: 'Warm golden sunset gradient'
  },
  'ocean-heart': {
    name: 'ocean-heart',
    label: 'Ocean Heart',
    colors: ['00ffff', '0080ff', '0000ff'],
    gradientType: 'vertical',
    animationDuration: '8s',
    description: 'Deep ocean blue gradient'
  },
  'emerald-forest': {
    name: 'emerald-forest',
    label: 'Emerald Forest',
    colors: ['50c878', '228b22', '006400'],
    gradientType: 'diagonal',
    animationDuration: '7s',
    description: 'Rich emerald green gradient'
  },
  'violet-dream': {
    name: 'violet-dream',
    label: 'Violet Dream',
    colors: ['9400d3', '8a2be2', '4b0082'],
    gradientType: 'circular',
    animationDuration: '10s',
    description: 'Mystical violet gradient'
  },
  'neon-city': {
    name: 'neon-city',
    label: 'Neon City',
    colors: ['ff1493', 'ff00ff', '00ffff'],
    gradientType: 'horizontal',
    animationDuration: '5s',
    description: 'Vibrant neon gradient'
  }
};

const prideTemplates = {
  'pride-rainbow': {
    name: 'pride-rainbow',
    label: 'Pride Rainbow',
    colors: ['ff0000', 'ff8c00', 'ffff00', '008000', '0000ff', '4b0082'],
    gradientType: 'horizontal',
    animationDuration: '6s',
    description: 'Traditional pride rainbow flag'
  },
  'trans-pride': {
    name: 'trans-pride',
    label: 'Trans Pride',
    colors: ['55cdfc', 'f7a8b8', 'ffffff', 'f7a8b8', '55cdfc'],
    gradientType: 'horizontal',
    animationDuration: '6s',
    description: 'Trans pride flag colors'
  },
  'bi-pride': {
    name: 'bi-pride',
    label: 'Bi Pride',
    colors: ['d60270', '9b4f96', '0038a8'],
    gradientType: 'horizontal',
    animationDuration: '6s',
    description: 'Bi pride flag colors'
  },
  'pan-pride': {
    name: 'pan-pride',
    label: 'Pan Pride',
    colors: ['ff1b8d', 'ffd800', '00b5ff'],
    gradientType: 'horizontal',
    animationDuration: '6s',
    description: 'Pan pride flag colors'
  }
};

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
  const [activeCategory, setActiveCategory] = useState('basic'); // 'basic', 'pride'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  const templateCategories = {
    basic: {
      label: 'Basic Templates',
      templates: Object.values(basicTemplates)
    },
    pride: {
      label: 'Pride Templates',
      templates: Object.values(prideTemplates)
    }
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

  // 添加模板预览部分
  const TemplatePreview = ({ template }) => {
    if (!template) return null;
    
    return (
      <div className="template-preview-details">
        <h3>{template.label}</h3>
        <p>{template.description}</p>
        <div className="template-specs">
          <div className="spec-item">
            <span>Type:</span>
            <span>{template.gradientType}</span>
          </div>
          <div className="spec-item">
            <span>Duration:</span>
            <span>{template.animationDuration}</span>
          </div>
          <div className="spec-item">
            <span>Colors:</span>
            <div className="color-dots">
              {template.colors.map((color, i) => (
                <span 
                  key={i} 
                  className="color-dot" 
                  style={{ backgroundColor: `#${color}` }}
                  title={`#${color}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 添加一个新的分类标签组件
  const CategoryLabel = ({ category }) => {
    const labels = {
      basic: '基础模板',
      pride: 'Pride 旗帜'
    };
    
    return (
      <div className="category-label">
        <span>{labels[category]}</span>
      </div>
    );
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
            
            <div className="category-tabs">
              {Object.entries(templateCategories).map(([key, category]) => (
                <button
                  key={key}
                  className={`category-tab ${activeCategory === key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(key)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="templates-grid">
              {templateCategories[activeCategory].templates.map(template => (
                <button
                  key={template.name}
                  className={`template-card ${selectedTemplate?.name === template.name ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setConfig(prev => ({
                      ...prev,
                      template: template.name
                    }));
                  }}
                >
                  <div className="template-preview">
                    <img 
                      src={`/api/svg?text=${template.label}&template=${template.name}`} 
                      alt={template.label}
                      loading="lazy"
                    />
                  </div>
                  <div className="template-info">
                    <span className="template-name">{template.label}</span>
                    <span className="template-type">{template.gradientType}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedTemplate && (
              <TemplatePreview template={selectedTemplate} />
            )}
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