//Import modules
const express = require("express");
const router = express.Router();
const authentication = require("../api/authentication");

router.get("/", authentication.checkAuthentication, (request, response) => {
  //response.render("account.ejs");
  response.send(request.session);
});

module.exports = router;
