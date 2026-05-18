const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = (email) => {
  return emailRegex.test(email);
};

const generatOTP = () => {
  return crypto.randomInt(1000, 10000).toString();
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: "1h" },
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SEC,
    { expiresIn: "15d" },
  );
};

module.exports = {
  isValidEmail,
  generatOTP,
  generateAccessToken,
  generateRefreshToken,
};
