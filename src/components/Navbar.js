import React from 'react';
import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';
import { BiPalette } from 'react-icons/bi';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* 左侧 Logo */}
        <Link href="/" className="logo-link">
          <BiPalette size={24} className="logo-icon" />
          <span className="logo-text">Gradient SVG Generator</span>
        </Link>

        {/* 右侧控件 */}
        <div className="nav-controls">
          {/* Crafted by */}
          <div className="crafted-text">
            <span>Code & Crafted with</span>
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

          {/* 主题切换按钮 */}
          <button 
            className="theme-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle theme"
          >
            <span>{isDarkMode ? '🌞' : '🌙'}</span>
          </button>

          {/* GitHub链接 */}
          <a 
            href="https://github.com/ChanMeng666/gradient-svg-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            <FiGithub size={18} />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 