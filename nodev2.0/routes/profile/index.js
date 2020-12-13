const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const { ValidatePassword } = require("../../validator/index");
const { response, generateSalt } = require("../../utils/util");
const bycrypt = require("bcryptjs");

router.get("/", async (req, res) => {
  const { id } = req.params;
  const userdetails = await User.find({ _id: id }).select({
    password: 0,
    _id: 0,
  });
  res.sendSuccess(response(true, "userdetails", userdetails));
});

router.get("/userName/:id", async (req, res) => {
  const { id } = req.params;
  const userName = await User.findOne({ _id: id }, "name");
  if (!userName) {
    return res.sendNotFound(
      response(false, "Cannot find username. _id does not exists", null)
    );
  }
  res.sendSuccess(response(true, "Username found", userName));
});

router.post("/change-password", async (req, res) => {
  try {
    const { id, old_password, new_password } = req.body;
    let user = await User.findOne({ _id: id });
    if (!user)
      return res.sendNotFound(
        response(false, "User is not associated with any account.", user)
      );

    const validPassword = await bycrypt.compare(old_password, user.password);
    if (!validPassword)
      return res.sendNotFound(
        response(false, "Existing password is invalid.", validPassword)
      );

    const { error } = ValidatePassword(new_password);
    if (error) return res.sendBadRequestError();

    const newPassword = await generateSalt(new_password);

    let doc = await User.findOneAndUpdate(
      { _id: id },
      { password: newPassword },
      {
        new: true,
      }
    );

    if (!doc) {
      return res.sendBadRequestError(
        response(false, "Some error occured", null)
      );
    }

    res.sendSuccess(response(true, "Password Updated successfully", doc));
  } catch (e) {
    console.log(e);
    res.sendInternalServerError();
  }
});

router.put("/", async (req, res) => {
  try {
    const { id } = req.body;

    let doc = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!doc)
      return res.sendBadRequestError(
        response(false, "Some error occured", null)
      );

    res.sendSuccess(response(true, "PassworDetails updated successfully", doc));
  } catch (e) {
    console.log(e);
    res.sendInternalServerError();
  }
});

module.exports = router;
