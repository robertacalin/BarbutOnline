import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { getAuth } from "firebase/auth"; // Firebase v9+
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
function App() {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  const auth = getAuth(app);
  const user = useSelector((state) => state.user);
  console.log(Boolean(auth.currentUser));

  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <Routes>
          <Route
            path="/"
            exact
            element={auth.currentUser ? <Home /> : <Home />}
          />
          <Route
            path="/login"
            element={!auth.currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
