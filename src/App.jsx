import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage"; // Import the LoginPage component
import SignupPage from "./pages/SignUpPage"; // Import the SignupPage component
import Homepage from "./pages/Hompage";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./components/authentication/ResetPassword";
import store from "./store/store";
import NotebookTabs from "./features/notebook/components/DashboardNotebook";
import NotebookPage from "./pages/NotebookPage";

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
