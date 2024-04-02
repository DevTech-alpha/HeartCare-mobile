import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const firebaseConfig = {
  apiKey: "AIzaSyA60mLwi2WUY7yHFgt7eD3d2ITjlIwho04",
  authDomain: "fir-auth-9f9f7.firebaseapp.com",
  projectId: "fir-auth-9f9f7",
  storageBucket: "fir-auth-9f9f7.appspot.com",
  messagingSenderId: "800989360011",
  appId: "1:800989360011:web:047a109957e4b50522898e",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { db, auth };
