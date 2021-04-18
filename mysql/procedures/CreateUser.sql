USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS CreateUser;
DELIMITER //
CREATE PROCEDURE CreateUser(
  $username          VARCHAR(255)
	, $password        VARCHAR(255)
	, $firstName       VARCHAR(255)
	, $lastName        VARCHAR(255)
	, $emailAddress    VARCHAR(255)
	, $phoneNumber     VARCHAR(255)
  , $user_photo_url  VARCHAR(1000)
)
BEGIN
	INSERT INTO users(
		username
		, password
		, firstName
		, lastName
    , emailAddress
    , phoneNumber
    , user_photo_url
	)
	VALUES (
		 $username
		 , SHA1($password)
		 , $firstName
		 , $lastName
     , $emailAddress
     , $phoneNumber
     , $user_photo_url
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
