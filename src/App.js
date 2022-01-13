import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { getDatabase } from "firebase/database"; // Firebase v9+
import {
  FirebaseAppProvider,
  DatabaseProvider,
  AuthProvider,
  useFirebaseApp,
} from "reactfire";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Room from "./pages/Room/Room";
function App() {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  const auth = getAuth(app);
  const rooms = [];
  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/room/:{id}" element={<Room />} />
          {/* NU MERGE ID UL ASTA*/}
        </Routes>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
