import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAs6Rb-5DSdF12T9-nhwGD1qg4ZJkZmRn0",
  authDomain: "blood-connect-5bc1b.firebaseapp.com",
  projectId: "blood-connect-5bc1b",
  storageBucket: "blood-connect-5bc1b.firebasestorage.app",
  messagingSenderId: "98638978930",
  appId: "1:98638978930:web:6e64ca571bf7978915c7eb",
  measurementId: "G-2QK04832J1"
};


const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
export const db = getFirestore(app)