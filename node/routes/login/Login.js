const express = require('express');
const router = express.Router();
const {User, validateLogin} = require('../user');
const bcrypt = require('bcryptjs');

router.post('/', async(req,res) => {
    const {error} = validateLogin(req.body);
    if(error) return res.status(400).json({error: error.details[0].message});

    User.findOne({ email: req.body.email }, async function(err, user) {
        if (!user) return res.status(401).send({ error: `The email address ${req.body.email} is not associated with any account. Double-check your email address and try again.`});

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(401).send({error: 'Invalid email or password'});

        if (!user.isVerified) return res.status(401).send({ type: 'not-verified', error: 'Your account has not been verified. Please verify your email.' }); 

        const token = user.generateAuthToken();
        res.status(200).json({
            message: 'Successfully log in',
            token: token,
            id: user._id
        });
        
    });
});

module.exports = router;