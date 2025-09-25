import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Read firebase config from env (allow both VITE_ prefix or plain env for scripts)
const cfg = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID
};

if (!cfg.projectId) {
  console.error('Firebase config missing. Set env vars first (see .env.local.example)');
  process.exit(1);
}

const app = initializeApp(cfg);
const db = getFirestore(app);

const dataPath = path.join(process.cwd(), 'data', 'products.example.json');
const raw = fs.readFileSync(dataPath, 'utf8');
const products = JSON.parse(raw);

async function run() {
  console.log('Seeding', products.length, 'products into Firestore project', cfg.projectId);
  for (const p of products) {
    const col = collection(db, 'products');
    const docRef = await addDoc(col, p);
    console.log('Added', docRef.id);
  }
  console.log('Done');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
