//Import modules
const express = require("express");
const router = express.Router();
const api = require("../../api/post");


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

//Delete a specific post
router.delete("/:post_id", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.deletePost(callback, request.params.post_id);
});

module.exports = router;
