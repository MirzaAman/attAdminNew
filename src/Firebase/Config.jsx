import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD7Q57qEC6n_-oj1-Xgf0uBxgJDsGeMM1s",
    authDomain: "khss-847c0.firebaseapp.com",
    projectId: "khss-847c0",
    storageBucket: "khss-847c0.appspot.com",
    messagingSenderId: "1025128650081",
    appId: "1:1025128650081:web:9d88e34bbba69586472120",
    measurementId: "G-QCXH6P5S3E"
  };


const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);