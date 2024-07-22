// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';



const firebaseConfig = {
  apiKey: "AIzaSyDjs7XgkSiRwzfNTMDE1F8KmKIiWqIY1Q8",
  authDomain: "inacap-bank.firebaseapp.com",
  projectId: "inacap-bank",
  storageBucket: "inacap-bank.appspot.com",
  messagingSenderId: "219380029824",
  appId: "1:219380029824:web:dbc7059079cad314a10965"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export default auth;