import React from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

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
          title="Remove color"
        >
          <FiMinus />
        </button>
      )}
      {index === total - 1 && (
        <button
          className="color-action-button add"
          onClick={onAdd}
          title="Add color"
        >
          <FiPlus />
        </button>
      )}
    </div>
  </div>
);

export default ColorRow; 