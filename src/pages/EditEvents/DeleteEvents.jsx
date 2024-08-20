import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase';
import './DeleteEvents.css';

const DeleteEvents = ({ onClose }) => {
  const [years, setYears] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  // Fetch years for selection
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

  // Fetch events based on the selected year
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

  // Handle the delete button click
  const handleDelete = async () => {
    if (!selectedEvent || !selectedYear) return;

    try {
      const eventDoc = doc(db, 'Events', 'Year', selectedYear, selectedEvent);
      await deleteDoc(eventDoc);

      console.log('Event deleted successfully!');
      onClose(); // Close the form after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
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
          disabled={!selectedEvent}
        >
          Delete Event
        </button>
      </form>
    </div>
  );
};

export default DeleteEvents;
