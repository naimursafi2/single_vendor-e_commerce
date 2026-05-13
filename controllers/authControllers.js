const { OTPMailTemp } = require("../helpers/emailTemplates");
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
    const user = await userSchema.create({
      fullName,
      email,
      password,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });
    mailsender({
      email,
      subject: "verify your otp",
      template: OTPMailTemp(otp, fullName),
    });

    res
      .status(200)
      .send({ message: "Registration Successfully, please verify your email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!otp) return res.status(400).send({ message: "OTP Code is required" });
    if (!email) return res.status(400).send({ message: "email is required" });
    const userData = await userSchema.findOneAndUpdate(
      {
        email,
        otp,
        otpExpiry: { $gt: Date.now() },
        isVerified: false,
      },
      {
        $set: {
          isVerified: true,
          otp: null,
          otpExpiry: null,
        },
      },
      { returnDocument: "after" },
    );
    console.log(userData);
    if (!userData) return res.status(400).send({ message: "user not found" });

    //res.redirect("clienturl/login")
    res.status(200).send({ message: "Email Verified Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};



module.exports = { signup, verifyOtp };
