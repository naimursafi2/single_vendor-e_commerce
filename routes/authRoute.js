const express = require('express');
const { signup, verifyOtp, resendOtp, signIn } = require('../controllers/authControllers');
const route = express.Router();

route.post("/signup", signup)
route.post("/verify-email", verifyOtp)
route.post("/resend-otp", resendOtp)
route.post("/signin", signIn)

module.exports = route