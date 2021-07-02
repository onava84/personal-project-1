INSERT INTO tournaments
(tournament_name, user_id, teams_number)
VALUES
(${tournament_name}, ${user_id}, ${teams_number})
RETURNING *;