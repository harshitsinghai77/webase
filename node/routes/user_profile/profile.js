const express = require('express');
const router = express.Router();
const { User, validatePassword } = require('../user');
const bycrypt = require('bcryptjs');


router.get('/userName', async (req, res) => {
    const userName = await User.findOne({_id: req.query.id}, 'name')
    if(userName){
        return res.status(200).json({username: userName.name})    
    }
    return res.status(400).json({error: 'Cannot find username. Some error occured'})    
})

router.post('/change-password', async (req, res) => {

    let user = await User.findOne({_id: req.body.id});
    if(!user) return res.status(400).json({error: 'User is not associated with any account.'});

    const validPassword = await bycrypt.compare(req.body.old_password, user.password);
    if(!validPassword) return res.status(400).json({error: 'Existing password cannot be found'});
    
    const {error} = validatePassword(req.body.new_password);
    if(error) return res.status(400).json({error: 'Invalid new password' });

    const salt = await bycrypt.genSalt(10);
    const newPassword = await bycrypt.hash(req.body.new_password, salt); 

    User.findByIdAndUpdate(req.body.id, {$set : {password: newPassword}}, {multi:1, new: true}, function(err,result) {
        if(result){
            return res.status(200).json({message: 'Password Updated successfully'});
        }else{
            return res.status(400).json({message: 'Some error occured'});
        }
    })
})

router.get('/', async (req, res) => {
    const userdetails = await User.find({_id: req.query.id}).select({'password': 0, '_id':0})
    res.status(200).send(userdetails);
})

router.post('/', async(req,res) => {  
    
    let objForUpdate = {};
 
    if (req.body.name) objForUpdate.name = req.body.name;
    if (req.body.username) objForUpdate.username = req.body.username;
    if (req.body.email) objForUpdate.email = req.body.email;
    if (req.body.designation) objForUpdate.designation = req.body.designation;
    if (req.body.aboutme) objForUpdate.aboutme = req.body.aboutme;
    if (req.body.gender) objForUpdate.gender = req.body.gender;

    User.findByIdAndUpdate(req.body.id, {$set : objForUpdate}, {multi:1, new: true}, function(err,result) {
        if(result){
            return res.status(200).json({message: 'Details updated successfully'});
        }else{
            return res.status(200).json({message: 'Some error occured'});
        }
    })
});

module.exports = router;
