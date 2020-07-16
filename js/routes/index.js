//Import modules
const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (request, response) => {
  //response.send("Home");
  response.sendFile(path.join(__dirname+"./../../index.html"));
});

module.exports = router;
