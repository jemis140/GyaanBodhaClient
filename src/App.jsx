import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth"; // Import auth from your firebase configuration
import { Provider } from "react-redux";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/Hompage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./components/authentication/ResetPassword";
import store from "./store/store";
import PrivateRoute from "./utils/PrivateRoute";

import { startSessionTimer, resetSessionTimer } from "./session/sessionManager";

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            {/* Redirect to login if not authenticated */}
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
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
