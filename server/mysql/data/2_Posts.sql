USE `BasicApp`;

START TRANSACTION;

INSERT INTO `Posts` (
  post_date
  , heading
  , body
  , author_id
)
VALUES (
  '2020-05-14 12:38:12'
  , 'My first post'
	, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id semper risus in hendrerit gravida rutrum quisque non. Vitae tortor condimentum lacinia quis vel eros donec ac. Quis blandit turpis cursus in hac habitasse platea. Sapien et ligula ullamcorper malesuada proin libero nunc. Eleifend mi in nulla posuere sollicitudin aliquam. Nibh venenatis cras sed felis eget velit aliquet sagittis. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Tincidunt vitae semper quis lectus nulla. Urna nunc id cursus metus aliquam eleifend mi. Ac tortor vitae purus faucibus ornare suspendisse. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.'
	, 1
);

INSERT INTO `Posts` (
  post_date
  , heading
  , body
  , author_id
  , post_photo_url)
VALUES (
  '2020-06-23 09:58:41'
  , 'My second post'
  , 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id semper risus in hendrerit gravida rutrum quisque non. Vitae tortor condimentum lacinia quis vel eros donec ac. Quis blandit turpis cursus in hac habitasse platea. Sapien et ligula ullamcorper malesuada proin libero nunc. Eleifend mi in nulla posuere sollicitudin aliquam. Nibh venenatis cras sed felis eget velit aliquet sagittis. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Tincidunt vitae semper quis lectus nulla. Urna nunc id cursus metus aliquam eleifend mi. Ac tortor vitae purus faucibus ornare suspendisse. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.'
	, 2
	, '/img/post_image_1.jpg'
);

INSERT INTO `Posts` (
  post_date
  , heading
  , body
  , author_id
)
VALUES (
  '2020-05-14 12:38:12'
  , 'My third post'
	, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id semper risus in hendrerit gravida rutrum quisque non. Vitae tortor condimentum lacinia quis vel eros donec ac. Quis blandit turpis cursus in hac habitasse platea. Sapien et ligula ullamcorper malesuada proin libero nunc. Eleifend mi in nulla posuere sollicitudin aliquam. Nibh venenatis cras sed felis eget velit aliquet sagittis. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Tincidunt vitae semper quis lectus nulla. Urna nunc id cursus metus aliquam eleifend mi. Ac tortor vitae purus faucibus ornare suspendisse. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.'
	, 1
);

INSERT INTO `Posts` (
  post_date
  , heading
  , body
  , author_id
)
VALUES (
  '2020-06-23 09:58:41'
  , 'My fourth post'
	, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id semper risus in hendrerit gravida rutrum quisque non. Vitae tortor condimentum lacinia quis vel eros donec ac. Quis blandit turpis cursus in hac habitasse platea. Sapien et ligula ullamcorper malesuada proin libero nunc. Eleifend mi in nulla posuere sollicitudin aliquam. Nibh venenatis cras sed felis eget velit aliquet sagittis. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Tincidunt vitae semper quis lectus nulla. Urna nunc id cursus metus aliquam eleifend mi. Ac tortor vitae purus faucibus ornare suspendisse. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.'
	, 2
);

INSERT INTO `Posts` (
  post_date
  , heading
  , body
  , author_id
)
VALUES (
  '2020-06-23 09:58:41'
  , 'My fifth post'
	, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id semper risus in hendrerit gravida rutrum quisque non. Vitae tortor condimentum lacinia quis vel eros donec ac. Quis blandit turpis cursus in hac habitasse platea. Sapien et ligula ullamcorper malesuada proin libero nunc. Eleifend mi in nulla posuere sollicitudin aliquam. Nibh venenatis cras sed felis eget velit aliquet sagittis. Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis. Tincidunt vitae semper quis lectus nulla. Urna nunc id cursus metus aliquam eleifend mi. Ac tortor vitae purus faucibus ornare suspendisse. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique.'
	, 2
);

COMMIT;
