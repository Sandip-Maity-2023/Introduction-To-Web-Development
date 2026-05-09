import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Replace getAuth with these two for Persistence
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCgOKP-abGsboZjlvGFoJeNV-hJ0rldWw8",
  authDomain: "eyescanapp-b90df.firebaseapp.com",
  projectId: "eyescanapp-b90df",
  storageBucket: "eyescanapp-b90df.appspot.com",
  messagingSenderId: "728433674254",
  appId: "1:728433674254:web:800d4e85ecd3c1e9fe945f"
};

// Initialize Firebase (Singleton pattern to prevent multiple app instances)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// FIXED: Initialize Auth with Persistence to stop the "Memory Persistence" warning
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Export Services
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;