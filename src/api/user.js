//Import modules
const db = require("../db");

//Create singleton
const api = {};

//Get all users
api.getUsers = (callback) => {
  const sql = 'SELECT * FROM users ORDER BY user_id;';

  db.query(sql, callback);
};

//Get a specific user
api.getUser = (callback, userId) => {
  const sql = 'SELECT * FROM users WHERE user_id = ?;';
  const params = [userId];

  db.query(sql, callback, params);
};

//Create a user
api.createUser = (callback, username, password, firstName, lastName, emailAddress, phoneNumber) => {
  const sql =
    'INSERT INTO users( \
        username \
        , password \
        , first_name \
        , last_name \
        , email_address \
        , phone_number \
      ) \
      VALUES ( \
         ? \
         , SHA1(?) \
         , ? \
         , ? \
         , ? \
         , ? \
      ); \
      SELECT \
        * \
      FROM users \
      WHERE username = ? \
        AND password = SHA1(?) \
      ORDER BY 1 DESC \
      LIMIT 1;';
  const params = [
    username,
    password,
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    username,
    password,
  ];

  db.query(sql, callback, params);
};

//Update a specific user
api.updateUser = (callback, userId, firstName, lastName, emailAddress, phoneNumber) => {
  const sql =
  'UPDATE users \
  SET first_name = ? \
  , last_name = ? \
  , email_address = ? \
  , phone_number = ? \
  WHERE user_id = ?; \
  SELECT \
  * \
  FROM users \
  WHERE user_id = ?;';
  const params = [
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    userId,
    userId,
  ];

  db.query(sql, callback, params);
};

//Delete a specific user
api.deleteUser = (callback, userId) => {
  const sql = 'DELETE FROM users WHERE user_id = ?;';
  const params = [user_id];

  db.query(sql, callback, params);
};

//Get a specific user's posts
api.getUserPosts = (callback, userId) => {
  const sql = 'SELECT * FROM users INNER JOIN posts ON users.user_id = posts.author_id WHERE user_id = ?;';
  const params = [userId];

  db.query(sql, callback, params);
};

module.exports = api;
