import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingScreen />;
  } else if (!isAuthenticated) {
    return <Navigate to="login" replace state={{ from: location }} />;
  }
  console.log("test");
  return children;
}

export default AuthRequire;
