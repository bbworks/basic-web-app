//Import modules
const db = require("../db");

//Create singleton
const postAPI = {};

//Get all posts
postAPI.getPosts = () => {
  return db.call("GetPosts");
};

//Get a specific post
postAPI.getPost = (postId) => {
  return db.call("GetPostById", postId);
};

//Create a post
postAPI.createPost = (postDate, heading, body, userId) => {
  return db.call("CreatePost", [
    postDate,
    heading,
    body,
    userId,
  ]);
};

//Update a specific post
postAPI.updatePost = (postId, heading, body) => {
  return db.call("CreatePost", [
    postId,
    heading,
    body
  ]);
};

//Delete a specific post
postAPI.deletePost = (postId) => {
  return db.call("DeletePostById", postId);
};

//Get a specific post
postAPI.searchPosts = (searchParams) => {
  return db.call("SearchPostsByKeywords", searchParams);
};

module.exports = postAPI;
