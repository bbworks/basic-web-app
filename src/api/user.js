//Import modules
const db = require("../db");

//Create singleton
const api = {};

//Get all users
api.getUsers = () => {
  const sql = 'SELECT * FROM users ORDER BY user_id;';

  return db.query(sql);
};

//Get a specific user
api.getUser = (userId) => {
  const sql = 'SELECT * FROM users WHERE user_id = ?;';
  const params = [userId];

  return db.query(sql, params);
};

//Create a user
api.createUser = (username, password, firstName, lastName, emailAddress, phoneNumber) => {
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

  return db.query(sql, params);
};

//Update a specific user
api.updateUser = (userId, firstName, lastName, emailAddress, phoneNumber) => {
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

  return db.query(sql, params);
};

//Delete a specific user
api.deleteUser = (userId) => {
  const sql = 'DELETE FROM users WHERE user_id = ?;';
  const params = [user_id];

  return db.query(sql, params);
};

//Get a specific user's posts
api.getUserPosts = (userId) => {
  const sql = 'SELECT * FROM users INNER JOIN posts ON users.user_id = posts.author_id WHERE user_id = ?;';
  const params = [userId];

  return db.query(sql, params);
};

module.exports = api;
