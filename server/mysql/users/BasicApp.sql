START TRANSACTION;

## Set up the application user, removing it first if already existing
DROP USER IF EXISTS `BasicApp`@`localhost`;
CREATE USER IF NOT EXISTS `BasicApp`@`localhost` IDENTIFIED WITH mysql_native_password BY '$Password$123$';
GRANT ALL PRIVILEGES ON `BasicApp`.* TO `BasicApp`@`localhost`;

## Flush privileges for changes to take effect
FLUSH PRIVILEGES;

COMMIT;