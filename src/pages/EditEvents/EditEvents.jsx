import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../utils/firebase/firebase'; 
import './EditEvents.css';

const EditEvents = ({ onClose }) => {
  const [years, setYears] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [oldImageUrls, setOldImageUrls] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

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

      setLoading(true); 
      try {
        const eventsCollection = collection(db, 'Events', 'Year', selectedYear);
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsList);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); 
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
        setOldImageUrls(event.ImageUrls || []);
      }
    }
  }, [selectedEventId, events]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleEventChange = (e) => {
    setSelectedEventId(e.target.value);
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleRemoveImage = async (url) => {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
    setOldImageUrls(oldImageUrls.filter(imageUrl => imageUrl !== url));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedEventId || !selectedYear) {
      console.error('No event or year selected for editing.');
      return;
    }
  
    setLoading(true); 
    
    const uploadImageUrls = [];
    for (const file of newImages) {
      const imagePath = `Events/${selectedYear}/${file.name}`;
      const imageRef = ref(storage, imagePath);
  
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        uploadImageUrls.push(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    
    
    try {
      const eventDoc = doc(db, 'Events', 'Year', selectedYear, selectedEventId);
      const allImageUrls = oldImageUrls.concat(uploadImageUrls);
  
      await updateDoc(eventDoc, {
        Name: eventTitle,
        Description: eventDescription,
        Date: eventDate,
        ImageUrls: allImageUrls,
      });

      setPopupMessage('Event edited successfully!');
     
      setEvents([]);
      setSelectedYear('');
      setSelectedEventId('');
      setEventTitle('');
      setEventDescription('');
      setEventDate('');
      setOldImageUrls([]);
      setNewImages([]);
    } catch (error) {
      setPopupMessage('Error editing event. Please try again.');
    } finally {
      setLoading(false); 
    }
  };
  
  const handleClosePopup = () => {
    setPopupMessage('');
  };

  return (
    <div className="edit-events-container">
      <h1>Edit Event</h1>
      <form onSubmit={handleSave} className="edit-events-form">
        <div className="form-group">  {/* select year */}
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
        )} {/* select event */}

        {selectedEventId && (
          <>
            <div className="form-group"> {/* event title */}
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

            <div className="form-group"> {/* event description */}
              <label htmlFor="description">Event Description:</label>
              <textarea
                id="description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
                className="form-textarea"
              />
            </div>

            <div className="form-group"> {/* event date */}
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

            <div className="form-group"> {/* add images */}
              <label htmlFor="images">Images:</label>
              <input
                type="file"
                id="images"
                multiple
                onChange={handleImageChange}
                className="form-file-input"
              />
            </div>

            {oldImageUrls.length > 0 && (
              <div className="form-group">
                <label>Images Available:</label>
                <ul>
                  {oldImageUrls.map(url => (
                    <li className='flex justify-center items-center my-10' key={url}>
                      <img src={url} alt="Event" style={{ width: '100px', height: 'auto' }} />
                      <button type="button" onClick={() => handleRemoveImage(url)} className="remove-button">Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button type="submit" className="submit-button"> {loading ? <div className="spinner"></div> : 'Save Changes'} </button>
          </>
        )}
      </form>

      {popupMessage && (
        <div className="popup-overlay">
          <div className="popup-message">
            <p>{popupMessage}</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default EditEvents;
