// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "freelance-website-ad549.firebaseapp.com",
  projectId: "freelance-website-ad549",
  storageBucket: "freelance-website-ad549.firebasestorage.app",
  messagingSenderId: "596128007958",
  appId: "1:596128007958:web:9e4ea7ddb05cc6fc1df237",
  measurementId: "G-RT3CF1VBSK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
