//Import modules
const router = require("express").Router();
const {postAPI} = require("../api/index.js");
const {truncatePost, formatDateString, renderView} = require("../utilities.js");


router.get("/", (request, response) => {
  postAPI.getPosts()
    .then(results=>{
      //Truncate the post body and format our date
      results.forEach(result=>{
        result.body = truncatePost(result.body);
        result.post_date = formatDateString(result.post_date);
      });

      renderView(request, response, "routes/index/index.ejs", {posts: results});
    });
});

module.exports = router;
