//Import modules
const express = require("express");
const Database = require("../../db");

const router = express.Router();
const db = new Database();

router.get("/", (request, response)=>{
  //Query the database and use the value in a callback function
  db.query("SHOW DATABASES", (results) => {
    response.send(results);
  });
});

module.exports = router;
