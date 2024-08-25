import React, { useState, useEffect } from 'react';
import './Events.css';
import EventCard from '../../components/Events/EventCard';
import Popup from '../../components/Events/Popup'; 
import { fetchEvents } from '../../utils/DatabaseServices/Database';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      const eventsList = await fetchEvents();
      setEvents(eventsList);
    };

    loadEvents();
  }, []);

  const handleOpenPopup = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="page-container">
      <h1 className='events-title'>Events</h1>
      <div className="cards-container">
        {events.length === 0 ? (
          <div className="loading-image">Loading...</div>
        ) : (
          events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onOpenPopup={handleOpenPopup} 
            />
          ))
        )}
      </div>

      {selectedEvent && (
        <Popup 
          event={selectedEvent} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
};

export default Events;