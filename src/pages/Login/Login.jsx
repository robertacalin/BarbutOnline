import React from "react";
import { useAuth } from "reactfire";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";
import { setUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import RollDice from "../../components/RollDice";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const provider = new GoogleAuthProvider();

  const user = useSelector((state) => state.user);

  console.log(user);

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
    </div>
  );
};

export default Login;
