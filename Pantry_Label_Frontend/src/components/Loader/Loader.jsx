import React from 'react';
import './Loader.css';

export const Loader = ({ fullPage = false, message = 'Loading...' }) => {
  if (fullPage) {
    return (
      <div className="full-page-loader-overlay">
        <div className="loader-card">
          <div className="premium-spinner"></div>
          <p className="loader-text">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-loader-container">
      <div className="inline-spinner"></div>
      {message && <span className="inline-loader-text">{message}</span>}
    </div>
  );
};

export default Loader;
