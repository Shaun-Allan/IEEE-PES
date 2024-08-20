// src/components/DeleteEvents.jsx
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase';
import './DeleteEvents.css';

const DeleteEvents = ({ onClose }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'Events');
      const q = query(eventsCollection);
      const querySnapshot = await getDocs(q);
      const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);

  const handleDelete = async () => {
    try {
      const eventDoc = doc(db, 'Events', selectedEvent);
      await deleteDoc(eventDoc);

      console.log('Event deleted successfully!');
      onClose(); // Close the form
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="delete-events-container">
      <h1>Delete Event</h1>
      <div className="form-group">
        <label htmlFor="event">Select Event to Delete:</label>
        <select
          id="event"
          onChange={(e) => setSelectedEvent(e.target.value)}
          value={selectedEvent}
        >
          <option value="">Select an event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.Name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleDelete}
        className="delete-button"
        disabled={!selectedEvent}
      >
        Delete Event
      </button>
    </div>
  );
};

export default DeleteEvents;
