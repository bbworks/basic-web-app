//Import modules
const router = require("express").Router();

router.get("/", (request, response) => {
  response.render("stuff.ejs");
});

module.exports = router;
