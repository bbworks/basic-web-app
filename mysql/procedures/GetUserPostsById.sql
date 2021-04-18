USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS GetUserPostsByID;
DELIMITER //
CREATE PROCEDURE GetUserPostsByID(
	$user_id INT
)
BEGIN
	SELECT
    *
  FROM users
  INNER JOIN posts
    ON users.user_id = posts.author_id
  WHERE user_id = $user_id
  ORDER BY post_id;
END //
DELIMITER ;

COMMIT;
