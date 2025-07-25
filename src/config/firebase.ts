import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDjO_Z_J3zQ2s3sJ9X8v9Y7U6T5R4Q3P2M",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "workingholiday-calculator.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "workingholiday-calculator",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "workingholiday-calculator.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "689057463738",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:689057463738:web:d294dedcc354565c2ef183",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Google OAuth Provider 설정
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app; 