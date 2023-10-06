import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button, Checkbox } from "antd";
import { signIn } from "./api/authenticationAPI";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      // Check if the user is already logged in
      const jwtToken = localStorage.getItem("jwtToken");
      if (jwtToken) {
        navigate("/"); // Redirect to homepage if already logged in
      } else {
        setLoading(false); // Set loading to false after authentication check
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await signIn(formData);

      // Store JWT token in localStorage
      localStorage.setItem("jwtToken", token);

      // Navigate to the homepage after successful login
      if (token) {
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Title level={2}>Sign In</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <Checkbox style={{ marginBottom: "10px" }}>Remember me</Checkbox>
        <Button type="primary" htmlType="submit" block>
          Sign In
        </Button>
        <div style={{ marginTop: "10px" }}>
          <Link to="/reset">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
