// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-app-e0924.firebaseapp.com",
  projectId: "mern-app-e0924",
  storageBucket: "mern-app-e0924.appspot.com",
  messagingSenderId: "298382809595",
  appId: "1:298382809595:web:f0c78d93fda1629d93935e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);