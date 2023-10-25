import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "antd";
import { signup } from "./api/authenticationAPI";
import Spinner from "../common/general/Spinner";
const { Title } = Typography;

const buttonStyle = {
  fontSize: "14px",
  width: "100%", // Adjust the width if needed
  height: "33px", // Set the desired height
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  transition: "0.2s",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "5px",
  background: "linear-gradient(to right, #4d2882, #b74400)",
  color: "#fff",
};

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
        setLoading(true);
        event.preventDefault();
        setLoading(true);

        const response = await signup(formData);

        const { token, userId } = response.data; // Adjust the response structure

        if (userId) {
          localStorage.setItem("userId", userId);

          navigate("/");
          resolve(response);
          setLoading(false); // Resolve with the response
        } else {
          navigate("/login");
          reject(new Error("User ID not available"));
          setLoading(false); // Reject with an error
        }
      } catch (error) {
        console.log("Signup failed:", error);
        reject(error); // Reject with the error
      } finally {
        setLoading(false);
      }
    });
  };

  const inputStyle = { marginBottom: "10px" }; // Added marginBottom style

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <Title
          style={{
            background: `linear-gradient(to right, #9C27B0, #FF9800)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Gyaan Bodhi
        </Title>
      </div>

      <Title level={2}>Sign Up</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={{ marginBottom: "10px", height: "45px" }}
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={{ marginBottom: "10px", height: "45px" }}
        />
        <Input
          type="text"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: "10px", height: "45px" }}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginBottom: "10px", height: "45px" }}
        />
        <Button
          type="primary"
          style={buttonStyle}
          onClick={handleSubmit}
          htmlType="submit"
        >
          Sign Up
        </Button>
        {loading && <Spinner />}
      </form>
      <div style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
