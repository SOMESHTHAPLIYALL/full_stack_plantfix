const UserModel = require("../models/Usermodel");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, profilePic } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill all fields",
        success: false,
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exist",
        success: false,
      });
    }

    const user = new UserModel({ username, email, password, profilePic });
    await user.save();
    return res.status(200).send({
      message: "Succesfully registered",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal error",
      success: false,
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        message: "Please provide all fields",
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "User found successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal error",
      success: false,
      error,
    });
  }
};

exports.singleUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id).populate({
      path: "blogs",
    });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "User successfully fetched",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal error",
      success: false,
      error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).send({
      message: "All users fetched",
      success: true,
      users,
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
