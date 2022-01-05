import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { FirebaseAppProvider } from "reactfire";

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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
