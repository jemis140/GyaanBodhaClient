import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Row, Col } from "antd";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Login from "../components/authentication/Login"; // Import the Login component

export default function LoginPage() {
  return (
    <div>
      {/* Login and logo container */}
      <Row gutter={16} justify="center" style={{ margin: "50px" }}>
        {/* Login column */}
        <Col xs={24} md={12} lg={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh", // Reduced the minHeight to bring components closer
            }}
          >
            <Login />
          </div>
        </Col>
        {/* Logo column */}
        <Col xs={24} md={12} lg={12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "80vh", // Reduced the minHeight to match the login container
            }}
          >
            <img
              src="/thoth_logo.png" // Adjust the path to your logo image as needed
              alt="My Logo"
              style={{
                height: "550px", // Set the maximum height to 100% for equal height
                width: "330px",
                borderRadius: "5%", // Allow the width to adjust proportionally
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
