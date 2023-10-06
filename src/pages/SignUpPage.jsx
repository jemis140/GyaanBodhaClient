// SignupPage.js
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SignUp from "../components/authentication/SignUp"; // Import the SignUp component

export default function SignupPage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SignUp />
      </Grid>
    </Grid>
  );
}
