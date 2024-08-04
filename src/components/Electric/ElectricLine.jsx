import React, { useEffect, useState } from 'react';
import './ElectricLine.css';

const ElectricLine = () => {
  const [lineWidth, setLineWidth] = useState('100%');

  useEffect(() => {
    const updateLineWidth = () => {
      const screenWidth = window.innerWidth;
      const containerWidth = 350; // Default value if not provided
      const newLineWidth = screenWidth / 3 - containerWidth / 2;
      setLineWidth(`${newLineWidth}px`);
    };

    updateLineWidth();
    window.addEventListener('resize', updateLineWidth);

    return () => window.removeEventListener('resize', updateLineWidth);
  }, []);

  return (
    <div className="line-container">
      <div className="line" style={{ width: lineWidth }}>
        <div className="electricity"></div>
      </div>
    </div>
  );
};

export default ElectricLine;
