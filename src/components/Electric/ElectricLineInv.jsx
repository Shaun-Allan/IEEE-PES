import React from 'react';
import './ElectricLineInv.css';

const ElectricLineInv = ({ inverted }) => {
  const lineClassName = inverted ? 'line-inverted' : '';

  return (
    <div className="line-container">
      <div className={`line ${lineClassName}`}>
        <div className="electricity"></div>
      </div>
    </div>
  );
};

export default ElectricLineInv;
