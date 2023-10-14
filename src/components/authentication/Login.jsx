import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Input, Button, Checkbox, Spin } from "antd";
import { signIn } from "./api/authenticationAPI";
import Spinner from "../common/general/Spinner";
import {
  startSessionTimer,
  resetSessionTimer,
} from "../../session/sessionManager";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Change to false initially
  const [formData, setFormData] = useState({
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

        const response = await signIn(formData);

        const { token, userId } = response.data; // Adjust the response structure

        console.log("token login", token);
        console.log("UserID login", userId);

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);

        if (token) {
          navigate("/");
          resolve(token); // Resolve with the token
        }
      } catch (error) {
        console.log("Login failed:", error);
        reject(error); // Reject with the error
      } finally {
        setLoading(false);
      }
    });
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
        <div>{loading ? <Spinner /> : <></>}</div>
        <div style={{ marginTop: "10px" }}>
          <Link to="/reset">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
