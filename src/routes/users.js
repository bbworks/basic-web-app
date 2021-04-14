//Import modules
const router = require("express").Router();
const userAPI = require("../api/user");
const utilities = require("../utilities");

router.get("/:user_id", async (request, response)=>{
  const userResults = await userAPI.getUser(request.params.user_id);
  const posts = await userAPI.getUserPosts(request.params.user_id);

  const user = userResults[0];

  //Truncate the post body and format our date
  posts.forEach(post=>{
    post.body = utilities.truncatePost(post.body, 150);
    post.post_date = utilities.formatDateString(post.post_date);
  });

  response.render("routes/users.ejs", {user: user, posts: posts, sessionUser: request.session.user});
});

module.exports = router;
