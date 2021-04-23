USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS GetUserPostsByID;
DELIMITER //
CREATE PROCEDURE GetUserPostsByID(
	$user_id INT
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM users WHERE user_id = $user_id LIMIT 1) THEN 
		SET @message_text = CONCAT('User id ', $user_id, ' not found.');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	END IF;
    
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
