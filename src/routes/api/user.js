//Import modules
const router = require("express").Router();
const {userAPI} = require("../../api/index.js");


//Get all users
router.get("/", (request, response)=>{
  userAPI.getUsers()
    .then(results=>{
      response.send(results);
    });
});

//Get a specific user
router.get("/:user_id", (request, response)=>{
  userAPI.getUser(request.params.user_id)
    .then(results=>{
      response.send(results);
    });
});

//Create a user
router.post("/", (request, response)=>{
  userAPI.createUser(request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber)
    .then(results=>{
      response.send(results);
    });
});

//Update a specific user
router.put("/:user_id", (request, response)=>{
  userAPI.updateUser(request.params.user_id, request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.phoneNumber)
    .then(results=>{
      response.send(results);
    });
});

//Delete a specific user
router.delete("/:user_id", (request, response)=>{
  userAPI.deleteUser(request.params.user_id)
    .then(results=>{
      response.send(results);
    });
});

//Get a specific user's posts
router.get("/:user_id/post", (request, response)=>{
  userAPI.getUserPosts(request.params.user_id)
    .then(results=>{
      response.send(results);
    });
});

module.exports = router;
