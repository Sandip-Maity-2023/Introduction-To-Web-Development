// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // SignInGoogle.jsx
// import  GoogleAuthProvider  from "./Firebase";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBtZmiiNXkkyx13bNXBlY6tgAJRduITskM",
//   authDomain: "login-auth-b193f.firebaseapp.com",
//   projectId: "login-auth-b193f",
//   storageBucket: "login-auth-b193f.firebasestorage.app",
//   messagingSenderId: "613634565446",
//   appId: "1:613634565446:web:20c3eaa6ce4cf3e68eb147"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();
// export const db=getFirestore(app);
// export default app;


// Firebase.jsx

import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";
import { getFirestore, doc, setDoc } from "firebase/firestore";




import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtZmiiNXkkyx13bNXBlY6tgAJRduITskM",
  authDomain: "login-auth-b193f.firebaseapp.com",
  projectId: "login-auth-b193f",
  storageBucket: "login-auth-b193f.firebasestorage.app",
  messagingSenderId: "613634565446",
  appId: "1:613634565446:web:20c3eaa6ce4cf3e68eb147",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize services
// const auth = getAuth(app);
// //const googleProvider = new GoogleAuthProvider();
// const db = getFirestore(app);

// // EXPORTS (use these in your other components)
// export { auth,db };
// export default app;

const googleProvider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db,googleProvider };
//export const googleProvider = new GoogleAuthProvider();
