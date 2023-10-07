import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button, Checkbox, Spin } from "antd";
import { signup } from "./api/authenticationAPI";

const { Title } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Change to false initially

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true while submitting

    try {
      const { userId, token } = await signup(formData);

      // Store the token and user ID in local storage
      localStorage.setItem("token", token);
      if (token) {
        navigate("/");
      }
      // Redirect to the homepage after successful signup
    } catch (error) {
      console.log("Signup failed:", error);
    } finally {
      setLoading(false); // Set loading back to false after signup attempt
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Title level={2}>Sign Up</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={{ marginBottom: "10px" }}
        />
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
        <Checkbox style={{ marginBottom: "10px" }}>
          I want to receive updates via email.
        </Checkbox>
        <Button type="primary" htmlType="submit" block>
          {loading ? <Spin /> : "Sign Up"}
        </Button>
      </form>
      <div style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
