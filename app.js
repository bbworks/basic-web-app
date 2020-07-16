//Import modules
const mysql = require("mysql");
const express = require("express");

const db = require("./js/db");
const router = require("./js/routes/router");

//Create our app
const app = express();
const port = 3000;

//Create our app routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
app.get("/", router.index);
app.use("/posts", router.posts);
app.use("/showDBs", router.showDBs);
app.use("/outputTable", router.outputTable);

//Start the server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}.`);
});
