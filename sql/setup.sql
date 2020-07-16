##Set up the application user
CREATE USER IF NOT EXISTS `BasicApp`@`localhost` IDENTIFIED WITH mysql_native_password BY '$Password$123$';
GRANT ALL PRIVILEGES ON `BasicApp`.* TO `BasicApp`@`localhost`;

##Flush privileges for changes to take effect
FLUSH PRIVILEGES;

##Create the application database
CREATE DATABASE IF NOT EXISTS `BasicApp`;
