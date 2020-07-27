//Import modules
const router = require("express").Router();
const postAPI = require("../api/post");
const utilities = require("../utilities");


router.get("/", (request, response) => {
  const callback = (results) => {
    //Truncate the post body and format our date
    results.forEach(result=>{
      result.body = utilities.truncatePost(result.body);
      result.post_date = utilities.formatDateString(result.post_date);
    });

    response.render("index.ejs", {posts: results});
  };
  postAPI.getPosts(callback);
});

module.exports = router;
