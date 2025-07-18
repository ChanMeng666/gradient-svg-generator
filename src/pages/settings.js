import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import BasicSettings from '../components/BasicSettings';
import TemplatesSection from '../components/TemplatesSection';
import PreviewPanel from '../components/PreviewPanel';
import NewFeaturesShowcase from '../components/NewFeaturesShowcase';
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
  const [selectedApproach, setSelectedApproach] = useState('custom'); // 'custom' or 'template'

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
        // If template is found, switch to template approach
        setSelectedApproach('template');
      }
    }
  }, [urlParams.template, setConfig]);

  const approaches = [
    {
      id: 'custom',
      title: 'Custom Creation',
      icon: <span>🎨</span>,
      description: 'Design your unique gradient with full control over colors, styles, and animations',
      benefits: ['Complete customization', 'Unlimited color combinations', 'Full animation control']
    },
    {
      id: 'template',
      title: 'Template Selection',
      icon: <span>📄</span>,
      description: 'Get started instantly with professionally designed templates',
      benefits: ['Quick setup', 'Professional designs', 'Instant results']
    }
  ];

  return (
    <>
      <Head>
        <title>Settings - Gradient SVG Generator</title>
      </Head>
      <div className={`container ${isDarkMode ? 'dark' : ''}`}>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      {/* Hero section */}
      <div className="guide-section">
        <div className="guide-container">
          <div className="guide-content">
            <h1 className="guide-title">
              <span className="guide-icon">⚡</span>
              Create Beautiful Gradient SVG Banners
            </h1>
            <p className="guide-description">
              Choose your preferred approach to create stunning animated gradient SVG banners
            </p>
          </div>

          {/* Approach selector */}
          <div className="approach-selector">
            <h2 className="selector-title">Choose Your Approach</h2>
            <div className="approaches-grid">
              {approaches.map((approach) => (
                <div 
                  key={approach.id}
                  className={`approach-card ${selectedApproach === approach.id ? 'selected' : ''}`}
                  onClick={() => {
                    if (approach.id === 'custom') {
                      console.log('🔄 Settings: Switching to custom mode via card click');
                      setSelectedApproach('custom');
                      
                      // Clear template when switching to custom mode to allow user customization
                      setConfig(prev => {
                        console.log('🔄 Settings: Current config before switch via card', prev);
                        
                        // Create a new config with template cleared and current values preserved
                        const customConfig = {
                          text: prev.text,
                          height: prev.height,
                          colors: [...prev.colors], // Create new array to ensure React detects the change
                          gradientType: prev.gradientType,
                          animationDuration: prev.animationDuration,
                          template: '', // Clear template to disable template mode
                          color: prev.color // Keep backward compatibility
                        };
                        
                        console.log('🔄 Settings: New custom config via card', customConfig);
                        return customConfig;
                      });
                    } else {
                      setSelectedApproach(approach.id);
                    }
                  }}
                >
                  <div className="approach-header">
                    <div className="approach-icon">{approach.icon}</div>
                    <h3 className="approach-title">{approach.title}</h3>
                  </div>
                  <p className="approach-description">{approach.description}</p>
                  <ul className="approach-benefits">
                    {approach.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <div className="approach-action">
                    {selectedApproach === approach.id ? (
                      <span className="selected-badge">Selected</span>
                    ) : (
                      <button className="select-btn">Select This Approach</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips banner */}
          <div className="tips-banner">
            <span className="tips-icon">💡</span>
            <span>Pro Tip: You can switch between approaches anytime. All changes are reflected in the live preview panel</span>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="settings-panel">
          {/* Custom creation area */}
          <div className={`settings-section ${selectedApproach === 'custom' ? 'visible' : ''}`}>
            <div className="section-header">
              <div className="header-content">
                <span className="section-icon">🎨</span>
                <div>
                  <h2>Custom Gradient Creation</h2>
                  <p>Design your perfect gradient with complete control over every aspect</p>
                </div>
              </div>
            </div>
            
            <BasicSettings config={config} setConfig={setConfig} />
            
            <div className="approach-actions">
              <button 
                className="switch-approach-btn"
                onClick={() => setSelectedApproach('template')}
              >
                Switch to Templates →
              </button>
            </div>
          </div>

          {/* Template selection area */}
          <div className={`settings-section ${selectedApproach === 'template' ? 'visible' : ''}`}>
            <div className="section-header">
              <div className="header-content">
                <span className="section-icon">📄</span>
                <div>
                  <h2>Template Gallery</h2>
                  <p>Browse and select from our collection of professionally designed gradient templates</p>
                </div>
              </div>
            </div>

            <NewFeaturesShowcase 
              onTemplateSelect={(templateName) => {
                const templateConfig = getTemplateConfig(templateName);
                if (templateConfig) {
                  setSelectedTemplate(templateConfig);
                  const category = getTemplateCategoryByName(templateName);
                  setActiveCategory(category);
                  setConfig(prev => ({
                    ...prev,
                    template: templateConfig.name,
                    colors: templateConfig.colors || prev.colors,
                    gradientType: templateConfig.gradientType || prev.gradientType,
                    animationDuration: parseInt(templateConfig.animationDuration) || prev.animationDuration
                  }));
                }
              }}
            />

            <TemplatesSection
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              setConfig={setConfig}
            />

            <div className="approach-actions">
              <button 
                className="switch-approach-btn"
                onClick={() => {
                  console.log('🔄 Settings: Switching to custom mode');
                  setSelectedApproach('custom');
                  
                  // Clear template and ensure config is properly reset for custom mode
                  setConfig(prev => {
                    console.log('🔄 Settings: Current config before switch', prev);
                    
                    // Create a new config with template cleared and current values preserved
                    const customConfig = {
                      text: prev.text,
                      height: prev.height,
                      colors: [...prev.colors], // Create new array to ensure React detects the change
                      gradientType: prev.gradientType,
                      animationDuration: prev.animationDuration,
                      template: '', // Clear template to disable template mode
                      color: prev.color // Keep backward compatibility
                    };
                    
                    console.log('🔄 Settings: New custom config', customConfig);
                    return customConfig;
                  });
                }}
              >
                ← Switch to Custom Creation
              </button>
            </div>
          </div>

        </div>

        <PreviewPanel preview={preview} markdownCode={markdownCode} />
      </div>
    </div>
    </>
  );
} 