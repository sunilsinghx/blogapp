// Importing necessary libraries and modules
import express from "express";  // Express is used to create the server and handle routing
import dotenv from "dotenv";   // dotenv helps to manage environment variables
import userRouter from "./routes/userRoute.js";  // Importing user-related routes
import blogRouter from "./routes/BlogRoute.js";  // Importing blog-related routes
import {ConnectDB} from "./config/db.js";  // Function to connect to the database
import cors from "cors";  // CORS middleware to allow cross-origin requests

// Load environment variables from .env file
dotenv.config();

// Initialize express application
const app = express();

// Connect to the database using the ConnectDB function
ConnectDB();

// Middleware to enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Enable JSON body parsing for incoming requests
app.use(express.json());

// Define route for user-related API endpoints (e.g., /api/users)
app.use("/api/users", userRouter);

// Define route for blog-related API endpoints (e.g., /api/blogs)
app.use("/api/blogs", blogRouter);

// Define a simple test route for the API base path, which responds with "HELLO"
app.use("/api", (req, res) => {
    res.send("HELLO");
});

// Start the server and listen on the specified port, either from the environment variable or default to port 5000
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started at port ${process.env.PORT || 5000}`);
});
