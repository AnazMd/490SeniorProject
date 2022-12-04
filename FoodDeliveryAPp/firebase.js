// Import the functions you need from the SDKs you need
import {initializeApp,getApp }from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5fxD6-Ej4Bo_cjwj7uYGTYf497ZKoo4M",
  authDomain: "meal-plan-app-59653.firebaseapp.com",
  projectId: "meal-plan-app-59653",
  storageBucket: "meal-plan-app-59653.appspot.com",
  messagingSenderId: "425423528663",
  appId: "1:425423528663:web:64a0efd1e3a287fdc68692"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
