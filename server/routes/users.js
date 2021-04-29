//Import modules
const router = require("express").Router();
const {userAPI} = require("../api/index.js");
const utilities = require("../utilities");

router.get("/:user_id", async (request, response)=>{
  try {
    //Destructure the request object
    const {params: {user_id: userId}, session: {user: sessionUser}} = request;

    //Call the getPost() API
    const user = await userAPI.getUser(userId);
    const postsResults = await userAPI.getUserPosts(userId);

    //Truncate the post body and format our date
    const posts = postsResults.map(post=>{return {
        ...post,
        body: utilities.truncatePost(post.body, 150),
        post_date: utilities.formatDateString(post.post_date),
      };
    });

    //Send the response
    response.render("routes/users.ejs", {user, posts, sessionUser});
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
