//Import modules
const authentication = require("./authentication");
const post = require("./post");
const user = require("./user");

const api = {
  authenticationAPI: authentication,
  postAPI: post,
  userAPI: user,
};

module.exports = api;
