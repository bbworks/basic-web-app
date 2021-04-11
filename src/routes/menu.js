//Import modules
const router = require("express").Router();

router.get("/", (request, response) => {
  response.render("routes/menu.ejs", {user: request.session.user});
});

module.exports = router;
