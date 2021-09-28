import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = {
  apiKey: "AIzaSyDpwLEb-lAnj-ziCZtpmFXFrxqIvGmjgWI",
  authDomain: "chatapp-1a174.firebaseapp.com",
  projectId: "chatapp-1a174",
  storageBucket: "chatapp-1a174.appspot.com",
  messagingSenderId: "130374866120",
  appId: "1:130374866120:web:5ff322948df551b1a781fd",
  measurementId: "G-CESFKF3K7P",
};

const app = firebase.initializeApp(firebaseApp);

const db = app.firestore();

const auth = firebase.auth();

export { db, auth };
