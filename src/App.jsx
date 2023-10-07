import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuthContext } from "firebase/auth";
import { Provider } from "react-redux";
import SignupPage from "./pages/SignUpPage"; // Import the SignupPage component
import Homepage from "./pages/Hompage";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./components/authentication/ResetPassword";
import store from "./store/store";
import NotebookPage from "./pages/NotebookPage";
import { getCurrentUser } from "./components/authentication/api/authenticationAPI";
import LoginPage from "./pages/LoginPage";
import {
  startSessionTimer,
  resetSessionTimer,
  clearSessionTimer,
} from "./session/sessionManager";

function App() {
  useEffect(() => {
    startSessionTimer();

    // Attach event listener for user activity
    document.addEventListener("mousemove", resetSessionTimer);
    document.addEventListener("keydown", resetSessionTimer);

    return () => {
      // Clean up event listeners when the component unmounts
      clearSessionTimer();
      document.removeEventListener("mousemove", resetSessionTimer);
      document.removeEventListener("keydown", resetSessionTimer);
    };
  }, []);

  return (
    <Provider store={store}>
      <div>
        {/* Define your other routes here */}
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<NotebookPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
