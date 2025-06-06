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