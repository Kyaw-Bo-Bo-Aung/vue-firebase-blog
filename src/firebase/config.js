// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPDlB5hJsStZpLUuO5H1dqb7OY9KBfYdE",
  authDomain: "vue-firebase-blog-51b22.firebaseapp.com",
  projectId: "vue-firebase-blog-51b22",
  storageBucket: "vue-firebase-blog-51b22.appspot.com",
  messagingSenderId: "776497626141",
  appId: "1:776497626141:web:2b8630ef1e2477bae25af4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };