USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS GetPostById;
DELIMITER //
CREATE PROCEDURE GetPostById(
	$post_id INT
)
BEGIN
	SELECT
    *
  FROM posts
  INNER JOIN users
    ON posts.author_id = users.user_id
  WHERE post_id = $post_id;
END //
DELIMITER ;

COMMIT;
