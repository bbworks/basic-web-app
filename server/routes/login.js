//Import modules
const router = require("express").Router();
const {authenticationAPI} = require("../api/index.js");

let failedAttempt = false;

router.get("/", (request, response)=>{
  response.render("routes/login.ejs", {failure: failedAttempt});
  failedAttempt = false;
});

router.post("/", async (request, response)=>{
  try {
    //Destructure the request object
    const {body: {username, password}, session} = request;

    //Call the authenticate() API
    const user = await authenticationAPI.authenticate(username, password);

    //If we get back a falsy value (such as an empty array),
    // redirect back to the login screen
    if (user == false) {
      failedAttempt = true;
      response.redirect("/login");
      return;
    }

    //Otherwise, establish the user session
    session.user = authenticationAPI.setSessionInformation(user);
    failedAttempt = false;

    //Send the response
    response.redirect("/menu");
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
