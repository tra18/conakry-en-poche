import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "conakry-en-poche.firebaseapp.com",
  projectId: "conakry-en-poche",
  storageBucket: "conakry-en-poche.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser les services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;


