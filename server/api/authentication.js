//Import modules
const db = require("../db");

//Create singleton
const authAPI = {};

//Authenticate the user
authAPI.authenticate = (username, password) => {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = SHA1(?) ORDER BY user_id LIMIT 1;';
  const params = [username, password];

  return db.query(sql, params);
};

authAPI.checkAuthentication = (request, response, next) => {
  //If the user is not logged in, redirect them to the login screen
  if (!request.session.user) return response.redirect("/login");

  next();
};

authAPI.setSessionInformation = (user) => {
  return {
    userId: user.user_id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    photoUrl: user.user_photo_url,
  };
};

module.exports = authAPI;
