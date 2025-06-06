import React from 'react';
import { templateCategories } from '../data/templateCategories';

const TemplatesSection = ({ 
  activeCategory, 
  setActiveCategory, 
  selectedTemplate, 
  setSelectedTemplate, 
  setConfig 
}) => {
  return (
    <section className="templates-section">
      <div className="section-header">
        <div className="header-content">
          <span>📄</span>
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
              <h3 className="template-name">{template.label}</h3>
              <p className="template-description">{template.description}</p>
              <div className="template-specs">
                <div className="spec-item">
                  <span className="spec-label">Type:</span>
                  <span className="spec-value">{template.gradientType}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Duration:</span>
                  <span className="spec-value">{template.animationDuration}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Colors:</span>
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
          </button>
        ))}
      </div>
    </section>
  );
};

export default TemplatesSection; 