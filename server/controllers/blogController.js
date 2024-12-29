import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

// @desc Get all blogs
// route: GET "/blogs"
export const getAllBlogs = async (req, res) => {
    let blogs;
    try {
        // Fetch all blogs from the database
        blogs = await Blog.find();
    } catch (error) {
        console.log("inside (getAllBlogs) error: ", error);
        return res.status(500).json({ message: "Error retrieving blogs." });
    }

    // If no blogs are found, return a 404 error
    if (!blogs) {
        return res.status(404).json({ message: "No blogs found" });
    }

    // Return the list of blogs
    return res.status(200).json({ blogs });
};

// @desc Add a new blog
// route: POST "/create"
export const addBlog = async (req, res) => {
    const { title, desc, img, user } = req.body;

    const currentDate = new Date();
    let existingUser;
    try {
        // Check if the user exists by their ID
        existingUser = await User.findById(user);
    } catch (error) {
        console.log("inside (addBlog) error: ", error);
        return res.status(500).json({ message: "Error retrieving user" });
    }

    // If the user doesn't exist, return an unauthorized error
    if (!existingUser) {
        return res.status(401).json({ message: "You're not authorized to post" });
    }

    // Create a new blog object
    const blog = new Blog({
        title,
        desc,
        img,
        user,
        userName:existingUser.name,
        date: currentDate,
    });

    
    try {
        // Start a database session for transaction (to ensure consistency)
        const session = await mongoose.startSession();
        session.startTransaction();

        // Save the blog in the session
        await blog.save(session);

        // Add the blog to the user's blogs array
        existingUser.blogs.push(blog);
        await existingUser.save(session);

        // Commit the transaction
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error saving blog" });
    }

    // Return the created blog
    return res.status(200).json({ blog });
};

// @desc Update an existing blog
// route: PUT "/:id"
export const updateBlog = async (req, res) => {
    const blogId = req.params.id;
    const { title, desc, img } = req.body;

    let blog;
    try {
        // Find and update the blog by ID
        blog = await Blog.findByIdAndUpdate(
            blogId,
            { title, desc,img },
            { new: true } // Return the updated blog object
        );
    } catch (error) {
        console.log("inside (updateBlog) error: ", error);
        return res.status(500).json({ message: "Error updating blog" });
    }

    // If the blog is not found, return a 404 error
    if (!blog) {
        return res.status(404).json({ message: "Unable to update blog" });
    }

    // Return the updated blog
    return res.status(200).json({ blog });
};

// @desc Get a blog by its ID
// route: GET "/:id"
export const getById = async (req, res) => {
    const id = req.params.id;
    let blog;

    try {
        // Find a blog by its ID
        blog = await Blog.findById(id);
    } catch (error) {
        console.log("inside (getById) error: ", error);
        return res.status(500).json({ message: "Error retrieving blog" });
    }

    // If the blog is not found, return a 404 error
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    // Return the blog object
    return res.status(200).json({ blog });
};

// @desc Delete a blog
// route: DELETE "/:id"
export const deleteBlog = async (req, res) => {
    const id = req.params.id;

    try {
        // Find and delete the blog by its ID, populate the 'user' field
        const blog = await Blog.findByIdAndDelete(id).populate("user");

        // If the blog is not found, return a 404 error
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Remove the deleted blog from the user's blog list
        const user = blog.user;
        user.blogs.pull(blog);      //delete blog from blogs[] in user
        await user.save();

        // Return a success message
        return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        console.log("inside (deleteBlog) error: ", error);
        return res.status(500).json({ message: "Error deleting blog" });
    }
};

// @desc Get blogs by a specific user ID
// route: GET "/user/:id"
export const getByUserId = async (req, res) => {
    const userId = req.params.id;
    let userBlogs;

    try {
        // Find the user by ID and populate their 'blogs' field
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        console.log("inside (getByUserId) error: ", error);
        return res.status(500).json({ message: "Error retrieving user's blogs" });
    }

    // If no blogs are found for the user, return a 404 error
    if (!userBlogs) {
        return res.status(404).json({ message: "Blogs not found" });
    }

    // Convert the user object to a plain object and remove sensitive data (e.g., password)
    const userBlogObj = userBlogs.toObject();
    delete userBlogObj.password;

    // Return the user data along with their blogs
    return res.status(200).json({ user: userBlogObj });
};
