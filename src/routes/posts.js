//Import modules
const router = require("express").Router();
const postAPI = require("../api/post");
const authentication = require("../api/authentication");
const utilities = require("../utilities");


router.get("/search", (request, response) => {
  postAPI.searchPosts(request.query.q)
    .then(results=>{
      //Truncate the post body and format our date
      results.forEach(result=>{
        result.body = utilities.truncatePost(result.body, 225);
        result.post_date = utilities.formatDateString(result.post_date);
      });

      response.render("routes/search.ejs", {posts: results, search: request.query.q});
    });
});

router.get("/:post_id", (request, response)=>{
  postAPI.getPost(request.params.post_id)
    .then(results=>{
      const post = results[0];

      //Format our date
      post.post_date = utilities.formatDateString(post.post_date);

      response.render("routes/posts.ejs", {post: post, sessionUser: request.session.user});
    });
});

router.get("/:post_id/edit", authentication.checkAuthentication, (request, response)=>{
  postAPI.getPost(request.params.post_id)
    .then(results=>{
      const post = results[0];

      response.render("routes/post_edit.ejs", {post: post, pageUrl: `/posts/${request.params.post_id}`});
    });
});

router.post("/:post_id/edit", authentication.checkAuthentication, (request, response)=>{
  postAPI.updatePost(request.params.post_id, request.body.heading, request.body.body)
    .then(results=>{
      const post = results[0];

      response.redirect(`/posts/${request.params.post_id}`);
    });
});

module.exports = router;
