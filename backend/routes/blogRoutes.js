const express = require("express");
const {
  createBlog,
  deleteBlog,
  getUserBlog,
  updateBlog,
  getAllBlogs,
} = require("../controller/BlogController");

const router = express.Router();

router.post("/createBlog", createBlog);
router.post("/deleteBlog", deleteBlog);
router.post("/updateBlog", updateBlog);
router.post("/userBlog", getUserBlog);
router.get("/allBlogs", getAllBlogs);

module.exports = router;
