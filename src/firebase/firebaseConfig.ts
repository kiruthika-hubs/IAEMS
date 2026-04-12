import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAapnZPDwJPd3uVoqC0Km49dE8pxjeBcFc",
  authDomain: "iaems-ff0b7.firebaseapp.com",
  projectId: "iaems-ff0b7",
  storageBucket: "iaems-ff0b7.firebasestorage.app",
  messagingSenderId: "240416600483",
  appId: "1:240416600483:web:f8fce958a71e933ba3ea16",
  measurementId: "G-7K8D0BGZEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
