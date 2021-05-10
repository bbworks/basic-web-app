USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS CreateUser;
DELIMITER //
CREATE PROCEDURE CreateUser(
  $username           VARCHAR(255)
	, $password       VARCHAR(255)
	, $first_name     VARCHAR(255)
	, $last_name      VARCHAR(255)
	, $email_address  VARCHAR(255)
	, $phone_number   VARCHAR(255)
	, $photo_url      VARCHAR(1000)
)
BEGIN
	# Declare default values
    IF NULLIF(TRIM($photo_url), '') IS NULL THEN SET $photo_url = '/img/user_photo_default.jpg'; END IF;
    
	INSERT INTO users(
		username
		, password
		, first_name
		, last_name
		, email_address
		, phone_number
		, user_photo_url
	)
	VALUES (
		$username
		, SHA1($password)
		, $first_name
		, $last_name
		, $email_address
		, $phone_number
		, $photo_url
	);

	SELECT
		*
	FROM users
	WHERE username = $username
	AND password = SHA1($password)
	ORDER BY 1 DESC
	LIMIT 1;
END //
DELIMITER ;

COMMIT;
