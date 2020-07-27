//Import modules
const db = require("../db");

//Create singleton
const api = {};

//Authenticate the user
api.authenticate = (callback, username, password) => {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = SHA1(?) ORDER BY user_id LIMIT 1;';
  const params = [username, password];

  db.query(sql, callback, params);
};

api.checkAuthentication = (request, response, next) => {
  if (!request.session.user) {
    response.redirect("/login");
  }
  else {
    next();
  }
};

api.setSessionInformation = (request, response, user) => {
  request.session.user = {
    userId: user.user_id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    photoUrl: user.user_photo_url,
  };
};

module.exports = api;
