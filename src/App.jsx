import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import HomePage from "./pages/Hompage";
import ResetPassword from "./components/authentication/ResetPassword";
import store from "./store/store";
import PrivateRoute from "./routes/privateroutes/PrivateRoute";
import NotebookPage from "./pages/NotebookPage";
// Update with correct path
import { auth } from "./firebase";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/reset" element={<ResetPassword />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<HomePage />} />
        </Route>
        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<NotebookPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
