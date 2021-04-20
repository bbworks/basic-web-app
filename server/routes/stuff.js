//Import modules
const router = require("express").Router();

router.get("/", (request, response) => {
  response.render("routes/stuff.ejs");
});

module.exports = router;
