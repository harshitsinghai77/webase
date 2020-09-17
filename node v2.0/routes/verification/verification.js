const express = require('express');
const router = express.Router();
const { User, Token } = require('../user');

router.post('/confirmation', async(req,res) => {
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(200).send({ type: 'not-verified', message: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(200).send({ message: 'We were unable to find a user for this token' });
            if (user.isVerified) return res.status(200).send({ type: 'already-verified', message: `The email id ${user.email} has already been verified.` });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ error: err.message }); }
                res.status(200).send({message: "The account has been verified. Please log in to continue."});
            });
        });
    });
});

router.post('/resend', async(req,res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(200).send({ message: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(200).send({ message: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ message: err.message }); }
 
            // Send the email
            let transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            let mailOptions = { from: 'no-reply@webase.com', to: user.email, subject: 'Account Verification Token', text: `Hello,\n\n' Please verify your account by clicking the link: ${process.env.REACT_ENDPOINT}/confirmation/${token.token}/${user.email}`};
            transporter.sendMail(mailOptions, function (err, sucess) {
                if (err) { return res.status(500).send({ error: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
 
    });
});

module.exports = router;