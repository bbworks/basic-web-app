USE `BasicApp`;

START TRANSACTION;

DROP TABLE IF EXISTS `Posts`;
CREATE TABLE IF NOT EXISTS `Posts` (
    `post_id` int NOT NULL AUTO_INCREMENT
    , `post_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
    , `heading` varchar(100) NOT NULL
    , `body` text NOT NULL
    , `author_id` int NOT NULL
    , `post_photo_url` varchar(1000) NULL DEFAULT '/img/post_photo_default.jpg'
    , PRIMARY KEY (`post_id`)
    , CONSTRAINT `FK_author_id` FOREIGN KEY (`author_id`) REFERENCES `users`(`user_id`)
);

COMMIT;