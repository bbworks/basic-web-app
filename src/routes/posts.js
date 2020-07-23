//Import modules
const express = require("express");
const router = express.Router();
const postAPI = require("../api/post");
const utilities = require("../utilities");


router.get("/:post_id", (request, response)=>{
  const callback = (results) => {
    //Format our date
    results.forEach(result=>{
      result.post_date = utilities.formatDateString(result.post_date);
    });

    response.render("posts.ejs", {post: results[0]});
  };
  postAPI.getPost(callback, request.params.post_id);
});

module.exports = router;
