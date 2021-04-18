//Import modules
const router = require("express").Router();
const {userAPI, authenticationAPI} = require("../api/index.js");

router.get("/", authenticationAPI.checkAuthentication, (request, response) => {
  userAPI.getUser(request.session.user.userId)
    .then(results=>{
      const user = results;
      response.render("routes/account.ejs", {user: user});
    });
});

router.post("/", authenticationAPI.checkAuthentication, (request, response) => {
  userAPI.updateUser(request.session.user.userId, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber.replace(/[^0-9]/g, ""))
    .then(results=>{
      const user = results[1][0];
      authenticationAPI.setSessionInformation(request, response, user);
      response.redirect("/account");
    });
});

module.exports = router;
