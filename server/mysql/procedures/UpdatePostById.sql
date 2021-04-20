USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS UpdatePostById;
DELIMITER //
CREATE PROCEDURE UpdatePostById(
	$post_id      INT
	, $heading    VARCHAR(255)
	, $body       TEXT
)
BEGIN
	UPDATE posts
	SET heading = $heading
		, body = $body
	WHERE post_id = $post_id;
	SELECT
		*
	FROM posts
	WHERE post_id = $post_id;
END //
DELIMITER ;

COMMIT;
