const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  signup,
  verifyOtp,
  resendOtp,
  signIn,
  getProfile,
  updateProfile,
  userList,
} = require("../controllers/authControllers");
const {authMiddleware, roleCheck} = require("../middleware/authMiddleware");
const route = express.Router();

route.post("/signup", signup);
route.post("/verify-email", verifyOtp);
route.post("/resend-otp", resendOtp);
route.post("/signin", signIn);
route.get("/getprofile", authMiddleware, getProfile);
route.put("/updateprofile", authMiddleware,upload.single("avatar"), updateProfile);
route.get("/userlist", authMiddleware, roleCheck(["admin"]), userList)


module.exports = route;
