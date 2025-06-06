import React from 'react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <div className="feature-icon">🎨</div>,
      title: "Diverse Gradients",
      description: "Supports various gradient types like linear, radial with unlimited color combinations"
    },
    {
      icon: <div className="feature-icon">✨</div>,
      title: "Animation Effects",
      description: "Built-in smooth CSS animations to bring your gradients to life"
    },
    {
      icon: <div className="feature-icon">👁️</div>,
      title: "Live Preview",
      description: "Real-time gradient preview with what-you-see-is-what-you-get design experience"
    },
    {
      icon: <div className="feature-icon">⬇️</div>,
      title: "One-Click Export",
      description: "Generate SVG code and Markdown, easily integrate into your projects"
    }
  ];

  const examples = [
    { text: "Welcome", template: "sunset" },
    { text: "GitHub", template: "ocean" },
    { text: "Design", template: "rainbow" },
    { text: "Code", template: "galaxy" }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">⚡</span>
              <span>Free Open Source Tool</span>
            </div>
            
            <h1 className="hero-title">
              Create <span className="gradient-text">Stunning</span>
              <br />
              Gradient SVG Banners
            </h1>
            
            <p className="hero-description">
              Professional gradient SVG generator to create beautiful animated gradient banners
              <br />
              for your projects, GitHub README, design works - completely free and easy to use
            </p>

            <div className="hero-actions">
              <Link href="/settings" className="cta-button primary">
                <span>Start Creating</span>
                <span className="cta-icon">→</span>
              </Link>
              
              <a 
                href="https://github.com/ChanMeng666/gradient-svg-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button secondary"
              >
                <span className="cta-icon">⭐</span>
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-gallery">
              {examples.map((example, index) => (
                <div key={index} className="preview-item" style={{ animationDelay: `${index * 0.2}s` }}>
                  <img 
                    src={`/api/svg?text=${example.text}&template=${example.template}`} 
                    alt={example.text}
                    className="preview-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Why Choose Our Gradient Generator?</h2>
            <p>Powerful features, simple operation, professional results</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Create Your First Gradient?</h2>
          <p>Create professional-level gradient banners in just minutes</p>
          
          <Link href="/settings" className="cta-button large">
            <span>Start for Free</span>
            <span className="cta-icon">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">🎨</span>
              <span>Gradient SVG Generator</span>
            </div>
            
            <div className="footer-links">
              <a href="https://github.com/ChanMeng666/gradient-svg-generator" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <Link href="/settings">
                Generator
              </Link>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>
              Made with 💛 by{' '}
              <a 
                href="https://github.com/ChanMeng666" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Chan Meng
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 