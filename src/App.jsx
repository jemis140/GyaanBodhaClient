import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"; // Import auth from your firebase configuration
import { Provider } from "react-redux";
import SignupPage from "./pages/SignUpPage";
import Homepage from "./pages/Hompage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./components/authentication/ResetPassword";
import store from "./store/store";

import {
  startSessionTimer,
  resetSessionTimer,
  clearSessionTimer,
} from "./session/sessionManager";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
    });

    startSessionTimer();

    // Attach event listener for user activity
    document.addEventListener("mousemove", resetSessionTimer);
    document.addEventListener("keydown", resetSessionTimer);

    return () => {
      // Clean up event listeners when the component unmounts
      clearSessionTimer();
      document.removeEventListener("mousemove", resetSessionTimer);
      document.removeEventListener("keydown", resetSessionTimer);
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            {/* Redirect to login if not authenticated */}
            <Route
              path="/dashboard"
              element={
                auth.currentUser ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={
                auth.currentUser ? <Homepage /> : <Navigate to="/login" />
              }
            />
            {/* Other routes */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
