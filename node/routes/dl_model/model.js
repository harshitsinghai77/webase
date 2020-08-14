const express = require('express');
const router = express.Router();
const {UserModel, Model, Image} = require('./UserModelSchema');
const ExistingModel = require('./ModelSchema');

function insertImage(userId, modelId, newImageSchema){
    return new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate({ userID:userId, "model.model_Id":modelId}, { $push : {"model.$.image":newImageSchema}}, {multi:1}, function(err,result) {
            resolve(result)
        })
    })
}

function insertModel(userId, modelSchema){
    return new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate({userID: userId},  {$push: {model:modelSchema}}, {upsert: true, new: true, runValidators: true}, function(err,result) {
            resolve(result)
        })
    })
}

router.get('/get-models-cnn', (req,res) => {  
    ExistingModel.find({}, (err, models) => {
        if(models){
            res.send(models)
        }
        else{
            res.send([])
        }
    })
});

router.get('/upload-image', async (req, res) => {
    const {userID, currentModelID} = req.query
    UserModel.findOne({userID: userID}, (err, data) => {
        if(data){
            const myArray = data.model.find(x => x.model_Id === currentModelID);    
            if(myArray) return res.json({status: true, result: myArray.image})
            res.json({status: false, result: "No images found"})
        }
        else{
            console.log("Err ", err)
            res.json({status: false, result: "No images found"})
        }
    })
});


router.post('/upload-image', async(req, res) => {

    const {userID, currentModelID} = req.body
    const newImageSchema = new Image({
        imageName: req.body.imageName,
        imageURL: req.body.imageURL
    })

    const newModelSchema = new Model({
        model_name: req.body.currentModelName,
        model_Id: currentModelID,
        image: newImageSchema,
        accuracy: '91'
    })

    const newUser = new UserModel({
        userName:req.user.name,
        userID: userID,
        model: newModelSchema
    });

    const user = await UserModel.find({userID: userID})
    if (user.length) {
        insertImage(userID, currentModelID, newImageSchema)
            .then(resp => {
                if (!resp){ 
                    insertModel(userID, newModelSchema)
                        .then(resp => res.json({result: resp, added: 'Model'}))
                }else{
                    res.json({result: resp, added: 'Image'})
                }
            })
    }else{
        newUser.save()
            .then((result) => {
                res.json({result: result, added: 'User'})
            })
            .catch((err) => res.json({result: err, added: 'error'})); 
    }
})

module.exports = router;