import React, { useState, useEffect, useRef } from 'react';
import './Events.css';
import EventCard from '../../components/Events/EventCard';
import { fetchEvents } from '../../utils/DatabaseServices/Database'; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const containerRef = useRef(null); 

  useEffect(() => {
    const loadEvents = async () => {
      const eventsList = await fetchEvents();
      setEvents(eventsList);
    };

    loadEvents();
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' }); 
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' }); 
    }
  };


export default Events