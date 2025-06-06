import React, { useState } from 'react';

const PreviewPanel = ({ preview, markdownCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdownCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="preview-panel">
      <section className="preview-section">
        <div className="section-header">
          <div className="header-content">
            <span>👁️</span>
            <h2>Preview</h2>
          </div>
          <p>Live preview of your gradient SVG</p>
        </div>

        <div className="preview-container">
          <div className="preview-image-wrapper">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        </div>
      </section>

      <section className="code-section">
        <div className="section-header">
          <h2>Markdown Code</h2>
          <p>Copy this code to use in your README</p>
        </div>

        <div className="code-container">
          <div className="code-scroll-wrapper">
            <pre>{markdownCode}</pre>
          </div>
          <button 
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <span>✅</span> <span className="button-text">Copied!</span>
              </>
            ) : (
              <>
                <span>📋</span> <span className="button-text">Copy to Clipboard</span>
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default PreviewPanel; 