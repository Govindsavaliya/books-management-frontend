import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/authSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth || {});
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    try {
      dispatch(fetchProfile());
    } catch (error) {
      toast.error(error?.message);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      if (user?.data) {
        setUserProfile(user?.data);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }, [user]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container justifyContent="center" sx={{ marginTop: "20px" }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={3}
            bgcolor="#87CEFA"
            sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
          >
            <Typography variant="h4" fontWeight="bold" color="#2E3B55" gutterBottom>
              {userProfile?.firstName} {userProfile?.lastName}
            </Typography>
            <Typography variant="body1" color="#333" sx={{ marginBottom: 2 }}>
              {userProfile?.email}
            </Typography>
          </Box>
          <CardContent>
            <Typography variant="body1" color="#fff" sx={{ marginBottom: 2 }}>
              Manage your account and books here.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/"
              fullWidth
              sx={{
                marginBottom: 2,
                backgroundColor: "#4CAF50",
                "&:hover": {
                  backgroundColor: "#388E3C",
                },
              }}
            >
              View Books
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              href="/add"
              fullWidth
              sx={{
                borderColor: "#FF6347",
                color: "#FF6347",
                "&:hover": {
                  backgroundColor: "#FF6347",
                  color: "#fff",
                },
              }}
            >
              Add a Book
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
