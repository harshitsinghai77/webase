const mongoose = require("mongoose");
const Model = require("./modelSchema");

const UserModelSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },

  model: [Model.schema],
});

const UserModel = new mongoose.model("UserModelSchema", UserModelSchema);

module.exports = UserModel;
