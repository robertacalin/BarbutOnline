import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase v9+
import { getDatabase } from "firebase/database"; // Firebase v9+\
import {
  FirebaseAppProvider,
  DatabaseProvider,
  AuthProvider,
  useFirebaseApp,
} from "reactfire";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Room from "./pages/Room/Room";
import Game from "./pages/Game/Game";
import { useSelector } from "react-redux";
import { useState } from "react";
function App() {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <Routes>
          <Route
            path="/"
            exact
            element={currentUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
