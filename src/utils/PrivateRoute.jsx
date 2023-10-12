import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged from firebase/auth
import { auth } from "../firebase"; // Import your Firebase auth instance

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // useEffect(() => {
  //   // Check Firebase authentication state
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is not logged in, redirect to login page
  //       navigate("/");
  //     }
  //   });

  //   // Cleanup the subscription when the component is unmounted
  //   return () => unsubscribe();
  // }, [navigate]);

  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
