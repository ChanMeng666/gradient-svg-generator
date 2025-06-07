import React from 'react';
import ColorRow from './ColorRow';
import { GRADIENT_TYPES } from '../constants/gradientTypes';

const BasicSettings = ({ config, setConfig }) => {
  // Color handling functions
  const handleColorUpdate = (index, newColor) => {
    console.log('🎨 BasicSettings: Color update requested', { index, newColor });
    setConfig(prev => {
      console.log('🎨 BasicSettings: Current config before color update', prev);
      const newColors = [...prev.colors];
      newColors[index] = newColor;
      const newConfig = { ...prev, colors: newColors };
      console.log('🎨 BasicSettings: New config after color update', newConfig);
      return newConfig;
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
          onChange={e => {
            console.log('📝 BasicSettings: Text update requested', e.target.value);
            setConfig(prev => {
              console.log('📝 BasicSettings: Current config before text update', prev);
              const newConfig = {...prev, text: e.target.value};
              console.log('📝 BasicSettings: New config after text update', newConfig);
              return newConfig;
            });
          }}
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
          <span className="tooltip-icon" title="Click the + button to add more colors, or the - button to remove colors. Create stunning multi-color gradients!">ℹ️</span>
        </label>
        <div className="color-picker-description">
          <p>Use the <strong>+ Add</strong> button to add more colors, or the <strong>- Remove</strong> button to delete colors from your gradient.</p>
        </div>
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
          onChange={e => {
            console.log('📏 BasicSettings: Height update requested', e.target.value);
            setConfig(prev => {
              console.log('📏 BasicSettings: Current config before height update', prev);
              const newConfig = {...prev, height: e.target.value};
              console.log('📏 BasicSettings: New config after height update', newConfig);
              return newConfig;
            });
          }}
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
              onClick={() => {
                console.log('🌈 BasicSettings: Gradient type update requested', type.value);
                setConfig(prev => {
                  console.log('🌈 BasicSettings: Current config before gradient type update', prev);
                  const newConfig = { ...prev, gradientType: type.value };
                  console.log('🌈 BasicSettings: New config after gradient type update', newConfig);
                  return newConfig;
                });
              }}
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
          onChange={e => {
            console.log('⏱️ BasicSettings: Animation duration update requested', e.target.value);
            setConfig(prev => {
              console.log('⏱️ BasicSettings: Current config before animation duration update', prev);
              const newConfig = { ...prev, animationDuration: parseInt(e.target.value) };
              console.log('⏱️ BasicSettings: New config after animation duration update', newConfig);
              return newConfig;
            });
          }}
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