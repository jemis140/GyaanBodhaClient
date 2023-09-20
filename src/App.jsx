import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage"; // Import the LoginPage component
import SignupPage from "./pages/SignUpPage"; // Import the SignupPage component
import Homepage from "./pages/Hompage";
import ResetPassword from "./components/authentication/ResetPassword";
import store from "./store/store";

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
            <Route path="/dashboard" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
