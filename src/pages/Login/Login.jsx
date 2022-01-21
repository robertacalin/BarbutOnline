import React from "react";
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import "./Login.css";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Login = () => {
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleGuest = () => {
    signInAnonymously(auth).then((result) => {
      dispatch(
        setUser({
          uid: result.user.uid,
          displayName: `guest${Math.floor(Math.random() * 100)}`,
        })
      );
    });
  };

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      dispatch(
        setUser({ uid: result.user.uid, displayName: result.user.displayName })
      );
    });
  };

  return (
    <div className="text_div center_all">
      <h1>Login</h1>
      <button className="sign" onClick={handleLoginWithGoogle}>
        <b>Sign in with Google</b>
      </button>
      <button className="sign" onClick={handleGuest}>
        <b>Play as Guest</b>
      </button>
    </div>
  );
};

export default Login;
