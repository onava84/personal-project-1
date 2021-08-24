INSERT INTO password_reset
(id, email)
VALUES
(${id}, ${email})
RETURNING *;