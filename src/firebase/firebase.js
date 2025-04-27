// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBALAyJziosquPnc_PcDo7F3NuaCYWACDQ",
  authDomain: "pucprjoycelemos.firebaseapp.com",
  projectId: "pucprjoycelemos",
  storageBucket: "pucprjoycelemos.firebasestorage.app",
  messagingSenderId: "1060517393018",
  appId: "1:1060517393018:web:ed752f9fa29bc3347f41c3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
