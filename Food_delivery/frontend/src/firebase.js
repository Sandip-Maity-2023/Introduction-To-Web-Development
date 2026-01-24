// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "food-delivery-754f6.firebaseapp.com",
  projectId: "food-delivery-754f6",
  storageBucket: "food-delivery-754f6.firebasestorage.app",
  messagingSenderId: "471172979993",
  appId: "1:471172979993:web:fe7b4f53d06e06f940b988",
  measurementId: "G-EN1G5NYB0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
export {app,auth};
