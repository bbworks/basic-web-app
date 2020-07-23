//Import modules
const db = require("../db");

//Create singleton
const api = {};

//Get all posts
api.getPosts = (callback) => {
  const sql = 'SELECT * FROM posts INNER JOIN users ON posts.author_id = users.user_id ORDER BY post_id;';

  db.query(sql, callback);
};

//Get a specific post
api.getPost = (callback, postId) => {
  const sql = 'SELECT * FROM posts INNER JOIN users ON posts.author_id = users.user_id WHERE post_id = ?;';
  const params = [postId];

  db.query(sql, callback, params);
};

//Create a post
api.createPost = (callback, postDate, heading, body, userId) => {
  const sql =
  'INSERT INTO posts( \
    post_date \
    , heading \
    , body \
    , author_id \
  ) \
  VALUES ( \
     ? \
     , ? \
     , ? \
     , ? \
  ); \
  SELECT \
    * \
  FROM posts \
  WHERE \
    post_date = ? \
    AND heading = ? \
    AND body = ? \
    AND author_id = ? \
  ORDER BY 1 DESC \
  LIMIT 1;';
  const params = [
    postDate,
    heading,
    body,
    userId,
    postDate,
    heading,
    body,
    userId,
  ];

  db.query(sql, callback, params);
};

//Delete a specific post
api.deletePost = (callback, postId) => {
  const sql = 'DELETE FROM posts WHERE post_id = ?;';
  const params = [post_id];

  db.query(sql, callback, params);
};

module.exports = api;
