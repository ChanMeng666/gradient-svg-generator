import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCopy, FiCheck, FiGithub, FiInfo, FiHeart, FiCloud, FiZap, FiStar } from 'react-icons/fi';
import { BiPalette, BiText, BiRuler } from 'react-icons/bi';
import { HiOutlineTemplate } from 'react-icons/hi';
import { MdPreview } from 'react-icons/md';
import {
  basicTemplates,
  prideTemplates,
  natureTemplates,
  neonTemplates,
  galaxyTemplates
} from '../config/gradientConfig';

// 修改模板分类定义
const templateCategories = {
  basic: {
    label: 'Basic Templates',
    icon: <BiPalette />,
    templates: [
      {
        name: 'sunset-gold',
        label: 'Sunset Gold',
        description: 'Warm golden sunset gradient',
        gradientType: 'horizontal'
      },
      {
        name: 'ocean-heart',
        label: 'Ocean Heart',
        description: 'Deep ocean blue gradient',
        gradientType: 'vertical'
      },
      // ... 其他模板
    ]
  },
  pride: {
    label: 'Pride Flags',
    icon: <FiHeart />,
    templates: Object.values(prideTemplates)
  },
  nature: {
    label: 'Nature',
    icon: <FiCloud />,
    templates: Object.values(natureTemplates)
  },
  neon: {
    label: 'Neon',
    icon: <FiZap />,
    templates: Object.values(neonTemplates)
  },
  galaxy: {
    label: 'Galaxy',
    icon: <FiStar />,
    templates: Object.values(galaxyTemplates)
  }
};

export default function Settings() {
  const [mounted, setMounted] = useState(false);
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
  
  // 添加主题切换功能
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 检查系统主题偏好
  useEffect(() => {
    if (mounted) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, [mounted]);

  // 应用主题
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, mounted]);

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

  // 如果还没有挂载，返回一个加载状态
  if (!mounted) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

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
                  {category.icon}
                  <span>{category.label}</span>
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
                      src={`/api/svg?text=${encodeURIComponent(template.label)}&template=${template.name}`} 
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