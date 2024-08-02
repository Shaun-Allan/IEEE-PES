// src/utils/FirebaseConfig.js 

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBERns_ngCHIH1-S4oS2GaWE7mpIo_rp8o",
  authDomain: "ieee-pes-xxxxx.firebaseapp.com",
  projectId: "ieee-pes-xxxxx",
  storageBucket: "ieee-pes-xxxxx.appspot.com",
  messagingSenderId: "335364673380",
  appId: "1:335364673380:web:bb8f8991256d7ab9c17471",
  measurementId: "G-YCST87FXMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
