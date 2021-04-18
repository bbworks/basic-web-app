//Import modules
const router = require("express").Router();
const {postAPI} = require("../api/index.js");
const utilities = require("../utilities");


router.get("/", (request, response) => {
  postAPI.getPosts()
    .then(results=>{
      //Truncate the post body and format our date
      console.log(results);
      results.forEach(result=>{
        result.body = utilities.truncatePost(result.body);
        result.post_date = utilities.formatDateString(result.post_date);
      });

      response.render("routes/index.ejs", {posts: results});
    });
});

module.exports = router;
