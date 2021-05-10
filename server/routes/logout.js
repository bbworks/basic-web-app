//Import modules
const router = require("express").Router();
const {renderView} = require("../utilities.js");

router.get("/", (request, response)=>{
  try {
    //Destructure the request object
    const {session} = request;

    //Remove the user session data
    delete session.user;
    attempts = 0;

    //Redirect the request to the login screen
    response.redirect("/login");
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
