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
      ORDER BY post_id DESC \
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

//Update a specific post
api.updatePost = (callback, postId, heading, body) => {
  const sql =
    'UPDATE posts \
      SET heading = ? \
        , body = ? \
      WHERE post_id = ?; \
      SELECT \
        * \
      FROM posts \
      WHERE post_id = ?;';
  const params = [
    heading,
    body,
    postId,
    postId,
  ];

  db.query(sql, callback, params);
};

//Delete a specific post
api.deletePost = (callback, postId) => {
  const sql = 'DELETE FROM posts WHERE post_id = ?;';
  const params = [post_id];

  db.query(sql, callback, params);
};

//Get a specific post
api.searchPosts = (callback, searchParams) => {
  let sql = 'SELECT * FROM posts INNER JOIN users ON posts.author_id = users.user_id ';
  let whereArray = [];
  let whereClause = "WHERE ";
  let query = "first_name LIKE ? OR last_name LIKE ? OR email_address LIKE ? OR phone_number LIKE ? OR post_date LIKE ? OR heading LIKE ? OR body LIKE ? OR author_id LIKE ?";
  searchParams.split(" ").forEach(item=>{whereArray.push(query.replace(/\?/g, `'%${item}%'`));});
  whereClause += whereArray.join(" OR ") + ";";
  sql += whereClause;

  db.query(sql, callback);
};

module.exports = api;
