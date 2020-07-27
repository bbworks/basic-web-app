//Import modules
const router = require("express").Router();
const api = require("../../api/user");


//Get all users
router.get("/", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.getUsers(callback);
});

//Get a specific user
router.get("/:user_id", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.getUser(callback, request.params.user_id);
});

//Create a user
router.post("/", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.createUser(callback, request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber);
});

//Update a specific user
router.put("/:user_id", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.updateUser(callback, request.params.user_id, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber);
});

//Delete a specific user
router.delete("/:user_id", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.deleteUser(callback, request.params.user_id);
});

//Get a specific user's posts
router.get("/:user_id/post", (request, response)=>{
  const callback = (results) => {
    response.send(results);
  };
  api.getUserPosts(callback, request.params.user_id);
});

module.exports = router;
