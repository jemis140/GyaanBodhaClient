import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";

const PrivateRoute = () => {
  const isAuthenticated = true; // auth.currentUser;
  console.log("isAuthenticated");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
