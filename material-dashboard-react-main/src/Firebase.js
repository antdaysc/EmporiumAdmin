// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFQNgt47KV_LMnKJGe2UA0qYQrJCOr4ro",
  authDomain: "emporium-c8fc5.firebaseapp.com",
  databaseURL: "https://emporium-c8fc5-default-rtdb.firebaseio.com",
  projectId: "emporium-c8fc5",
  storageBucket: "emporium-c8fc5.appspot.com",
  messagingSenderId: "105787822368",
  appId: "1:105787822368:web:1fe1e93031eae40b570745",
  measurementId: "G-38BHTGCQDD",
};

// Initialize Firebase
function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

initFirebase();

const firedb = firebase.firestore();
const realdb = firebase.database();
export default { firebase, firedb, realdb };
