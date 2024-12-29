import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @getAllUser
// GET "/"
export const getAllUser = async (req, res) => {
    let users;
    try {
        // Retrieve all users from the database
        users = await User.find();
    } catch (error) {
        console.log("inside (getAllUser) error: ", error);
        return res.status(500).json({ message: "Error retrieving users." });
    }

    // If no users are found, return a 404 error
    if (!users) {
        return res.status(404).json({
            message: "Users not found"
        });
    }

    // Remove sensitive password information from the response
    const usersWithoutPassword = users.map(user => {
        const userObject = user.toObject();  // Convert Mongoose document to plain object
        delete userObject.password;  // Exclude the password field from the response
        return userObject;
    });

    // Return the users' data without the password field
    return res.status(200).json({ users: usersWithoutPassword });
}

// @SignUp
// POST "/signup"
export const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        // Check if a user with the same email already exists
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log("inside (signUp) error: ", error);
        return res.status(500).json({ message: "Error checking for existing user." });
    }

    // If the user already exists, return an error response
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists!!"
        });
    }

    // Hash the user's password before saving it
    const hashPas = bcrypt.hashSync(password, 10);  // Add salt rounds for security

    const user = new User({
        name,
        email,
        password: hashPas,  // Store the hashed password
        blogs: []           // Initialize an empty blog array for the user
    });

    try {
        // Save the new user to the database
        await user.save();
        // Convert the user document to a plain object and remove the password field
        const userObject = user.toObject();
        delete userObject.password;  // Exclude the password from the response
        return res.status(201).json({ user: userObject });  // Return the created user (without the password)
    } catch (error) {
        console.log("Error saving user: ", error);
        return res.status(500).json({ message: "Error saving user." });
    }
}

// @Login
// POST "/login"
export const login = async (req, res) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        // Find the user by email
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log("inside (login) error: ", error);
        return res.status(500).json({ message: "Error finding user." });
    }

    // If the user does not exist, return a 404 error
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    // If the password is incorrect, return a 400 error
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    // Convert the user document to a plain object and remove the password field
    const userObject = existingUser.toObject();
    delete userObject.password;  // Exclude the password from the response
    return res.status(200).json({ user: userObject });  // Return the logged-in user (without the password)
}
