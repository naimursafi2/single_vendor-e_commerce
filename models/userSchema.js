const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "moderator"],
    },
  },
  { timestamps: true },
);






module.exports = mongoose.model("user", userSchema);
