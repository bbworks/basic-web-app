//Import modules
const router = require("express").Router();
const api = require("../../api/post");


//Search for posts
router.get("/search", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.searchPosts(callback, request.query.search);
});

//Get all posts
router.get("/", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.getPosts(callback);
});

//Get a specific post
router.get("/:post_id", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.getPost(callback, request.params.post_id);
});

//Create a post
router.post("/", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.createPost(callback, request.body.postDate, request.body.heading, request.body.body, request.body.userId);
});

//Update a specific post
router.put("/:post_id", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.updatePost(callback, request.params.post_id, request.body.heading, request.body.body);
});

//Delete a specific post
router.delete("/:post_id", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.deletePost(callback, request.params.post_id);
});

module.exports = router;
