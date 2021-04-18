USE `BasicApp`;

START TRANSACTION;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
    `user_id` int NOT NULL AUTO_INCREMENT
    , `username` varchar(255) NOT NULL
    , `password` varchar(255) NOT NULL
    , `first_name` varchar(255) NULL DEFAULT NULL
    , `last_name` varchar(255) NULL DEFAULT NULL
    , `email_address` varchar(255) NOT NULL
    , `phone_number` varchar(255) NOT NULL
    , `user_photo_url` varchar(1000) NULL DEFAULT '/assets/user_photo_default.jpg'
    , PRIMARY KEY (`user_id`)
    , CONSTRAINT `UQ_username` UNIQUE(`username`)
);

COMMIT;