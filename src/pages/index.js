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
    // 原有的经典模板
    { text: "Welcome", template: "sunset-gold" },
    { text: "GitHub", template: "ocean-heart" },
    { text: "HOLOGRAM", template: "hologram-matrix" },
    { text: "QUANTUM", template: "quantum-field" },
    { text: "FLAME", template: "burning-flame" },
    { text: "CRYSTAL", template: "crystal-prism" },
    { text: "GOLDEN", template: "golden-leaf" },
    { text: "PIXEL", template: "pixel-art-retro" },
    { text: "NEON", template: "neon-arcade" },
    { text: "Code", template: "midnight-galaxy" },
    
    // 新增的动画效果模板 (来自svg-banners)
    { text: "GLITCH", template: "glitch-matrix" },
    { text: "HACKER", template: "typewriter-code" },
    { text: "GLOW", template: "luminance-glow" },
    { text: "RAINBOW", template: "rainbow-wave" },
    { text: "CYBER", template: "cyber-scan" },
    { text: "PULSE", template: "neon-pulse" },
    { text: "SCAN", template: "hologram-flicker" },
    { text: "ERROR", template: "data-corruption" },
    
    // 新增的形状模板 (来自capsule-render)
    { text: "WAVE", template: "wave-flow" },
    { text: "CHAT", template: "speech-bubble" },
    { text: "FLOW", template: "soft-blend" },
    { text: "FIN", template: "shark-fin" },
    { text: "ORB", template: "egg-shape" },
    { text: "BLUR", template: "blur-glow" },
    
    // 经典模板延续
    { text: "DAWN", template: "sunrise-dawn" },
    { text: "AURORA", template: "northern-aurora" },
    { text: "DIAMOND", template: "diamond-sparkle" },
    { text: "FOREST", template: "forest-mist" },
    
    // 🌟 全新前卫模板展示 - 先进科技类
    { text: "MERCURY", template: "liquid-mercury" },
    { text: "PLASMA", template: "plasma-blob" },
    { text: "COSMIC", template: "cosmic-entity" },
    { text: "PORTAL", template: "portal-nexus" },
    { text: "WAVES", template: "turbulent-waves" },
    { text: "QUANTUM", template: "quantum-foam" },
    { text: "WORMHOLE", template: "wormhole-transit" },
    { text: "AURORA", template: "aurora-streams" },
    { text: "REALITY", template: "reality-glitch" },
    { text: "SOLAR", template: "solar-wind" },
    { text: "FRACTAL", template: "fractal-dimension" },
    
    // 🌟 次元门户美学 - Dimensional Portal
    { text: "TUNNEL", template: "quantum-tunnel" },
    { text: "MULTIVERSE", template: "parallel-universe" },
    { text: "MATRIX", template: "holographic-matrix" },
    { text: "VOID", template: "void-chamber" },
    { text: "ASTRAL", template: "astral-projection" },
    
    // 🌟 数字生命美学 - Digital Life  
    { text: "AI", template: "ai-consciousness" },
    { text: "DNA", template: "quantum-dna" },
    { text: "EVOLVE", template: "digital-evolution" },
    { text: "SOUL", template: "synthetic-soul" },
    { text: "NEURAL", template: "neural-storm" },
    
    // 🌟 赛博美学 - Cyber Aesthetics
    { text: "GRID", template: "neon-grid-city" },
    { text: "STREAM", template: "data-stream-flow" },
    { text: "NOIR", template: "cyber-punk-noir" },
    { text: "CHROME", template: "chrome-reflection" },
    { text: "AR", template: "augmented-reality" },
    
    // 🌟 意识流美学 - Consciousness Stream
    { text: "THOUGHTS", template: "thought-waves" },
    { text: "MEMORY", template: "memory-fragments" },
    { text: "DREAMS", template: "dream-logic" },
    { text: "CALM", template: "meditative-calm" },
    { text: "INSIGHT", template: "psychedelic-insight" },
    
    // 🌟 彩虹分层效果 - Rainbow Layer from example-1
    { text: "RAINBOW", template: "rainbow-layer" }
  ];

  const highlights = [
    {
      icon: "🎨",
      title: "260+ Professional Templates",
      description: "From consciousness streams to dimensional portals - enhanced with cutting-edge SVG animations and avant-garde aesthetics"
    },
    {
      icon: "⚡",
      title: "Instant SVG Generation",
      description: "Real-time preview and one-click export to SVG & Markdown"
    },
    {
      icon: "🎭",
      title: "Advanced Animations",
      description: "Smooth CSS animations, gradient shifts, and text effects"
    },
    {
      icon: "🔧",
      title: "Fully Customizable",
      description: "Adjust colors, fonts, sizes, and effects to match your vision"
    }
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

            <div className="hero-highlights">
              <h3 className="highlights-title">✨ Why Choose Our Generator?</h3>
              <div className="highlights-grid">
                {highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <div className="highlight-icon">{highlight.icon}</div>
                    <div className="highlight-content">
                      <h4 className="highlight-title">{highlight.title}</h4>
                      <p className="highlight-description">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-preview">
            <div className="hero-showcase">
              <div className="showcase-header">
                <h3 className="showcase-title">Live Examples</h3>
                <p className="showcase-subtitle">Click to try instantly • 40+ Featured Templates</p>
              </div>
              
              <div className="preview-gallery-enhanced">
                {examples.slice(0, 12).map((example, index) => (
                  <Link 
                    key={index} 
                    href={`/settings?template=${example.template}&text=${example.text}`}
                    className="preview-card" 
                    style={{ animationDelay: `${index * 0.08}s` }}
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

              <div className="preview-gallery-more">
                <div className="more-examples-header">
                  <h4 className="more-title">Even More Styles</h4>
                  <div className="style-count">{examples.length - 12} Additional Templates</div>
                </div>
                <div className="preview-gallery-compact">
                  {examples.slice(12).map((example, index) => (
                    <Link 
                      key={index + 12} 
                      href={`/settings?template=${example.template}&text=${example.text}`}
                      className="preview-card-compact" 
                      style={{ animationDelay: `${(index + 12) * 0.05}s` }}
                    >
                      <div className="preview-image-container-compact">
                        <img 
                          src={`/api/svg?text=${example.text}&template=${example.template}`} 
                          alt={example.text}
                          className="preview-image-compact"
                        />
                        <div className="preview-overlay-compact">
                          <div className="preview-label-compact">{example.text}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="showcase-cta">
                <div className="cta-stats">
                  <div className="stat-item">
                    <span className="stat-number">{examples.length}+</span>
                    <span className="stat-label">Templates</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">∞</span>
                    <span className="stat-label">Combinations</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Free</span>
                  </div>
                </div>
                <Link href="/settings" className="try-now-btn">
                  <span>Start Creating Your Own</span>
                  <span className="btn-arrow">✨</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="features-section">
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
      </section> */}

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