// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { FiCopy, FiCheck, FiGithub, FiInfo } from 'react-icons/fi';
// import { BiPalette, BiText, BiRuler } from 'react-icons/bi';
// import { HiOutlineTemplate } from 'react-icons/hi';
// import { MdPreview } from 'react-icons/md';

// // 定义所有模板配置
// const templateCategories = {
//   basic: {
//     label: 'Basic Templates',
//     templates: [
//       {
//         name: 'sunset-gold',
//         label: 'Sunset Gold',
//         colors: ['ffd700', 'ff8c00', 'ff4500'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Warm golden sunset gradient'
//       },
//       {
//         name: 'ocean-heart',
//         label: 'Ocean Heart',
//         colors: ['00ffff', '0080ff', '0000ff'],
//         gradientType: 'vertical',
//         animationDuration: '8s',
//         description: 'Deep ocean blue gradient'
//       },
//       {
//         name: 'emerald-forest',
//         label: 'Emerald Forest',
//         colors: ['50c878', '228b22', '006400'],
//         gradientType: 'diagonal',
//         animationDuration: '7s',
//         description: 'Rich emerald green gradient'
//       },
//       {
//         name: 'violet-dream',
//         label: 'Violet Dream',
//         colors: ['9400d3', '8a2be2', '4b0082'],
//         gradientType: 'circular',
//         animationDuration: '10s',
//         description: 'Mystical violet gradient'
//       },
//       {
//         name: 'neon-city',
//         label: 'Neon City',
//         colors: ['ff1493', 'ff00ff', '00ffff'],
//         gradientType: 'horizontal',
//         animationDuration: '5s',
//         description: 'Vibrant neon gradient'
//       },
//       {
//         name: 'cyber-punk',
//         label: 'Cyber Punk',
//         colors: ['ff00ff', '00ffff', 'ff00cc'],
//         gradientType: 'diagonal',
//         animationDuration: '8s',
//         description: 'Vibrant cyberpunk-inspired gradient'
//       },
//       {
//         name: 'northern-lights',
//         label: 'Northern Lights',
//         colors: ['9400d3', '4b0082', '00ff00', '00ffff'],
//         gradientType: 'vertical',
//         animationDuration: '10s',
//         description: 'Aurora borealis inspired colors'
//       },
//       {
//         name: 'cotton-candy',
//         label: 'Cotton Candy',
//         colors: ['ff99cc', 'ff99ff', '99ccff'],
//         gradientType: 'circular',
//         animationDuration: '7s',
//         description: 'Sweet pastel gradient blend'
//       },
//       {
//         name: 'midnight-galaxy',
//         label: 'Midnight Galaxy',
//         colors: ['000033', '4b0082', '800080', '000066'],
//         gradientType: 'radial',
//         animationDuration: '12s',
//         description: 'Deep space inspired colors'
//       },
//       {
//         name: 'tropical-paradise',
//         label: 'Tropical Paradise',
//         colors: ['00ff99', '33ccff', '00ffcc'],
//         gradientType: 'diagonal',
//         animationDuration: '8s',
//         description: 'Fresh tropical ocean colors'
//       },
//       {
//         name: 'desert-dusk',
//         label: 'Desert Dusk',
//         colors: ['ff9966', 'ff6699', 'cc6699'],
//         gradientType: 'horizontal',
//         animationDuration: '9s',
//         description: 'Warm desert sunset colors'
//       }
//     ]
//   },
//   pride: {
//     label: 'Pride Templates',
//     templates: [
//       {
//         name: 'pride-rainbow',
//         label: 'Pride Rainbow',
//         colors: ['ff0000', 'ff8c00', 'ffff00', '008000', '0000ff', '4b0082'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Traditional pride rainbow flag'
//       },
//       {
//         name: 'trans-pride',
//         label: 'Trans Pride',
//         colors: ['55cdfc', 'f7a8b8', 'ffffff', 'f7a8b8', '55cdfc'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Trans pride flag colors'
//       },
//       {
//         name: 'bi-pride',
//         label: 'Bi Pride',
//         colors: ['d60270', '9b4f96', '0038a8'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Bi pride flag colors'
//       },
//       {
//         name: 'pan-pride',
//         label: 'Pan Pride',
//         colors: ['ff1b8d', 'ffd800', '00b5ff'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Pan pride flag colors'
//       },
//       {
//         name: 'nonbinary-pride',
//         label: 'Nonbinary Pride',
//         colors: ['fcf434', 'ffffff', '9c59d1', '2c2c2c'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Nonbinary pride flag colors'
//       },
//       {
//         name: 'lesbian-pride',
//         label: 'Lesbian Pride',
//         colors: ['d62900', 'ff9b55', 'ffffff', 'd461a6', 'a50062'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Modern lesbian pride flag colors'
//       },
//       {
//         name: 'genderqueer-pride',
//         label: 'Genderqueer Pride',
//         colors: ['b57edc', 'ffffff', '4a8123'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Genderqueer pride flag colors'
//       },
//       {
//         name: 'genderfluid-pride',
//         label: 'Genderfluid Pride',
//         colors: ['ff75a2', 'ffffff', 'be18d6', '000000', '333ebd'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Genderfluid pride flag colors'
//       },
//       {
//         name: 'ace-pride',
//         label: 'Ace Pride',
//         colors: ['000000', 'a3a3a3', 'ffffff', '800080'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Asexual pride flag colors'
//       },
//       {
//         name: 'aro-pride',
//         label: 'Aromantic Pride',
//         colors: ['3da542', 'a7d379', 'ffffff', 'a9a9a9', '000000'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Aromantic pride flag colors'
//       },
//       {
//         name: 'intersex-pride',
//         label: 'Intersex Pride',
//         colors: ['ffd800', '7902aa'],
//         gradientType: 'circular',
//         animationDuration: '6s',
//         description: 'Intersex pride flag colors with unique circular gradient'
//       },
//       {
//         name: 'agender-pride',
//         label: 'Agender Pride',
//         colors: ['000000', 'b9b9b9', 'ffffff', 'b8f483', 'ffffff', 'b9b9b9', '000000'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Agender pride flag colors'
//       },
//       {
//         name: 'poly-pride',
//         label: 'Polyamory Pride',
//         colors: ['0000ff', 'ff0000', '000000'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Polyamory pride flag colors'
//       },
//       {
//         name: 'demiboy-pride',
//         label: 'Demiboy Pride',
//         colors: ['7f7f7f', 'c4c4c4', '9ad9eb', 'ffffff'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Demiboy pride flag colors'
//       },
//       {
//         name: 'demigirl-pride',
//         label: 'Demigirl Pride',
//         colors: ['7f7f7f', 'c4c4c4', 'ffaec9', 'ffffff'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Demigirl pride flag colors'
//       },
//       {
//         name: 'omnisexual-pride',
//         label: 'Omnisexual Pride',
//         colors: ['ff9ccd', 'ff53bd', '2c2c2c', '6760ff', '9cb9ff'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Omnisexual pride flag colors'
//       },
//       {
//         name: 'progress-pride',
//         label: 'Progress Pride',
//         colors: ['000000', '784F17', 'ff0000', 'ff8c00', 'ffff00', '008000', '0000ff', '4b0082'],
//         gradientType: 'diagonal',
//         animationDuration: '8s',
//         description: 'Progress pride flag with inclusive colors'
//       },
//       {
//         name: 'demiromantic-pride',
//         label: 'Demiromantic Pride',
//         colors: ['ffffff', '3da542', '000000', 'a9a9a9'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Demiromantic pride flag colors'
//       },
//       {
//         name: 'demisexual-pride',
//         label: 'Demisexual Pride',
//         colors: ['ffffff', '6e0070', 'd2d2d2', '000000'],
//         gradientType: 'horizontal',
//         animationDuration: '6s',
//         description: 'Demisexual pride flag colors'
//       },
//       {
//         name: 'queer-pride',
//         label: 'Queer Pride',
//         colors: ['b57edc', 'ffffff', '4a8123', '000000'],
//         gradientType: 'vertical',
//         animationDuration: '7s',
//         description: 'Queer pride flag colors'
//       }
//     ]
//   }
// };

