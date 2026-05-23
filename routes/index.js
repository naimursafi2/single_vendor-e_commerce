const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).send("Healthy");
});

route.use("/auth", require("./authRoute"))
route.use("/category",require("./categoryRoute"))

module.exports = route;
