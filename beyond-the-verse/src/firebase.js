import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage"; // 🌟 NAYA: Storage Import

const firebaseConfig = {
  apiKey: "AIzaSyAcJgkQWpIW4dpgS_2NAJ4wotLsk3RQV5o",
  authDomain: "donation-app-25cac.firebaseapp.com",
  projectId: "donation-app-25cac",
  storageBucket: "donation-app-25cac.firebasestorage.app", // 🌟 Firebase Storage yahan upload karega
  messagingSenderId: "523938237581",
  appId: "1:523938237581:web:5fe504c83db2af679da6c4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app); // 🌟 NAYA: Storage Export