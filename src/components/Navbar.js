import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  const isSettingsPage = router.pathname === '/settings';

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left side Logo and navigation */}
        <div className="nav-left">
          <Link href="/" className="logo-link">
            <span className="logo-icon">🎨</span>
            <span className="logo-text">Gradient SVG Generator</span>
          </Link>

          {/* Navigation links */}
          <div className="nav-links">
            <Link 
              href="/" 
              className={`nav-link ${isHomePage ? 'active' : ''}`}
            >
              <span>🏠</span>
              <span>Home</span>
            </Link>
            <Link 
              href="/settings" 
              className={`nav-link ${isSettingsPage ? 'active' : ''}`}
            >
              <span>⚙️</span>
              <span>Generator</span>
            </Link>
          </div>
        </div>

        {/* Right side controls */}
        <div className="nav-controls">
          {/* Author info */}
          <div className="crafted-text">
            <span>Made with</span>
            <span className="heart">💛</span>
            <span>by</span>
            <a 
              href="https://github.com/ChanMeng666"
              target="_blank"
              rel="noopener noreferrer"
              className="author-link"
            >
              Chan Meng
            </a>
          </div>

          {/* Theme toggle button */}
          <button 
            className="theme-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span>{isDarkMode ? '☀️' : '🌙'}</span>
          </button>

          {/* GitHub link */}
          <a 
            href="https://github.com/ChanMeng666/gradient-svg-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
            title="Give us a Star on GitHub"
          >
            <span>⭐</span>
            <span className="github-text">Star on GitHub</span>
          </a>
        </div>
      </div>

      {/* Breadcrumb navigation (only show on settings page) */}
      {isSettingsPage && (
        <div className="breadcrumb-container">
          <div className="breadcrumb">
            <Link href="/" className="breadcrumb-link">
              Home
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Gradient Generator</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 