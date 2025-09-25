import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

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

const dataPath = path.join(process.cwd(), 'data', 'product-images.json');
const raw = fs.readFileSync(dataPath, 'utf8');
const images = JSON.parse(raw);

async function run() {
  console.log('Updating images for', images.length, 'products in Firestore project', cfg.projectId);
  for (const p of images) {
    const ref = doc(db, 'products', p.id);
    await updateDoc(ref, {
      imageUrl: p.imageUrl,
      galleryImages: p.galleryImages || []
    });
    console.log('Updated images for', p.id);
  }
  console.log('Done');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
