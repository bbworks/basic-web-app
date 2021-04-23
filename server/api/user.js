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
userAPI.createUser = (username, password, firstName, lastName, emailAddress, phoneNumber, photoUrl) => {
  return db.call("CreateUser", [
    username,
    password,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    photoUrl,
  ]);
};

//Update a specific user
userAPI.updateUser = (userId, username, password, firstName, lastName, emailAddress, phoneNumber, photoUrl) => {
  return db.call("UpdateUserById", [
    userId,
    username,
    password,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    photoUrl,
  ]);
};

//Delete a specific user
userAPI.deleteUser = (userId) => {
  return db.call("DeleteUserById", userId);
};

//Get a specific user's posts
userAPI.getUserPosts = (userId) => {
  return db.call("GetUserPostsById", userId);
};

module.exports = userAPI;
