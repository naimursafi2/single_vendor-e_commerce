const nodemailer = require("nodemailer");
const { OTPMailTemp } = require("./email.Templates");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailsender = async ({ email, subject, template, fullName }) => {
  try {
    await transporter.sendMail({
      from: '"E-commerce Team" <team@taskmanager.com>',

      to: email,
      subject: subject,
      html: template,
    });
  } catch (error) {
    console.log("Error while sending mail", error);
  }
};
module.exports = { mailsender };
