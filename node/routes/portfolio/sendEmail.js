const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const SendEmail = async (name, email, description) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 465,
        service:'yahoo',
        secure: false,
        auth: {
          user: process.env.email_username, 
          pass: process.env.email_password
        }
    });

    await transporter.sendMail({
        from: '"Harshit Singhai" <projects.harshitsinghai77@yahoo.com>', // sender address
        to: [email, "harshitsinghai77@gmail.com"], // list of receivers
        subject: `Hi ${name}.I have recieved your query`, // Subject line
        html: `
            Hi ${name},
            <p>Thank you for reaching out. I have received your email and will look into it and get back to you shortly. </p>
            <p>
                Regards
                <br>
                Harshit Singhai
            </p>    
        `
    });
} 

module.exports.SendEmail = SendEmail