// // Settings 组件
// export default function Settings() {
//   // 状态管理
//   const [config, setConfig] = useState({
//     text: 'Hello World',
//     color: '000000',
//     height: 120,
//     template: ''
//   });
//   const [preview, setPreview] = useState('');
//   const [markdownCode, setMarkdownCode] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [activeCategory, setActiveCategory] = useState('basic');
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // 主题相关的副作用
//   useEffect(() => {
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     setIsDarkMode(prefersDark);
//   }, []);

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
//   }, [isDarkMode]);

//   // 预览和Markdown代码生成的副作用
//   useEffect(() => {
//     const previewUrl = `/api/svg?text=${encodeURIComponent(config.text)}&color=${config.color}&height=${config.height}${config.template ? `&template=${config.template}` : ''}`;
//     setPreview(previewUrl);
//     const fullUrl = `https://gradient-svg-generator.vercel.app${previewUrl}`;
//     setMarkdownCode(`![${config.text}](${fullUrl})`);
//   }, [config]);

//   // 复制功能
//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(markdownCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // 模板预览组件
//   const TemplatePreview = ({ template }) => {
//     if (!template) return null;
    
//     return (
//       <div className="template-preview-details">
//         <h3>{template.label}</h3>
//         <p>{template.description}</p>
//         <div className="template-specs">
//           <div className="spec-item">
//             <span>Type:</span>
//             <span>{template.gradientType}</span>
//           </div>
//           <div className="spec-item">
//             <span>Duration:</span>
//             <span>{template.animationDuration}</span>
//           </div>
//           <div className="spec-item">
//             <span>Colors:</span>
//             <div className="color-dots">
//               {template.colors.map((color, i) => (
//                 <span 
//                   key={i} 
//                   className="color-dot" 
//                   style={{ backgroundColor: `#${color}` }}
//                   title={`#${color}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={`container ${isDarkMode ? 'dark' : ''}`}>
//       <nav className="navbar">
//         <Link href="/">
//           <div className="logo">
//             <BiPalette size={24} />
//             <span>Gradient SVG Generator</span>
//           </div>
//         </Link>
//         <div className="nav-controls">
//           <button 
//             className="theme-toggle"
//             onClick={() => setIsDarkMode(!isDarkMode)}
//             aria-label="Toggle theme"
//           >
//             {isDarkMode ? '🌞' : '🌙'}
//           </button>
//           <a 
//             href="https://github.com/ChanMeng666/gradient-svg-generator"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="github-link"
//           >
//             <FiGithub />
//             <span className="desktop-only">Star on GitHub</span>
//           </a>
//         </div>
//       </nav>
      
