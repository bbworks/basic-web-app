//Import modules
const db = require("../db");

//Create singleton
const userAPI = {};

//Get all users
userAPI.getUsers = () => {
  return db.call("GetUsers");
};

//Get a specific user
userAPI.getUser = (userId) => {
  return db.call("GetUserById", userId);
};

//Create a user
userAPI.createUser = (username, password, firstName, lastName, emailAddress, phoneNumber) => {
  return db.call("CreateUser", [
    username,
    password,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    username,
    password,
  ]);
};

//Update a specific user
userAPI.updateUser = (userId, firstName, lastName, emailAddress, phoneNumber) => {
  return db.call("UpdateUserById", [
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    userId,
    userId,
  ]);
};

//Delete a specific user
userAPI.deleteUser = (userId) => {
  return db.call("DeleteUserById", user_id);
};

//Get a specific user's posts
userAPI.getUserPosts = (userId) => {
  return db.call("GetUserPostsById", userId);
};

module.exports = userAPI;
