import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BasicSettings from '../components/BasicSettings';
import TemplatesSection from '../components/TemplatesSection';
import PreviewPanel from '../components/PreviewPanel';
import { useTheme } from '../hooks/useTheme';
import { useGradientConfig } from '../hooks/useGradientConfig';
import { getUrlParams, applyUrlParamsToConfig, getTemplateConfig, getTemplateCategoryByName } from '../utils/templateUtils';

export default function Settings() {
  // Get URL parameters and create initial config
  const urlParams = getUrlParams();
  const initialConfig = applyUrlParamsToConfig(urlParams);
  
  // Use custom hooks
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { config, setConfig, preview, markdownCode } = useGradientConfig(initialConfig);
  
  // Local state
  const [activeCategory, setActiveCategory] = useState('basic');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

  // Handle URL parameters for template selection
  useEffect(() => {
    if (urlParams.template) {
      const templateConfig = getTemplateConfig(urlParams.template);
      if (templateConfig) {
        setSelectedTemplate(templateConfig);
        // Set the correct category for the template
        const category = getTemplateCategoryByName(urlParams.template);
        setActiveCategory(category);
        // Update config with template settings
        setConfig(prev => ({
          ...prev,
          template: templateConfig.name,
          colors: templateConfig.colors || prev.colors,
          gradientType: templateConfig.gradientType || prev.gradientType,
          animationDuration: parseInt(templateConfig.animationDuration) || prev.animationDuration
        }));
        // If template is found, go directly to step 3 (Preview & Export)
        setActiveStep(3);
      }
    }
  }, [urlParams.template, setConfig]);

  const steps = [
    {
      id: 1,
      title: 'Basic Settings',
      icon: <span>🎨</span>,
      description: 'Customize text, colors and animations'
    },
    {
      id: 2,
      title: 'Choose Template',
      icon: <span>📄</span>,
      description: 'Start quickly with preset templates'
    },
    {
      id: 3,
      title: 'Preview & Export',
      icon: <span>👁️</span>,
      description: 'View effects and export code'
    }
  ];

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      {/* User guide section */}
      <div className="guide-section">
        <div className="guide-container">
          <div className="guide-content">
            <h1 className="guide-title">
              <span className="guide-icon">⚡</span>
              Create Your Unique Gradient Banner
            </h1>
            <p className="guide-description">
              Just three simple steps to create stunning animated gradient SVG banners
            </p>
          </div>

          {/* Step indicator */}
          <div className="steps-indicator">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`step-item ${activeStep >= step.id ? 'active' : ''} ${activeStep === step.id ? 'current' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="step-number">
                  {step.icon}
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips banner */}
          <div className="tips-banner">
            <span className="tips-icon">💡</span>
            <span>💡 Tip: You can adjust settings anytime, all changes will be reflected in the preview panel on the right</span>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="settings-panel">
          {/* Basic settings area */}
          <div className={`settings-section ${activeStep === 1 ? 'visible' : ''}`}>
            <div className="section-header">
              <div className="header-content">
                <span className="section-icon">🎨</span>
                <div>
                  <h2>Step 1: Basic Settings</h2>
                  <p>Customize your gradient text, colors and animation effects</p>
                </div>
              </div>
            </div>
            
            <BasicSettings config={config} setConfig={setConfig} />
            
            <div className="step-actions">
              <button 
                className="next-step-btn"
                onClick={() => setActiveStep(2)}
              >
                Next: Choose Template →
              </button>
            </div>
          </div>

          {/* Template selection area */}
          <div className={`settings-section ${activeStep === 2 ? 'visible' : ''}`}>
            <div className="section-header">
              <div className="header-content">
                <span className="section-icon">📄</span>
                <div>
                  <h2>Step 2: Choose Template</h2>
                  <p>Start quickly with carefully designed preset templates, or continue customizing</p>
                </div>
              </div>
            </div>

            <TemplatesSection
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              setConfig={setConfig}
            />

            <div className="step-actions">
              <button 
                className="prev-step-btn"
                onClick={() => setActiveStep(1)}
              >
                ← Previous Step
              </button>
              <button 
                className="next-step-btn"
                onClick={() => setActiveStep(3)}
              >
                Next: Preview & Export →
              </button>
            </div>
          </div>

          {/* Preview description area */}
          <div className={`settings-section ${activeStep === 3 ? 'visible' : ''}`}>
            <div className="section-header">
              <div className="header-content">
                <span className="section-icon">👁️</span>
                <div>
                  <h2>Step 3: Preview & Export</h2>
                  <p>View the final effect and get code ready for your projects</p>
                </div>
              </div>
            </div>

            <div className="export-guide">
              <div className="guide-item">
                <span className="guide-item-icon">⬇️</span>
                <div>
                  <h3>Get Code</h3>
                  <p>The right panel contains ready-to-use Markdown code</p>
                </div>
              </div>
              <div className="guide-item">
                <span className="guide-item-icon">👁️</span>
                <div>
                  <h3>Live Preview</h3>
                  <p>All changes are displayed in real-time in the preview image</p>
                </div>
              </div>
            </div>

            <div className="step-actions">
              <button 
                className="prev-step-btn"
                onClick={() => setActiveStep(2)}
              >
                ← Previous Step
              </button>
              <button 
                className="restart-btn"
                onClick={() => setActiveStep(1)}
              >
                Start Over
              </button>
            </div>
          </div>
        </div>

        <PreviewPanel preview={preview} markdownCode={markdownCode} />
      </div>
    </div>
  );
} 