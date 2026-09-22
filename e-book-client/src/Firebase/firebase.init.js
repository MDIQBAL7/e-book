// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvZEF6DY6mk9_LBN6G4TC4TY4L6JX1_zY",
  authDomain: "e-book-4df21.firebaseapp.com",
  projectId: "e-book-4df21",
  storageBucket: "e-book-4df21.firebasestorage.app",
  messagingSenderId: "85532814460",
  appId: "1:85532814460:web:e77041d5734fcb8159edf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);