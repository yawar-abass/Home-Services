// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "login-9c0eb.firebaseapp.com",
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: "login-9c0eb",
  storageBucket: "login-9c0eb.appspot.com",
  messagingSenderId: "743345924157",
  appId: "1:743345924157:web:4116b17ec7c0b8344ae254",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const database = getDatabase(app);
const usersDb = getFirestore(app);
const storage = getStorage(app);
// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

export { auth, usersDb, database, storage };
