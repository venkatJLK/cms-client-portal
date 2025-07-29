import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUBp0nw6hQMZvfg7_NZibmzdkQXkTpGzY",
  authDomain: "medlyves-dev.firebaseapp.com",
  databaseURL: "https://medlyves-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "medlyves-dev",
  storageBucket: "medlyves-dev.firebasestorage.app",
  messagingSenderId: "836842550665",
  appId: "1:836842550665:web:07707fdea28b3600869d58"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
