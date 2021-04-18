USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS CreatePost;
DELIMITER //
CREATE PROCEDURE CreatePost(
	$post_date    TIMESTAMP
	, $heading    VARCHAR(255)
	, $body       TEXT
	, $author_id  INT
)
BEGIN
	INSERT INTO posts(
		post_date
		, heading
		, body
		, author_id
	)
	VALUES (
		 $post_date
		 , $heading
		 , $body
		 , $author_id
	);

	SELECT
		*
	FROM posts
	WHERE
		post_date = $post_date
		AND heading = $heading
		AND body = $body
		AND author_id = $author_id
	ORDER BY post_id DESC
	LIMIT 1;
END //
DELIMITER ;

COMMIT;
