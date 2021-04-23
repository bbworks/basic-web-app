USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS UpdateUserById;
DELIMITER //
CREATE PROCEDURE UpdateUserById(
	$user_id          INT
	, $username       VARCHAR(255)
	, $password       VARCHAR(255)
	, $first_name     VARCHAR(255)
	, $last_name      VARCHAR(255)
	, $email_address  VARCHAR(255)
	, $phone_number   VARCHAR(255)
	, $photo_url      VARCHAR(1000)
)
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE user_id = $user_id LIMIT 1) THEN 
		SET @message_text = CONCAT('User id ', $user_id, ' not found.');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	END IF;
    
	UPDATE users
	SET 
		username = COALESCE(NULLIF(TRIM($username), ''), username)
        , password = COALESCE(NULLIF(SHA1(TRIM($password)), ''), password)
        , first_name = COALESCE(NULLIF(TRIM($first_name), ''), first_name)
		, last_name = COALESCE(NULLIF(TRIM($last_name), ''), last_name)
		, email_address = COALESCE(NULLIF(TRIM($email_address), ''), email_address)
		, phone_number = COALESCE(NULLIF(TRIM($phone_number), ''), phone_number)
        , username = COALESCE(NULLIF(TRIM($username), ''), username)
        , user_photo_url = COALESCE(NULLIF(TRIM($photo_url), ''), user_photo_url, '/assets/user_photo_default.jpg')
	WHERE user_id = $user_id;

  SELECT
    *
  FROM users
  WHERE user_id = $user_id;
END //
DELIMITER ;

COMMIT;
