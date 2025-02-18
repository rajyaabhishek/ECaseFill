import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAet-l9pxuk_eSx8sSlosQ7X2_7TqCfLM",
  authDomain: "efill-42a3d.firebaseapp.com",
  projectId: "efill-42a3d",
  storageBucket: "efill-42a3d.firebasestorage.app",
  messagingSenderId: "843894310828",
  appId: "1:843894310828:web:cd238888b35d6fe3c31c09",
  measurementId: "G-V01F752XMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 