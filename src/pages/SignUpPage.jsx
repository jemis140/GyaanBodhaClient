// SignupPage.js
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SignUp from "../components/authentication/SignUp"; // Import the SignUp component
import { Row, Col } from "antd";

export default function SignupPage() {
  return (
    <div container>
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
            <SignUp />
          </div>
        </Col>
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
              src="/eye_of_ra.png" // Adjust the path to your logo image as needed
              alt="My Logo"
              style={{
                height: "555px", // Set the maximum height to 100% for equal height
                width: "444px",
                borderRadius: "5%", // Allow the width to adjust proportionally
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
