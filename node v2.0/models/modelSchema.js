const mongoose = require("mongoose");
const Image = require("./imageSchema");

const ModelSchema = new mongoose.Schema({
  model_name: {
    type: String,
    required: true,
  },
  model_Id: {
    type: String,
    required: true,
  },
  image: [Image.schema],
  accuracy: { type: String, required: true },
});

const Model = new mongoose.model("ModelSchema", ModelSchema);

module.exports = Model;
