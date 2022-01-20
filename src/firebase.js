import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXXyggd637paLg3fMsdgb1llHkYMULSiY",
  authDomain: "barbut-online.firebaseapp.com",
  databaseURL:
    "https://barbut-online-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "barbut-online",
  storageBucket: "barbut-online.appspot.com",
  messagingSenderId: "820022965249",
  appId: "1:820022965249:web:8a629a6b03ea87e8773c00",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
