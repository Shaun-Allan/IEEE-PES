import React, { useEffect, useState } from 'react';
import "./ElectricLineInv.css";

const ElectricLineInv = () => {
  const [lineWidth, setLineWidth] = useState("100%");

  useEffect(() => {
    const updateLineWidth = () => {
      const screenWidth = window.innerWidth;
      const containerWidth = 350; // Default value if not provided
      const newLineWidth = screenWidth / 3 - containerWidth / 2;
      setLineWidth(`${newLineWidth}px`);
    };

    updateLineWidth();
    window.addEventListener("resize", updateLineWidth);

    return () => window.removeEventListener("resize", updateLineWidth);
  }, []);
  return (
    <div className="inverted-line-container">
      <div className="inverted-line" style={{ width: lineWidth }}>
        <div className="inverted-electricity"></div>
      </div>
    </div>
  );
};

export default ElectricLineInv;
