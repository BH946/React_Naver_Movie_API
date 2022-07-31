// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB69KUjBlcQLmypRKfbq887vh81ss1T90w",
  authDomain: "shop-cb124.firebaseapp.com",
  projectId: "shop-cb124",
  storageBucket: "shop-cb124.appspot.com",
  messagingSenderId: "1001307808403",
  appId: "1:1001307808403:web:d1d9c7057946c4991e6366",
  measurementId: "G-5VN7J7NKDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;