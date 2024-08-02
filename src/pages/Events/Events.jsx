import React, { useState, useEffect } from 'react';
import './Events.css';
import EventCard from '../../components/Events/EventCard';
import { fetchEvents } from '../../utils/DatabaseServices/Database'; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsList = await fetchEvents();
        setEvents(eventsList);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events.');
      }
    };

    loadEvents();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <h1>Events</h1>
      <div className="cards-container">
        {events.length === 0 ? (
          <div className="loading-image"></div>
        ) : (
          events.map((event) => (
            <div className="card-container" key={event.id}>
              <EventCard event={event} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
