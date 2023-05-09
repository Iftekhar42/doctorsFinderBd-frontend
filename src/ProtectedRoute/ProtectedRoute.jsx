import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import auth from "../Firebase/Firebase.init";
const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);

  const persentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(persentUser.user.email);

  if (!persentUser?.user?.email) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
