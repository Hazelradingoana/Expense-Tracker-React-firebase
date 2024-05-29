// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-gdFsvOf3HfQkKsRAQpbvywXy-plwv3Y",
  authDomain: "expense-tracker-a5225.firebaseapp.com",
  projectId: "expense-tracker-a5225",
  storageBucket: "expense-tracker-a5225.appspot.com",
  messagingSenderId: "602620695691",
  appId: "1:602620695691:web:211884bd076effcf4a308e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy