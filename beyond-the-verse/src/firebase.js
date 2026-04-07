import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging"; // 🌟 NAYA: Messaging Import

const firebaseConfig = {
  apiKey: "AIzaSyAcJgkQWpIW4dpgS_2NAJ4wotLsk3RQV5o",
  authDomain: "donation-app-25cac.firebaseapp.com",
  projectId: "donation-app-25cac",
  storageBucket: "donation-app-25cac.firebasestorage.app",
  messagingSenderId: "523938237581",
  appId: "1:523938237581:web:5fe504c83db2af679da6c4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app); // 🌟 NAYA: Messaging Export
