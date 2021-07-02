INSERT INTO users
(username, password, email, first_name, last_name)
VALUES
(${username}, ${hash}, ${email}, ${first_name}, ${last_name})
RETURNING *;
