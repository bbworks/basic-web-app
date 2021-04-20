USE `BasicApp`;

START TRANSACTION;

INSERT INTO `Users` (
  username
	, password
	, first_name
	, last_name
	, email_address
	, phone_number
)
VALUES (
  'jdoe'
	, SHA1('jdoe')
	, 'John'
	, 'Doe'
	, 'johndoe@email.com'
	, '5555555555'
);

INSERT INTO `Users` (
  username
	, password
	, first_name
	, last_name
	, email_address
	, phone_number
	, user_photo_url
)
VALUES (
  'bbiera'
	, SHA1('password')
	, 'Bradley'
	, 'Biera'
	, '30395710+bbworks@users.noreply.github.com'
	, '5555555555'
	, '/assets/466410_4783174939615_1618313192_o.jpg'
);

COMMIT;
