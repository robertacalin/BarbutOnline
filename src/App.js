import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Room from "./pages/Room/Room";
import { useSelector } from "react-redux";
import AuthGuard from "./components/AuthGuard";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/room/:id", component: <Room /> },
];

function App() {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      {routes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={<AuthGuard>{component}</AuthGuard>}
        />
      ))}
      <Route
        path="/login"
        element={!user.logged ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
