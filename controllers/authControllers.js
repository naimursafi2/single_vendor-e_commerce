const { OTPMailTemp } = require("../helpers/emailTemplates");
const { mailsender } = require("../helpers/mailService");
const {
  isValidEmail,
  generatOTP,
  generateAccessToken,
  generateRefreshToken,
  uploadToCloudinary,
  destroyFromCloudinary,
} = require("../helpers/utils");
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

const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await userSchema.findOne({ email, isVerified: false });
    if (!userData) return res.status(400).send({ message: "Invalid request" });
    const otp = generatOTP();
    userData.otp = otp;
    userData.otpExpiry = Date.now() + 10 * 60 * 1000;
    await userData.save();
    mailsender({
      email,
      subject: "verify your otp",
      template: OTPMailTemp(otp),
    });

    res.status(200).send({ message: "new otp send your email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const cookie_config = {
  httpOnly: false,
  secure: false,
};

const signIn = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    if (!email) return res.status(400).send({ message: "email is required" });
    if (!password)
      return res.status(400).send({ message: "password is required" });

    const userData = await userSchema.findOne({ email }).select("+password");
    if (!userData) return res.status(400).send({ message: "user not found" });
    if (userData.isVerified === false)
      return res.status(400).send({ message: "Email is not verified" });
    //password mathced
    const matchPassword = await userData.comparePassword(password);
    if (!matchPassword)
      return res.status(400).send({ message: "password does not match" });

    const accToken = generateAccessToken(userData);
    const refToken = generateRefreshToken(userData);

    res
      .status(200)
      .cookie("acc_tkn", accToken, cookie_config)
      .cookie("ref_tkn", refToken, cookie_config)
      .send({ message: "Login Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const profileData = await userSchema.findOne(
      { _id: req.user._id },
      { fullName: 1, email: 1, role: 1, avatar: 1, address: 1 },
    );
    if (!profileData)
      return res.status(400).send({ message: "Profile data is not found" });

    res.status(200).send(profileData);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  const { fullName, address } = req.body;
  const avatar = req.file;
  try {
    const userData = await userSchema.findOne({ _id: req.user._id });

    if (!userData)
      return res.status(400).send({ message: "Something went wrong" });
    if (fullName && fullName.trim()) userData.fullName = fullName;
    if (address && address.trim()) userData.address = address;
    if (avatar) {
      try {
        const avatarUrl = await uploadToCloudinary({
          mimetype: avatar.mimetype,
          imgBuffer: avatar.buffer,
        });
        if (userData.avatar) destroyFromCloudinary(userData.avatar);
        userData.avatar = avatarUrl;
      } catch (error) {}
    }
    userData.save();
    res.status(200).send({ message: "profile update successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  verifyOtp,
  resendOtp,
  signIn,
  getProfile,
  updateProfile,
};
