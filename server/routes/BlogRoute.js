import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  getByUserId,
  deleteBlog,
} from "../controllers/blogController.js";

const BlogRouter = express.Router();

// Blog-specific routes
BlogRouter.get("/", getAllBlogs);              // GET /blogs
BlogRouter.post("/create", addBlog);           // POST /blogs/create
BlogRouter.get("/:id", getById);               // GET /blogs/:id
BlogRouter.put("/:id", updateBlog);       // PUT /blogs/:id
BlogRouter.delete("/:id", deleteBlog);         // DELETE /blogs/:id
BlogRouter.get("/user/:id",getByUserId)       //GET /blogs/user/:id
export default BlogRouter