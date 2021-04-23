//Import modules
const router = require("express").Router();
const {postAPI} = require("../../api/index.js");


//Search for posts
router.get("/search", async (request, response)=>{
  try {
    const results = await postAPI.searchPosts(request.query.q);
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Get all posts
router.get("/", async (request, response)=>{
  try {
    const results = await postAPI.getPosts();
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Get a specific post
router.get("/:post_id", async (request, response)=>{
  try {
    const results = await postAPI.getPost(request.params.post_id);
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Create a post
router.post("/", async (request, response)=>{
  try {
    const results = await postAPI.createPost(request.body.postDate, request.body.heading, request.body.body, request.body.photoUrl, request.body.userId);
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Update a specific post
router.put("/:post_id", async (request, response)=>{
  try {
    const results = await postAPI.updatePost(request.params.post_id, request.body.postDate, request.body.heading, request.body.body, request.body.photoUrl, request.body.userId);
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Delete a specific post
router.delete("/:post_id", async (request, response)=>{
  try {
    const results = await postAPI.deletePost(request.params.post_id);
    response.status(204).send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
