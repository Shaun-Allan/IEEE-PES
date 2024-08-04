import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig';

export const fetchEvents = async () => {
  try {
    const eventsCollection = collection(db, 'events');
    const eventSnapshot = await getDocs(eventsCollection);

    const eventsList = await Promise.all(
      eventSnapshot.docs.map(async (doc) => {
        const eventData = doc.data();
        const imagesCollection = collection(doc.ref, 'images');
        const imagesSnapshot = await getDocs(imagesCollection);

        const images = imagesSnapshot.docs
          .map(imgDoc => imgDoc.data())
          .sort((a, b) => a.imageNo - b.imageNo);

        return { id: doc.id, ...eventData, images };
      })
    );

    eventsList.sort((a, b) => a.eventNo - b.eventNo).reverse();

    return eventsList;
  } catch (err) {
    console.error('Error fetching events:', err);
    throw new Error('Failed to load events.');
  }
};
