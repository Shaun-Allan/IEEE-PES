import React, { useEffect, useState } from 'react';
import './ElectricLine.css';

const ElecLineVertical = () => {
  const [lineHeight, setLineHeight] = useState('100%');

  useEffect(() => {
    const updateLineHeight = () => {
      const screenHeight = window.innerHeight;
      const containerHeight = 180; // Default value if not provided
      const newLineHeight = 200;
      setLineHeight(`${newLineHeight}px`);
    };

    updateLineHeight();
    window.addEventListener('resize', updateLineHeight);

    return () => window.removeEventListener('resize', updateLineHeight);
  }, [200]);

  return (
    <div className="vertical-line-container">
      <div className="vertical-line" style={{ height: lineHeight }}>
        <div className="vertical-electricity"></div>
      </div>
    </div>
  );
};

export default ElecLineVertical;
