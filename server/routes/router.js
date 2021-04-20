//Import modules
const router = require("express").Router();

const indexRouter = require("./index.js");
const postsRouter = require("./posts.js");
const usersRouter = require("./users.js");
const stuffRouter = require("./stuff.js");
const accountRouter = require("./account.js");
const notificationsRouter = require("./notifications.js");
const menuRouter = require("./menu.js");
const loginRouter = require("./login.js");
const logoutRouter = require("./logout.js");
const apiRouter = require("./api/index.js");

router.use("/", indexRouter);
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/stuff", stuffRouter);
router.use("/account", accountRouter);
router.use("/notifications", notificationsRouter);
router.use("/menu", menuRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/api", apiRouter);

module.exports = router;
