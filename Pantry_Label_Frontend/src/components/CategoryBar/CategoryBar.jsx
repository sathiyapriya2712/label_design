import React from 'react';
import './CategoryBar.css';

export const CategoryBar = ({ categories = [], selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-bar-wrapper">
      <div className="category-bar-scroll">
        <button
          className={`category-tab-btn ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          All Ingredients
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-tab-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
