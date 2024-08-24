// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics'; // Optional, if using Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBonSLA2CzX9D2hC7YSc3u1dPQdG7dgfdQ",
  authDomain: "ssn-ieee-pes.firebaseapp.com",
  projectId: "ssn-ieee-pes",
  storageBucket: "ssn-ieee-pes.appspot.com",
  messagingSenderId: "893613198069",
  appId: "1:893613198069:web:b49fc2995a5fc98c0213bc",
  measurementId: "G-NEHRFWJQMB"  // Optional, if using Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app); // Optional, if using Analytics
