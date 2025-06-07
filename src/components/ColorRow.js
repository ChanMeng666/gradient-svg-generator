import React from 'react';

const ColorRow = ({ color, index, total, onUpdate, onAdd, onRemove }) => (
  <div className="color-row">
    <div className="color-input">
      <input
        type="color"
        value={`#${color}`}
        onChange={(e) => onUpdate(index, e.target.value.substring(1))}
        className="color-picker"
      />
      <input
        value={color}
        onChange={(e) => onUpdate(index, e.target.value)}
        placeholder="Hex color (without #)"
        className="hex-input"
      />
    </div>
    <div className="color-actions">
      {total > 1 && (
        <button
          className="color-action-button remove"
          onClick={() => onRemove(index)}
          title="Remove this color"
          aria-label="Remove color"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z"/>
          </svg>
          <span className="button-label">Remove</span>
        </button>
      )}
      {index === total - 1 && (
        <button
          className="color-action-button add"
          onClick={onAdd}
          title="Add a new color"
          aria-label="Add color"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 2a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2H9v4a1 1 0 1 1-2 0V9H3a1 1 0 0 1 0-2h4V3a1 1 0 0 1 1-1z"/>
          </svg>
          <span className="button-label">Add</span>
        </button>
      )}
    </div>
  </div>
);

export default ColorRow; 