const UserModel = require("../models/Usermodel");
const BlogModel = require("../models/BlogsModel");

exports.createBlog = async (req, res) => {
  try {
    const { userID, title, description, image } = req.body;
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(400).send({
        message: "Failed finding user",
        success: false,
      });
    }

    const blog = new BlogModel({ title, description, image });
    await blog.save();
    user.blogs.push(blog);
    await user.save();
    return res.status(200).send({
      success: true,
      message: "Pushed succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      success: false,
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { blogID } = req.body;
    const blog = await BlogModel.findByIdAndDelete(blogID);
    if (!blog) {
      return res.status(400).send({
        message: "Failed finding blog",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Success",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      success: false,
      error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, description, image, id } = req.body;
    console.log(req.body);
    const blog = await BlogModel.findByIdAndUpdate(id, {
      title: title,
      description: description,
      image: image,
    });
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Update succesfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      success: false,
      error,
    });
  }
};

exports.getUserBlog = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findById(userID).populate("blogs");
    if (!user) {
      return res.status(400).send({
        message: "Failed finding user",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Succesfully retrived",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      success: false,
      error,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    return res.status(200).send({
      message: "All Blogs",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      success: false,
      error,
    });
  }
};
