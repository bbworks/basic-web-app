//Import modules
const router = require("express").Router();
const userAPI = require("../api/user");
const authentication = require("../api/authentication");

router.get("/", authentication.checkAuthentication, (request, response) => {
  userAPI.getUser(request.session.user.userId)
    .then(results=>{
      const userInfo = results[0];
      response.render("routes/account.ejs", {user: userInfo});
    });
});

router.post("/", authentication.checkAuthentication, (request, response) => {
  userAPI.updateUser(request.session.user.userId, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber.replace(/[^0-9]/g, ""))
    .then(results=>{
      const user = results[1][0];
      authentication.setSessionInformation(request, response, user);
      response.redirect("/account");
    });
});

module.exports = router;
