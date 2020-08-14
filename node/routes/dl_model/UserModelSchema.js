const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    imageName: {
        type: String, required: true
    },
    imageURL: {
        type: String, required: true
    } 
})

const ModelSchema = new mongoose.Schema({
    model_name: {
        type: String, 
        required: true
    },
    model_Id: {
        type: String, 
        required: true
    },
    image: [ImageSchema],
    accuracy: {type: String, required: true}
})

const UserModelSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    model: [ModelSchema]
});

module.exports.Image     = mongoose.model('ImageSchema', ImageSchema)
module.exports.Model     = mongoose.model('ModelSchema', ModelSchema)
module.exports.UserModel = mongoose.model('UserModelSchema', UserModelSchema)
