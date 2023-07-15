import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8MPd3Axf9jYNBS3my3Hx9RzUqnF4PWqA",
  authDomain: "entertainment-web-app-ab7c4.firebaseapp.com",
  projectId: "entertainment-web-app-ab7c4",
  storageBucket: "entertainment-web-app-ab7c4.appspot.com",
  messagingSenderId: "487812234342",
  appId: "1:487812234342:web:27ccaf4a0c63606a1181a7",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
