import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { CardMedia } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Iptv
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme({
  typography: {
    fontFamily: "Arial",
  },
});

export default function KairosSignIn() {
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);
  const [error, setError] = useState("");
  const endPoint = "https://m2.kairossolutions.co/mlogin";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submittedEmail = data.get("email");
    const submittedPassword = data.get("password");
    const apikey = "02e25bd1-d7bf-4687-bd38-c81effcf91fd";
    const authkey = "YWRtaW5AbWl0LmNvbS5zZzpLQE0hdFBAc3M5OQ==";

    if (submittedEmail && submittedPassword) {
      setDisableButton(true);
      console.log("Button disabled");

      const userCredentials = {
        username: submittedEmail,
        password: submittedPassword,
      };
      // console.log(userCredentials);

      try {
        setError("");

        const response = await axios.post(endPoint, userCredentials, {
          headers: {
            apikey,
            authkey,
            "Content-Type": "application/json",
          },
        });

        // console.log(response.data);

        // Handle success response
        navigate("/");
        localStorage.setItem("jwtToken", response.data.token);
        // console.log("Login successful:", response.data);
      } catch (error) {
        setError(error);
        setDisableButton(false);
        // Handle error response
        console.error("Error:", error);
      }
    } else {
      console.log(submittedEmail ? "Enter Password" : "Enter Email");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundColor: "#924540", // Set your desired background color
          minHeight: "100vh", // Ensure the container covers the entire viewport height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "#fdfdf8", // Set your desired background color
            minHeight: "95vh", // Ensure the container covers the entire viewport height
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            {error && (
              <Alert variant="filled" severity="error" sx={{ m: 2 }}>
                Email or Password is not correct{" "}
              </Alert>
            )}
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  bgcolor: "#924540",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "180px",
                  height: "80px",
                  marginBottom: "16px",
                  borderRadius: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  src="https://m2.kairossolutions.co/assets/media/logos/Kairos-Full1.png"
                  alt="Company Logo"
                  style={{ width: "75%", height: "auto" }}
                />
              </Box>

              <Avatar sx={{ m: 1, bgcolor: "#924540" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ color: "#924540" }}>
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
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
                  disabled={disableButton}
                  sx={{ mt: 3, mb: 2, bgcolor: "#924540" }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      sx={{ color: "#924540", textDecoration: "none" }}
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="signup"
                      variant="body2"
                      sx={{ color: "#924540", textDecoration: "none" }}
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
