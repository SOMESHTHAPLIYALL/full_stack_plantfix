const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
    required: true,
  },
});

const Image = new mongoose.model("Image", imageSchema);
module.exports = Image;
