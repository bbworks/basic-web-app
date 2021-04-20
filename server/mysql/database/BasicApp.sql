## Create the application database, if not already existing
##  NOTE: This does not seem to be honored inside a rolled back transaction;
##  procede with caution
DROP DATABASE IF EXISTS `BasicApp`;
CREATE DATABASE IF NOT EXISTS `BasicApp`;