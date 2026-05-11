require("dotenv").config();
const express = require("express");
const app = express();
// const dns = require("dns");
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);
dbConfig();
app.use(router);


app.listen(8000, () => {
  console.log("Server is running");
});
