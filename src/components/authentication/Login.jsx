import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button, Checkbox, Typography, Row, Col } from "antd";
import { signIn } from "./api/authenticationAPI";
import Spinner from "../common/general/Spinner";
import { UserOutlined } from "@ant-design/icons";
import {
  startSessionTimer,
  resetSessionTimer,
} from "../../session/sessionManager";

import GradientButton from "../../components/common/general/Button";
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

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await signIn(formData);
      const { token, userId } = response.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error and set an appropriate error message
      setErrorMessage("Incorrect email or password");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title
          style={{
            background: `linear-gradient(to right, #9C27B0, #FF9800)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {" "}
          Gyaan Bodhi
        </Title>
      </Row>
      <Title level={2}>Sign In</Title>
      <form onSubmit={handleSubmit}>
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
        <Checkbox style={{ marginBottom: "10px" }}>Remember me</Checkbox>
        <button
          width="100%"
          height="50px"
          style={buttonStyle}
          onClick={handleSubmit}
          htmlType="submit"
        >
          Sign In
        </button>

        <div>{loading ? <Spinner /> : <></>}</div>
        <div style={{ marginTop: "10px" }}>
          <Link to="/reset">Forgot Password?</Link>
        </div>
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}
      </form>
      <Typography variant="body2" align="center">
        Don't have an account?{" "}
        <Link
          to="/signup"
          color="primary"
          style={{ marginBottom: "10px", height: "45px" }}
        >
          Sign up
        </Link>
      </Typography>
    </div>
  );
};

export default Login;
