import React from 'react';
import './EventButtons.css';

const EventButtons = ({ onAddClick, onEditClick, onDeleteClick }) => {
  return (
    <div className="event-buttons">
      <button onClick={onAddClick} className="event-button">Add Event</button>
      <button onClick={onEditClick} className="event-button">Edit Event</button>
      <button onClick={onDeleteClick} className="event-button">Delete Event</button>
    </div>
  );
};

export default EventButtons;