//Import modules
const router = require("express").Router();
const {userAPI} = require("../api/index.js");
const {truncatePost, formatDateString, renderView} = require("../utilities.js");

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
        body: truncatePost(post.body, 150),
        post_date: formatDateString(post.post_date),
      };
    });

    //Send the response
    renderView(request, response, "routes/users/users.ejs", {user, posts, sessionUser});
  }
  catch (err) {
    response.status(500).send(err);
  }
});

module.exports = router;
