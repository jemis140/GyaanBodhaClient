import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithGoogle,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { sendPasswordResetEmail } from "firebase/auth";

const defaultTheme = createTheme();

function Login({ signin }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

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

  const handleGoogleSignIn = async ({ auth }) => {
    try {
      const auth = getAuth();
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      await auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(async (userCredential) => {
          try {
            const user = userCredential.user;
            console.log("toke", token);
            const querySnapshot = await getDocs(
              query(collection(db, "users"), where("uid", "==", user.uid))
            );

            if (querySnapshot.empty) {
              await addDoc(collection(db, "users"), {
                uid: user.uid,
                firstName: user.displayName,
                authProvider: "google",
                email: user.email,
              });
            }
          } catch (error) {
            console.error("Error signing in with Google:", error.message);
          }
        })
        .catch(function (error) {
          // An error happened.
          if (error.code === "auth/account-exists-with-different-credential") {
            var pendingCred = error.credential;
            // The provider account's email address.
            var email = error.email;
            // Get sign-in methods for this email.
            auth.fetchSignInMethodsForEmail(email).then(function (methods) {
              if (methods[0] === "password") {
                // Asks the user their password.
                // In real scenario, you should handle this asynchronously.
                var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                auth
                  .signInWithEmailAndPassword(email, password)
                  .then(function (result) {
                    // Step 4a.
                    return result.user.linkWithCredential(pendingCred);
                  })
                  .then(function () {
                    // Google account successfully linked to the existing Firebase user.
                    goToApp();
                  });
                return;
              }

              var provider = getProviderForProviderId(methods[0]);

              auth.signInWithPopup(provider).then(function (result) {
                result.user
                  .linkAndRetrieveDataWithCredential(pendingCred)
                  .then(function (usercred) {
                    // Google account successfully linked to the existing Firebase user.
                    goToApp();
                  });
              });
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, formData.email);
      console.log("Password reset email sent.");
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={() =>
              signInWithEmailAndPassword(formData.email, formData.password)
            }
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box sx={{ mt: 1 }}>
              <Link to="/reset">Forgot Password?</Link>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                startIcon={<img src="google-icon.png" alt="Google" />}
              >
                Sign in with Google
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
