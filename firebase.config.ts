import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApmzcdCFl1kCOFQNKDLCq-RVMTwpJZqis",
  authDomain: "my-wedding-e0712.firebaseapp.com",
  projectId: "my-wedding-e0712",
  storageBucket: "my-wedding-e0712.firebasestorage.app",
  messagingSenderId: "247328417163",
  appId: "1:247328417163:web:e451dc1ff261e3517cfb8e",
  measurementId: "G-M07RKNX6TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
