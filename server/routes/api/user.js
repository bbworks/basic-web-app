//Import modules
const router = require("express").Router();
const {userAPI} = require("../../api/index.js");


//Get all users
router.get("/", async (request, response)=>{
  try {
    const results = await userAPI.getUsers();
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Get a specific user
router.get("/:user_id", async (request, response)=>{
  try {
    const results = await userAPI.getUser(request.params.user_id);
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Create a user
router.post("/", async (request, response)=>{
  try {
    const results = await userAPI.createUser(request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber, request.body.photoUrl);
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Update a specific user
router.put("/:user_id", async (request, response)=>{
  try {
    const results = await userAPI.updateUser(request.params.user_id, request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber, request.body.photoUrl);
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Delete a specific user
router.delete("/:user_id", async (request, response)=>{
  try {
    const results = await userAPI.deleteUser(request.params.user_id);
    response.status(204).send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

//Get a specific user's posts
router.get("/:user_id/post", async (request, response)=>{
  try {
    const results = await userAPI.getUserPosts(request.params.user_id);
    response.send(results);
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
