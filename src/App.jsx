import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./components/authentication/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import store from "./store/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check localStorage for authentication state
    const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (storedUser) {
      setCurrentUser(storedUser);
    }

    // Firebase authentication listener to update the currentUser state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user)); // Store user in localStorage
        const uid = user.uid;
        // ...
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser"); // Remove user from localStorage on logout
        // User is signed out
        // ...
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
