import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHttp } from "../hooks/http.hook";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

const defaultTheme = createTheme();

export default function ResetPassword() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/sign-in");
  }
  const { loading, error, request } = useHttp();
  const [messageOpen, setMessageOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (error) {
      setMessage(error);
      setMessageOpen(true);
    }
  }, [error]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if(data.get("password") === data.get("confirmation-password")){
      const sendData = await request("/api/auth/reset-password", "POST", {
        password: data.get("password"),
      });
    
      setMessage(sendData.message);
      setMessageOpen(true);
      }
    } catch (e) {
      setMessage(error);
      setMessageOpen(true);
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
            Task Tracker
          </Typography>
          <Typography component="h2" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmation-password"
                  label="Confirm-password"
                  type="password"
                  id="confirmation-password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body3" onClick={handleNavigate}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={messageOpen}
        autoHideDuration={6000}
        onClose={() => setMessageOpen(false)}
        message={message}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => setMessageOpen(false)}
          >
            Close
          </Button>
        }
      />
    </ThemeProvider>
  );
}
