// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHau-pEZGaxDVRmWs15T-j_eQqQ9qIYDc",
  authDomain: "laundrydash-24d57.firebaseapp.com",
  projectId: "laundrydash-24d57",
  storageBucket: "laundrydash-24d57.firebasestorage.app",
  messagingSenderId: "67338130204",
  appId: "1:67338130204:web:c4e35b36eec0dc256160d9",
  measurementId: "G-62EMSF4812"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
