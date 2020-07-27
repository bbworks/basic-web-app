//Import modules
const router = require("express").Router();
const postAPI = require("../api/post");
const utilities = require("../utilities");


router.get("/search", (request, response) => {
  const callback = (results) => {
    //Truncate the post body and format our date
    results.forEach(result=>{
      result.body = utilities.truncatePost(result.body, 225);
      result.post_date = utilities.formatDateString(result.post_date);
    });

    response.render("search.ejs", {posts: results, search: request.query.search});
  };
  postAPI.searchPosts(callback, request.query.search);
});

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
