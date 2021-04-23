USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS CreatePost;
DELIMITER //
CREATE PROCEDURE CreatePost(
	$post_date    DATETIME
	, $heading    VARCHAR(255)
	, $body       TEXT
    , $photo_url  VARCHAR(1000)
	, $author_id  INT
)
BEGIN
	# Declare default values
    IF NULLIF(TRIM($photo_url), '') IS NULL THEN SET $photo_url = '/assets/post_photo_default.jpg'; END IF;
    IF NULLIF(TRIM($post_date), '') IS NULL THEN SET $post_date = NOW(); END IF;
    
	INSERT INTO posts(
		post_date
		, heading
		, body
        , post_photo_url
		, author_id
	)
	VALUES (
		 $post_date
		 , $heading
		 , $body
         , $photo_url
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
