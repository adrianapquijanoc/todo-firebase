// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAys82cr-iLv8nLAtq_f1PVvBGIkfug81k",
  authDomain: "todo-list-bf432.firebaseapp.com",
  projectId: "todo-list-bf432",
  storageBucket: "todo-list-bf432.firebasestorage.app",
  messagingSenderId: "350455958141",
  appId: "1:350455958141:web:f37330a43436cbd6147f14",
  measurementId: "G-LEN0REWSP4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
