import React from "react";
import { useAuth } from "reactfire";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const auth = useAuth();
  const provider = new GoogleAuthProvider();

  const handleLoginWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) =>
      console.log(result.user)
    );
  };

  return (
    <div>
      <h2>Login </h2>
      <button onClick={handleLoginWithGoogle}>SIGN IN WITH GOOGLE</button>
    </div>
  );
};

export default Login;
