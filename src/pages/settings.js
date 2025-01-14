import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiCopy, FiCheck, FiGithub, FiInfo, FiHeart, FiCloud, FiBolt, FiStar } from 'react-icons/fi';
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
  },
  'midnight-ocean': {
    name: 'midnight-ocean',
    label: 'Midnight Ocean',
    colors: ['000046', '1CB5E0', '000046'],
    gradientType: 'vertical',
    animationDuration: '8s',
    description: 'Deep blue ocean at midnight'
  },
  'morning-light': {
    name: 'morning-light',
    label: 'Morning Light',
    colors: ['FFF3B0', 'FFA9A9', 'DAE2FF'],
    gradientType: 'diagonal',
    animationDuration: '10s',
    description: 'Soft morning sunrise colors'
  },
  'forest-mist': {
    name: 'forest-mist',
    label: 'Forest Mist',
    colors: ['2AF598', '009EFD'],
    gradientType: 'radial',
    animationDuration: '12s',
    description: 'Misty forest atmosphere'
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

const natureTemplates = {
  'spring-bloom': {
    name: 'spring-bloom',
    label: 'Spring Bloom',
    colors: ['FF96F9', '96FFC1', 'FFFF96'],
    gradientType: 'conic',
    animationDuration: '8s',
    description: 'Spring flowers blooming'
  },
  'autumn-leaves': {
    name: 'autumn-leaves',
    label: 'Autumn Leaves',
    colors: ['FFB75E', 'ED8F03', 'B83603'],
    gradientType: 'diagonal',
    animationDuration: '10s',
    description: 'Fall foliage colors'
  },
  'winter-frost': {
    name: 'winter-frost',
    label: 'Winter Frost',
    colors: ['E3FDF5', 'FFE6FA', 'E3FDF5'],
    gradientType: 'radial',
    animationDuration: '15s',
    description: 'Frosty winter morning'
  }
};

const neonTemplates = {
  'cyber-punk': {
    name: 'cyber-punk',
    label: 'Cyber Punk',
    colors: ['FF00FF', '00FFFF', 'FF00FF'],
    gradientType: 'diagonal',
    animationDuration: '4s',
    description: 'Vibrant cyberpunk aesthetic'
  },
  'retro-wave': {
    name: 'retro-wave',
    label: 'Retro Wave',
    colors: ['FF0080', '7928CA', '4A148C'],
    gradientType: 'horizontal',
    animationDuration: '6s',
    description: '80s synthwave style'
  },
  'neon-glow': {
    name: 'neon-glow',
    label: 'Neon Glow',
    colors: ['00FF00', 'FFFF00', '00FF00'],
    gradientType: 'radial',
    animationDuration: '3s',
    description: 'Electric neon lights'
  }
};

const galaxyTemplates = {
  'nebula': {
    name: 'nebula',
    label: 'Nebula',
    colors: ['8E2DE2', '4A00E0', '8E2DE2'],
    gradientType: 'conic',
    animationDuration: '20s',
    description: 'Cosmic nebula swirls'
  },
  'aurora': {
    name: 'aurora',
    label: 'Aurora',
    colors: ['00FF9D', '00F0FF', '4A00E0'],
    gradientType: 'vertical',
    animationDuration: '15s',
    description: 'Northern lights display'
  },
  'milky-way': {
    name: 'milky-way',
    label: 'Milky Way',
    colors: ['000000', '434343', '000000'],
    gradientType: 'radial',
    animationDuration: '25s',
    description: 'Deep space galaxy view'
  }
};

// 更新模板分类
const templateCategories = {
  basic: {
    label: 'Basic Templates',
    icon: <BiPalette />,
    templates: Object.values(basicTemplates)
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
    icon: <FiBolt />,
    templates: Object.values(neonTemplates)
  },
  galaxy: {
    label: 'Galaxy',
    icon: <FiStar />,
    templates: Object.values(galaxyTemplates)
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