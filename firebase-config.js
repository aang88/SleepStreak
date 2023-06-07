// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF3pzjIdfn4Hu7SylLll6hwvuNTtLU-aY",
  authDomain: "sleepstreak-3c65a.firebaseapp.com",
  projectId: "sleepstreak-3c65a",
  storageBucket: "sleepstreak-3c65a.appspot.com",
  messagingSenderId: "879469734948",
  appId: "1:879469734948:web:8fe8958430df4e3d5c7cb1",
  measurementId: "G-5NTNZTLPX4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };