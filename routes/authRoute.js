const express = require('express');
const { signup, verifyOtp } = require('../controllers/authControllers');
const route = express.Router();

route.post("/signup", signup)
route.post("/verify-email", verifyOtp)

module.exports = route