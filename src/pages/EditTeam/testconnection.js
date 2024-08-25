import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/DatabaseServices/FirebaseConfig.js';  

const fetchNestedData = async () => {
  try {
    // Fetch top-level collections: Design, Technical, OfficeBearers, and Verticals
    const categories = ['Design', 'Technical', 'Office Bearers', 'Vertical','PR','Event Management'];
    

    const results = {};

    for (const category of categories) {
      const categorySnapshot = await getDocs(collection(db, `Team/Team Members/${category}`));
      
      if (categorySnapshot.empty) {
        console.log(`No documents found in the ${category} category.`);
        results[category] = [];
        continue;
      }

      const categoryData = await Promise.all(categorySnapshot.docs.map(async (doc) => {
        const docData = doc.data();
        const docId = doc.id;
        
        return {
          id: docId,
          ...docData,
        };
      }));

      results[category] = categoryData;
    }

    console.log('Fetched Data:', results);
  } catch (err) {
    console.error('Error fetching nested data:', err);
  }
};

fetchNestedData();
