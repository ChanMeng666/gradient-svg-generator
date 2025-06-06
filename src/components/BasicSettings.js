import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { BiText, BiPalette, BiRuler, BiTimer } from 'react-icons/bi';
import { MdGradient } from 'react-icons/md';
import ColorRow from './ColorRow';
import { GRADIENT_TYPES } from '../constants/gradientTypes';

const BasicSettings = ({ config, setConfig }) => {
  // 颜色处理函数
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
            <BiText />
            <span>Display Text</span>
          </div>
          <FiInfo className="tooltip-icon" title="The text that will appear on your gradient" />
        </label>
        <input 
          value={config.text}
          onChange={e => setConfig({...config, text: e.target.value})}
          placeholder="Enter your text here"
          className="text-input"
        />
      </div>
      
      {/* 多色选择器 */}
      <div className="input-group">
        <label>
          <div className="label-content">
            <BiPalette />
            <span>Gradient Colors</span>
          </div>
          <FiInfo className="tooltip-icon" title="Add multiple colors to create complex gradients" />
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
            <BiRuler />
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

      {/* 渐变类型选择 */}
      <div className="input-group">
        <label>
          <div className="label-content">
            <MdGradient />
            <span>Gradient Type</span>
          </div>
          <FiInfo className="tooltip-icon" title="Choose the direction of your gradient" />
        </label>
        <div className="gradient-type-buttons">
          {GRADIENT_TYPES.map(type => (
            <button
              key={type.value}
              className={`gradient-type-button ${config.gradientType === type.value ? 'active' : ''}`}
              onClick={() => setConfig(prev => ({ ...prev, gradientType: type.value }))}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 动画持续时间滑块 */}
      <div className="input-group">
        <label>
          <div className="label-content">
            <BiTimer />
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