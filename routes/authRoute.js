const express = require('express');
const { signup, verifyOtp, resendOtp, signIn, getProfile } = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');
const route = express.Router();

route.post("/signup", signup)
route.post("/verify-email", verifyOtp)
route.post("/resend-otp", resendOtp)
route.post("/signin", signIn)
route.get("/getprofile",authMiddleware, getProfile)

module.exports = route