//Import modules
const router = require("express").Router();
const {postAPI} = require("../../api/index.js");


//Search for posts
router.get("/search", (request, response)=>{
  postAPI.searchPosts(request.query.q)
    .then(results=>{
      response.send(results);
    });
});

//Get all posts
router.get("/", (request, response)=>{
  postAPI.getPosts()
    .then(results=>{
      response.send(results);
    });
});

//Get a specific post
router.get("/:post_id", (request, response)=>{
  postAPI.getPost(request.params.post_id)
    .then(results=>{
      console.log(results);
      response.send(results);
    });
});

//Create a post
router.post("/", (request, response)=>{
  postAPI.createPost(request.body.postDate, request.body.heading, request.body.body, request.body.userId)
    .then(results=>{
      response.send(results);
    });
});

//Update a specific post
router.put("/:post_id", (request, response)=>{
  postAPI.updatePost(request.params.post_id, request.body.heading, request.body.body)
    .then(results=>{
      response.send(results);
    });
});

//Delete a specific post
router.delete("/:post_id", (request, response)=>{
  postAPI.deletePost(request.params.post_id)
    .then(results=>{
      response.send(results);
    });
});

module.exports = router;