//       <div className="content">
//         <div className="settings-panel">
//           <div className="panel-header">
//             <h2>Customize Your Gradient</h2>
//             <p>Adjust the settings below to create your perfect gradient SVG.</p>
//           </div>

//           <section className="basic-settings">
//             <div className="input-group">
//               <label>
//                 <div className="label-content">
//                   <BiText />
//                   <span>Display Text</span>
//                 </div>
//                 <FiInfo className="tooltip-icon" title="The text that will appear on your gradient" />
//               </label>
//               <input 
//                 value={config.text}
//                 onChange={e => setConfig({...config, text: e.target.value})}
//                 placeholder="Enter your text here"
//                 className="text-input"
//               />
//             </div>
            
//             <div className="input-group">
//               <label>
//                 <div className="label-content">
//                   <BiPalette />
//                   <span>Color</span>
//                 </div>
//                 <FiInfo className="tooltip-icon" title="Choose a base color for your gradient" />
//               </label>
//               <div className="color-input">
//                 <input 
//                   type="color"
//                   value={`#${config.color}`}
//                   onChange={e => setConfig({...config, color: e.target.value.substring(1)})}
//                   className="color-picker"
//                 />
//                 <input 
//                   value={config.color}
//                   onChange={e => setConfig({...config, color: e.target.value})}
//                   placeholder="Hex color (without #)"
//                   className="hex-input"
//                 />
//               </div>
//             </div>
            
