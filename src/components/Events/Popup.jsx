import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import './Popup.css';

const Popup = ({ event, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrls = Array.isArray(event.ImageUrls) ? event.ImageUrls : [];
  
  // Ref to access the popup content
  const popupContentRef = useRef(null);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % imageUrls.length
    );
  };

  useEffect(() => {
    // Handler to close the popup when pressing the Escape key
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Cleanup event listener on unmount
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Close popup when clicking outside of the content
  const handleOverlayClick = (event) => {
    if (popupContentRef.current && !popupContentRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup-content" ref={popupContentRef}>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="popup-title">{event.Name}</h2>
        <div className="popup-image-container">
          {imageUrls.length > 1 && <button className="popup-arrow-left" onClick={goToPreviousImage}>
            <FaChevronLeft />
          </button>}
          <img
            alt={`Event ${event.Name} Image`}
            src={imageUrls[currentImageIndex]}
            className="popup-image"
          />
          {imageUrls.length > 1 && <button className="popup-arrow-right" onClick={goToNextImage}>
            <FaChevronRight />
          </button>}
        </div>
        <div className="popup-details">
          <p className="popup-date">{event.Date}</p>
          <p className="popup-description">{event.Description}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
