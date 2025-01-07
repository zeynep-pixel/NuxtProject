import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDSbEpuicQ16U7NAVKOPMK9LBkmqy8g6bw",
  authDomain: "touche-2cc9f.firebaseapp.com",
  projectId: "touche-2cc9f",
  storageBucket: "touche-2cc9f.firebasestorage.app",
  messagingSenderId: "721237923412",
  appId: "1:721237923412:web:e332d08574e563f1a83fc1",
  measurementId: "G-K0PV8SYGHW"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);  // Initialize Firestore

// Make auth and db available throughout the app
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('auth', auth);
  nuxtApp.provide('firebaseApp', firebaseApp);
  nuxtApp.provide('db', db);  // Provide Firestore instance
});
