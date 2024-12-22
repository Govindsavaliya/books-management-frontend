import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import { addBook } from "../features/booksSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch addBook action
        dispatch(addBook({ title, author }))
            .unwrap()
            .then((messageInfo) => {
                toast.success(messageInfo.message);
                console.log("🚀 ~ .then ~ messageInfo:", messageInfo)
                navigate("/");
            })
            .catch((error) => {
                console.error("Error adding book:", error);
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh", 
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#121212" : "#f9f9f9",
            }}
        >
            <Card sx={{ width: 400, p: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ textAlign: "center", mb: 2 }}
                    >
                        Add a New Book
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Book Title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Author"
                                    name="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    onClick={() => navigate("/")}
                                    sx={{ mt: 1 }}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                >
                                    Add Book
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BookForm;
