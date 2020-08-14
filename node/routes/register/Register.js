const express = require('express');
const router = express.Router();
const {validateRegister, User, Token} = require('../user');
const bycrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


router.post('/', async(req,res) => {  
    const {error} = validateRegister(req.body);
    if(error) return res.status(400).json({error:`Invalid format' ${error.details[0].message}`});

    User.findOne({email: req.body.email}, async function(err, user) {
 
        // Make sure user doesn't already exist
        if (user) return res.status(400).send({ error: 'The email address you have entered is already associated with another account.' });
     
        // Create and save the user
        user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
        const salt = await bycrypt.genSalt(10);
        user.password = await bycrypt.hash(user.password, salt); 

        let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        token.save(function (err) {
            if (err) return res.status(500).send({ error: err.message });   
 
            // Send the email
            const transporter = nodemailer.createTransport(
                sendgridTransport({
                  auth: {
                    api_user: process.env.SENDGRID_USERNAME,    // SG username
                    api_key:  process.env.SENDGRID_PASSWORD, // SG password
                  },
                })
            );
            
            let mailOptions = { 
                from: 'no-reply@webase.com', 
                to: user.email, 
                subject: 'Welcome to WeBase! So excited to have you on board.', 
                html: `<div class=""><div class="aHl"></div><div id=":q7" tabindex="-1"></div><div id=":pw" class="ii gt"><div id=":pv" class="a3s aXjCH msg3617222122297081128"><u></u> <div style="font-size:16px;background-color:#fdfdfd;margin:0;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;line-height:1.5;height:100%!important;width:100%!important"> <div> <div> </div> </div> <table bgcolor="#fdfdfd" style="box-sizing:border-box;border-spacing:0;width:100%;background-color:#fdfdfd;border-collapse:separate!important" width="100%"> <tbody> <tr> <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td> <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;display:block;width:600px;max-width:600px;margin:0 auto!important" valign="top" width="600"> <div style="box-sizing:border-box;display:block;max-width:600px;margin:0 auto;padding:10px"><span style="color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;width:0">Let's confirm your email address.</span> <div style="box-sizing:border-box;width:100%;margin-bottom:30px;margin-top:15px"> <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"> <tbody> <tr> <td align="left" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;text-align:left" valign="top"><span><a href="https://webaselandingpage.netlify.com/" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none" target="_blank"><img alt="WeBase" width="200" src="https://i.ibb.co/cXMqdrq/webase-wallpaper.png"></a></span></td> </tr> </tbody> </table> </div> <div style="box-sizing:border-box;width:100%;margin-bottom:30px;background:#ffffff;border:1px solid #f0f0f0"> <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"> <tbody> <tr> <td style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding:30px" valign="top"> <table style="box-sizing:border-box;width:100%;border-spacing:0;border-collapse:separate!important" width="100%"> <tbody> <tr> <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"> <h2 style="margin:0;margin-bottom:30px;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;line-height:1.5;font-size:24px;color:!important">You're on your way!<br> Let's confirm your email address.</h2> <p style="margin:0;margin-bottom:30px;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;font-weight:300">By clicking on the following link, you are confirming your email address.</p> </td> </tr> <tr> <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top"> <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:100%;border-collapse:separate!important" width="100%"> <tbody> <tr> <td align="center" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;padding-bottom:15px" valign="top"> <table cellpadding="0" cellspacing="0" style="box-sizing:border-box;border-spacing:0;width:auto;border-collapse:separate!important"> <tbody> <tr> <td align="center" bgcolor="#348eda" style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top;background-color:#348eda;border-radius:2px;text-align:center" valign="top"><a href="${process.env.REACT_ENDPOINT}/confirmation/${token.token}/${user.email}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px" target="_blank">Confirm Email Address</a></td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div> <div style="box-sizing:border-box;clear:both;width:100%"> <table style="box-sizing:border-box;width:100%;border-spacing:0;font-size:12px;border-collapse:separate!important" width="100%"> <tbody> <tr style="font-size:12px"> <td align="center" style="box-sizing:border-box;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;vertical-align:top;font-size:12px;text-align:center;padding:20px 0" valign="top"><span style="float:none;display:block;text-align:center"><a href="https://webaselandingpage.netlify.com/" target="_blank" ><img alt="WeBase" height="20" src="https://i.ibb.co/cXMqdrq/webase-wallpaper.png" style="max-width:100%;border-style:none;font-size:12px;height:auto;width:90px" width="91" class="CToWUd"></a></span> <p style="color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;margin-bottom:5px;margin:10px 0 20px">Making Deep Learning Simple<nnp> <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px">© <span class="il">WeBase</span> Inc. Room no 248, B Block, Bennett University, India</p> <p style="margin:0;color:#294661;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-weight:300;font-size:12px;margin-bottom:5px"><a href="https://medium.com/@harshitsinghai77/introducing-webase-3f765076c403" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">Blog</a> <a href="https://github.com/harshitsinghai77/webase" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">GitHub</a> <a href="https://www.youtube.com/watch?v=buU5tFiB_qQ" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">YouTube</a> <a href="https://webaselandingpage.netlify.com/" style="box-sizing:border-box;color:#348eda;font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">Website</a></p> </td> </tr> </tbody> </table> </div> </div> </td> <td style="box-sizing:border-box;padding:0;font-family:'Open Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;vertical-align:top" valign="top">&nbsp;</td> </tr> </tbody> </table> WeBase <a href="https://webaselandingpage.netlify.com/" target="_blank"><span class="il">WeBase</span>.com</a>. </div><div class="yj6qo"></div><div class="adL"> </div></div></div><div id=":qc" class="ii gt" style="display:none"><div id=":qb" class="a3s aXjCH undefined"></div></div><div class="hi"></div></div>`
            };
            transporter.sendMail(mailOptions, function (err, details) {
                console.log(details)
                if (err) return res.status(500).send({ msg: err.message });
                user.save(function(usrErr){
                    if (usrErr) return res.status(500).send({ error: err.message }); 
                    res.status(200).send('A verification email has been sent to ' + user.email + '.');
                })
            });
        });
    });
});

module.exports = router;