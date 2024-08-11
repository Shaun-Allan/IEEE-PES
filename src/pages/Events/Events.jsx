
// import React, { useState, useEffect, useRef } from 'react';
// import './Events.css';
// import EventCard from '../../components/Events/EventCard';
// import { fetchEvents } from '../../utils/DatabaseServices/Database'; 



// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const containerRef = useRef(null); 

//   useEffect(() => {
//     const loadEvents = async () => {
//       const eventsList = await fetchEvents();
//       setEvents(eventsList);
//     };

//     loadEvents();
//   }, []);

//   const scrollLeft = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: -300, behavior: 'smooth' }); 
//     }
//   };

//   const scrollRight = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 300, behavior: 'smooth' }); 
//     }
//   };

//   return (
//     <div className="page-container">
//       <h1 className='events-title'>Events</h1>
//       <div className="cards-container" ref={containerRef}>
//         <div className="scroll-buttons">
//           <button className="scroll-button left" onClick={scrollLeft}>❮</button>
//           <button className="scroll-button right" onClick={scrollRight}>❯</button>
//         </div>
//         {events.length === 0 ? (
//           <div className="loading-image"></div>
//         ) : (
//           events.map((event) => (
//             <div className="card-container" key={event.id}>
//               <EventCard event={event} />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Events;


import React from 'react'

const Events = () => {
  return (
    <div>Events</div>
  )
}

export default Events