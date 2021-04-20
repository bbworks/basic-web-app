USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS GetPosts;
DELIMITER //
CREATE PROCEDURE GetPosts()
BEGIN
	SELECT
    *
  FROM posts
  INNER JOIN users
    ON posts.author_id = users.user_id
  ORDER BY post_id;
END //
DELIMITER ;

COMMIT;
