import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((messageInfo) => {
        toast.success(messageInfo?.message);
        localStorage.setItem("token", messageInfo?.data?.token);
        navigate("/");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        if (err?.message) {
          toast.error(err?.message);
        }
        else if (err?.errors) {
          err?.errors.forEach((error) => {
            toast.error(error?.msg);
          });
        }
        else {
          toast.error("An unexpected error occurred!");
        }
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Login
              </Button>
              <Button
                href="/register"
                variant="text"
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Don't have an account? Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
