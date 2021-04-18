USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS UpdateUserById;
DELIMITER //
CREATE PROCEDURE UpdateUserById(
	$user_id          INT
	, $first_name     VARCHAR(255)
	, $last_name      VARCHAR(255)
  , $email_address  VARCHAR(255)
  , $phone_number   VARCHAR(255)
)
BEGIN
  UPDATE users
  SET first_name = $first_name
    , last_name = $last_name
    , email_address = $email_address
    , phone_number = $phone_number
  WHERE user_id = $user_id;

  SELECT
    *
  FROM users
  WHERE user_id = $user_id;
END //
DELIMITER ;

COMMIT;
