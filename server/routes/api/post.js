//Import modules
const router = require("express").Router();
const {postAPI} = require("../../api/index.js");


//Search for posts
router.get("/search", async (request, response)=>{
  const results = await postAPI.searchPosts(request.query.q);
  response.send(results);
});

//Get all posts
router.get("/", async (request, response)=>{
  const results = await postAPI.getPosts();
  response.send(results);
});

//Get a specific post
router.get("/:post_id", async (request, response)=>{
  const results = await postAPI.getPost(request.params.post_id);
  response.send(results);
});

//Create a post
router.post("/", async (request, response)=>{
  const results = await postAPI.createPost(request.body.postDate, request.body.heading, request.body.body, request.body.userId);
  response.send(results);
});

//Update a specific post
router.put("/:post_id", async (request, response)=>{
  const results = await postAPI.updatePost(request.params.post_id, request.body.heading, request.body.body);
  response.send(results);
});

//Delete a specific post
router.delete("/:post_id", async (request, response)=>{
  const results = await postAPI.deletePost(request.params.post_id);
  response.send(results);
});

module.exports = router;
