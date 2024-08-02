import React, { useState, useEffect } from 'react';
import './Events.css';
import { db } from '../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import EventCard from '../../components/Events/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'events');
        const eventSnapshot = await getDocs(eventsCollection);
        const eventsList = await Promise.all(
          eventSnapshot.docs.map(async (doc) => {
            const eventData = doc.data();
            const imagesCollection = collection(doc.ref, 'images');
            const imagesSnapshot = await getDocs(imagesCollection);
            const images = imagesSnapshot.docs.map(imgDoc => imgDoc.data());
            return { id: doc.id, ...eventData, images };
          })
        );
        console.log('Fetched events:', eventsList);
        setEvents(eventsList);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events.');
      }
    };

    fetchEvents();
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
