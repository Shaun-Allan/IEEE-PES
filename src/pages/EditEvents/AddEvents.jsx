import React, { useState } from 'react';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../utils/firebase/firebase';
import './AddEvents.css';

const EditEvents = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [images, setImages] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const monthMap = {
      1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
      7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
    };

    const eventYear = eventDate.slice(0, 4);
    const eventMonth = monthMap[parseInt(eventDate.slice(5, 7))];

    const imageUrls = [];
    for (const file of images) {
      const imagePath = `Events/${eventYear}/${file.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    try {
      const eventsCollection = collection(db, 'Events', 'Year', eventYear);
      const q = query(eventsCollection);
      const querySnapshot = await getDocs(q);
      const eventCount = querySnapshot.size;

      await addDoc(eventsCollection, {
        Name: eventTitle,
        Description: eventDescription,
        Date: eventDate.toString(),
        EventNo: eventCount + 1,
        ImageUrls: imageUrls
      });

      setPopupMessage('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      setPopupMessage('Error adding event. Please try again.');
    }

    setEventTitle('');
    setEventDescription('');
    setEventDate('');
    setImages([]);
  };

  const handleClosePopup = () => {
    setPopupMessage('');
  };

  return (
    <div className="edit-events-container">
      <h1>Add Events</h1>
      <form onSubmit={handleSubmit} className="edit-events-form">
        <div className="form-group">
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter event title"
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
            placeholder="Enter event description"
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

        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            className="form-file-input"
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
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
