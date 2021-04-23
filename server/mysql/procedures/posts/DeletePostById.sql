USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS DeletePostById;
DELIMITER //
CREATE PROCEDURE DeletePostById(
	$post_id INT
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM posts WHERE post_id = $post_id LIMIT 1) THEN 
		SET @message_text = CONCAT('Post id ', $post_id, ' not found.');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	END IF;
    
	DELETE FROM posts
	WHERE post_id = $post_id;
END //
DELIMITER ;

COMMIT;
