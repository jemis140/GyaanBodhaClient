import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user); // Update isAuthenticated based on user authentication
    });

    return () => unsubscribe();
  }, []);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
