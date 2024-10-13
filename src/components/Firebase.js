// Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnuUHol_YC5Uz8oPHQQCWIWD-DXEMrkMo",
  authDomain: "project1-8f739.firebaseapp.com",
  projectId: "project1-8f739",
  storageBucket: "project1-8f739.appspot.com",
  messagingSenderId: "994535052094",
  appId: "1:994535052094:web:5b44d8afa51ed55c00526f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
