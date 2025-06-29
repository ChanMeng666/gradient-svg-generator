import React, { useState } from 'react';

const NewFeaturesShowcase = ({ onTemplateSelect }) => {
  const [activeTab, setActiveTab] = useState('animation');

  const newFeatures = {
    animation: {
      title: '🎬 Animation Effects',
      subtitle: 'Cool animations from svg-banners',
      description: 'Experience unprecedented dynamic SVG effects',
      color: '#ff5555',
      templates: [
        { name: 'glitch-matrix', label: 'Glitch Matrix', preview: 'GLITCH', effect: 'Glitch Style' },
        { name: 'typewriter-code', label: 'Typewriter Code', preview: 'HACK', effect: 'Typewriter' },
        { name: 'luminance-glow', label: 'Luminance Glow', preview: 'GLOW', effect: 'Glow Effect' },
        { name: 'rainbow-wave', label: 'Rainbow Wave', preview: 'RAINBOW', effect: 'Rainbow Wave' },
        { name: 'cyber-scan', label: 'Cyber Scan', preview: 'SCAN', effect: 'Scan Lines' },
        { name: 'neon-pulse', label: 'Neon Pulse', preview: 'PULSE', effect: 'Neon Pulse' }
      ]
    },
    shape: {
      title: '⚫ Geometric Shapes',
      subtitle: 'Beautiful shapes from capsule-render',
      description: 'Professional geometric design language',
      color: '#ff79c6',
      templates: [
        { name: 'wave-flow', label: 'Wave Flow', preview: 'WAVE', effect: 'Wave Flow' },
        { name: 'speech-bubble', label: 'Speech Bubble', preview: 'CHAT', effect: 'Chat Bubble' },
        { name: 'soft-blend', label: 'Soft Blend', preview: 'SOFT', effect: 'Soft Blend' },
        { name: 'shark-fin', label: 'Shark Fin', preview: 'SHARP', effect: 'Shark Fin' },
        { name: 'egg-shape', label: 'Egg Shape', preview: 'OVAL', effect: 'Oval Shape' },
        { name: 'blur-glow', label: 'Blur Glow', preview: 'BLUR', effect: 'Blur Glow' }
      ]
    },
    colors: {
      title: '🎨 Smart Colors',
      subtitle: '287 professional presets + smart algorithms',
      description: 'From random to intelligent, from presets to custom',
      color: '#00d4aa',
      features: [
        { name: 'Random Gradients', desc: '287 carefully crafted gradient presets', icon: '🎲' },
        { name: 'Time-based Colors', desc: 'Auto color selection based on current time', icon: '⏰' },
        { name: 'Theme Colors', desc: 'Professional theme color schemes', icon: '🎭' },
        { name: 'Custom Gradients', desc: 'Support for complex multi-color gradients', icon: '🎯' }
      ]
    }
  };

  const currentFeature = newFeatures[activeTab];

  return (
    <div className="new-features-showcase">
      <div className="showcase-header">
        <div className="header-content">
          <h2 className="showcase-title">
            <span className="title-icon">🚀</span>
            New Features Experience
          </h2>
          <p className="showcase-subtitle">
            Integrated the best features from <strong>svg-banners</strong> and <strong>capsule-render</strong> projects
          </p>
        </div>
        
        <div className="feature-stats">
          <div className="stat-item">
            <span className="stat-number">+24</span>
            <span className="stat-label">New Templates</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">+287</span>
            <span className="stat-label">Color Presets</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">+2</span>
            <span className="stat-label">New Categories</span>
          </div>
        </div>
      </div>

      <div className="feature-tabs">
        {Object.keys(newFeatures).map(key => (
          <button
            key={key}
            className={`feature-tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            <span className="tab-title">{newFeatures[key].title}</span>
            <span className="tab-subtitle">{newFeatures[key].subtitle}</span>
          </button>
        ))}
      </div>

      <div className="feature-content">
        <div className="content-header">
          <h3 className="content-title" style={{ color: currentFeature.color }}>
            {currentFeature.title}
          </h3>
          <p className="content-description">{currentFeature.description}</p>
        </div>

        {currentFeature.templates ? (
          <div className="templates-preview">
            {currentFeature.templates.map((template, index) => (
              <div
                key={template.name}
                className="template-preview-card"
                onClick={() => onTemplateSelect && onTemplateSelect(template.name)}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="preview-image">
                  <img 
                    src={`/api/svg?text=${template.preview}&template=${template.name}&width=200&height=100`}
                    alt={template.label}
                    loading="lazy"
                  />
                  <div className="preview-overlay">
                    <span className="try-button">Try It</span>
                  </div>
                </div>
                <div className="preview-info">
                  <h4 className="preview-title">{template.label}</h4>
                  <span className="preview-effect">{template.effect}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="features-grid">
            {currentFeature.features.map((feature, index) => (
              <div
                key={feature.name}
                className="feature-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4 className="feature-name">{feature.name}</h4>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="showcase-cta">
        <p className="cta-text">
          💡 <strong>Tip:</strong> These new features are fully integrated into the template selector. Go explore now!
        </p>
      </div>

      <style jsx>{`
        .new-features-showcase {
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(76, 175, 80, 0.02));
          border: 2px solid rgba(76, 175, 80, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
          position: relative;
          overflow: hidden;
        }

        .new-features-showcase::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff5555, #ff79c6, #00d4aa, #667eea);
          background-size: 200% 100%;
          animation: gradientShift 3s linear infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .showcase-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-content h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .title-icon {
          margin-right: 0.5rem;
        }

        .showcase-subtitle {
          color: var(--text-secondary, #666);
          margin: 0;
        }

        .feature-stats {
          display: flex;
          gap: 1rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color, #4caf50);
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary, #666);
        }

        .feature-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          overflow-x: auto;
        }

        .feature-tab {
          flex: 1;
          min-width: 200px;
          padding: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .feature-tab:hover {
          transform: translateY(-2px);
          border-color: var(--accent-color);
          background: rgba(255, 255, 255, 0.1);
        }

        .feature-tab.active {
          border-color: var(--accent-color);
          background: var(--accent-color);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .tab-title {
          display: block;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .tab-subtitle {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .content-header {
          margin-bottom: 1.5rem;
        }

        .content-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .content-description {
          margin: 0;
          color: var(--text-secondary, #666);
        }

        .templates-preview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .template-preview-card {
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .template-preview-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-color);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .preview-image {
          position: relative;
          aspect-ratio: 2/1;
          overflow: hidden;
        }

        .preview-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .template-preview-card:hover .preview-overlay {
          opacity: 1;
        }

        .try-button {
          background: var(--accent-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .preview-info {
          padding: 1rem;
          text-align: center;
        }

        .preview-title {
          margin: 0 0 0.25rem 0;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .preview-effect {
          font-size: 0.75rem;
          color: var(--accent-color);
          background: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          display: inline-block;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .feature-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .feature-card:hover {
          border-color: var(--accent-color);
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.1);
        }

        .feature-icon {
          font-size: 2rem;
          min-width: 3rem;
          text-align: center;
        }

        .feature-name {
          margin: 0 0 0.25rem 0;
          font-weight: 600;
          color: var(--accent-color);
        }

        .feature-desc {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary, #666);
        }

        .showcase-cta {
          text-align: center;
          padding: 1rem;
          background: rgba(76, 175, 80, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(76, 175, 80, 0.2);
        }

        .cta-text {
          margin: 0;
          color: var(--text, #333);
        }

        @media (max-width: 768px) {
          .new-features-showcase {
            padding: 1rem;
          }
          
          .showcase-header {
            flex-direction: column;
            text-align: center;
          }
          
          .feature-stats {
            justify-content: center;
          }
          
          .templates-preview {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default NewFeaturesShowcase; 