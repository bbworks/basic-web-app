//Import modules
const router = require("express").Router();
const postAPI = require("../api/post");
const authentication = require("../api/authentication");
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
    const post = results[0];

    //Format our date
    post.post_date = utilities.formatDateString(post.post_date);

    response.render("posts.ejs", {post: post, sessionUser: request.session.user});
  };
  postAPI.getPost(callback, request.params.post_id);
});

router.get("/:post_id/edit", authentication.checkAuthentication, (request, response)=>{
  const callback = (results) => {
    const post = results[0];

    response.render("edit.ejs", {post: post, pageUrl: `/posts/${request.params.post_id}`});
  };
  postAPI.getPost(callback, request.params.post_id);
});

router.post("/:post_id/edit", authentication.checkAuthentication, (request, response)=>{
  const callback = (results) => {
    const post = results[0];

    response.redirect(`/posts/${request.params.post_id}`);
  };
  postAPI.updatePost(callback, request.params.post_id, request.body.heading, request.body.body);
});

module.exports = router;
