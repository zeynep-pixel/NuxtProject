import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { defineNuxtPlugin } from '#app';

const firebaseConfig = {
  apiKey: "AIzaSyDSbEpuicQ16U7NAVKOPMK9LBkmqy8g6bw",
  authDomain: "touche-2cc9f.firebaseapp.com",
  projectId: "touche-2cc9f",
  storageBucket: "touche-2cc9f.firebasestorage.app",
  messagingSenderId: "721237923412",
  appId: "1:721237923412:web:e332d08574e563f1a83fc1",
  measurementId: "G-K0PV8SYGHW",
};

// Firebase uygulamasını başlat
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

// Authentication ve Firestore servislerini başlat
const auth: Auth = getAuth(firebaseApp);
const db: Firestore = getFirestore(firebaseApp);

// Servisleri uygulama genelinde kullanılabilir hâle getir
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('auth', auth); // Tipi: Auth
  nuxtApp.provide('firebaseApp', firebaseApp); // Tipi: FirebaseApp
  nuxtApp.provide('db', db); // Tipi: Firestore
});
