import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbRhUc2LGmgH05WnDHoyu3UCghMkLyBFA",
  authDomain: "vitrine-4net.firebaseapp.com",
  projectId: "vitrine-4net",
  storageBucket: "vitrine-4net.appspot.com",
  messagingSenderId: "1038176322281",
  appId: "1:1038176322281:web:8c142e2f2fe290124e2678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth Module
import { getAuth } from "firebase/auth";
export const storage = getStorage(app);
export const db = getFirestore(app);

