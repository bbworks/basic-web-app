//Import modules
const router = require("express").Router();

router.get("/", (request, response) => {
  response.render("notifications.ejs");
});

module.exports = router;
