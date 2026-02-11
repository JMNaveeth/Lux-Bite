import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEuzNJF9pCZS6mJ_8CVJqcYc3s3rUH37U",
  authDomain: "luxe-bite-f78dc.firebaseapp.com",
  projectId: "luxe-bite-f78dc",
  storageBucket: "luxe-bite-f78dc.firebasestorage.app",
  messagingSenderId: "760014612625",
  appId: "1:760014612625:web:2a5f26c505375d2789b730"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics (optional, only in production)
let analytics;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
