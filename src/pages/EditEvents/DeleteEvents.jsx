import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../utils/firebase/firebase'; 
import './DeleteEvents.css';

const DeleteEvents = ({ onClose }) => {
  const [years, setYears] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchYears = async () => {
      const startYear = 2022;
      const date = new Date();
      const currentYear = date.getFullYear();
      const yearsArray = [];
      
      for (let year = startYear; year <= currentYear; year++) {
        yearsArray.push(year);
      }

      setYears(yearsArray);
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedYear) return;

      try {
        const eventsCollection = collection(db, 'Events', 'Year', selectedYear);
        const querySnapshot = await getDocs(eventsCollection);
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [selectedYear]);

  const handleDelete = async () => {
    if (!selectedEvent || !selectedYear) return;

    setLoading(true);
    setMessage('');
    
    try {
      const eventDoc = doc(db, 'Events', 'Year', selectedYear, selectedEvent);
      const eventSnapshot = await getDoc(eventDoc);
      const eventData = eventSnapshot.data();
      
      if (eventData && eventData.ImageUrls) {
    
        await Promise.all(eventData.ImageUrls.map(async (url) => {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
        }));
      }

  
      await deleteDoc(eventDoc);

      setMessage('Event and images deleted successfully!');
      setSelectedYear('');
      setSelectedEvent('');
      setEvents([]);
    } catch (error) {
      console.error('Error deleting event or images:', error);
      setMessage('Error deleting event or images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-events-container">
      <h1>Delete Event</h1>
      <form onSubmit={(e) => e.preventDefault()} className="delete-events-form">
        <div className="form-group">
          <label htmlFor="year">Select Year:</label>
          <select
            id="year"
            onChange={(e) => setSelectedYear(e.target.value)}
            value={selectedYear}
          >
            <option value="">Select a year</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {selectedYear && (
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
        )}

        <button
          onClick={handleDelete}
          className="delete-button"
          disabled={!selectedEvent || loading}
        >
          {loading ? <div className="spinner"></div> : 'Delete Event'}
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default DeleteEvents;
