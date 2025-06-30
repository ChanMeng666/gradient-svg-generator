import React from 'react';
import templateCategories from '../data/templateCategories';

const TemplatesSection = ({ 
  activeCategory, 
  setActiveCategory, 
  selectedTemplate, 
  setSelectedTemplate, 
  setConfig 
}) => {
  // 安全检查：确保模板分类数据存在
  if (!templateCategories || !Array.isArray(templateCategories)) {
    console.error('TemplatesSection: templateCategories is not available or not an array');
    return <div>Loading templates...</div>;
  }

  // 找到当前活跃的分类
  const currentCategory = templateCategories.find(category => category.id === activeCategory);
  
  // 如果找不到当前分类，使用第一个分类作为默认值
  const categoryToShow = currentCategory || templateCategories[0];
  
  // 安全检查：确保分类有模板数据
  if (!categoryToShow || !categoryToShow.templates || !Array.isArray(categoryToShow.templates)) {
    console.error('TemplatesSection: Category templates data is not available', { categoryToShow });
    return <div>Loading templates...</div>;
  }

  return (
    <section className="templates-section">
     
      <div className="category-tabs">
        {templateCategories.map((category) => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            data-category={category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            <span>{category.icon} {category.name}</span>
          </button>
        ))}
      </div>

      <div className="templates-grid">
        {categoryToShow.templates.map(template => {
          // 安全检查：确保模板数据完整
          if (!template || !template.name) {
            console.warn('TemplatesSection: Invalid template data', template);
            return null;
          }

          return (
            <button
              key={template.name}
              className={`template-card ${selectedTemplate?.name === template.name ? 'active' : ''}`}
              data-effect-type={
                activeCategory === 'text-effects' ? 'textEffect' :
                activeCategory === 'morphing' ? 'morphing' :
                activeCategory === 'fluid-dynamics' ? 'fluid-dynamics' :
                activeCategory === 'dimensional' ? 'dimensional' :
                'regular'
              }
              onClick={() => {
                console.log('🎨 TemplatesSection: Template selected', {
                  templateName: template.name,
                  templateData: {
                    colors: template.colors,
                    gradientType: template.gradientType,
                    animationDuration: template.animationDuration
                  }
                });

                setSelectedTemplate(template);
                
                setConfig(prev => {
                  const updatedConfig = {
                    ...prev,
                    template: template.name,
                    colors: template.colors || prev.colors,
                    gradientType: template.gradientType || prev.gradientType,
                    animationDuration: parseInt(template.animationDuration) || prev.animationDuration
                  };
                  console.log('🎨 TemplatesSection: Config update function called', {
                    prevConfig: prev,
                    newConfig: updatedConfig
                  });
                  return updatedConfig;
                });
              }}
            >
              <div className="template-preview">
                <img 
                  src={`/api/svg?text=${encodeURIComponent(template.label || template.name)}&template=${template.name}`} 
                  alt={template.label || template.name}
                  loading="lazy"
                  onError={(e) => {
                    // 如果图片加载失败，显示占位符
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div className="template-info">
                <h3 className="template-name">{template.label || template.name}</h3>
                <p className="template-description">{template.description || 'No description available'}</p>
                <div className="template-specs">
                  <div className="spec-item">
                    <span className="spec-label">Type:</span>
                    <span className="spec-value">{template.gradientType || 'Unknown'}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Duration:</span>
                    <span className="spec-value">{template.animationDuration || 'N/A'}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Colors:</span>
                    <div className="color-dots">
                      {(template.colors || []).map((color, i) => (
                        <span 
                          key={i} 
                          className="color-dot" 
                          style={{ backgroundColor: `#${color}` }}
                          title={`#${color}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default TemplatesSection; 