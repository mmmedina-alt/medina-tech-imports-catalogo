// Import the functions you need from the SDKs you need
// We initialize Firebase lazily to keep the initial bundle small.
// Call `await getFirebase()` to get `{ app, db, storage }`.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

if (!firebaseConfig.apiKey) {
  console.warn('[firebaseConfig] Firebase config not set. Set VITE_FIREBASE_* env vars (see .env.local.example)');
}

let cached: { app: any; db: any; storage: any } | null = null;

export async function getFirebase() {
  if (cached) return cached;

  const { initializeApp } = await import('firebase/app');
  const { getFirestore } = await import('firebase/firestore');
  const { getStorage } = await import('firebase/storage');

  const app = initializeApp(firebaseConfig as any);
  const db = getFirestore(app);
  const storage = getStorage(app);

  cached = { app, db, storage };
  return cached;
}

export function _resetFirebaseForTests() {
  cached = null;
}