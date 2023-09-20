import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { sendPasswordResetEmail } from "firebase/auth";
import { getAuth } from "firebase/auth";
const defaultTheme = createTheme();

function ResetPassword() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
      console.log("Reset password email sent to:", email);
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(e) => e.preventDefault()}
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleResetPassword}
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Link to="/login" variant="body2">
              Return to login
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ResetPassword;
