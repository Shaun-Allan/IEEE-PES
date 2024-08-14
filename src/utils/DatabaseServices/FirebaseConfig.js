// src/utils/FirebaseConfig.js 

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBonSLA2CzX9D2hC7YSc3u1dPQdG7dgfdQ",
  authDomain: "ssn-ieee-pes.firebaseapp.com",
  projectId: "ssn-ieee-pes",
  storageBucket: "ssn-ieee-pes.appspot.com",
  messagingSenderId: "893613198069",
  appId: "1:893613198069:web:b49fc2995a5fc98c0213bc",
  measurementId: "G-NEHRFWJQMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };