// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArJVQxI8sZj-L0wN2qvn8WEOcKcSXbWsE",
  authDomain: "wordle-kids.firebaseapp.com",
  projectId: "wordle-kids",
  storageBucket: "wordle-kids.firebasestorage.app",
  messagingSenderId: "109293410047",
  appId: "1:109293410047:web:96dde0c626fae3a6f11eca",
  measurementId: "G-S0EZ3S4GD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);