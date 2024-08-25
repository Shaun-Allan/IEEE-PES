import React, { useState, useEffect } from 'react';
import './Events.css';
import EventCard from '../../components/Events/EventCard';
import { fetchEvents } from '../../utils/DatabaseServices/Database';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const eventsList = await fetchEvents();
      setEvents(eventsList);
    };

    loadEvents();
  }, []);

  return (
    <div className="page-container">
      <h1 className='events-title'>Events</h1>
      <div className="cards-container">
        {events.length === 0 ? (
          <div className="loading-image">Loading...</div>
        ) : (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
