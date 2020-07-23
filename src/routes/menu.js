//Import modules
const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.render("menu.ejs", {user: request.session.user});
});

module.exports = router;
