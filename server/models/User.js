import mongoose from "mongoose";

// Define the schema for a user
const userSchema = new mongoose.Schema({
    // Name of the user (required field)
    name: {
        type: String,           // Data type is String
        required: true          // This field is mandatory
    },

    // Email of the user (required and must be unique)
    email: {
        type: String,           // Data type is String
        required: true,         // This field is mandatory
        unique: true            // The email must be unique in the database
    },

    // Password of the user (required field, must be at least 6 characters)
    password: {
        type: String,           // Data type is String
        required: true,         // This field is mandatory
        minlength: 6            // Minimum length of 6 characters for the password
    },

    // Array of references to the blogs created by the user
    blogs: [{
        type: mongoose.Types.ObjectId,  // Data type is ObjectId, which references another document
        ref: "Blog",                     // Reference to the "Blog" model (links to the blogs the user created)
        required: true                   // Each user must have at least one blog
    }]
});

// Export the User model based on the schema
export default mongoose.model("User", userSchema);
