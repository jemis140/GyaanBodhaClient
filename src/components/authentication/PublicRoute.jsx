import React from "react";
import { Route, Navigate } from "react-router-dom";

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Navigate to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
