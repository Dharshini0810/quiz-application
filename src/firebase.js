// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa6BU7t8hLUjiQXE4ATszhKsACC0hcy6I",
  authDomain: "quiz-app-51310.firebaseapp.com",
  projectId: "quiz-app-51310",
  storageBucket: "quiz-app-51310.appspot.com",
  messagingSenderId: "480830529769",
  appId: "1:480830529769:web:ef7030cb1de98e9ba15078",
  measurementId: "G-8SM1G3EERR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
