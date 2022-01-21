import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (user.logged) return children;

  return <Navigate to="/login" />;
};

export default AuthGuard;
