USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS GetPostById;
DELIMITER //
CREATE PROCEDURE GetPostById(
	$post_id INT
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM posts WHERE post_id = $post_id LIMIT 1) THEN 
		SET @message_text = CONCAT('Post id ', $post_id, ' not found.');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	END IF;
    
	SELECT
		*
	FROM posts
	INNER JOIN users
	ON posts.author_id = users.user_id
	WHERE post_id = $post_id;
END //
DELIMITER ;

COMMIT;
