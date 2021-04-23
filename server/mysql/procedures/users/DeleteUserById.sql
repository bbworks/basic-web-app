USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS DeleteUserById;
DELIMITER //
CREATE PROCEDURE DeleteUserById(
	$user_id INT
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM users WHERE user_id = $user_id LIMIT 1) THEN 
		SET @message_text = CONCAT('User id ', $user_id, ' not found.');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	END IF;
    
	DELETE FROM users
	WHERE user_id = $user_id;
END //
DELIMITER ;

COMMIT;
