USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS GetUsers;
DELIMITER //
CREATE PROCEDURE GetUsers()
BEGIN
	SELECT
    *
  FROM users
  ORDER BY user_id;
END //
DELIMITER ;

COMMIT;
