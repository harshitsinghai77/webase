const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  username: {
    type: String,
    maxlength: 30,
    default: "",
  },
  isVerified: { type: Boolean, default: false },
  designation: {
    type: String,
    enum: [
      "None",
      "Student",
      "Professional",
      "Business",
      "Freelance",
      "good_for_nothing",
    ],
    default: "None",
  },
  aboutme: {
    type: String,
    maxlength: 500,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  gender: {
    type: String,
    enum: ["-", "Male", "Female", "Other"],
    default: "-",
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { name: this.name, id: this._id },
    process.env.jwtSecretKey
  );
  return token;
};

const User = new mongoose.model("User", UserSchema);

module.exports = User;
