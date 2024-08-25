import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const fetchEvents = async () => {
  try {
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    let allEvents = [];

    for (let year = startYear; year <= currentYear; year++) {
      const eventsCollection = collection(db, 'Events', 'Year', year.toString());
      const eventSnapshot = await getDocs(eventsCollection);
      const yearWiseEvents = eventSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      allEvents = allEvents.concat(yearWiseEvents);
    }
    allEvents.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate)); 

    return allEvents;
  } catch (err) {
    console.error('Error fetching events:', err);
    throw new Error('Failed to load events.');
  }
};
