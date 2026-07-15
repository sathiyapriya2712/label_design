import React, { useContext } from 'react';
import { CustomisationContext } from '../../../context/CustomisationContext';
import './FeaturesTab.css';

export const FeaturesTab = () => {
  const {
    selectedFont,
    setSelectedFont,
    selectedShape,
    setSelectedShape,
    selectedBackground,
    setSelectedBackground
  } = useContext(CustomisationContext);

  const fonts = [
    { id: 'Poppins', name: 'Poppins (Modern Sans)' },
    { id: 'Playfair Display', name: 'Playfair (Elegant Serif)' },
    { id: 'Montserrat', name: 'Montserrat (Sleek Geometric)' },
    { id: 'Caveat', name: 'Caveat (Charming Handwritten)' }
  ];

  const shapes = [
    { id: 'Oval', name: 'Oval Frame' },
    { id: 'Rounded', name: 'Soft Rounded Edge' }
  ];

  const backgrounds = [
    { id: 'Minimal', name: 'Clean White' },
    { id: 'Classic', name: 'Cream Parchment' },
    { id: 'Floral', name: 'Soft Floral Border' },
    { id: 'Modern Gradient', name: 'Fresh Mint Gradient' }
  ];

  return (
    <div className="features-tab-container">
      <div className="customiser-option-section">
        <h3>1. Select Typography Font</h3>
        <p className="section-desc">Choose a font style that suits your kitchen decoration.</p>
        <div className="choice-grid">
          {fonts.map(font => (
            <button
              key={font.id}
              className={`choice-card ${selectedFont === font.id ? 'active' : ''}`}
              onClick={() => setSelectedFont(font.id)}
              style={{ fontFamily: font.id }}
            >
              <span className="choice-preview-text">Turmeric / हल्दी</span>
              <span className="choice-label-name">{font.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="customiser-option-section">
        <h3>2. Select Label Shape</h3>
        <p className="section-desc">Choose the physical boundary style of the custom stickers.</p>
        <div className="choice-grid">
          {shapes.map(shape => (
            <button
              key={shape.id}
              className={`choice-card shape-choice ${selectedShape === shape.id ? 'active' : ''}`}
              onClick={() => setSelectedShape(shape.id)}
            >
              <div className={`shape-visual-preview ${shape.id.toLowerCase()}`}></div>
              <span className="choice-label-name">{shape.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="customiser-option-section">
        <h3>3. Select Label Background</h3>
        <p className="section-desc">Choose a background theme pattern or coloring.</p>
        <div className="choice-grid">
          {backgrounds.map(bg => (
            <button
              key={bg.id}
              className={`choice-card bg-choice ${selectedBackground === bg.id ? 'active' : ''}`}
              onClick={() => setSelectedBackground(bg.id)}
            >
              <div className={`bg-visual-preview ${bg.id.replace(' ', '-').toLowerCase()}`}></div>
              <span className="choice-label-name">{bg.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesTab;
