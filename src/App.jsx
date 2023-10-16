import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/HomPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./components/authentication/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import store from "./store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // Firebase authentication listener to update the currentUser state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(currentUser);
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // Redirect to login page
  //     navigate("/login");
  //     // Clear session storage
  //   }, 3600000); // 1 hour

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
