const express = require("express");
const router = express.Router();

const { response } = require("../../utils/util");
const UserModel = require("../../models/userModelSchema");
const Model = require("../../models/modelSchema");
const Image = require("../../models/imageSchema");
const DeepLearningModels = require("../../models/deepLearningModel");
const { InsertImage, InsertModel } = require("../../helpers/userModelHelpers");

router.get("/get-models", async (req, res) => {
  try {
    const models = await DeepLearningModels.find({});
    res.sendSuccess(response(true, "Success", models));
  } catch (e) {
    console.log(e);
    res.sendInternalServerError();
  }
});

router.get("/upload-image", async (req, res) => {
  try {
    const { userID, currentModelID } = req.body;
    let docs = UserModel.findOne({
      userID: userID,
      "model.model_Id": currentModelID,
    });
    if (docs) {
      return res.sendSuccess(response(true, "Success", docs));
    }
    res.sendSuccess(response(true, "No images found", null));
  } catch (e) {
    console.log(e);
    res.sendInternalServerError();
  }
  //   UserModel.findOne({ userID: userID }, (err, data) => {
  //     if (data) {
  //       const myArray = data.model.find((x) => x.model_Id === currentModelID);
  //       if (myArray) return res.json({ status: true, result: myArray.image });
  //       res.json({ status: false, result: "No images found" });
  //     } else {
  //       console.log("Err ", err);
  //       res.json({ status: false, result: "No images found" });
  //     }
  //   });
});

router.post("/upload-image", async (req, res) => {
  const {
    userID,
    currentModelID,
    imageName,
    imageURL,
    currentModelName,
  } = req.body;

  const newImageSchema = new Image({ imageName, imageURL });

  const newModelSchema = new Model({
    model_name: currentModelName,
    model_Id: currentModelID,
    image: newImageSchema,
    accuracy: "91",
  });

  const newUser = new UserModel({
    userName: req.user.name,
    userID: userID,
    model: newModelSchema,
  });

  const user = await UserModel.find({ userID: userID });
  if (user.length) {
    InsertImage(userID, currentModelID, newImageSchema).then((resp) => {
      if (!resp) {
        InsertModel(userID, newModelSchema).then((resp) =>
          res.sendSuccess(response(true, "New model created", resp))
        );
      } else {
        res.sendSuccess(response(true, "Image added to the model", resp));
      }
    });
  } else {
    newUser
      .save()
      .then((result) => {
        res.json({ result: result, added: "User" });
      })
      .catch((err) => res.json({ result: err, added: "error" }));
  }
});

module.exports = router;
