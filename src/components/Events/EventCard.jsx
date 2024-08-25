import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => {
  const imageUrls = Array.isArray(event.ImageUrls) ? event.ImageUrls : [];

  return (
    <div className="event-card">
      {imageUrls.length > 0 && (
        <div className="event-image-container">
          <img
            alt={`Event ${event.Name} Image`}
            src={imageUrls[0]} 
            className="event-image"
          />
        </div>
      )}
      <div className="content-container">
        <h4 className="event-title">{event.Name}</h4>
        <button className="know-more-button">Know More</button>
      </div>
    </div>
  );
};

export default EventCard;
