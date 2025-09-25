// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Use environment variables injected by Vite (prefix VITE_)
// See .env.local.example for variable names
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Simple runtime check to aid debugging in development
if (!firebaseConfig.apiKey) {
  console.warn('[firebaseConfig] Firebase config not set. Set VITE_FIREBASE_* env vars (see .env.local.example)');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig as any);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };