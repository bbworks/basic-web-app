//Import modules
const router = require("express").Router();
const userAPI = require("../api/user");
const utilities = require("../utilities");

router.get("/:user_id", (request, response)=>{
  const callback = (userResults) => {
    const callback = (postsResults) => {
      const user = userResults[0];
      const posts = postsResults;

      //Truncate the post body and format our date
      posts.forEach(post=>{
        post.body = utilities.truncatePost(post.body, 150);
        post.post_date = utilities.formatDateString(post.post_date);
      });

      response.render("users.ejs", {user: user, posts: posts, sessionUser: request.session.user});
    }
    userAPI.getUserPosts(callback, request.params.user_id);
  };
  userAPI.getUser(callback, request.params.user_id);
});

module.exports = router;
