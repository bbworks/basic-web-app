//Import modules
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./src/db");

//Create and configure our app
const app = express();
const port = 3000;
const publicDirectory = path.join(__dirname, "public");

//Set up our database connection
db.init();

//Set our application view engine (for page rendering)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"src/views"));

//Add application middleware (processes called BETWEEN request processing & response sending)
app.use(express.json()); //{body-parser} allows app to handle body as string or array (POST & PUT)
app.use(express.urlencoded({ extended: true })); //{body-parser} allow app to handle body as JSON objects (POST & PUT)
app.use(express.static(publicDirectory)); //serves static files from the following directory as root
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
})); //Set up our session token

//Create our app routes
app.use("/", require("./src/routes/index"));
app.use("/posts", require("./src/routes/posts"));
app.use("/users", require("./src/routes/users"));
app.use("/stuff", require("./src/routes/stuff"));
app.use("/account", require("./src/routes/account"));
app.use("/notifications", require("./src/routes/notifications"));
app.use("/menu", require("./src/routes/menu"));
app.use("/login", require("./src/routes/login"));
app.use("/logout", require("./src/routes/logout"));

app.use("/api/post", require("./src/routes/api/post"));
app.use("/api/user", require("./src/routes/api/user"));

//Start the server
app.listen(port, ()=>{
  console.log(`Server started on port ${port}.`);
});
