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
    return new Promise(async (resolve, reject) => {
      try {
        event.preventDefault();
        setLoading(true);

        const response = await signup(formData);

        const { token, userId } = response.data; // Adjust the response structure

        if (userId) {
          sessionStorage.setItem("userId", userId);

          navigate("/");
          resolve(response); // Resolve with the response
        } else {
          navigate("/login");
          reject(new Error("User ID not available")); // Reject with an error
        }
      } catch (error) {
        console.log("Signup failed:", error);
        reject(error); // Reject with the error
      } finally {
        setLoading(false);
      }
    });
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
