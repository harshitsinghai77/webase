const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    modelId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    accuracy:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
})


const Model = mongoose.model('Model', modelSchema);
module.exports = Model;