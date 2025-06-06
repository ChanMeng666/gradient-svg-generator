import React from 'react';
import ColorRow from './ColorRow';
import { GRADIENT_TYPES } from '../constants/gradientTypes';

const BasicSettings = ({ config, setConfig }) => {
  // Color handling functions
  const handleColorUpdate = (index, newColor) => {
    setConfig(prev => {
      const newColors = [...prev.colors];
      newColors[index] = newColor;
      return { ...prev, colors: newColors };
    });
  };

  const handleAddColor = () => {
    setConfig(prev => ({
      ...prev,
      colors: [...prev.colors, '000000']
    }));
  };

  const handleRemoveColor = (index) => {
    setConfig(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  return (
    <section className="basic-settings">
      <div className="input-group">
        <label>
          <div className="label-content">
            <span>📝</span>
            <span>Display Text</span>
          </div>
          <span className="tooltip-icon" title="The text that will appear on your gradient">ℹ️</span>
        </label>
        <input 
          value={config.text}
          onChange={e => setConfig({...config, text: e.target.value})}
          placeholder="Enter your text here"
          className="text-input"
        />
      </div>
      
      {/* Multi-color picker */}
      <div className="input-group">
        <label>
          <div className="label-content">
            <span>🎨</span>
            <span>Gradient Colors</span>
          </div>
          <span className="tooltip-icon" title="Add multiple colors to create complex gradients">ℹ️</span>
        </label>
        <div className="multi-color-picker">
          {config.colors.map((color, index) => (
            <ColorRow
              key={index}
              color={color}
              index={index}
              total={config.colors.length}
              onUpdate={handleColorUpdate}
              onAdd={handleAddColor}
              onRemove={handleRemoveColor}
            />
          ))}
        </div>
      </div>
      
      <div className="input-group">
        <label>
          <div className="label-content">
            <span>📏</span>
            <span>Height</span>
          </div>
          <span className="value">{config.height}px</span>
        </label>
        <input 
          type="range"
          value={config.height}
          onChange={e => setConfig({...config, height: e.target.value})}
          min="30"
          max="300"
          step="10"
          className="range-slider"
        />
        <div className="range-labels">
          <span>30px</span>
          <span>300px</span>
        </div>
      </div>

      {/* Gradient type selection */}
      <div className="input-group">
        <label>
          <div className="label-content">
            <span>🌈</span>
            <span>Gradient Type</span>
          </div>
          <span className="tooltip-icon" title="Choose the direction of your gradient">ℹ️</span>
        </label>
        <div className="gradient-type-buttons">
          {GRADIENT_TYPES.map(type => (
            <button
              key={type.value}
              className={`gradient-type-button ${config.gradientType === type.value ? 'active' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, gradientType: type.value }))}
            >
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Animation duration slider */}
      <div className="input-group">
        <label>
          <div className="label-content">
            <span>⏱️</span>
            <span>Animation Duration</span>
          </div>
          <span className="value">{config.animationDuration}s</span>
        </label>
        <input
          type="range"
          value={config.animationDuration}
          onChange={e => setConfig(prev => ({ ...prev, animationDuration: parseInt(e.target.value) }))}
          min="1"
          max="20"
          step="1"
          className="range-slider"
        />
        <div className="range-labels">
          <span>1s</span>
          <span>20s</span>
        </div>
      </div>
    </section>
  );
};

export default BasicSettings; 