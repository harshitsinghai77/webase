const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const { response } = require("../../utils/util");
const { ValidateLogin } = require("../../validator/index");

router.post("/", async (req, res) => {
  try {
    const { error } = ValidateLogin(req.body);
    if (error) return res.sendBadRequestError(error);

    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user)
      return res.sendUnauthorized(
        response(
          false,
          `The email address ${email} is not associated with any account. Double-check your email address and try again.`,
          null
        )
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.sendUnauthorized(
        response(false, "Invalid email or password", null)
      );

    if (!user.isVerified)
      return res.sendUnauthorized(
        response(
          false,
          "Your account has not been verified. Please verify your email.",
          null
        )
      );

    const token = user.generateAuthToken();
    res.status(200).json({
      message: "Successfully log in",
      token: token,
      id: user._id,
    });
  } catch (err) {
    console.log(err);
    res.sendInternalServerError();
  }
});

module.exports = router;
