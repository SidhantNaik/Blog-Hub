// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEnv } from './getEnv';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "blog-hub-1.firebaseapp.com",
  projectId: "blog-hub-1",
  storageBucket: "blog-hub-1.firebasestorage.app",
  messagingSenderId: "475784972305",
  appId: "1:475784972305:web:9e70c5d0b937583adac9b0",
  measurementId: "G-BRKC0TB87J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}