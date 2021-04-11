//Import modules
const express = require("express");
const path = require("path");

const mysql = require("mysql");
const session = require("express-session");

const indexRouter = require("./src/routes/index");
const postsRouter = require("./src/routes/posts");
const usersRouter = require("./src/routes/users");
const stuffRouter = require("./src/routes/stuff");
const accountRouter = require("./src/routes/account");
const notificationsRouter = require("./src/routes/notifications");
const menuRouter = require("./src/routes/menu");
const loginRouter = require("./src/routes/login");
const logoutRouter = require("./src/routes/logout");
const postApiRouter = require("./src/routes/api/post");
const userApiRouter = require("./src/routes/api/user");
const db = require("./src/db");

//Create and configure the app
const app = express();
const port = 3000;
const publicDirectory = path.join(__dirname, "public");

//Set up the initial database connection
db.init();

//Set the application view engine (for page rendering)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"src/views"));

//Set up application middleware

// NOTE: "Middleware" are processes called BETWEEN
//  request processing & response sending; this can include
//  libraries for extending Express's functionality and
//  establishing routers to use for certain routes

app.use(express.json()); //{body-parser} allows app to handle body as string or array (POST & PUT)
app.use(express.urlencoded({ extended: true })); //{body-parser} allow app to handle body as JSON objects (POST & PUT)
app.use(express.static(publicDirectory)); //serves static files from the following directory as root
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
})); //Set up our session token

//Set up application routes
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/stuff", stuffRouter);
app.use("/account", accountRouter);
app.use("/notifications", notificationsRouter);
app.use("/menu", menuRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use("/api/post", postApiRouter);
app.use("/api/user", userApiRouter);

//Set up 404 handling and forward to error handler
// (HTTP 404 does not constitute an error)
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

//Set up error handling route
app.use((err, req, res, next) => {
  //"So when you add a custom error handler,
  // you must delegate to the default Express error handler,
  // when the headers have already been sent to the client"
  //  http://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    return next(err)
  }

  console.error(err);
  res.status(err.status || 500).send('Error');
});

//Start the http server
app.listen(port, ()=>console.log(`Server started on port ${port}.`));
