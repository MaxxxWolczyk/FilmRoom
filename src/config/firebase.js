// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaA7hj-qtJRw6tI2VEXV_X-b-hwOkVdrg",
  authDomain: "filmroom-7ba90.firebaseapp.com",
  projectId: "filmroom-7ba90",
  storageBucket: "filmroom-7ba90.appspot.com",
  messagingSenderId: "513407330620",
  appId: "1:513407330620:web:40ab1d9b440b214d8fd639",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

export const auth = getAuth();
