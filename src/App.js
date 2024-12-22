import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchProfile } from "./features/authSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth || {});
  const localStorageToken = localStorage.getItem("token");

  const isAuthenticated = token || localStorageToken ? true : false;
  const handleLogout = () => {
    toast.success("Logout successful");
    localStorage.removeItem("token");
    dispatch(logout());
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box>
          <AppBar position="static" style={{ marginBottom: "20px" }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                Book Management System
              </Typography>
              {isAuthenticated ? (
                <>
                  <Button color="inherit" href="/profile">
                    Profile
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" href="/login">
                  Login
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

            <Route
              path="/"
              element={isAuthenticated ? <BookList /> : <Navigate to="/login" />}
            />
            <Route
              path="/add"
              element={isAuthenticated ? <BookForm /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>

          <ToastContainer position="top-right" autoClose={3000} />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
