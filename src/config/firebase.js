// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx3Vzl9YAeJLY2V4U_RCDlyhItl-R-gxo",
  authDomain: "fantasy-league-18d3d.firebaseapp.com",
  projectId: "fantasy-league-18d3d",
  storageBucket: "fantasy-league-18d3d.appspot.com",
  messagingSenderId: "411464412815",
  appId: "1:411464412815:web:1ce6db0fb2427873090afa",
  measurementId: "G-MJRDW1XSVT"
};

 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;