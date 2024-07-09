const express = require("express");
const {
  saveImage,
  deleteImage,
  getImages,
} = require("../controller/ImageController");

const router = express.Router();

router.post("/saveImage", saveImage);
router.post("/deleteImage", deleteImage);
router.post("/getImage", getImages);

module.exports = router;
