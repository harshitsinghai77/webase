const express = require("express");
const crypto = require("crypto");

const User = require("../../models/user");
const Token = require("../../models/token");
const { response, generateSalt } = require("../../utils/util");
const SendEmail = require("../../utils/sendEmail");
const { ValidateRegister } = require("../../validator/index");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = ValidateRegister(req.body);
    if (error) return res.sendBadRequestError(error);

    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });

    // Make sure user doesn't already exist
    if (user)
      return res.sendBadRequestError(
        response(
          false,
          "The email address you have entered is already associated with another account.",
          null
        )
      );

    // Create and save the user
    user = new User({ name, email, password });
    user.password = await generateSalt(user.password);

    let token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    });

    token.save(function (err) {
      if (err) return res.sendInternalServerError();

      // Send the email
      SendEmail(user.email, token.token)
        .then(async (details) => {
          console.log(details);
          const savedUser = await user.save();
          if (!savedUser) return res.sendInternalServerError();
          res.sendSuccess(
            response(
              true,
              `A verification email has been sent to ${user.email}`,
              savedUser
            )
          );
        })
        .catch((err) => {
          console.log(err);
          res.sendInternalServerError();
        });
    });
  } catch (err) {
    console.log(err);
    res.sendInternalServerError();
  }
});

module.exports = router;
