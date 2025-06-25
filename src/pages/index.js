import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

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
    { text: "Welcome", template: "sunset-gold" },
    { text: "GitHub", template: "ocean-heart" },
    { text: "GLOW", template: "luminance-glow" },
    { text: "RAINBOW", template: "rainbow-wave" },
    { text: "GLITCH", template: "glitch-cyber" },
    { text: "HOLOGRAM", template: "hologram-matrix" },
    { text: "QUANTUM", template: "quantum-field" },
    { text: "FLAME", template: "burning-flame" },
    { text: "CRYSTAL", template: "crystal-prism" },
    { text: "GOLDEN", template: "golden-leaf" },
    { text: "PIXEL", template: "pixel-art-retro" },
    { text: "NEON", template: "neon-arcade" },
    { text: "Code", template: "midnight-galaxy" }
  ];

  return (
    <>
      <Head>
        <title>Gradient SVG Generator</title>
      </Head>
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
            <div className="hero-showcase">
              <div className="showcase-header">
                <h3 className="showcase-title">Live Examples</h3>
                <p className="showcase-subtitle">See the magic in action</p>
              </div>
              
              <div className="preview-gallery-enhanced">
                {examples.map((example, index) => (
                  <Link 
                    key={index} 
                    href={`/settings?template=${example.template}&text=${example.text}`}
                    className="preview-card" 
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="preview-image-container">
                      <img 
                        src={`/api/svg?text=${example.text}&template=${example.template}`} 
                        alt={example.text}
                        className="preview-image-enhanced"
                      />
                      <div className="preview-overlay">
                        <div className="preview-label">{example.text}</div>
                        <div className="preview-action">Try This Style</div>
                      </div>
                    </div>
                    <div className="template-badge">
                      {example.template.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="showcase-cta">
                <p className="showcase-hint">Click any example to try it yourself</p>
                <Link href="/settings" className="try-now-btn">
                  <span>Create Your Own</span>
                  <span className="btn-arrow">✨</span>
                </Link>
              </div>
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
              <img 
                src="/gradient-svg-generator.svg" 
                alt="Gradient SVG Generator Logo" 
                className="footer-logo"
                width="32" 
                height="32"
              />
              <div className="footer-brand-content">
                <span className="footer-brand-title">Gradient SVG Generator</span>
                <span className="footer-brand-subtitle">Create Beautiful Gradients</span>
              </div>
            </div>
            
            <div className="footer-sections">
              <div className="footer-section">
                <h4 className="footer-section-title">🚀 Get Started</h4>
                <div className="footer-section-links">
                  <Link href="/settings">
                    Create Gradient
                  </Link>
                  <a href="https://github.com/ChanMeng666/gradient-svg-generator/blob/main/README.md" target="_blank" rel="noopener noreferrer">
                    Documentation
                  </a>
                </div>
              </div>
              
              <div className="footer-section">
                <h4 className="footer-section-title">🔗 Connect</h4>
                <div className="footer-section-links">
                  <a href="https://github.com/ChanMeng666/gradient-svg-generator" target="_blank" rel="noopener noreferrer">
                    ⭐ GitHub
                  </a>
                  <a href="https://github.com/ChanMeng666/gradient-svg-generator/issues" target="_blank" rel="noopener noreferrer">
                    🐛 Report Issue
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                Made with 💛 by{' '}
                <a 
                  href="https://github.com/ChanMeng666" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-author"
                >
                  Chan Meng
                </a>
              </p>
              <p className="footer-status">
                <span className="footer-status-indicator">●</span>
                <span>Open Source & Free Forever</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
} 