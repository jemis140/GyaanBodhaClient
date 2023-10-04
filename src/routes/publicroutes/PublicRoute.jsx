import React from "react";
import { Route, Navigate } from "react-router-dom";
import { auth } from "../../firebase";

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!auth.currentUser;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default PublicRoute;
