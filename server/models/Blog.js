import mongoose from "mongoose";

// Define the schema for a blog post
const blogSchema = new mongoose.Schema({
    // Title of the blog post (required field)
    title: {
        type: String,         // Data type is String
        required: true        // This field is mandatory
    },
    
    // Description of the blog post (required field)
    desc: {
        type: String,         // Data type is String
        required: true        // This field is mandatory
    },
    
    // Image URL for the blog post (optional field)
    img: {
        type: String,         // Data type is String (URL for the image)
        required: false,      // This field is optional
        default: 'https://cdn.pixabay.com/photo/2014/02/13/07/28/wordpress-265132_1280.jpg'  // Default image if none is provided
    },
    
    // Reference to the User who created the blog post (required field)
    user: {
        type: mongoose.Types.ObjectId,  // Data type is ObjectId (refers to the User model)
        ref: "User",                    // Reference to the "User" model (the creator of the blog)
        required: true                  // This field is mandatory
    },
    userName:{
        type:String,
        required:false
    },
    
    // Date when the blog post was created (optional field with default value)
    data: {
        type: Date,                   // Data type is Date
        default: Date.now,            // Default value is the current date/time when the blog is created
    }
});

// Export the Blog model based on the schema
export default mongoose.model("Blog", blogSchema);
