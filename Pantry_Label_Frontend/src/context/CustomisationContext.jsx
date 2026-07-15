import React, { createContext, useState } from 'react';
import { selectionService } from '../services/selectionService';

export const CustomisationContext = createContext(null);

export const CustomisationProvider = ({ children }) => {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedFont, setSelectedFont] = useState('Poppins');
  const [selectedShape, setSelectedShape] = useState('Oval'); // Supported shapes: Oval, Rounded, etc.
  const [selectedBackground, setSelectedBackground] = useState('Minimal'); // Supported backgrounds

  const toggleProductSelection = (productId) => {
    setSelectedProductIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const proceedWithSelection = async (token) => {
    if (selectedProductIds.length === 0) {
      throw new Error('No ingredients selected');
    }
    // Call selectionService with selections
    const response = await selectionService.postSelections({
      productIds: selectedProductIds,
      font: selectedFont,
      shape: selectedShape,
      background: selectedBackground
    }, token);
    return response.data;
  };

  const clearSelections = () => {
    setSelectedProductIds([]);
    setSelectedFont('Poppins');
    setSelectedShape('Oval');
    setSelectedBackground('Minimal');
  };

  const value = {
    selectedProductIds,
    setSelectedProductIds,
    toggleProductSelection,
    selectedFont,
    setSelectedFont,
    selectedShape,
    setSelectedShape,
    selectedBackground,
    setSelectedBackground,
    proceedWithSelection,
    clearSelections
  };

  return (
    <CustomisationContext.Provider value={value}>
      {children}
    </CustomisationContext.Provider>
  );
};
