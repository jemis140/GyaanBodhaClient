// LoginPage.js
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Login from "../components/authentication/Login"; // Import the Login component

export default function LoginPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Login />
        <Typography variant="body2" align="center">
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup" color="primary">
            Sign up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
