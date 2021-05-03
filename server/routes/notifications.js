//Import modules
const router = require("express").Router();

router.get("/", (request, response) => {
  try {
    //Send the response
    response.render("routes/notifications/notifications.ejs");
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
