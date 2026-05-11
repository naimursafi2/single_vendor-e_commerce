const { OTPMailTemp } = require("../helpers/email.Templates");
const { mailsender } = require("../helpers/mailService");
const { isValidEmail, generatOTP } = require("../helpers/utils");
const userSchema = require("../models/userSchema");

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName)
      return res.status(400).send({ message: "fullName is require" });
    if (!email) return res.status(400).send({ message: "email is require" });
    if (!isValidEmail(email))
      return res.status(400).send({ message: "email is not valid" });
    if (!password)
      return res.status(400).send({ message: "password is require" });

    const existEmail = await userSchema.findOne({ email });
    if (existEmail)
      return res.status(400).send({ message: "Email is already exist." });
    const otp = generatOTP();
    const user = userSchema.create({
      fullName,
      email,
      password,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });
    mailsender({
      email,
      subject: "verify your otp",
      template: OTPMailTemp(otp),
    });
    res
      .status(200)
      .send({ message: "Registration Successfully, please verify your email" });
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { signup };
