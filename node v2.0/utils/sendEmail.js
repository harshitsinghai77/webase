const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const htmlTemplate = require("./email_template/template");

const SendEmail = async (userEmail, userToken) => {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_user: process.env.SENDGRID_USERNAME, // SG username
        api_key: process.env.SENDGRID_PASSWORD, // SG password
      },
    })
  );

  let mailOptions = {
    from: "no-reply@webase.com",
    to: userEmail,
    subject: "Welcome to WeBase! So excited to have you on board.",
    html: htmlTemplate(userEmail, userToken),
  };

  return transporter.sendMail(mailOptions);
};

module.exports = SendEmail;
