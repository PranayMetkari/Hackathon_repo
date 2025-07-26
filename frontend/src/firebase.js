// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJfsdst6JfeJn8YU4ZbG3ILgM9IzMIVGg",
  authDomain: "hackathon-f32dd.firebaseapp.com",
  projectId: "hackathon-f32dd",
  storageBucket: "hackathon-f32dd.firebasestorage.app",
  messagingSenderId: "906711926073",
  appId: "1:906711926073:web:89d7ecd5c22c6e861214e8",
  measurementId: "G-FBLDHQYFH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
