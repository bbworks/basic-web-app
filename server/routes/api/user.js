//Import modules
const router = require("express").Router();
const {userAPI} = require("../../api/index.js");


//Get all users
router.get("/", async (request, response)=>{
  const results = await userAPI.getUsers();
  response.send(results);
});

//Get a specific user
router.get("/:user_id", async (request, response)=>{
  const results = await userAPI.getUser(request.params.user_id);
  response.send(results);
});

//Create a user
router.post("/", async (request, response)=>{
  const results = await userAPI.createUser(request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber);
  response.send(results);
});

//Update a specific user
router.put("/:user_id", async (request, response)=>{
  const results = await userAPI.updateUser(request.params.user_id, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber);
  response.send(results);
});

//Delete a specific user
router.delete("/:user_id", async (request, response)=>{
  const results = await userAPI.deleteUser(request.params.user_id);
  response.send(results);
});

//Get a specific user's posts
router.get("/:user_id/post", async (request, response)=>{
  const results = await userAPI.getUserPosts(request.params.user_id);
  response.send(results);
});

module.exports = router;
