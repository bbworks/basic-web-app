//Import modules
const router = require("express").Router();
const {postAPI, authenticationAPI} = require("../api/index.js");
const {truncatePost, formatDateString, renderView} = require("../utilities.js");


router.get("/search", async (request, response) => {
  try {
    //Destructure the request object
    const {query: {q: search}} = request;

    //Call the searchPosts() API
    const results = await postAPI.searchPosts(request.query.q);

    //Massage the posts data
    const posts = results.map(post=>{return {
        ...post,
        body: truncatePost(post.body, 225),
        post_date: formatDateString(post.post_date),
      };
    });

    //Send the response
    renderView(request, response, "routes/search/search.ejs", {posts, search});
  }
  catch (err) {
    response.status(500).send(err);
  }
});

router.get("/:post_id", async (request, response)=>{
  try {
    //Destructure the request object
    const {params: {post_id: postId}, session: {user: sessionUser}} = request;

    //Call the getPost() API
    const results = await postAPI.getPost(postId);

    //Massage the data
    const post = {
      ...results,
      post_date: formatDateString(results.post_date)
    };

    //Send the response
    renderView(request, response, "routes/posts/posts.ejs", {post, sessionUser});
  }
  catch (err) {
    response.status(500).send(err);
  }
});

router.get("/:post_id/edit", authenticationAPI.checkAuthentication, async (request, response)=>{
  try {
    //Destructure the request object
    const {params: {post_id: postId}} = request;

    //Call the getPost() API
    const post = await postAPI.getPost(postId);

    //Send the response
    renderView(request, response, "routes/post_edit/post_edit.ejs", {post});
  }
  catch (err) {
    response.status(500).send(err);
  }
});

router.post("/:post_id/edit", authenticationAPI.checkAuthentication, async (request, response)=>{
  try {
    //Destructure the request object
    const {params: {post_id: postId}, body: {heading, body}} = request;

    //Call the updatePost() API
    const post = await postAPI.updatePost(postId, null, heading, body, null, null);

    response.redirect(`/posts/${postId}`);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
