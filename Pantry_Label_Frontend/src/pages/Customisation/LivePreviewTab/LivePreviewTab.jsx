import React, { useState, useContext } from 'react';
import { CustomisationContext } from '../../../context/CustomisationContext';
import './LivePreviewTab.css';

export const LivePreviewTab = ({ selectedProducts = [] }) => {
  const { selectedFont, selectedShape, selectedBackground } = useContext(CustomisationContext);
  const [activeIndex, setActiveIndex] = useState(0);

  if (selectedProducts.length === 0) {
    return (
      <div className="live-preview-empty">
        <p>No ingredients selected. Go back to the dashboard to select some.</p>
      </div>
    );
  }

  const currentProduct = selectedProducts[activeIndex];

  const handleNext = () => {
    setActiveIndex(prev => (prev === selectedProducts.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? selectedProducts.length - 1 : prev - 1));
  };

  // Determine styling classes based on customization parameters
  const shapeClass = selectedShape.toLowerCase(); // 'oval' or 'rounded'
  const bgClass = selectedBackground.replace(' ', '-').toLowerCase(); // 'minimal', 'classic', 'floral', 'modern-gradient'

  return (
    <div className="live-preview-tab-container">
      <div className="preview-navigation-header">
        <h4>
          Previewing Label {activeIndex + 1} of {selectedProducts.length}
        </h4>
        <div className="preview-nav-btns">
          <button className="preview-nav-btn" onClick={handlePrev}>
            ◀ Prev
          </button>
          <button className="preview-nav-btn" onClick={handleNext}>
            Next ▶
          </button>
        </div>
      </div>

      <div className="label-canvas-container">
        <div 
          className={`label-preview-sticker ${shapeClass} ${bgClass}`}
          style={{ fontFamily: selectedFont }}
        >
          <div className="sticker-content-border">
            <span className="sticker-tag-top">PREMIUM QUALITY</span>
            <h1 className="sticker-title-english">{currentProduct?.name || 'Ingredient Name'}</h1>
            {currentProduct?.bilingualName && (
              <h2 className="sticker-title-bilingual">{currentProduct?.bilingualName}</h2>
            )}
            <div className="sticker-separator"></div>
            <span className="sticker-tag-bottom">100% PURE & NATURAL</span>
          </div>
        </div>
      </div>

      <div className="preview-instructions">
        <p>
          Showing preview for <strong>{currentProduct?.name}</strong>. Stickers will be printed in high-resolution, waterproof adhesive sheets matching this layout.
        </p>
      </div>
    </div>
  );
};

export default LivePreviewTab;
