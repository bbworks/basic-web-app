//Import modules
const router = require("express").Router();

router.get("/", (request, response) => {
  try {
    //Destructure the request object
    const {session: {user}} = request;

    //Send the response
    response.render("routes/menu/menu.ejs", {user});
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
