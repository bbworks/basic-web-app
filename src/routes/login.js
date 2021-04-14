//Import modules
const router = require("express").Router();
const authentication = require("../api/authentication");

let failedAttempt = false;

router.get("/", (request, response)=>{
  response.render("routes/login.ejs", {failure: failedAttempt});
  failedAttempt = false;
});

router.post("/", (request, response)=>{
  authentication.authenticate(request.body.username, request.body.password)
    .then(results=>{
      //If we get back a falsy value (such as an empty array), redirect
      if (results == false) {
        response.redirect("/login");
        failedAttempt = true;
      }
      //Otherwise, move forward with authentication
      else {
        const user = results[0];
        authentication.setSessionInformation(request, response, user);
        response.redirect("/menu");
        failedAttempt = false;
      }
    });
});

router.delete("/", (request, response)=>{
  delete request.session.user;
  attempts = 0;
  response.redirect("/login");
});

module.exports = router;