//             <div className="input-group">
//               <label>
//                 <div className="label-content">
//                   <BiRuler />
//                   <span>Height</span>
//                 </div>
//                 <span className="value">{config.height}px</span>
//               </label>
//               <input 
//                 type="range"
//                 value={config.height}
//                 onChange={e => setConfig({...config, height: e.target.value})}
//                 min="30"
//                 max="300"
//                 step="10"
//                 className="range-slider"
//               />
//               <div className="range-labels">
//                 <span>30px</span>
//                 <span>300px</span>
//               </div>
//             </div>
//           </section>

//           <section className="templates-section">
//             <div className="section-header">
//               <div className="header-content">
//                 <HiOutlineTemplate />
//                 <h2>Templates</h2>
//               </div>
//             </div>
            
//             <div className="category-tabs">
//               {Object.entries(templateCategories).map(([key, category]) => (
//                 <button
//                   key={key}
//                   className={`category-tab ${activeCategory === key ? 'active' : ''}`}
//                   onClick={() => setActiveCategory(key)}
//                 >
//                   {category.label}
//                 </button>
//               ))}
//             </div>

//             <div className="templates-grid">
//               {templateCategories[activeCategory].templates.map(template => (
//                 <button
//                   key={template.name}
//                   className={`template-card ${selectedTemplate?.name === template.name ? 'active' : ''}`}
//                   onClick={() => {
//                     setSelectedTemplate(template);
//                     setConfig(prev => ({
//                       ...prev,
//                       template: template.name
//                     }));
//                   }}
//                 >
//                   <div className="template-preview">
//                     <img 
//                       src={`/api/svg?text=${template.label}&template=${template.name}`} 
//                       alt={template.label}
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className="template-info">
//                     <span className="template-name">{template.label}</span>
//                     <span className="template-type">{template.gradientType}</span>
//                   </div>
//                 </button>
//               ))}
//             </div>

//             {selectedTemplate && (
//               <TemplatePreview template={selectedTemplate} />
//             )}
//           </section>
//         </div>

//         <div className="preview-panel">
//           <section className="preview-section">
//             <div className="section-header">
//               <div className="header-content">
//                 <MdPreview />
//                 <h2>Preview</h2>
//               </div>
//               <p>Live preview of your gradient SVG</p>
//             </div>
//             <div className="preview-container">
//               <img src={preview} alt="Preview" />
//             </div>
//           </section>

//           <section className="code-section">
//             <div className="section-header">
//               <h2>Markdown Code</h2>
//               <p>Copy this code to use in your README</p>
//             </div>
//             <div className="code-container">
//               <pre>{markdownCode}</pre>
//               <button 
//                 className={`copy-button ${copied ? 'copied' : ''}`}
//                 onClick={handleCopy}
//               >
//                 {copied ? (
//                   <>
//                     <FiCheck /> Copied!
//                   </>
//                 ) : (
//                   <>
//                     <FiCopy /> Copy to Clipboard
//                   </>
//                 )}
//               </button>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// } 




import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BasicSettings from '../components/BasicSettings';
import TemplatesSection from '../components/TemplatesSection';
import PreviewPanel from '../components/PreviewPanel';
import { useTheme } from '../hooks/useTheme';
import { useGradientConfig } from '../hooks/useGradientConfig';


// Settings 组件
export default function Settings() {
  // 使用自定义Hooks
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { config, setConfig, preview, markdownCode } = useGradientConfig();
  
  // 本地状态
  const [activeCategory, setActiveCategory] = useState('basic');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="content">
        <div className="settings-panel">
          <div className="panel-header">
            <h2>Customize Your Gradient</h2>
            <p>Adjust the settings below to create your perfect gradient SVG.</p>
          </div>

          <BasicSettings config={config} setConfig={setConfig} />

          <TemplatesSection
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            setConfig={setConfig}
          />
        </div>

        <PreviewPanel preview={preview} markdownCode={markdownCode} />
      </div>
    </div>
  );
} 