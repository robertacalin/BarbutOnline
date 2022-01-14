import React from "react";
import { useAuth } from "reactfire";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./Login.css";
// import RollDice from "../../components/RollDice";

const Login = () => {
  const auth = useAuth();
  const provider = new GoogleAuthProvider();

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) =>
      console.log(result.user)
    );
  };

  return (
      <div className="text_div center_all">
        {/* <div>
          <RollDice />
        </div> */}
        <h1>Login</h1>
        <button className="sign" onClick={handleLoginWithGoogle}><b>Sign in with Google</b></button>
      </div>
  );
};

export default Login;
