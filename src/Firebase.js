// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0mJzuH4VLMZjTzuv5nwtPurbj_T_g4gg",
  authDomain: "real-time-stock-b4be0.firebaseapp.com",
  projectId: "real-time-stock-b4be0",
  storageBucket: "real-time-stock-b4be0.appspot.com",
  messagingSenderId: "441513133171",
  appId: "1:441513133171:web:33ec07ec13b0fab86c1606",
  measurementId: "G-M5DM1B3Q44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
