//Import modules
const router = require("express").Router();
const authentication = require("../api/authentication");

let failedAttempt = false;

router.get("/", (request, response)=>{
  response.render("login.ejs", {failure: failedAttempt});
  failedAttempt = false;
});

router.post("/", (request, response)=>{
  const callback = (results) => {
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
  };
  authentication.authenticate(callback, request.body.username, request.body.password);
});

router.delete("/", (request, response)=>{
  delete request.session.user;
  attempts = 0;
  response.redirect("/login");
});

module.exports = router;
