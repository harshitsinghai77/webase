const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
});

const Image = new mongoose.model("ImageSchema", ImageSchema);

module.exports = Image;
