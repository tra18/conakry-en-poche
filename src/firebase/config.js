import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
// Pour utiliser les vraies clés, créez un fichier .env.local avec :
// REACT_APP_FIREBASE_API_KEY=votre_cle_api
// REACT_APP_FIREBASE_AUTH_DOMAIN=ckry-f7bd7.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID=ckry-f7bd7
// REACT_APP_FIREBASE_STORAGE_BUCKET=ckry-f7bd7.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
// REACT_APP_FIREBASE_APP_ID=votre_app_id

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAQSLJwBa3VNAPaw6kCfS1s2fUZR_x4rKs",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "ckry-f7bd7.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "ckry-f7bd7",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "ckry-f7bd7.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "810312486991",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:810312486991:web:006686bfbed55cc3e45a3a"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;




