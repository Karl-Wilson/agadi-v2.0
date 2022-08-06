
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBBcMCzZevDFjoA9iHz0cYF6PiHU93bPIc",
  authDomain: "agadi-app2.firebaseapp.com",
  projectId: "agadi-app2",
  storageBucket: "agadi-app2.appspot.com",
  messagingSenderId: "47459980188",
  appId: "1:47459980188:web:20fb13e30f99e815cb6e59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;