const ImageModel = require("../models/ImagesModel");
const UserModel = require("../models/Usermodel");

exports.saveImage = async (req, res) => {
  try {
    const { userId, image, disease, confidence } = req.body;
    console.log(req.body);
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }
    const newImage = new ImageModel({
      image: image,
      disease: disease,
      confidence: confidence,
    });
    await newImage.save();
    user.images.push(newImage);
    await user.save();

    return res.status(200).send({
      message: "Successfully saved",
      success: true,
      userId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Failed",
      success: false,
      error,
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { imageID } = req.body;
    const image = await ImageModel.findByIdAndDelete(imageID);
    if (!image) {
      return res.status(400).send({
        message: "Failed finding image",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Success",
      success: true,
      image,
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

exports.getImages = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await UserModel.findById(userID).populate("images");
    return res.status(200).send({
      message: "User fetched",
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
