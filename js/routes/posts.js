//Import modules
const express = require("express");
const Database = require("../db");

const router = express.Router();
const db = new Database();


//Get all posts
router.get("/", (request, response)=>{
  const sql = `SELECT * FROM posts;`;

  //Query the database and use the value in a callback function
  db.query(sql, (results) => {
    response.send(results);
  });
});

//Get a specific post
router.get("/:post_id", (request, response)=>{
  const sql = `SELECT * FROM posts WHERE id = ${request.params.post_id};`;

  //Query the database and use the value in a callback function
  db.query(sql, (results) => {
    response.send(results);
  });
});

//Create a post
router.post("/", (request, response)=>{
  const sql =
    `INSERT INTO posts(heading, body)
      VALUES ('${request.body.heading}', '${request.body.body}');
    SELECT
      *
    FROM posts
    WHERE heading = '${request.body.heading}'
      AND body = '${request.body.body}'
    ORDER BY 1 DESC
    LIMIT 1;`;

  //Query the database and use the value in a callback function
  db.query(sql, (results) => {
    response.send(results);
  });
});

//Delete a specific post
router.delete("/:post_id", (request, response)=>{
  const sql =
    `DELETE FROM posts
      WHERE id = ${request.params.post_id};`;

  //Query the database and use the value in a callback function
  db.query(sql, (results) => {
    response.send(results);
  });
});

module.exports = router;
