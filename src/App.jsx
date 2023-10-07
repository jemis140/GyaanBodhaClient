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

function App() {
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
