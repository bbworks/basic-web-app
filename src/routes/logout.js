//Import modules
const router = require("express").Router();

router.get("/", (request, response)=>{
  delete request.session.user;
  attempts = 0;
  response.redirect("/login");
});

module.exports = router;
