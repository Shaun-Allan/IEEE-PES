import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase';
import './EditEvents.css';

const EditEvents = ({ onClose }) => {
  const [years, setYears] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');

  useEffect(() => {
    const fetchYears = () => {
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
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [selectedYear]);

  useEffect(() => {
    if (selectedEventId) {
      const event = events.find(e => e.id === selectedEventId);
      if (event) {
        setEventTitle(event.Name || '');
        setEventDescription(event.Description || '');
        setEventDate(event.Date || '');
      }
    }
  }, [selectedEventId, events]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleEventChange = (e) => {
    setSelectedEventId(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedEventId || !selectedYear) {
      console.error('No event or year selected for editing.');
      return;
    }

    try {
      const eventDoc = doc(db, 'Events', 'year', selectedYear, 'events', selectedEventId);
      await updateDoc(eventDoc, {
        Name: eventTitle,
        Description: eventDescription,
        Date: eventDate,
      });

      console.log('Event updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="edit-events-container">
      <h1>Edit Event</h1>
      <form onSubmit={handleSave} className="edit-events-form">
        <div className="form-group">
          <label htmlFor="year">Select Year:</label>
          <select id="year" onChange={handleYearChange} value={selectedYear}>
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
            <label htmlFor="event">Select Event:</label>
            <select id="event" onChange={handleEventChange} value={selectedEventId}>
              <option value="">Select an event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.Name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedEventId && (
          <>
            <div className="form-group">
              <label htmlFor="title">Event Title:</label>
              <input
                type="text"
                id="title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Event Description:</label>
              <textarea
                id="description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Event Date:</label>
              <input
                type="date"
                id="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="submit-button">Save Changes</button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditEvents;
