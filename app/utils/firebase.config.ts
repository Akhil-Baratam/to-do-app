// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "to-do-app-a73d6.firebaseapp.com",
  projectId: "to-do-app-a73d6",
  storageBucket: "to-do-app-a73d6.appspot.com",
  messagingSenderId: "390749406187",
  appId: "1:390749406187:web:8909274a782547ddd84fae",
  measurementId: "G-7HGC8EWDZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)