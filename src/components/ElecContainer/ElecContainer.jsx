import React from 'react';
import './ElecContainer.css';

const ElecContainer = ({ children }) => {
  return (
    <div className="text-box">
      {children}
    </div>
  );
};

export default ElecContainer;
