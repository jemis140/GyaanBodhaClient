import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";

const PrivateRoute = ({ element: Element, redirectTo, ...rest }) => {
  const isAuthenticated = auth.currentUser !== null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
