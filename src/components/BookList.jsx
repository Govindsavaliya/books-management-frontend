import React, { useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CircularProgress,
    Container,
    AppBar,
    Toolbar,
    Box,
    CssBaseline,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/booksSlice";

// Dark theme for the app
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        secondary: {
            main: "#90caf9",
        },
        background: {
            default: "#121212",
            paper: "#1e1e1e",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0bec5",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
    },
});

const BookList = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);

    // Fetch books
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (loading)
        return (
            <Container
                maxWidth="xl"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#121212",
                }}
            >
                <CircularProgress style={{ color: "#90caf9" }} />
            </Container>
        );

    if (error)
        return (
            <Container
                maxWidth="xl"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#121212",
                }}
            >
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Container>
        );

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundColor: "background.default",
                    padding: "40px 0",
                }}
            >
                <Container maxWidth="lg">
                    <AppBar position="static" color="primary" elevation={2}>
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Amazing Book Collection
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                href="/add"
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                Add New Book
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Box sx={{ marginTop: "20px" }}>
                        {books.data?.length === 0 && (
                            <Typography
                                variant="h6"
                                align="center"
                                style={{
                                    color: "text.secondary",
                                    marginTop: "20px",
                                }}
                            >
                                No books available. Click "Add New Book" to get started!
                            </Typography>
                        )}
                        <Grid container spacing={4}>
                            {books.data &&
                                books.data.map((book, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={book.id || index}>
                                        <Card
                                            sx={{
                                                backgroundColor: "background.paper",
                                                color: "text.primary",
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                transition: "transform 0.3s, box-shadow 0.3s",
                                                "&:hover": {
                                                    transform: "scale(1.05)",
                                                    boxShadow: "0 8px 20px rgba(255, 255, 255, 0.2)",
                                                },
                                            }}
                                        >
                                            {book.image && (
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={book.image}
                                                    alt={book.title}
                                                />
                                            )}
                                            <CardContent
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    gutterBottom
                                                    style={{
                                                        textAlign: "center",
                                                        fontWeight: "bold",
                                                        color: "#90caf9", // Title with a custom color
                                                    }}
                                                >
                                                    {book.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    style={{ textAlign: "center", color: "#b0bec5" }}
                                                >
                                                    Author: {book.author}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default BookList;
