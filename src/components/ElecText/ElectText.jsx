import React from 'react';
import './ElecText.css';

const ElectricText = ({ children }) => {
  return (
    <div className="electric-text">
      {children}
    </div>
  );
};

export default ElectricText;
