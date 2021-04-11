//Import modules
const router = require("express").Router();
const userAPI = require("../api/user");
const authentication = require("../api/authentication");

router.get("/", authentication.checkAuthentication, (request, response) => {
  const callback = (results) => {
    const userInfo = results[0];
    response.render("routes/account.ejs", {user: userInfo});
  };
  userAPI.getUser(callback, request.session.user.userId);
});

router.post("/", authentication.checkAuthentication, (request, response) => {
  const callback = (results) => {
    const user = results[1][0];
    authentication.setSessionInformation(request, response, user);
    response.redirect("/account");
  };
  userAPI.updateUser(callback, request.session.user.userId, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber.replace(/[^0-9]/g, ""));
});

module.exports = router;
