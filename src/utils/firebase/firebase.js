// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth, db, storage };