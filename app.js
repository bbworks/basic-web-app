//Import modules
const mysql = require("mysql");
const express = require("express");
const path = require("path");
const db = require("./src/db");
const router = require("./src/routes/router");

//Create our app
const app = express();
const port = 3000;
const publicDirectory = path.join(__dirname, "public");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"src/views"));

//Create our app routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicDirectory));
app.use("/", router.index);
app.use("/posts", router.post);
app.use("/api/posts", router.posts);
app.use("/api/showDBs", router.showDBs);
app.use("/api/outputTable", router.outputTable);

//Start the server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}.`);
});
