//Import modules
const express = require("express");
const Database = require("../db");

const router = express.Router();
const db = new Database();

router.get("/:post_id", (request, response)=>{
  const sql = `SELECT * FROM posts INNER JOIN users ON posts.author_id = users.user_id WHERE post_id = ${request.params.post_id};`;

  //Query the database and use the value in a callback function
  db.query(sql, (results) => {
    response.render("post.ejs", {post: results[0]});
  });
});

module.exports = router;

//(request, response)=>{response.render(path.join(__dirname+"/src/views/post.ejs"), {id: request.params.post_id});}
