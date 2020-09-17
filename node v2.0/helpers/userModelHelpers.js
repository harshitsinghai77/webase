const UserModel = require("../models/userModelSchema");

function InsertImage(userId, modelId, newImageSchema) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { userID: userId, "model.model_Id": modelId },
      { $push: { "model.$.image": newImageSchema } },
      { multi: 1 },
      function (err, result) {
        resolve(result);
      }
    );
  });
}

function InsertModel(userId, modelSchema) {
  return new Promise((resolve, reject) => {
    UserModel.findOneAndUpdate(
      { userID: userId },
      { $push: { model: modelSchema } },
      { upsert: true, new: true, runValidators: true },
      function (err, result) {
        resolve(result);
      }
    );
  });
}

module.exports = {
  InsertImage,
  InsertModel,
};
