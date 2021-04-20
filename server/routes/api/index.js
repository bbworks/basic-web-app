//Import modules
const router = require("express").Router();

const post = require("./post");
const user = require("./user");

//Search for posts
router.use("/post", post);
router.use("/user", user);

module.exports = router;
