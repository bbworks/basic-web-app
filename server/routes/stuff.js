//Import modules
const router = require("express").Router();
const {renderView} = require("../utilities.js");

router.get("/", (request, response) => {
  try {
    //Send the response
    renderView(request, response, "routes/stuff/stuff.ejs");
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
