USE `BasicApp`;

START TRANSACTION;

DROP PROCEDURE IF EXISTS SearchPostsByKeywords;
DELIMITER //
CREATE PROCEDURE SearchPostsByKeywords(
	$keywords varchar(1000)
)
BEGIN
	## Declare variables
    DECLARE $whereClause varchar(1000);
    DECLARE $sanitized_keywords varchar(1000);

    ## Declare cursor components
    DECLARE $keyword varchar(100);
    DECLARE $done INT DEFAULT FALSE;
    DECLARE keyword_cursor CURSOR FOR
			SELECT
				keyword
			FROM keywords_table;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET $done = TRUE; ## must be after cursor declaration

    ## Set the initial query
    SET @query = 'SELECT * FROM posts INNER JOIN users ON posts.author_id = users.user_id WHERE 1=2 ';

    ## Create a temporary table to hold the keywords
    DROP TEMPORARY TABLE IF EXISTS keywords_table;

    CREATE TEMPORARY TABLE IF NOT EXISTS keywords_table (
      keyword varchar(50)
    );

    ## Sanitize the input
    SET $sanitized_keywords = REPLACE($keywords, ';', '');

    ## Insert the space-delimited keywords into the temporary table
    SET @sql_command = 'INSERT INTO keywords_table(keyword) VALUES (''';
    SET @sql_command = CONCAT(@sql_command, REPLACE($sanitized_keywords, ' ', '''), ('''));
    SET @sql_command = CONCAT(@sql_command, ''');');
    PREPARE sql_command FROM @sql_command;
    EXECUTE sql_command;
    DEALLOCATE PREPARE sql_command;

    ## Remove empty keywords
    DELETE FROM keywords_table WHERE NULLIF(TRIM(keyword), '') IS NULL;

    ## Open the keyword cursor
    OPEN keyword_cursor;

    ## Iterate through the cursor of keywords
    keyword_loop: LOOP
		FETCH keyword_cursor INTO $keyword;
        IF $done THEN
			LEAVE keyword_loop;
		END IF;

        ## Build dynamic SQL to add a check of the keyword
        ##  to every column
        SET $whereClause = (
			SELECT
				GROUP_CONCAT(CONCAT(' OR ', COLUMN_NAME, ' LIKE ''%', $keyword, '%''') SEPARATOR '')
			FROM INFORMATION_SCHEMA.COLUMNS
			WHERE DATA_TYPE IN ('text', 'varchar')
				AND TABLE_NAME IN ('posts', 'users')
		);
		SET @query = CONCAT(@query, $whereClause);
    END LOOP;

    PREPARE query FROM @query;
    EXECUTE query;
    DEALLOCATE PREPARE query;

END //
DELIMITER ;

COMMIT;
