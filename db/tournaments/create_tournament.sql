INSERT INTO tournaments
(tournament_name, user_id, teams_number, tournament_type)
VALUES
(${tournament_name}, ${user_id}, ${teams_number},${tournament_type})
RETURNING *;