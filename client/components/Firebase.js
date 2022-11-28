// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3Dw8unyYf77dHhG6RLn20OZld2iZn_ec",
  authDomain: "funderr-185f5.firebaseapp.com",
  projectId: "funderr-185f5",
  storageBucket: "funderr-185f5.appspot.com",
  messagingSenderId: "367711831296",
  appId: "1:367711831296:web:1e4f5a91fcf6be85a49fe5",
  measurementId: "G-S32E080ECF",
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export { auth };
