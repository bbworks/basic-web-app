USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS UpdatePostById;
DELIMITER //
CREATE PROCEDURE UpdatePostById(
	$post_id      INT
    , $post_date  DATETIME
	, $heading    VARCHAR(255)
	, $body       TEXT
    , $photo_url  VARCHAR(1000)
    , $author_id  INT
)
BEGIN
	IF NOT EXISTS (SELECT 1 FROM posts WHERE post_id = $post_id LIMIT 1) THEN 
		SET @message_text = CONCAT('Post id ', $post_id, ' not found.');
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = @message_text;
	END IF;
    
	UPDATE posts
	SET 
		post_date = COALESCE(NULLIF(TRIM($post_date), ''), post_date)
        , heading = COALESCE(NULLIF(TRIM($heading), ''), heading)
		, body = COALESCE(NULLIF(TRIM($body), ''), body)
		, post_photo_url = COALESCE(NULLIF(TRIM($photo_url), ''), post_photo_url, '/img/post_photo_default.jpg')
		, author_id = COALESCE(NULLIF(TRIM($author_id), ''), author_id)
	WHERE post_id = $post_id;
	SELECT
		*
	FROM posts
	WHERE post_id = $post_id;
END //
DELIMITER ;

COMMIT;
