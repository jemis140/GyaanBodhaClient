import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button, Checkbox } from "antd";
import { signup } from "./api/authenticationAPI";

const { Title } = Typography;

const SignUp = () => {
  const navigate = useNavigate();

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

    try {
      const { userId, token } = await signup(formData);

      // Store the token and user ID in local storage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);

      // Redirect to the homepage after successful signup
      if (userId) {
        navigate("/");
      }
    } catch (error) {
      console.log("Signup failed:", error);
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
          Sign Up
        </Button>
      </form>
      <div style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
