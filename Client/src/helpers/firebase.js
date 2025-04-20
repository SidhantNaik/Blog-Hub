// Import the functions you need from the SDKs you
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "blog-hub-2b261.firebaseapp.com",
  projectId: "blog-hub-2b261",
  storageBucket: "blog-hub-2b261.firebasestorage.app",
  messagingSenderId: "158537664053",
  appId: "1:158537664053:web:04a7c6e8b35b93422cd37c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
